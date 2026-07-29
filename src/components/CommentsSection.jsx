import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, User, Heart, Sparkles, Filter } from 'lucide-react';

export default function CommentsSection() {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Hermana Gloria Morales",
      date: "Hace 2 horas",
      type: "Petición de Oración",
      message: "Pido la oración de la congregación por la salud de mi madre Elizabeth que está hospitalizada. Sabemos que en el nombre de Jesús hay poder y sanidad.",
      likes: 12,
      userLiked: false
    },
    {
      id: 2,
      name: "Hermano Roberto Mendoza",
      date: "Hace 1 día",
      type: "Agradecimiento",
      message: "Doy gracias a Dios por la lección sobre la paz en Juan 14 del módulo interactivo. Trajo consuelo en un momento muy duro para mi familia.",
      likes: 8,
      userLiked: false
    },
    {
      id: 3,
      name: "Andrea & Pedro Silva",
      date: "Hace 2 días",
      type: "Comentario",
      message: "Excelente predicación de los pastores el pasado domingo sobre el Salmo 23. Las enseñanzas en vídeo y la guía en PDF nos ayudan mucho en nuestro altar familiar.",
      likes: 15,
      userLiked: false
    }
  ]);

  const [filterType, setFilterType] = useState('Todos');
  const [newComment, setNewComment] = useState({
    name: '',
    type: 'Comentario',
    message: ''
  });
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const handleLike = (id) => {
    setComments(comments.map(c => {
      if (c.id === id) {
        return {
          ...c,
          likes: c.userLiked ? c.likes - 1 : c.likes + 1,
          userLiked: !c.userLiked
        };
      }
      return c;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.message.trim()) return;

    const item = {
      id: Date.now(),
      name: newComment.name,
      date: "Justo ahora",
      type: newComment.type,
      message: newComment.message,
      likes: 0,
      userLiked: false
    };

    setComments([item, ...comments]);
    setNewComment({ name: '', type: 'Comentario', message: '' });
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 4000);
  };

  const filteredComments = comments.filter(c => 
    filterType === 'Todos' || c.type === filterType
  );

  return (
    <section className="section-padding" id="comentarios" style={{ backgroundColor: '#FAF7F2', borderTop: '1px solid var(--border-light)' }}>
      <div className="section-container">
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-gold)', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            <Sparkles size={16} /> Comunidad de Fe
          </div>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>COMENTARIOS Y PETICIONES DE ORACIÓN</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Un espacio para compartir lo que Dios está haciendo en tu vida, dejar tus peticiones de oración y bendecir a otros hermanos.
          </p>
        </div>

        <div className="two-col-layout" style={{ gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
          {/* Left Column: Form */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '16px', color: 'var(--bg-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageSquare size={20} color="var(--primary-gold)" /> Déjanos tu Comentario u Oración
            </h3>

            {showSuccessMsg && (
              <div style={{ padding: '12px 16px', backgroundColor: '#ECFDF5', border: '1px solid #10B981', borderRadius: 'var(--radius-sm)', color: '#065F46', fontSize: '0.85rem', marginBottom: '16px' }}>
                ¡Tu comentario ha sido publicado con éxito en la comunidad!
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Tu Nombre o Familia</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ej: Hermano Juan / Familia Gómez" 
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Tipo de Mensaje</label>
                <select 
                  value={newComment.type}
                  onChange={(e) => setNewComment({ ...newComment, type: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Comentario">Comentario / Reflexión</option>
                  <option value="Petición de Oración">Petición de Oración</option>
                  <option value="Agradecimiento">Agradecimiento / Testimonio Corto</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Tu Mensaje</label>
                <textarea 
                  required 
                  rows={4} 
                  placeholder="Escribe tu comentario o petición para que la comunidad ore por ti..." 
                  value={newComment.message}
                  onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', marginTop: '4px' }}>
                <Send size={16} /> Publicar Mensaje
              </button>
            </form>
          </div>

          {/* Right Column: List of Comments */}
          <div>
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
                <Filter size={14} /> Filtrar:
              </span>
              {['Todos', 'Comentario', 'Petición de Oración', 'Agradecimiento'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    border: '1px solid',
                    borderColor: filterType === t ? 'var(--primary-gold)' : 'var(--border-light)',
                    backgroundColor: filterType === t ? 'var(--primary-gold-light)' : '#FFFFFF',
                    color: filterType === t ? 'var(--primary-gold)' : 'var(--text-muted)'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredComments.map(c => (
                <div key={c.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--primary-gold-light)', color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--bg-dark)' }}>{c.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.date}</div>
                      </div>
                    </div>

                    <span 
                      style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: '700', 
                        padding: '4px 10px', 
                        borderRadius: '9999px',
                        backgroundColor: c.type === 'Petición de Oración' ? '#FEF2F2' : c.type === 'Agradecimiento' ? '#ECFDF5' : '#F1F5F9',
                        color: c.type === 'Petición de Oración' ? '#DC2626' : c.type === 'Agradecimiento' ? '#059669' : '#475569'
                      }}
                    >
                      {c.type}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: '1.5', marginBottom: '14px' }}>
                    "{c.message}"
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => handleLike(c.id)}
                      style={{ 
                        fontSize: '0.8rem', 
                        fontWeight: '600', 
                        color: c.userLiked ? 'var(--primary-gold)' : 'var(--text-muted)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: c.userLiked ? 'var(--primary-gold-light)' : 'transparent',
                        border: '1px solid',
                        borderColor: c.userLiked ? 'var(--primary-gold-border)' : 'var(--border-light)'
                      }}
                    >
                      <ThumbsUp size={14} fill={c.userLiked ? 'var(--primary-gold)' : 'none'} /> {c.likes} {c.likes === 1 ? 'Me gusta' : 'Me gusta'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
