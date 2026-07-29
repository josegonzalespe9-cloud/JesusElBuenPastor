import React from 'react';
import { X, Video, Share2 } from 'lucide-react';

export default function YouTubeModal({ video, onClose }) {
  if (!video) return null;

  const getCleanYoutubeId = (input) => {
    if (!input) return 'VbYQWnQkMQA';
    if (input.includes('v=')) {
      return input.split('v=')[1].split('&')[0];
    }
    if (input.includes('youtu.be/')) {
      return input.split('youtu.be/')[1].split('?')[0];
    }
    return input;
  };

  const youtubeId = getCleanYoutubeId(video.youtubeId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Video size={24} color="#FF0000" />
            <h3 className="modal-title">{video.title || "Predicación en Vídeo - Jesús El Buen Pastor"}</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="youtube-responsive-wrapper">
            <iframe 
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`} 
              title={video.title || "YouTube Video"} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Mirando la transmisión oficial de <strong>Jesús El Buen Pastor</strong> en YouTube.
              </p>
            </div>

            <a 
              href={`https://www.youtube.com/watch?v=${youtubeId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-watch-video"
            >
              Abrir directamente en YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
