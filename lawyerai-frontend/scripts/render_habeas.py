from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from jinja2 import Environment, FileSystemLoader
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

env = Environment(loader=FileSystemLoader("scripts/templates"))

class HabeasForm(BaseModel):
    petitioner_name: str
    respondent_name: str
    detention_place: str
    date: str
    signature: str

@app.post("/api/render-habeas")
async def render_habeas(data: HabeasForm):
    template = env.get_template("habeas_corpus_petition.j2")
    output = template.render(**data.dict())
    file_like = io.BytesIO(output.encode("utf-8"))
    return StreamingResponse(file_like, media_type="application/octet-stream", headers={"Content-Disposition": "attachment; filename=habeas_petition.txt"})
