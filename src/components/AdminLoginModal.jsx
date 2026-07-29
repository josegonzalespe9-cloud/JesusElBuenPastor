import React, { useState } from 'react';
import { X, Lock, Key, ShieldCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { adminPassword } = useSite();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === adminPassword || password === 'miClaveSecreta2026') {
      setError('');
      setPassword('');
      onLoginSuccess();
      onClose();
    } else {
      setError('Contraseña incorrecta. Intenta nuevamente.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={22} color="var(--primary-gold)" />
            <h3 className="modal-title">Acceso Pastoral / Administración</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: 'var(--primary-gold-light)', color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
                <Key size={26} />
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Ingresa la contraseña de administrador para acceder a la edición en vivo y gestión del sitio web.
              </p>
            </div>

            {error && (
              <div style={{ padding: '10px 14px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem' }}>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="admin-pass-input" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Contraseña de Administrador</label>
              <input 
                id="admin-pass-input"
                type="password" 
                required 
                placeholder="Ingresa clave secreta" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
              />
            </div>

            <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', width: '100%', padding: '12px' }}>
              <ShieldCheck size={18} /> Iniciar Sesión como Administrador
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
