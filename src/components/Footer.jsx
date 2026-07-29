import React from 'react';
import { Church, Mail, Phone, MapPin, Video, Globe, Share2, Lock } from 'lucide-react';
import { churchInfo } from '../data/churchData';

export default function Footer({ onNavigate, onOpenDonate, onOpenAdminLogin, isAdminLoggedIn, onOpenAdminPanel }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-gold)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Church size={20} />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: '700', color: '#FFFFFF' }}>
                {churchInfo.name}
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: '1.6', marginBottom: '20px' }}>
              Un ministerio dedicado a predicar el Evangelio de Jesucristo, edificar a la comunidad con el estudio de la Palabra y transmitir esperanzas a las familias.
            </p>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary-gold)', fontStyle: 'italic' }}>
              "El Señor es mi pastor; nada me faltará." — Salmo 23:1
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="footer-col-title">NAVEGACIÓN</h4>
            <ul className="footer-links">
              <li><a href="#inicio" onClick={() => onNavigate('inicio')}>Inicio</a></li>
              <li><a href="#estudios" onClick={() => onNavigate('estudios')}>Estudio Bíblico</a></li>
              <li><a href="#sermones" onClick={() => onNavigate('sermones')}>Sermones y Audios</a></li>
              <li><a href="#recursos" onClick={() => onNavigate('recursos')}>Recursos PDF</a></li>
              <li><a href="#testimonios" onClick={() => onNavigate('testimonios')}>Testimonios de Fe</a></li>
              <li><a href="#comentarios" onClick={() => onNavigate('comentarios')}>Comunidad</a></li>
            </ul>
          </div>

          {/* Col 3: Resources & Actions */}
          <div>
            <h4 className="footer-col-title">RECURSOS Y APÓYO</h4>
            <ul className="footer-links">
              <li><a href="#donar" onClick={onOpenDonate}>Diezmos y Ofrendas</a></li>
              <li><a href="#estudios" onClick={() => onNavigate('estudios')}>Cuestionarios de Fe</a></li>
              <li><a href="#testimonios" onClick={() => onNavigate('testimonios')}>Enviar mi Historia</a></li>
              <li>
                {isAdminLoggedIn ? (
                  <button onClick={onOpenAdminPanel} style={{ color: 'var(--primary-gold)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', marginTop: '6px' }}>
                    <Lock size={14} /> Panel de Administración
                  </button>
                ) : (
                  <button onClick={onOpenAdminLogin} style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', marginTop: '6px' }}>
                    <Lock size={14} /> Acceso Pastor / Admin
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="footer-col-title">CONTACTO Y HORARIOS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: '#94A3B8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--primary-gold)" /> Av. Central de la Fe #777, Ciudad
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="var(--primary-gold)" /> +1 (800) 555-JESUS
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--primary-gold)" /> contacto@jesuselbuenpastor.org
              </div>
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-dark)', fontSize: '0.8rem' }}>
                <strong>Reuniones Generales:</strong><br />
                Domingos 10:00 AM | Miércoles 7:00 PM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Ministerio {churchInfo.name}. Todos los derechos reservados.
          </div>

          <div className="social-links-row">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Facebook">
              <Globe size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Instagram">
              <Share2 size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="YouTube">
              <Video size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
