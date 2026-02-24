"use client";

import cv from "@/data/cv";

export default function ExportCvButton() {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${cv.name} - CV</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fff; }
            .container { max-width: 850px; margin: 0 auto; padding: 40px; background: white; }
            .header { border-bottom: 3px solid #00ff41; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { font-size: 28px; color: #000; margin-bottom: 5px; }
            .header p { color: #666; margin: 5px 0; font-size: 12px; }
            .section { margin-bottom: 20px; }
            .section h2 { font-size: 14px; font-weight: bold; color: #000; border-bottom: 2px solid #00ff41; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase; }
            .job, .degree { margin-bottom: 12px; }
            .job-title { font-weight: bold; color: #000; }
            .company { color: #666; font-size: 12px; }
            .date { color: #999; font-size: 11px; float: right; }
            .bullets { margin-left: 20px; font-size: 12px; line-height: 1.5; }
            .bullets li { margin-bottom: 3px; }
            .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 12px; }
            .skill-block h3 { font-weight: bold; margin-bottom: 5px; color: #333; }
            .skill-list { list-style: none; }
            .skill-list li { margin: 2px 0; padding-left: 10px; }
            .skill-list li:before { content: "▪ "; color: #00ff41; font-weight: bold; }
            @media print { body { margin: 0; padding: 0; } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${cv.name}</h1>
              <p>${cv.title}</p>
              <p>${cv.location} • ${cv.phone} • ${cv.email}</p>
            </div>

            <div class="section">
              <h2>Professional Summary</h2>
              <p style="font-size: 12px; line-height: 1.6;">${cv.summary}</p>
            </div>

            <div class="section">
              <h2>Experience</h2>
              ${cv.experience
                .map(
                  (exp) => `
                <div class="job">
                  <div class="job-title">${exp.role} <span class="date">${exp.date}</span></div>
                  <div class="company">${exp.company}</div>
                  <ul class="bullets">
                    ${exp.bullets.map((b) => `<li>${b}</li>`).join("")}
                  </ul>
                </div>
              `
                )
                .join("")}
            </div>

            <div class="section">
              <h2>Education</h2>
              ${cv.education
                .map(
                  (edu) => `
                <div class="degree">
                  <div class="job-title">${edu.degree} <span class="date">${edu.date}</span></div>
                  <div class="company">${edu.school}</div>
                </div>
              `
                )
                .join("")}
            </div>

            <div class="section">
              <h2>Certifications</h2>
              <ul class="skill-list">
                ${cv.certifications.map((c) => `<li>${c}</li>`).join("")}
              </ul>
            </div>

            <div class="section">
              <h2>Core Competencies & Skills</h2>
              <div class="skills-grid">
                <div class="skill-block">
                  <h3>Systems</h3>
                  <ul class="skill-list">
                    ${cv.systems.map((s) => `<li>${s}</li>`).join("")}
                  </ul>
                </div>
                <div class="skill-block">
                  <h3>Networking</h3>
                  <ul class="skill-list">
                    ${cv.networking.map((n) => `<li>${n}</li>`).join("")}
                  </ul>
                </div>
                <div class="skill-block">
                  <h3>Tools & Platforms</h3>
                  <ul class="skill-list">
                    ${cv.tools.map((t) => `<li>${t}</li>`).join("")}
                  </ul>
                </div>
                <div class="skill-block">
                  <h3>Scripting</h3>
                  <ul class="skill-list">
                    ${cv.scripting.map((s) => `<li>${s}</li>`).join("")}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
      printWindow.document.write(html);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 250);
    }
  };

  const handleAtsExport = () => {
    const textLines = [];
    textLines.push(cv.name.toUpperCase());
    textLines.push(cv.title);
    textLines.push(`${cv.location} | ${cv.phone} | ${cv.email}`);
    textLines.push("\nPROFESSIONAL SUMMARY");
    textLines.push(cv.summary);
    textLines.push("\nEXPERIENCE");
    cv.experience.forEach((exp) => {
      textLines.push(`${exp.role} — ${exp.company} (${exp.date})`);
      exp.bullets.forEach((b) => textLines.push(`- ${b}`));
      textLines.push("");
    });
    textLines.push("\nCORE COMPETENCIES");
    textLines.push((cv.coreCompetencies || []).join(", "));
    textLines.push("\nSYSTEMS");
    textLines.push((cv.systems || []).join(", "));

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`<pre style="font-family: monospace; white-space: pre-wrap;">${textLines.join("\n")}</pre>`);
      win.document.close();
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handlePrint}
        className="px-3 py-1 bg-[#0080ff] text-white font-semibold rounded-none hover:bg-[#0099ff] transition-all border border-[#0080ff] tracking-wider uppercase text-xs sm:text-sm shadow-md shadow-[#0080ff]/20"
      >
        PRINT
      </button>
      <button
        onClick={handleAtsExport}
        className="px-3 py-1 bg-neutral-800 text-neutral-100 font-medium rounded-none hover:bg-neutral-700 transition-all border border-neutral-700 tracking-wider uppercase text-xs sm:text-sm"
      >
        ATS Export
      </button>
    </div>
  );
}
