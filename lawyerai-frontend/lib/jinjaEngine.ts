// lib/jinjaEngine.ts
import { execFile } from "child_process";
import path from "path";

export async function renderJinjaTemplate(templateName: string, context: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const script = path.join(process.cwd(), "scripts", "render_jinja.py");
    const args = [templateName, JSON.stringify(context)];

    execFile("python3", [script, ...args], (error, stdout, stderr) => {
      if (error) return reject(stderr);
      resolve(stdout);
    });
  });
}

