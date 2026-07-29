import React, { useState } from 'react';
import { X, ShieldCheck, PlusCircle, Video, BookOpen, LogOut, CheckCircle2, Play, Edit3, Trash2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function AdminPanelModal({ isOpen, onClose, onLogout, onTestYoutube }) {
  const { addSermon, addStudy, isAdminLoggedIn } = useSite();
  const [activeTab, setActiveTab] = useState('nuevo-sermon');
  
  // New Sermon Form State
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('Evangelista Marcos González');
  const [series, setSeries] = useState('Serie Predicaciones de Fe');
  const [youtubeInput, setYoutubeInput] = useState('');
  const [summary, setSummary] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Private YouTube tester state inside admin panel
  const [privateYoutubeUrl, setPrivateYoutubeUrl] = useState('');

  if (!isOpen) return null;

  const handleAddSermonSubmit = (e) => {
    e.preventDefault();
    if (!title || !youtubeInput) return;

    let cleanId = youtubeInput;
    if (youtubeInput.includes('v=')) {
      cleanId = youtubeInput.split('v=')[1].split('&')[0];
    } else if (youtubeInput.includes('youtu.be/')) {
      cleanId = youtubeInput.split('youtu.be/')[1].split('?')[0];
    }

    const newSermon = {
      id: `sermon-${Date.now()}`,
      title,
      speaker,
      series,
      date: "Hoy",
      duration: "40 min",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      youtubeId: cleanId,
      summary: summary || "Nueva predicación de evangelización."
    };

    addSermon(newSermon);
    setSuccessMessage(`¡El sermón "${title}" ha sido publicado oficialmente en la web!`);
    setTitle('');
    setYoutubeInput('');
    setSummary('');

    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleTestPrivateYoutube = (e) => {
    e.preventDefault();
    if (!privateYoutubeUrl) return;
    onTestYoutube(privateYoutubeUrl, "Vista Previa de Administración");
    setPrivateYoutubeUrl('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" style={{ maxWidth: '850px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ backgroundColor: 'var(--bg-dark)', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Edit3 size={26} color="var(--primary-gold)" />
            <div>
              <h3 className="modal-title" style={{ color: '#FFFFFF' }}>Panel de Edición y Gestión Evangelística</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-gold)' }}>Sesión Activa - Modo Editor de Contenidos</span>
            </div>
          </div>
          <button onClick={onClose} className="btn-close-modal" style={{ backgroundColor: 'var(--bg-dark-card)', color: '#FFFFFF', border: '1px solid var(--border-dark)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Admin Navigation Sub-bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', backgroundColor: '#FAF7F2', padding: '0 24px' }}>
          <div style={{ display: 'flex' }}>
            <button 
              onClick={() => setActiveTab('nuevo-sermon')}
              style={{ 
                padding: '14px 20px', 
                fontSize: '0.88rem', 
                fontWeight: '700', 
                borderBottom: activeTab === 'nuevo-sermon' ? '3px solid var(--primary-gold)' : 'none',
                color: activeTab === 'nuevo-sermon' ? 'var(--primary-gold)' : 'var(--text-muted)'
              }}
            >
              <PlusCircle size={16} style={{ display: 'inline', marginRight: '6px' }} /> Publicar Nuevo Sermón
            </button>
            <button 
              onClick={() => setActiveTab('probador-youtube')}
              style={{ 
                padding: '14px 20px', 
                fontSize: '0.88rem', 
                fontWeight: '700', 
                borderBottom: activeTab === 'probador-youtube' ? '3px solid var(--primary-gold)' : 'none',
                color: activeTab === 'probador-youtube' ? 'var(--primary-gold)' : 'var(--text-muted)'
              }}
            >
              <Video size={16} style={{ display: 'inline', marginRight: '6px' }} /> Previsualizar Vídeo de YouTube
            </button>
          </div>

          <button 
            onClick={() => { onLogout(); onClose(); }}
            style={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LogOut size={16} /> Salir del Modo Editor
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {activeTab === 'nuevo-sermon' ? (
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '16px', color: 'var(--bg-dark)' }}>
                Añadir Prédica o Mensaje a la Plataforma
              </h4>

              {successMessage && (
                <div style={{ padding: '12px 16px', backgroundColor: '#ECFDF5', border: '1px solid #10B981', color: '#065F46', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} /> {successMessage}
                </div>
              )}

              <form onSubmit={handleAddSermonSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Título del Mensaje</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ej: La Fe que Mueve Montañas" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Predicador / Autor</label>
                    <input 
                      type="text" 
                      required 
                      value={speaker}
                      onChange={(e) => setSpeaker(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Serie o Tema</label>
                    <input 
                      type="text"
                      value={series}
                      onChange={(e) => setSeries(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Enlace o ID del Vídeo en YouTube</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ej: https://www.youtube.com/watch?v=b3Wj-E1h5yU" 
                      value={youtubeInput}
                      onChange={(e) => setYoutubeInput(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Resumen del Mensaje</label>
                  <textarea 
                    rows={3} 
                    placeholder="Breve resumen del contenido para los visitantes..." 
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
                  />
                </div>

                <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', padding: '12px' }}>
                  <PlusCircle size={18} /> Publicar Mensaje en Vivo
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '12px', color: 'var(--bg-dark)' }}>
                Previsualizador de Vídeos de YouTube
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Pega cualquier enlace de YouTube para comprobar cómo se visualizará en la plataforma antes de agregarlo.
              </p>

              <form onSubmit={handleTestPrivateYoutube} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Enlace de YouTube</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Pega aquí el enlace de YouTube..." 
                    value={privateYoutubeUrl}
                    onChange={(e) => setPrivateYoutubeUrl(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <button type="submit" className="btn-watch-video" style={{ justifyContent: 'center', padding: '12px', fontSize: '0.9rem' }}>
                  <Play size={18} fill="#FFFFFF" /> Previsualizar en la Web
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
