import React, { useState } from 'react';
import { X, Heart, Send, CheckCircle2 } from 'lucide-react';

export default function ShareStoryModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    testimony: '',
    youtubeUrl: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', testimony: '', youtubeUrl: '' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={24} color="var(--primary-gold)" />
            <h3 className="modal-title">Compartir mi Testimonio de Fe</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Queremos conocer las maravillas que Dios ha hecho en tu vida para gloria de Su nombre.
              </p>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Tu nombre o iniciales" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  placeholder="tuemail@ejemplo.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Tu Historia o Testimonio</label>
                <textarea 
                  required 
                  rows={4} 
                  placeholder="Escribe aquí lo que el Señor ha hecho en tu vida..."
                  value={formData.testimony}
                  onChange={(e) => setFormData({ ...formData, testimony: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Enlace de Vídeo de YouTube (Opcional)</label>
                <input 
                  type="url" 
                  placeholder="https://www.youtube.com/watch?v=..." 
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                />
              </div>

              <button type="submit" className="btn-primary-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                <Send size={18} /> Enviar Testimonio a los Pastores
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px auto' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '8px' }}>
                ¡Gracias por compartir tu Testimonio!
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Tu testimonio ha sido enviado al equipo pastoral de Jesús El Buen Pastor. ¡Que Dios te bendiga grandemente!
              </p>
              <button onClick={handleReset} className="btn-primary-gold">
                Aceptar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
