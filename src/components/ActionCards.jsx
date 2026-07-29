import React, { useState } from 'react';
import { BookOpen, Compass, Layers, Edit3, X, Save } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function ActionCards({ onOpenPdfs, onOpenStudies, onOpenPathways }) {
  const { actionCardsData, updateActionCard, isAdminLoggedIn } = useSite();
  const [editingCard, setEditingCard] = useState(null);

  const [formState, setFormState] = useState({
    title: '',
    desc: '',
    buttonText: ''
  });

  const handleStartEdit = (card) => {
    setEditingCard(card);
    setFormState({
      title: card.title,
      desc: card.desc,
      buttonText: card.buttonText
    });
  };

  const handleSaveCard = (e) => {
    e.preventDefault();
    if (!editingCard) return;
    updateActionCard(editingCard.id, formState);
    setEditingCard(null);
  };

  const getCardIcon = (type) => {
    if (type === 'recursos') return <BookOpen size={24} color="#B88E4C" />;
    if (type === 'estudios') return <Compass size={24} color="#B88E4C" />;
    return <Layers size={24} color="#B88E4C" />;
  };

  const handleCardClick = (type) => {
    if (type === 'recursos') onOpenPdfs();
    else onOpenStudies();
  };

  return (
    <section className="section-padding" style={{ backgroundColor: '#FFFFFF', paddingTop: '50px', paddingBottom: '50px' }}>
      <div className="section-container">
        <div className="action-cards-grid">
          {actionCardsData.map(card => (
            <div key={card.id} className="action-card" style={{ position: 'relative' }}>
              {isAdminLoggedIn && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleStartEdit(card); }}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    zIndex: 10
                  }}
                  title="Editar Tarjeta"
                >
                  <Edit3 size={15} />
                </button>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div className="action-card-icon">
                  {getCardIcon(card.type)}
                </div>
                <h3 className="action-card-title" style={{ margin: 0 }}>{card.title}</h3>
              </div>

              <p className="action-card-desc">{card.desc}</p>
              
              <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                <button 
                  onClick={() => handleCardClick(card.type)}
                  className="btn-card-gold"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Action Card Modal */}
      {editingCard && (
        <div className="modal-overlay" onClick={() => setEditingCard(null)}>
          <div className="modal-content-container" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 size={20} color="var(--primary-gold)" />
                <h3 className="modal-title">Editar Tarjeta de Acción</h3>
              </div>
              <button onClick={() => setEditingCard(null)} className="btn-close-modal">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSaveCard} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label htmlFor="card-title-input" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Título de la Tarjeta</label>
                  <input 
                    id="card-title-input"
                    type="text"
                    required
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label htmlFor="card-desc-input" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Descripción Corta</label>
                  <textarea 
                    id="card-desc-input"
                    rows={3}
                    required
                    value={formState.desc}
                    onChange={(e) => setFormState({ ...formState, desc: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
                  />
                </div>

                <div>
                  <label htmlFor="card-button-input" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Texto del Botón</label>
                  <input 
                    id="card-button-input"
                    type="text"
                    required
                    value={formState.buttonText}
                    onChange={(e) => setFormState({ ...formState, buttonText: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                  />
                </div>

                <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', padding: '12px', marginTop: '4px' }}>
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
