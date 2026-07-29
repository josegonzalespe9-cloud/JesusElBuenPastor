import React, { useState } from 'react';
import { Newspaper, Globe, MapPin, Calendar, ArrowRight, ExternalLink, Download, FileText, PlusCircle, X, CheckCircle2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function NewsSection({ onOpenAddNewsModal }) {
  const { newsList, isAdminLoggedIn } = useSite();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [activeArticleModal, setActiveArticleModal] = useState(null);

  const categories = ['Todas', 'Locales', 'Mundiales', 'Eventos'];

  const filteredNews = newsList.filter(item => 
    selectedCategory === 'Todas' || item.category === selectedCategory
  );

  return (
    <section className="section-padding" id="noticias" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-light)' }}>
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-row">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-gold)', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
              <Newspaper size={16} /> Actualidad e Impacto del Reino
            </div>
            <h2 className="section-title">NOTICIAS CRISTIANAS LOCALES Y MUNDIALES</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
              Entérate de los acontecimientos de nuestra iglesia local y los avances del Evangelio en el mundo.
            </p>
          </div>

          {/* Admin Add News Action Button */}
          {isAdminLoggedIn && (
            <button 
              onClick={onOpenAddNewsModal}
              className="btn-primary-gold" 
              style={{ fontSize: '0.85rem', padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <PlusCircle size={18} /> Publicar Nueva Noticia
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: '600',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--primary-gold)' : 'var(--border-light)',
                backgroundColor: selectedCategory === cat ? 'var(--primary-gold)' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              {cat === 'Locales' && <MapPin size={14} style={{ display: 'inline', marginRight: '6px' }} />}
              {cat === 'Mundiales' && <Globe size={14} style={{ display: 'inline', marginRight: '6px' }} />}
              {cat}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="studies-grid">
          {filteredNews.map(item => (
            <div key={item.id} className="study-card">
              <div className="study-card-image" style={{ height: '180px' }}>
                <img src={item.imageUrl} alt={item.title} />
                <span className="study-tag" style={{ backgroundColor: item.category === 'Mundiales' ? 'var(--primary-gold)' : 'var(--bg-dark)' }}>
                  {item.category}
                </span>
              </div>
              <div className="study-card-content">
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Calendar size={14} color="var(--primary-gold)" /> {item.date}
                </div>
                <h3 className="study-card-title">{item.title}</h3>
                <p className="study-card-desc">{item.summary}</p>

                <button 
                  onClick={() => setActiveArticleModal(item)}
                  className="btn-card-gold" 
                  style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: 'auto' }}
                >
                  Leer Noticia Completa <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticleModal && (
        <div className="modal-overlay" onClick={() => setActiveArticleModal(null)}>
          <div className="modal-content-container" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary-gold)', fontWeight: '700' }}>
                  Noticia {activeArticleModal.category} • {activeArticleModal.date}
                </span>
                <h3 className="modal-title">{activeArticleModal.title}</h3>
              </div>
              <button onClick={() => setActiveArticleModal(null)} className="btn-close-modal">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ height: '240px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px' }}>
                <img src={activeArticleModal.imageUrl} alt={activeArticleModal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--text-dark)', lineHeight: '1.7', marginBottom: '24px' }}>
                {activeArticleModal.content}
              </p>

              {activeArticleModal.googleDriveUrl && (
                <div style={{ padding: '16px', backgroundColor: 'var(--primary-gold-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={22} color="var(--primary-gold)" />
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Documento adjunto en Google Drive / PDF</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Haz clic para descargar o abrir el archivo oficial</div>
                    </div>
                  </div>

                  <a 
                    href={activeArticleModal.googleDriveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary-gold"
                    style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                  >
                    <Download size={16} /> Abrir en Google Drive
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
