import React, { useState } from 'react';
import { Compass, ArrowRight, CheckCircle2, Edit3, X, Save } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function HeroSection({ onExploreResources, onStartStudy }) {
  const { heroData, updateHero, isAdminLoggedIn } = useSite();
  const [isEditingHero, setIsEditingHero] = useState(false);

  const [editForm, setEditForm] = useState({
    title: heroData.title,
    subtitle: heroData.subtitle,
    imageUrl: heroData.imageUrl,
    badge: heroData.badge
  });

  const handleSaveHero = (e) => {
    e.preventDefault();
    updateHero(editForm);
    setIsEditingHero(false);
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Hero Text Content */}
        <div className="hero-content">
          <div className="hero-tag">
            <Compass size={16} /> {heroData.badge}
          </div>
          
          <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
            {heroData.title}
          </h1>
          
          <p className="hero-description">
            {heroData.subtitle}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button onClick={onExploreResources} className="btn-primary-gold">
              EXPLORAR RECURSOS <ArrowRight size={18} />
            </button>
            
            <button 
              onClick={onStartStudy} 
              className="btn-primary-gold" 
              style={{ backgroundColor: 'transparent', color: '#1C2530', border: '2px solid #1C2530', boxShadow: 'none' }}
            >
              INICIAR UN ESTUDIO
            </button>

            {isAdminLoggedIn && (
              <button 
                onClick={() => setIsEditingHero(true)}
                className="btn-card-gold"
                style={{ backgroundColor: '#2563EB', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Edit3 size={16} /> Editar Banner Principal
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: '#6E6A63', fontWeight: '500' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#B88E4C" /> 100% Gratuito
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#B88E4C" /> Vídeos de YouTube integrados
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#B88E4C" /> Cuestionarios interactivos
            </div>
          </div>
        </div>

        {/* Right Visual Image Card */}
        <div className="hero-visual">
          <div className="hero-img-card">
            <img 
              src={heroData.imageUrl} 
              alt="Biblia Abierta y Guías de Estudio Jesús El Buen Pastor" 
            />
          </div>
        </div>
      </div>

      {/* Hero Edit Modal */}
      {isEditingHero && (
        <div className="modal-overlay" onClick={() => setIsEditingHero(false)}>
          <div className="modal-content-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 size={22} color="var(--primary-gold)" />
                <h3 className="modal-title">Editar Banner Principal</h3>
              </div>
              <button onClick={() => setIsEditingHero(false)} className="btn-close-modal">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSaveHero} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Título Principal</label>
                  <textarea 
                    rows={2}
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Subtítulo o Descripción</label>
                  <textarea 
                    rows={3}
                    value={editForm.subtitle}
                    onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>URL de la Imagen de Portada</label>
                  <input 
                    type="url"
                    value={editForm.imageUrl}
                    onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', padding: '12px' }}>
                  <Save size={18} /> Guardar Cambios del Banner
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
