import { useMemo } from "react";

function VideoPlayerSection({ file }) {
  const mediaUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  if (!file) return null;

  const isAudio = file.type.startsWith("audio/");
  const isVideo = file.type.startsWith("video/");

  return (
    <div className="video-player-card">
      <div className="player-header">
        <span>🎬 Lecteur intégré</span>
        <span className="sync-badge">Synchronisé avec la transcription</span>
      </div>

      <div className="video-box">
        {isVideo && (
          <video className="video" controls preload="metadata">
            <source src={mediaUrl} type={file.type} />
            Votre navigateur ne supporte pas cette vidéo.
          </video>
        )}

        {isAudio && (
          <div className="audio-wrapper">
            <div className="audio-placeholder">🎧</div>
            <p className="audio-label">{file.name}</p>
            <audio className="audio-player" controls preload="metadata">
              <source src={mediaUrl} type={file.type} />
              Votre navigateur ne supporte pas cet audio.
            </audio>
          </div>
        )}

        {!isAudio && !isVideo && (
          <div className="video-placeholder">
            <p>Type de fichier non pris en charge</p>
            <p>{file.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoPlayerSection;