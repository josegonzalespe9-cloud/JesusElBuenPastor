import React, { useState } from 'react';
import { X, FileText, Download, Printer, Check } from 'lucide-react';

export default function PdfGuideModal({ resource, onClose }) {
  const [downloaded, setDownloaded] = useState(false);

  if (!resource) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={24} color="var(--primary-gold)" />
            <div>
              <h3 className="modal-title">{resource.title}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{resource.format} • {resource.pages}</span>
            </div>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ padding: '24px', backgroundColor: '#FAF7F2', borderRadius: 'var(--radius-md)', border: '1px dashed var(--primary-gold-border)', marginBottom: '24px' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '8px', color: 'var(--bg-dark)' }}>
              VISTA PREVIA DE LA GUÍA DE ESTUDIO
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {resource.description}
            </p>
            <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', border: '1px solid var(--border-light)' }}>
              <strong>Muestra de Contenido:</strong>
              <p style={{ marginTop: '6px', fontStyle: 'italic' }}>"{resource.content}"</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button 
              onClick={() => window.print()} 
              className="btn-card-gold" 
              style={{ backgroundColor: 'transparent', color: 'var(--text-dark)', border: '1px solid var(--border-light)' }}
            >
              <Printer size={16} style={{ display: 'inline', marginRight: '6px' }} /> Imprimir Documento
            </button>

            <button 
              onClick={handleDownload} 
              className="btn-primary-gold" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              {downloaded ? (
                <>
                  <Check size={18} /> ¡Guía Descargada con Éxito!
                </>
              ) : (
                <>
                  <Download size={18} /> Descargar Guía PDF Completa
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
