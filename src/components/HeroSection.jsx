import React from 'react';
import { BookOpen, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ onExploreResources, onStartStudy }) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Hero Text Content */}
        <div className="hero-content">
          <div className="hero-tag">
            <Compass size={16} /> Creciendo juntos en la Palabra
          </div>
          
          <h1 className="hero-title">
            PROFUNDIZA<br />TU FE
          </h1>
          
          <p className="hero-description">
            Explora materiales descargables, guías de devoción diaria y estudios bíblicos interactivos diseñados para transformar tu vida espiritual.
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

        {/* Right Visual Image Card (Bible open with notebook & smartphone) */}
        <div className="hero-visual">
          <div className="hero-img-card">
            <img 
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" 
              alt="Biblia Abierta y Guías de Estudio Jesús El Buen Pastor" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
