import { useState } from "react";
import Home from "./components/Home";
import VideoPage from "./components/VideoPage";
import Navbar from "./components/Navbar";
import PdfPage from "./components/PdfPage";
import SignPage from "./components/SignPage";
import ExercisesPage from "./components/Exercises";
function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Navbar setPage={setPage} page={page} />

      <div className={`page ${page === "home" ? "active" : ""}`}>
        <Home setPage={setPage} />
      </div>

      <div className={`page ${page === "video" ? "active" : ""}`}>
        <VideoPage />
      </div>

      <div className={`page ${page === "pdf" ? "active" : ""}`}>
        <PdfPage />
      </div>

      <div className={`page ${page === "sign" ? "active" : ""}`}>
        <SignPage />
      </div>

      <div className={`page ${page === "exercises" ? "active" : ""}`}>
        <ExercisesPage />
      </div>
    </>
  );
}

export default App;