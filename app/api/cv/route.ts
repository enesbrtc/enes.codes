import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "Latest CV.pdf");

  try {
    const stat = await fs.promises.stat(filePath);
    const file = await fs.promises.readFile(filePath);

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(stat.size),
        "Content-Disposition": `inline; filename="Latest-CV.pdf"`,
      },
    });
  } catch (err) {
    return new Response("File not found", { status: 404 });
  }
}
