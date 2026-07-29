import React, { useState } from 'react';
import { Church, Sparkles, Menu, X, Lock, ShieldCheck, Newspaper } from 'lucide-react';
import { churchInfo } from '../data/churchData';

export default function Navbar({ activeTab, setActiveTab, onOpenDonate, isAdminLoggedIn, onOpenAdminPanel, onOpenAdminLogin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      {/* Top Banner Notice */}
      <div className="top-notice-bar">
        <Sparkles size={16} />
        <span>¡Bienvenidos a {churchInfo.name}!</span> | Transmisiones de Sermones, Estudios Bíblicos Interactivos y Recursos Gratuitos
      </div>

      {/* Main Navigation Container */}
      <div className="header-container">
        {/* Brand / Logo */}
        <a href="#inicio" onClick={() => handleNavClick('inicio')} className="brand-logo">
          <div className="brand-logo-icon">
            <Church size={26} />
          </div>
          <div className="brand-logo-text">
            <span className="brand-title">{churchInfo.name}</span>
            <span className="brand-subtitle">MINISTERIO EVANGÉLICO</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="main-nav">
          <button 
            className={`nav-link ${activeTab === 'inicio' ? 'active' : ''}`}
            onClick={() => handleNavClick('inicio')}
          >
            INICIO
          </button>
          <button 
            className={`nav-link ${activeTab === 'estudios' ? 'active' : ''}`}
            onClick={() => handleNavClick('estudios')}
          >
            ESTUDIO BÍBLICO
          </button>
          <button 
            className={`nav-link ${activeTab === 'sermones' ? 'active' : ''}`}
            onClick={() => handleNavClick('sermones')}
          >
            SERMONES Y VÍDEOS
          </button>
          <button 
            className={`nav-link ${activeTab === 'noticias' ? 'active' : ''}`}
            onClick={() => handleNavClick('noticias')}
          >
            NOTICIAS
          </button>
          <button 
            className={`nav-link ${activeTab === 'recursos' ? 'active' : ''}`}
            onClick={() => handleNavClick('recursos')}
          >
            RECURSOS PDF
          </button>
          <button 
            className={`nav-link ${activeTab === 'testimonios' ? 'active' : ''}`}
            onClick={() => handleNavClick('testimonios')}
          >
            TESTIMONIOS
          </button>
          <button 
            className={`nav-link ${activeTab === 'comentarios' ? 'active' : ''}`}
            onClick={() => handleNavClick('comentarios')}
          >
            COMUNIDAD
          </button>
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="header-action-group">
          {isAdminLoggedIn ? (
            <button 
              onClick={onOpenAdminPanel}
              className="btn-primary-gold"
              style={{ fontSize: '0.78rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
              title="Abrir Panel de Administración Pastoral"
            >
              <ShieldCheck size={16} /> PANEL PASTORAL
            </button>
          ) : (
            <button 
              onClick={onOpenAdminLogin}
              style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
              title="Acceso Pastor"
            >
              <Lock size={14} /> ACCESO PASTOR
            </button>
          )}

          <button onClick={onOpenDonate} className="btn-donate">
            DONAR / APOYAR
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir Menú de Navegación"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Slide-down Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-dropdown">
          <button 
            className={`mobile-nav-link ${activeTab === 'inicio' ? 'active' : ''}`}
            onClick={() => handleNavClick('inicio')}
          >
            INICIO
          </button>
          <button 
            className={`mobile-nav-link ${activeTab === 'estudios' ? 'active' : ''}`}
            onClick={() => handleNavClick('estudios')}
          >
            ESTUDIO BÍBLICO
          </button>
          <button 
            className={`mobile-nav-link ${activeTab === 'sermones' ? 'active' : ''}`}
            onClick={() => handleNavClick('sermones')}
          >
            SERMONES Y VÍDEOS
          </button>
          <button 
            className={`mobile-nav-link ${activeTab === 'noticias' ? 'active' : ''}`}
            onClick={() => handleNavClick('noticias')}
          >
            NOTICIAS LOCALES Y MUNDIALES
          </button>
          <button 
            className={`mobile-nav-link ${activeTab === 'recursos' ? 'active' : ''}`}
            onClick={() => handleNavClick('recursos')}
          >
            RECURSOS PDF
          </button>
          <button 
            className={`mobile-nav-link ${activeTab === 'testimonios' ? 'active' : ''}`}
            onClick={() => handleNavClick('testimonios')}
          >
            TESTIMONIOS DE FE
          </button>
          <button 
            className={`mobile-nav-link ${activeTab === 'comentarios' ? 'active' : ''}`}
            onClick={() => handleNavClick('comentarios')}
          >
            COMUNIDAD Y COMENTARIOS
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
            {isAdminLoggedIn ? (
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAdminPanel(); }}
                className="btn-primary-gold"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <ShieldCheck size={18} /> PANEL DE ADMINISTRACIÓN PASTORAL
              </button>
            ) : (
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAdminLogin(); }}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-main)', color: 'var(--bg-dark)', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Lock size={16} /> ACCESO PASTORAL / ADMIN
              </button>
            )}

            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenDonate(); }}
              className="btn-donate"
              style={{ width: '100%', textAlign: 'center', padding: '12px' }}
            >
              DONAR / APOYAR AL MINISTERIO
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
