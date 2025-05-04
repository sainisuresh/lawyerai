#!/bin/bash

echo "🚀 Deploying Habeas Corpus writ draft UI + Jinja integration..."

# 1. Setup directory
dir="app/legal-drafts/court/writ-petition/habeas-corpus"
mkdir -p "$dir"

# 2. Create the React UI page
cat > "$dir/page.tsx" <<EOF
"use client";

import { useState } from "react";

export default function HabeasCorpusDraft() {
  const [formData, setFormData] = useState({
    petitioner_name: "",
    respondent_name: "",
    detention_place: "",
    date: "",
    signature: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/render-habeas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">📝 Draft Habeas Corpus Petition</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md max-w-md mx-auto">
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            className="w-full p-2 border rounded"
            name={field}
            placeholder={field.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
            value={(formData as any)[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit" className="btn-primary w-full">Generate Draft</button>
      </form>
    </div>
  );
}
EOF

# 3. Create Jinja template
mkdir -p scripts/templates
cat > scripts/templates/habeas_corpus_petition.j2 <<EOF
IN THE HONOURABLE HIGH COURT OF {{ state_name | default('_____') }}

WRIT PETITION (HABEAS CORPUS)

Petitioner: {{ petitioner_name }}
Respondent: {{ respondent_name }}

Respected Lordship,

The petitioner humbly submits that {{ detention_place }} is detaining the petitioner unlawfully. The detention is arbitrary and without legal justification.

PRAYER:
Therefore, it is respectfully prayed that a writ of Habeas Corpus be issued directing the immediate release of the petitioner.

Place: {{ detention_place }}
Date: {{ date }}

(Signature)
{{ signature }}
EOF

# 4. Create Python script for rendering
cat > scripts/render_habeas.py <<EOF
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
EOF

echo "✅ Habeas Corpus writ draft UI + Jinja integration deployed successfully!"

