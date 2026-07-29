import React, { useState } from 'react';
import { 
  Headphones, Play, Pause, Volume2, Video, Search, Calendar, 
  BookOpen, Lightbulb, Award, Share2, Quote, MessageSquare, PlusCircle 
} from 'lucide-react';
import { sermonSeries, sermonLibrary, testimonies } from '../data/churchData';

export default function SermonModule({ onPlayAudio, onWatchYoutube, onShareStory }) {
  const [currentPlayingId, setCurrentPlayingId] = useState('sermon-1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const activeSermon = sermonLibrary.find(s => s.id === currentPlayingId) || sermonLibrary[0];

  const handleTogglePlay = (sermon) => {
    if (currentPlayingId === sermon.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPlayingId(sermon.id);
      setIsPlaying(true);
    }
    if (onPlayAudio) {
      onPlayAudio(sermon);
    }
  };

  const filteredSermons = sermonLibrary.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.speaker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="sermones">
      {/* Sermons Hero Banner (Dark Theme like Image 2) */}
      <section className="sermons-hero-banner">
        <div className="sermons-hero-container">
          <div className="sermons-hero-graphic">
            <div style={{ padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(184, 142, 76, 0.2)', border: '2px solid var(--primary-gold)' }}>
              <Headphones size={42} color="var(--primary-gold)" />
            </div>
          </div>
          
          <h1 className="sermons-hero-title">
            EXPLORA LA PALABRA DE DIOS A TRAVÉS DEL SONIDO Y VÍDEO
          </h1>
          <p className="sermons-hero-sub">
            UNA NUEVA EXPERIENCIA DE SERMONES EN AUDIO Y VÍDEO EN VIVO
          </p>

          {/* Featured Sermon Series Grid (Image 2 style) */}
          <div className="featured-series-grid">
            {sermonSeries.map(series => (
              <div key={series.id} className="series-card">
                <div className="series-card-icon">
                  {series.iconName === 'BookOpen' && <BookOpen size={24} />}
                  {series.iconName === 'Lightbulb' && <Lightbulb size={24} />}
                  {series.iconName === 'Award' && <Award size={24} />}
                </div>
                <h3 className="series-card-title">{series.title}</h3>
                <p className="series-card-desc">{series.subtitle}</p>
                <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--primary-gold)', fontWeight: '600' }}>
                  {series.totalSermons} Predicaciones
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio & Video Player Bar Section (Image 2 style) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="section-container">
          <div className="player-bar-container">
            <div className="player-header">
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary-gold)', fontWeight: '700', letterSpacing: '0.1em' }}>
                  Reproductor de Audio y Vídeo de Sermones:
                </span>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--bg-dark)', marginTop: '4px' }}>
                  {activeSermon.title}
                </h3>
              </div>

              {/* YouTube Video Watch Button */}
              <button 
                onClick={() => onWatchYoutube(activeSermon.youtubeId, activeSermon.title)} 
                className="btn-watch-video"
              >
                <Video size={16} /> Ver Vídeo en YouTube
              </button>
            </div>

            <div className="player-now-playing">
              <button 
                onClick={() => handleTogglePlay(activeSermon)} 
                className="btn-play-large"
                title={isPlaying ? "Pausar" : "Escuchar en Audio"}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
              </button>

              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  <span>Predicador: <strong>{activeSermon.speaker}</strong></span>
                  <span>Fecha: {activeSermon.date} | Duración: {activeSermon.duration}</span>
                </div>

                {/* Progress Bar Simulation */}
                <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--border-light)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: isPlaying ? '45%' : '0%', height: '100%', backgroundColor: 'var(--bg-dark)', transition: 'width 0.4s ease' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sermon Library List (Image 2 style) */}
          <div>
            <div className="section-header-row" style={{ marginBottom: '24px' }}>
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>UNA LIBRERÍA DE SERMONES</h2>
              <div className="filter-search-box">
                <Search size={18} color="var(--text-muted)" />
                <input 
                  type="text" 
                  placeholder="Buscar prédica por tema o predicador..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="sermon-list">
              {filteredSermons.map(sermon => (
                <div key={sermon.id} className="sermon-row-item">
                  <div className="sermon-info">
                    <button 
                      onClick={() => handleTogglePlay(sermon)} 
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        backgroundColor: currentPlayingId === sermon.id && isPlaying ? 'var(--primary-gold)' : 'var(--bg-dark)', 
                        color: '#FFFFFF', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      {currentPlayingId === sermon.id && isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                    </button>
                    <div>
                      <div className="sermon-title-text">{sermon.title}</div>
                      <div className="sermon-sub-text">{sermon.speaker} • {sermon.series}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{sermon.date}</span>
                    <button 
                      onClick={() => onWatchYoutube(sermon.youtubeId, sermon.title)} 
                      style={{ fontSize: '0.8rem', color: '#E11D48', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Video size={16} /> Ver Vídeo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Faith Testimonies Section (Image 2 style) */}
      <section className="testimonies-section" id="testimonios">
        <div className="section-container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px auto' }}>
            <h2 className="section-title" style={{ fontSize: '1.8rem' }}>TESTIMONIOS DE FE</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              HISTORIAS REALES, FE PROFUNDA. EXPERIMENTA EL PODER DE LA GRACIA DE DIOS EN LAS VIDAS DE NUESTRA COMUNIDAD.
            </p>
          </div>

          <div className="testimonies-grid">
            {testimonies.map(t => (
              <div key={t.id} className="testimony-card">
                <div>
                  {/* YouTube Video Thumbnail Preview */}
                  <div 
                    className="testimony-video-preview" 
                    onClick={() => onWatchYoutube(t.youtubeId, `Testimonio de ${t.author}`)}
                    style={{ marginBottom: '16px' }}
                  >
                    <img src={t.thumbnail} alt={t.author} />
                    <div className="video-play-overlay">
                      <div className="play-circle-icon">
                        <Play size={24} fill="#FF0000" />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-gold)', marginBottom: '8px' }}>
                    <Quote size={16} />
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase' }}>{t.tag}</span>
                  </div>
                  <p className="testimony-quote">"{t.story}"</p>
                </div>
                <div className="testimony-author">- {t.author}</div>
              </div>
            ))}

            {/* Share Your Story Action Box */}
            <div className="testimony-card" style={{ backgroundColor: 'var(--bg-dark)', color: '#FFFFFF', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
              <MessageSquare size={40} color="var(--primary-gold)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '8px' }}>¿TIENES UN TESTIMONIO?</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-muted)', marginBottom: '24px' }}>
                Comparte lo que Dios ha hecho en tu vida para edificar y alentar a la congregación.
              </p>
              <button 
                onClick={onShareStory} 
                className="btn-primary-gold" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <PlusCircle size={18} /> COMPARTIR MI HISTORIA
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
