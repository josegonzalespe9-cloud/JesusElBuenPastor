import React from 'react';
import { FileText, Download, UserCheck, HeartHandshake } from 'lucide-react';
import { downloadableResources, churchInfo } from '../data/churchData';

export default function FeaturedResources({ onSelectPdf }) {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FAF7F2', borderTop: '1px solid var(--border-light)' }}>
      <div className="section-container">
        <div className="two-col-layout">
          {/* Left Column: Featured Resources List */}
          <div className="featured-resources-box">
            <h2 className="section-title" style={{ fontSize: '1.3rem' }}>RECURSOS DESTACADOS</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Guías populares recientes disponibles para descargar e imprimir:
            </p>

            <div className="resources-list">
              {downloadableResources.map(resource => (
                <div 
                  key={resource.id} 
                  className="resource-item"
                  onClick={() => onSelectPdf(resource)}
                >
                  <div className="resource-item-icon">
                    <FileText size={22} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div className="resource-item-title">{resource.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {resource.format} • {resource.pages}
                    </div>
                  </div>
                  <Download size={18} color="var(--primary-gold)" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Pastor Welcome Box */}
          <div className="welcome-pastor-box" style={{ background: 'linear-gradient(135deg, #FFFFFF, #FAF5EB)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-gold)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
              <HeartHandshake size={18} /> Mensaje Pastoral
            </div>
            
            <div className="welcome-content">
              <img 
                src={churchInfo.pastors.avatarUrl} 
                alt="Pastores Marcos y Sarah" 
                className="pastor-avatar" 
              />
              <div className="welcome-text">
                <h3>BIENVENIDOS DE LOS PASTORES {churchInfo.pastors.names.toUpperCase()}</h3>
                <p>
                  "{churchInfo.pastors.message}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
