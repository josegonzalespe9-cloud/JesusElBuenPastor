import React, { useState } from 'react';
import { X, ShieldCheck, PlusCircle, Video, Key, LogOut, CheckCircle2, Play, Edit3, Save } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function AdminPanelModal({ isOpen, onClose, onLogout, onTestYoutube }) {
  const { addSermon, adminPassword, updateAdminPassword } = useSite();
  const [activeTab, setActiveTab] = useState('nuevo-sermon');
  
  // New Sermon Form State
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('Evangelista Marcos González');
  const [series, setSeries] = useState('Serie Predicaciones de Fe');
  const [youtubeInput, setYoutubeInput] = useState('');
  const [summary, setSummary] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password Change Form State
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccessMessage, setPassSuccessMessage] = useState('');

  // Private YouTube tester state inside admin panel
  const [privateYoutubeUrl, setPrivateYoutubeUrl] = useState('');

  if (!isOpen) return null;

  const handleAddSermonSubmit = (e) => {
    e.preventDefault();
    if (!title || !youtubeInput) return;

    let cleanId = youtubeInput;
    if (youtubeInput.includes('v=')) {
      cleanId = youtubeInput.split('v=')[1].split('&')[0];
    } else if (youtubeInput.includes('youtu.be/')) {
      cleanId = youtubeInput.split('youtu.be/')[1].split('?')[0];
    }

    const newSermon = {
      id: `sermon-${Date.now()}`,
      title,
      speaker,
      series,
      date: "Hoy",
      duration: "40 min",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      youtubeId: cleanId,
      summary: summary || "Nueva predicación de evangelización."
    };

    addSermon(newSermon);
    setSuccessMessage(`¡El sermón "${title}" ha sido publicado oficialmente en la web!`);
    setTitle('');
    setYoutubeInput('');
    setSummary('');

    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccessMessage('');

    if (newPass.length < 4) {
      setPassError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('Las contraseñas no coinciden. Verifica e intenta nuevamente.');
      return;
    }

    updateAdminPassword(newPass);
    setPassSuccessMessage('¡Contraseña de administrador actualizada con éxito!');
    setNewPass('');
    setConfirmPass('');
    setTimeout(() => setPassSuccessMessage(''), 5000);
  };

  const handleTestPrivateYoutube = (e) => {
    e.preventDefault();
    if (!privateYoutubeUrl) return;
    onTestYoutube(privateYoutubeUrl, "Vista Previa de Administración");
    setPrivateYoutubeUrl('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" style={{ maxWidth: '850px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ backgroundColor: 'var(--bg-dark)', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Edit3 size={26} color="var(--primary-gold)" />
            <div>
              <h3 className="modal-title" style={{ color: '#FFFFFF' }}>Panel de Edición y Gestión Evangelística</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-gold)' }}>Sesión Activa - Modo Editor de Contenidos</span>
            </div>
          </div>
          <button onClick={onClose} className="btn-close-modal" style={{ backgroundColor: 'var(--bg-dark-card)', color: '#FFFFFF', border: '1px solid var(--border-dark)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Admin Navigation Sub-bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', backgroundColor: '#FAF7F2', padding: '0 24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveTab('nuevo-sermon')}
              style={{ 
                padding: '14px 18px', 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                borderBottom: activeTab === 'nuevo-sermon' ? '3px solid var(--primary-gold)' : 'none',
                color: activeTab === 'nuevo-sermon' ? 'var(--primary-gold)' : 'var(--text-muted)'
              }}
            >
              <PlusCircle size={16} style={{ display: 'inline', marginRight: '6px' }} /> Publicar Sermón
            </button>

            <button 
              onClick={() => setActiveTab('cambiar-clave')}
              style={{ 
                padding: '14px 18px', 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                borderBottom: activeTab === 'cambiar-clave' ? '3px solid var(--primary-gold)' : 'none',
                color: activeTab === 'cambiar-clave' ? 'var(--primary-gold)' : 'var(--text-muted)'
              }}
            >
              <Key size={16} style={{ display: 'inline', marginRight: '6px' }} /> Cambiar Contraseña
            </button>

            <button 
              onClick={() => setActiveTab('probador-youtube')}
              style={{ 
                padding: '14px 18px', 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                borderBottom: activeTab === 'probador-youtube' ? '3px solid var(--primary-gold)' : 'none',
                color: activeTab === 'probador-youtube' ? 'var(--primary-gold)' : 'var(--text-muted)'
              }}
            >
              <Video size={16} style={{ display: 'inline', marginRight: '6px' }} /> Probar YouTube
            </button>
          </div>

          <button 
            onClick={() => { onLogout(); onClose(); }}
            style={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', padding: '14px 0' }}
          >
            <LogOut size={16} /> Salir del Modo Editor
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {activeTab === 'nuevo-sermon' && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '16px', color: 'var(--bg-dark)' }}>
                Añadir Prédica o Mensaje a la Plataforma
              </h4>

              {successMessage && (
                <div style={{ padding: '12px 16px', backgroundColor: '#ECFDF5', border: '1px solid #10B981', color: '#065F46', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} /> {successMessage}
                </div>
              )}

              <form onSubmit={handleAddSermonSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Título del Mensaje</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ej: La Fe que Mueve Montañas" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Predicador / Autor</label>
                    <input 
                      type="text" 
                      required 
                      value={speaker}
                      onChange={(e) => setSpeaker(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Serie o Tema</label>
                    <input 
                      type="text"
                      value={series}
                      onChange={(e) => setSeries(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Enlace o ID del Vídeo en YouTube</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ej: https://www.youtube.com/watch?v=b3Wj-E1h5yU" 
                      value={youtubeInput}
                      onChange={(e) => setYoutubeInput(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Resumen del Mensaje</label>
                  <textarea 
                    rows={3} 
                    placeholder="Breve resumen del contenido para los visitantes..." 
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
                  />
                </div>

                <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', padding: '12px' }}>
                  <PlusCircle size={18} /> Publicar Mensaje en Vivo
                </button>
              </form>
            </div>
          )}

          {activeTab === 'cambiar-clave' && (
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '8px', color: 'var(--bg-dark)', textAlign: 'center' }}>
                Cambiar Contraseña de Administrador
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '20px' }}>
                Establece tu propia clave secreta para proteger el panel de administración.
              </p>

              {passSuccessMessage && (
                <div style={{ padding: '12px 16px', backgroundColor: '#ECFDF5', border: '1px solid #10B981', color: '#065F46', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} /> {passSuccessMessage}
                </div>
              )}

              {passError && (
                <div style={{ padding: '12px 16px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', marginBottom: '20px' }}>
                  {passError}
                </div>
              )}

              <form onSubmit={handleChangePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Nueva Contraseña</label>
                  <input 
                    type="password"
                    required
                    placeholder="Ingresa tu nueva clave..."
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Confirmar Nueva Contraseña</label>
                  <input 
                    type="password"
                    required
                    placeholder="Repite la nueva clave..."
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', padding: '12px' }}>
                  <Save size={18} /> Guardar Nueva Contraseña
                </button>
              </form>
            </div>
          )}

          {activeTab === 'probador-youtube' && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '12px', color: 'var(--bg-dark)' }}>
                Previsualizador de Vídeos de YouTube
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Pega cualquier enlace de YouTube para comprobar cómo se visualizará en la plataforma antes de agregarlo.
              </p>

              <form onSubmit={handleTestPrivateYoutube} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Enlace de YouTube</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Pega aquí el enlace de YouTube..." 
                    value={privateYoutubeUrl}
                    onChange={(e) => setPrivateYoutubeUrl(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <button type="submit" className="btn-watch-video" style={{ justifyContent: 'center', padding: '12px', fontSize: '0.9rem' }}>
                  <Play size={18} fill="#FFFFFF" /> Previsualizar en la Web
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
