import React, { useState } from 'react';
import { PlayCircle, Mic, Video, Volume2, Share2, PlusCircle, Sparkles, MessageSquare, Quote, Heart, Edit3, Trash2, Save, X } from 'lucide-react';
import { sermonSeries } from '../data/churchData';
import { useSite } from '../context/SiteContext';

export default function SermonModule({ onWatchYoutube, onShareStory }) {
  const { sermonsList, updateSermon, deleteSermon, testimoniesList, deleteTestimony, isAdminLoggedIn } = useSite();
  const [selectedSeries, setSelectedSeries] = useState('Todas');
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState(null);
  const [editingSermon, setEditingSermon] = useState(null);

  const [editForm, setEditForm] = useState({
    title: '',
    speaker: '',
    series: '',
    youtubeId: '',
    summary: ''
  });

  const filteredSermons = sermonsList.filter(sermon => 
    selectedSeries === 'Todas' || sermon.series === selectedSeries
  );

  const handlePlayAudio = (sermon) => {
    if (currentlyPlayingAudio?.id === sermon.id) {
      setCurrentlyPlayingAudio(null);
    } else {
      setCurrentlyPlayingAudio(sermon);
    }
  };

  const handleStartEditSermon = (sermon) => {
    setEditingSermon(sermon);
    setEditForm({
      title: sermon.title,
      speaker: sermon.speaker,
      series: sermon.series,
      youtubeId: sermon.youtubeId,
      summary: sermon.summary
    });
  };

  const handleSaveSermon = (e) => {
    e.preventDefault();
    if (!editingSermon) return;
    updateSermon(editingSermon.id, editForm);
    setEditingSermon(null);
  };

  return (
    <section className="section-padding" id="sermones" style={{ backgroundColor: 'var(--bg-dark-section)', color: '#FFFFFF' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header-row">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-gold)', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
              <Video size={16} /> Predicación y Alabanza
            </div>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>SERMONES Y MENSAJES EN VÍDEO</h2>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginTop: '4px' }}>
              Escucha mensajes transformadores en vídeo o audio para fortalecer tu fe en Cristo.
            </p>
          </div>
        </div>

        {/* Sermon Series Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {sermonSeries.map(series => (
            <div key={series.id} className="sermon-series-card">
              <img src={series.thumbnail} alt={series.title} />
              <div className="sermon-series-overlay">
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary-gold)', fontWeight: '700' }}>
                  {series.sermonCount}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: '#FFFFFF', margin: '4px 0' }}>
                  {series.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>{series.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Audio / Video Active Player Bar */}
        {currentlyPlayingAudio && (
          <div className="audio-player-bar" style={{ marginBottom: '40px', backgroundColor: 'var(--bg-dark-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--primary-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Volume2 size={24} color="#FFFFFF" />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-gold)', fontWeight: '700', textTransform: 'uppercase' }}>Reproduciendo Audio</span>
                <h4 style={{ color: '#FFFFFF', fontSize: '1rem', margin: 0 }}>{currentlyPlayingAudio.title}</h4>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{currentlyPlayingAudio.speaker}</span>
              </div>
            </div>

            <audio controls autoPlay src={currentlyPlayingAudio.audioUrl} style={{ maxWidth: '320px', height: '40px' }} />
          </div>
        )}

        {/* Sermons Library List */}
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '20px' }}>
          LIBRERÍA DE MENSAJES RECIENTES
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '60px' }}>
          {filteredSermons.map(sermon => (
            <div 
              key={sermon.id} 
              style={{ 
                backgroundColor: 'var(--bg-dark-card)', 
                borderRadius: 'var(--radius-md)', 
                padding: '20px', 
                border: '1px solid var(--border-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                position: 'relative'
              }}
            >
              {isAdminLoggedIn && (
                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                  <button 
                    onClick={() => handleStartEditSermon(sermon)}
                    style={{ backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    title="Editar Sermón"
                  >
                    <Edit3 size={14} />
                  </button>

                  <button 
                    onClick={() => deleteSermon(sermon.id)}
                    style={{ backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    title="Eliminar Sermón"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              <div style={{ maxWidth: '600px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-gold)', fontWeight: '700', textTransform: 'uppercase' }}>
                  {sermon.series} • {sermon.date}
                </span>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', margin: '4px 0 6px 0' }}>{sermon.title}</h4>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '8px' }}>{sermon.summary}</p>
                <div style={{ fontSize: '0.8rem', color: '#CBD5E1', fontWeight: '600' }}>{sermon.speaker}</div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => onWatchYoutube(sermon.youtubeId, sermon.title)}
                  className="btn-watch-video"
                >
                  <Video size={16} /> Ver Vídeo en YouTube
                </button>

                <button 
                  onClick={() => handlePlayAudio(sermon)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    backgroundColor: currentlyPlayingAudio?.id === sermon.id ? 'var(--primary-gold)' : 'transparent',
                    color: currentlyPlayingAudio?.id === sermon.id ? '#FFFFFF' : '#94A3B8',
                    border: '1px solid var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Mic size={16} /> {currentlyPlayingAudio?.id === sermon.id ? 'Pausar Audio' : 'Escuchar Audio'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonies Section */}
        <div id="testimonios" style={{ paddingTop: '20px' }}>
          <div className="section-header-row">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-gold)', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                <Quote size={16} /> Historias de Transformación
              </div>
              <h2 className="section-title" style={{ color: '#FFFFFF' }}>TESTIMONIOS DE FE</h2>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginTop: '4px' }}>
                Descubre cómo Dios sigue haciendo milagros y transformando vidas hoy.
              </p>
            </div>

            <button onClick={onShareStory} className="btn-primary-gold" style={{ fontSize: '0.85rem', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlusCircle size={18} /> Compartir mi Historia
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {testimoniesList.map(item => (
              <div key={item.id} className="testimony-card" style={{ position: 'relative' }}>
                {isAdminLoggedIn && (
                  <button 
                    onClick={() => deleteTestimony(item.id)}
                    style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
                    title="Eliminar Testimonio"
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <img src={item.avatar} alt={item.author} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '0.95rem' }}>{item.author}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--primary-gold)' }}>{item.location} • {item.date}</div>
                  </div>
                </div>

                <p style={{ color: '#CBD5E1', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
                  "{item.content}"
                </p>

                {item.youtubeId && (
                  <button 
                    onClick={() => onWatchYoutube(item.youtubeId, `Testimonio de ${item.author}`)}
                    className="btn-watch-video" 
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
                  >
                    <PlayCircle size={16} /> Ver Vídeo Testimonio
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Sermon Modal */}
      {editingSermon && (
        <div className="modal-overlay" onClick={() => setEditingSermon(null)}>
          <div className="modal-content-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 size={20} color="var(--primary-gold)" />
                <h3 className="modal-title">Editar Sermón / Prédica</h3>
              </div>
              <button onClick={() => setEditingSermon(null)} className="btn-close-modal">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSaveSermon} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Título del Mensaje</label>
                  <input 
                    type="text"
                    required
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Predicador</label>
                    <input 
                      type="text"
                      required
                      value={editForm.speaker}
                      onChange={(e) => setEditForm({ ...editForm, speaker: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>ID / Enlace de YouTube</label>
                    <input 
                      type="text"
                      required
                      value={editForm.youtubeId}
                      onChange={(e) => setEditForm({ ...editForm, youtubeId: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Resumen</label>
                  <textarea 
                    rows={3}
                    value={editForm.summary}
                    onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
                  />
                </div>

                <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', padding: '12px' }}>
                  <Save size={18} /> Guardar Cambios del Sermón
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
