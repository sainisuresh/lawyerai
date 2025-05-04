from fastapi import APIRouter, Form
from fastapi.responses import HTMLResponse
from jinja2 import Environment, FileSystemLoader
import os

router = APIRouter()
env = Environment(loader=FileSystemLoader("templates"))

@router.post("/generate-writ", response_class=HTMLResponse)
async def generate_writ(
    petitioner_name: str = Form(...),
    respondent_name: str = Form(...),
    state_name: str = Form(...),
    facts: str = Form(...),
    prayer: str = Form(...),
    advocate_name: str = Form(...)
):
    template = env.get_template("writ_petition_template.html")
    output = template.render(
        petitioner_name=petitioner_name,
        respondent_name=respondent_name,
        state_name=state_name,
        facts=facts,
        prayer=prayer,
        advocate_name=advocate_name
    )
    return output

