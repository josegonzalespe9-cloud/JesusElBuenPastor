import React from 'react';
import { FileText, Lightbulb, MapPin, ArrowRight } from 'lucide-react';

export default function ActionCards({ onOpenPdfs, onOpenStudies, onOpenPathways }) {
  return (
    <section className="action-cards-section">
      <div className="action-cards-container">
        {/* Card 1: Downloadable Guides */}
        <div className="action-card">
          <div>
            <div className="action-card-header">
              <div className="action-card-icon">
                <FileText size={28} />
              </div>
              <h3 className="action-card-title">GUÍAS DESCARGABLES</h3>
            </div>
            <p className="action-card-desc">
              Notas de estudio en formato PDF, guías de discusión para células o grupos pequeños y devocionales diarios.
            </p>
          </div>
          <button onClick={onOpenPdfs} className="btn-card-gold">
            Ver Todos los PDFs
          </button>
        </div>

        {/* Card 2: Interactive Bible Study */}
        <div className="action-card" style={{ borderColor: 'var(--primary-gold)' }}>
          <div>
            <div className="action-card-header">
              <div className="action-card-icon" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--primary-gold)' }}>
                <Lightbulb size={28} />
              </div>
              <h3 className="action-card-title">ESTUDIO BÍBLICO INTERACTIVO</h3>
            </div>
            <p className="action-card-desc">
              Estudios guiados por módulos interactivos con lecciones en vídeo de YouTube y cuestionarios para evaluar tu comprensión.
            </p>
          </div>
          <button onClick={onOpenStudies} className="btn-card-gold" style={{ backgroundColor: 'var(--bg-dark)' }}>
            Comenzar un Estudio
          </button>
        </div>

        {/* Card 3: Study Pathways */}
        <div className="action-card">
          <div>
            <div className="action-card-header">
              <div className="action-card-icon">
                <MapPin size={28} />
              </div>
              <h3 className="action-card-title">RUTAS DE APRENDIZAJE</h3>
            </div>
            <p className="action-card-desc">
              Secuencias estructuradas y temáticas paso a paso, desde nivel principiante hasta estudios teológicos avanzados.
            </p>
          </div>
          <button onClick={onOpenPathways} className="btn-card-gold">
            Explorar Rutas
          </button>
        </div>
      </div>
    </section>
  );
}
