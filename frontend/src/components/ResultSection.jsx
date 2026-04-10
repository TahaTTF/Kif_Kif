import { useState } from "react";
import { jsPDF } from "jspdf";

function ResultSection({ result }) {
  const [fontSize, setFontSize] = useState("16px");
  const [theme, setTheme] = useState("standard");

  if (!result) return null;

  // ✅ FORMAT SUMMARY
  const summaryText = result.summary || "Résumé indisponible";

  // ✅ TRANSFORM TO LINES
  const summaryLines =
    typeof summaryText === "string"
      ? summaryText.split("\n").filter((line) => line.trim() !== "")
      : [];

  // 📋 COPY
  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    alert("Résumé copié !");
  };

  // 📄 TXT
  const downloadTXT = () => {
    const blob = new Blob([summaryText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.txt";
    a.click();
  };

  // 📄 PDF (simple)

const downloadPDF = () => {
  const doc = new jsPDF();

  const text = summaryText || "Résumé indisponible";

  // split texte pour éviter overflow
  const lines = doc.splitTextToSize(text, 180);

  doc.text(lines, 10, 10);

  doc.save("resume.pdf");
};

  return (
    <div className="result-container">

      {/* LEFT */}
      <div className="card">

        <div className="card-header">
          <span className="title-green">📝 Transcription en direct</span>
          <span className="status">● En cours</span>
        </div>

        <div className={`card-body ${theme}`} style={{ fontSize }}>
          {result.transcription}
        </div>

        <div className="controls">
          <div>
            <label>TAILLE :</label>
            <select onChange={(e) => setFontSize(e.target.value)}>
              <option value="14px">Petite</option>
              <option value="16px">Normale</option>
              <option value="20px">Grande</option>
            </select>
          </div>

          <div>
            <label>COULEUR :</label>
            <select onChange={(e) => setTheme(e.target.value)}>
              <option value="standard">Standard</option>
              <option value="dark">Fond sombre</option>
              <option value="sepia">Sépia</option>
            </select>
          </div>
        </div>

      </div>

      {/* RIGHT */}
      <div className="card">

        <div className="card-header">
          <span className="title-green">✨ Résumé automatique</span>
          <span className="badge">IA</span>
        </div>

        <div className="card-body">

          {summaryLines.length > 0 ? (
            summaryLines.map((line, i) => (
              <div key={i} className="summary-item">
                <div className="circle">{i + 1}</div>
                <p>{line}</p>
              </div>
            ))
          ) : (
            <p className="warning">⚠ Résumé indisponible</p>
          )}

        </div>

        <div className="actions">
          <button className="btn-primary" onClick={downloadPDF}>
            ⬇ Télécharger PDF
          </button>

          <button onClick={downloadTXT}>
            ⬇ Télécharger TXT
          </button>

          <button onClick={handleCopy}>
            📋 Copier
          </button>
        </div>

      </div>

    </div>
  );
}

export default ResultSection;