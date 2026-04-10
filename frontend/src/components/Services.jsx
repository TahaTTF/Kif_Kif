function Services({ setPage }) {
  return (
    <section className="services">
      <p className="services-subtitle">NOS SERVICES</p>

      <h2 className="services-title">
        Trois outils,
        <br />
        une seule mission : l'accès
      </h2>

      <p className="services-desc">
        Chaque outil est conçu pour un profil d'utilisateur spécifique, avec une
        interface adaptée et des fonctions pensées pour l'autonomie.
      </p>

      <div className="cards">
        <div className="card card-green" onClick={() => setPage("video")}>
          <div className="icon">🎧</div>
          <h3>Vidéo → Texte</h3>
          <p>
            Les cours vidéo du professeur sont transcrits en temps réel.
            Suivez chaque mot prononcé avec synchronisation parfaite, résumé
            automatique et export PDF.
          </p>
          <span>Accéder au service →</span>
        </div>

        <div className="card card-blue" onClick={() => setPage("pdf")}>
          <div className="icon">👁️</div>
          <h3>PDF → Audio</h3>
          <p>
            Déposez un document de cours complexe. Notre lecteur audio naturel
            le transforme en narration fluide avec surbrillance du texte et
            choix de voix.
          </p>
          <span>Accéder au service →</span>
        </div>

        <div className="card card-yellow" onClick={() => setPage("sign")}>
          <div className="icon">🤟</div>
          <h3>Langue des Signes → Texte</h3>
          <p>
            Activez votre caméra et communiquez en LSF ou LST. Vos gestes sont
            traduits instantanément en texte pour répondre aux exercices ou
            dialoguer.
          </p>
          <span>Accéder au service →</span>
        </div>
      </div>
    </section>
  );
}

export default Services;