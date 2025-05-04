#!/bin/bash

# ========= CONFIGURATION =========
PROJECT_NAME="lawyerai-backend"
DEPLOY_DIR="$PWD/$PROJECT_NAME"

# ========= STEP 1: CREATE PROJECT STRUCTURE =========
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
cd "$DEPLOY_DIR"

# Create .env file with hardcoded values
cat <<EOF > .env
DATABASE_URL=sqlite:///./users.db
SECRET_KEY=hardcoded-local-dev-key
EOF

# Create requirements.txt
cat <<EOF > requirements.txt
fastapi
uvicorn
sqlalchemy
pydantic
passlib[bcrypt]
python-jose
jinja2
gunicorn
python-multipart
aiosmtplib
email-validator
python-dotenv
EOF

# Create main.py (same as v1.0_backend_setup with .env support)
cat <<EOF > main.py
from fastapi import FastAPI, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime, timedelta
from email_validator import validate_email
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./users.db")

Base = declarative_base()
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {})
SessionLocal = sessionmaker(bind=engine)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String)

Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

app = FastAPI()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if user and pwd_context.verify(password, user.hashed_password):
        return user
    return None

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect credentials")
    access_token = create_access_token(data={"sub": user.username, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me")
def read_users_me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"user": payload["sub"], "role": payload.get("role")}
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

@app.post("/signup")
def signup(email: str = Form(...), password: str = Form(...), role: str = Form("citizen")):
    db = SessionLocal()
    if get_user_by_email(db, email):
        raise HTTPException(status_code=400, detail="Email already registered.")
    hashed = pwd_context.hash(password)
    user = User(username=email, email=email, hashed_password=hashed, role=role)
    db.add(user)
    db.commit()
    return {"message": "Signup successful"}

@app.get("/healthz")
def health_check():
    return {"status": "ok"}
EOF

# ========= STEP 2: INSTALL DEPENDENCIES & RUN LOCALLY =========
echo "✅ Installing dependencies..."
pip install -r requirements.txt

echo "✅ Running locally with uvicorn..."
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

