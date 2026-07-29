import React, { useState } from 'react';
import { X, Video, Play } from 'lucide-react';

export default function CustomYoutubeLoaderModal({ isOpen, onClose, onPlayVideo }) {
  const [youtubeInput, setYoutubeInput] = useState('');
  const [titleInput, setTitleInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!youtubeInput) return;
    onPlayVideo(youtubeInput, titleInput || "Vídeo de YouTube Personalizado");
    setYoutubeInput('');
    setTitleInput('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Video size={26} color="#FF0000" />
            <h3 className="modal-title">Reproducir Cualquier Vídeo de YouTube</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Pega la dirección de un vídeo de YouTube (o su ID) de tus prédicas o alabanzas favoritas para reproducirlo inmediatamente en la página web:
            </p>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>
                Enlace o ID del Vídeo de YouTube
              </label>
              <input 
                type="text" 
                required 
                placeholder="Ej: https://www.youtube.com/watch?v=CkW2j1yvYUI" 
                value={youtubeInput}
                onChange={(e) => setYoutubeInput(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>
                Título del Vídeo (Opcional)
              </label>
              <input 
                type="text" 
                placeholder="Ej: Predicación de Domingo - Jesús El Buen Pastor" 
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
              />
            </div>

            <button type="submit" className="btn-watch-video" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.9rem' }}>
              <Play size={18} fill="#FFFFFF" /> Reproducir Vídeo en la Página Web
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
