import React, { useState } from 'react';
import { X, Newspaper, PlusCircle, Link, Image } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function AddNewsModal({ isOpen, onClose }) {
  const { addNewsItem } = useSite();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Locales');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [googleDriveUrl, setGoogleDriveUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newArticle = {
      id: `news-${Date.now()}`,
      title,
      category,
      date: "Hoy",
      summary: summary || title,
      content,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      googleDriveUrl
    };

    addNewsItem(newArticle);
    setTitle('');
    setSummary('');
    setContent('');
    setImageUrl('');
    setGoogleDriveUrl('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Newspaper size={24} color="var(--primary-gold)" />
            <h3 className="modal-title">Publicar Noticia Local o Mundial</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Título de la Noticia</label>
              <input 
                type="text" 
                required 
                placeholder="Ej: Conferencia Anual de Jóvenes / Avance Misionero" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Categoría</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Locales">Locales (Iglesia Sede)</option>
                  <option value="Mundiales">Mundiales (Misiones e Internacional)</option>
                  <option value="Eventos">Eventos y Anuncios</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>URL de la Foto de Portada</label>
                <input 
                  type="url" 
                  placeholder="https://..." 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Resumen Corto (Breve descripción)</label>
              <input 
                type="text" 
                placeholder="Resumen para mostrar en la tarjeta..." 
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Contenido Completo de la Noticia</label>
              <textarea 
                required 
                rows={4} 
                placeholder="Escribe el cuerpo o detalles de la noticia..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Enlace de Google Drive o PDF Adjunto (Opcional)</label>
              <input 
                type="url" 
                placeholder="Ej: https://drive.google.com/file/d/..." 
                value={googleDriveUrl}
                onChange={(e) => setGoogleDriveUrl(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
                💡 Si agregas un enlace de Google Drive, los hermanos podrán descargar los boletines o documentos directamente.
              </span>
            </div>

            <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', width: '100%', padding: '12px', marginTop: '4px' }}>
              <PlusCircle size={18} /> Publicar Noticia Oficial
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
