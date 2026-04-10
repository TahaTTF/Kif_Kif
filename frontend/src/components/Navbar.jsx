function Navbar({ setPage, page }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="nav-logo-dot"></span>
        Kif Kif
      </div>

      <div className="nav-links">
        <button
          className={page === "home" ? "nav-link active" : "nav-link"}
          onClick={() => setPage("home")}
        >
          Accueil
        </button>

        <button
          className={page === "video" ? "nav-link active" : "nav-link"}
          onClick={() => setPage("video")}
        >
          🎧 Vidéo→Texte
        </button>

        <button
          className={page === "pdf" ? "nav-link active" : "nav-link"}
          onClick={() => setPage("pdf")}
        >
          👁️ PDF→Audio
        </button>

        <button
          className={page === "sign" ? "nav-link active" : "nav-link"}
          onClick={() => setPage("sign")}
        >
          🤟 Signe→Texte
        </button>

        <button
          className={page === "exercises" ? "nav-link active" : "nav-link"}
          onClick={() => setPage("exercises")}
        >
          📚 Exercices
        </button>
      </div>

      <button className="nav-cta">Commencer</button>
    </nav>
  );
}

export default Navbar;