from fastapi import FastAPI, Depends, HTTPException, status, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from typing import Optional
from pydantic import BaseModel
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from routes import legal_drafts
# ─── In-Memory Database (To Be Replaced In Production) ─────────────────────────
fake_users_db = {}

refresh_tokens_db = {}

# ─── Security Config ───────────────────────────────────────────────────────────
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ─── FastAPI App Initialization ────────────────────────────────────────────────
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow from specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(legal_drafts.router)
# ─── Pydantic Models ───────────────────────────────────────────────────────────
class Token(BaseModel):
    access_token: str
    refresh_token: Optional[str]
    token_type: str
    user: dict


class User(BaseModel):
    email: str
    name: Optional[str] = None
    role: str

# ─── Helper Functions ──────────────────────────────────────────────────────────
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, email: str):
    user = db.get(email)
    if user:
        return User(**user)


def authenticate_user(email: str, password: str):
    user = get_user(fake_users_db, email)
    if not user:
        return False
    if not verify_password(password, fake_users_db[email]["hashed_password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ─── Auth & Profile Routes ─────────────────────────────────────────────────────
@app.post("/signup")
async def signup(
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form("citizen")
):
    if email in fake_users_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    hashed_password = get_password_hash(password)
    fake_users_db[email] = {
        "email": email,
        "hashed_password": hashed_password,
        "role": role,
        "name": ""
    }
    return {"message": "User created successfully"}

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")

    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})
    refresh_tokens_db[user.email] = refresh_token

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "email": user.email,
            "name": user.name,
            "role": user.role
        }
    }

@app.post("/refresh")
async def refresh_token(request: Request):
    data = await request.json()
    refresh_token = data.get("refresh_token")

    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if refresh_tokens_db.get(email) != refresh_token:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

        new_access_token = create_access_token(data={"sub": email})
        return {"access_token": new_access_token}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

@app.post("/update-profile")
async def update_profile(request: Request):
    data = await request.json()
    email = data.get("email")
    name = data.get("name")

    user = fake_users_db.get(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user["name"] = name
    return {"message": "Profile updated successfully", "name": name}

@app.get("/")
async def root():
    return {"message": "Backend running successfully 🚀"}

