import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home({ setPage }) {
  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-inner">

          <div className="badge">
            ✦ Plateforme d’apprentissage inclusif
          </div>

          <h1>
            L’éducation <br />
            <span>sans barrières,</span> <br />
            pour tous.
          </h1>

          <p>
            Kif Kif transforme les cours en expériences accessibles —
            transcription en temps réel, audio intelligent, et langue des signes.
          </p>

          <div className="buttons">
            <button
              className="btn-primary"
              onClick={() => setPage("video")}
            >
              Découvrir les services
            </button>

            <button className="btn-secondary">
              Voir une démo
            </button>
          </div>

          {/* STATS */}
          <div className="stats">
            <div>
              <h2>3</h2>
              <p>Modes d’accessibilité</p>
            </div>

            <div>
              <h2>500+</h2>
              <p>Étudiants actifs</p>
            </div>

            <div>
              <h2>98%</h2>
              <p>Satisfaction utilisateur</p>
            </div>

            <div>
              <h2>WCAG AA</h2>
              <p>Conformité accessibilité</p>
            </div>
          </div>

        </div>
      </div>

      {/* 🔥 SERVICES SECTION */}
      <Services setPage={setPage} />
      <HowItWorks />
      <Testimonials />
      <CTA setPage={setPage} />
      <Footer />
    </>
  );
}

export default Home;