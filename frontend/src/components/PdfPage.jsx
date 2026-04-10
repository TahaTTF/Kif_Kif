import { useState } from "react";
import PdfPlayerSection from "./PdfPlayerSection";

function PdfPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const callPdfApi = async (targetLang, selectedFile = file) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("target_lang", targetLang);

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/pdf-to-audio/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("PDF to audio error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    await callPdfApi("French");
  };

  return (
    <div className="pdf-page">
      <div className="pdf-header">
        <div className="icon-box">👁️</div>
        <div>
          <h1>PDF → Audio</h1>
          <p>Convertissez vos documents en audio avec surbrillance.</p>
        </div>
      </div>

      <div className="pdf-upload-wrapper">
        <div className="pdf-upload-box">
          <div className="pdf-icon">📄</div>
          <h3>Glissez votre PDF ici</h3>
          <p>Documents de cours, polycopiés, manuels — PDF, DOCX, TXT</p>

          <input
            id="pdfUpload"
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => {
              const selected = e.target.files[0];
              setFile(selected);
              setResult(null);
            }}
          />

          <div className="pdf-upload-actions">
            <label htmlFor="pdfUpload" className="pdf-upload-btn">
              Choisir un fichier
            </label>

            <button
              className="pdf-convert-btn"
              onClick={handleConvert}
              disabled={!file || loading}
              type="button"
            >
              {loading ? "Conversion..." : "Convertir"}
            </button>
          </div>

          {file && <p className="pdf-file-name">{file.name}</p>}
        </div>
      </div>

      {result && file && (
        <PdfPlayerSection
          result={result}
          file={file}
          loading={loading}
          onChangeLanguage={(lang) => callPdfApi(lang, file)}
        />
      )}
    </div>
  );
}

export default PdfPage;