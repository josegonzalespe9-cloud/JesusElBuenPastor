import React, { useState } from 'react';
import { FileText, Download, HeartHandshake, Edit3, X, Save } from 'lucide-react';
import { downloadableResources } from '../data/churchData';
import { useSite } from '../context/SiteContext';

export default function FeaturedResources({ onSelectPdf }) {
  const { ministerBioData, updateMinisterBio, isAdminLoggedIn } = useSite();
  const [isEditingBio, setIsEditingBio] = useState(false);

  const [editForm, setEditForm] = useState({
    title: ministerBioData.title,
    authorName: ministerBioData.authorName,
    message: ministerBioData.message,
    avatarUrl: ministerBioData.avatarUrl
  });

  const handleSaveBio = (e) => {
    e.preventDefault();
    updateMinisterBio(editForm);
    setIsEditingBio(false);
  };

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

          {/* Right Column: Minister / Evangelist Welcome Box */}
          <div className="welcome-pastor-box" style={{ background: 'linear-gradient(135deg, #FFFFFF, #FAF5EB)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-gold)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
                <HeartHandshake size={18} /> Mensaje del Evangelista
              </div>

              {isAdminLoggedIn && (
                <button 
                  onClick={() => setIsEditingBio(true)}
                  style={{ fontSize: '0.78rem', color: '#2563EB', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Edit3 size={14} /> Editar Mensaje
                </button>
              )}
            </div>
            
            <div className="welcome-content">
              <img 
                src={ministerBioData.avatarUrl} 
                alt={ministerBioData.authorName} 
                className="pastor-avatar" 
              />
              <div className="welcome-text">
                <h3>{ministerBioData.title}</h3>
                <p>
                  "{ministerBioData.message}"
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.82rem', fontWeight: '700', color: 'var(--primary-gold)' }}>
                  - {ministerBioData.authorName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Bio Modal */}
      {isEditingBio && (
        <div className="modal-overlay" onClick={() => setIsEditingBio(false)}>
          <div className="modal-content-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 size={22} color="var(--primary-gold)" />
                <h3 className="modal-title">Editar Mensaje de Bienvenida</h3>
              </div>
              <button onClick={() => setIsEditingBio(false)} className="btn-close-modal">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSaveBio} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Título del Mensaje</label>
                  <input 
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Nombre del Autor / Evangelista</label>
                  <input 
                    type="text"
                    value={editForm.authorName}
                    onChange={(e) => setEditForm({ ...editForm, authorName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Mensaje o Reflexión</label>
                  <textarea 
                    rows={4}
                    value={editForm.message}
                    onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>URL de la Foto / Avatar</label>
                  <input 
                    type="url"
                    value={editForm.avatarUrl}
                    onChange={(e) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', padding: '12px' }}>
                  <Save size={18} /> Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
