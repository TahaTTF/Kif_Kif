function CTA({ setPage }) {
  return (
    <section className="cta-section">

      <h2>Quel service vous correspond ?</h2>

      <p>
        Choisissez votre profil pour commencer directement avec l’outil adapté à vos besoins.
      </p>

      <div className="cta-cards">

        <div
          className="cta-card"
          onClick={() => setPage("video")}
        >
          <div className="icon">🎧</div>
          <p>Je suis sourde<br />ou malentendante</p>
        </div>

        <div
          className="cta-card"
          onClick={() => setPage("pdf")}
        >
          <div className="icon">👁️</div>
          <p>J'ai une déficience<br />visuelle</p>
        </div>

        <div
          className="cta-card"
          onClick={() => setPage("sign")}
        >
          <div className="icon">🤟</div>
          <p>Je communique<br />en langue des signes</p>
        </div>

      </div>
    </section>
  );
}

export default CTA;