import React from 'react';
import { Edit3, PlusCircle, BookOpen, Key, LogOut, ShieldCheck, Newspaper } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function AdminToolbar({ onOpenAddNews, onOpenAddStudy, onOpenAdminPanel }) {
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useSite();

  if (!isAdminLoggedIn) return null;

  return (
    <div style={{
      backgroundColor: '#1E293B',
      color: '#FFFFFF',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.82rem',
      fontWeight: '600',
      borderBottom: '2px solid var(--primary-gold)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      flexWrap: 'wrap',
      gap: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--primary-gold)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>
          <ShieldCheck size={14} /> MODO EDITOR EN VIVO
        </span>
        <span style={{ color: '#CBD5E1' }}>Puedes editar, agregar o eliminar cualquier elemento de la página.</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={onOpenAddNews}
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}
        >
          <Newspaper size={14} color="var(--primary-gold)" /> + Noticia
        </button>

        <button 
          onClick={onOpenAddStudy}
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}
        >
          <BookOpen size={14} color="var(--primary-gold)" /> + Estudio
        </button>

        <button 
          onClick={onOpenAdminPanel}
          style={{ backgroundColor: 'var(--primary-gold)', color: '#FFFFFF', border: 'none', padding: '6px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '700' }}
        >
          <Edit3 size={14} /> Panel Principal
        </button>

        <button 
          onClick={() => setIsAdminLoggedIn(false)}
          style={{ backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', padding: '6px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}
        >
          <LogOut size={14} /> Salir
        </button>
      </div>
    </div>
  );
}
