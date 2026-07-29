import React, { useState } from 'react';
import { MessageSquare, Heart, Send, CheckCircle2, User, Filter, Trash2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function CommentsSection() {
  const { commentsList, addComment, deleteComment, isAdminLoggedIn } = useSite();
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('Petición de Oración');
  const [commentText, setCommentText] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');

  const filteredComments = commentsList.filter(item => 
    filterCategory === 'Todos' || item.category === filterCategory
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      author: authorName.trim() ? authorName : 'Hermano/a en Cristo',
      date: 'Hace un momento',
      category: category,
      content: commentText,
      likes: 1
    };

    addComment(newCommentObj);
    setSubmittedMessage('¡Tu comentario u oración ha sido publicado en la comunidad!');
    setCommentText('');
    setAuthorName('');

    setTimeout(() => setSubmittedMessage(''), 4000);
  };

  return (
    <section className="section-padding" id="comentarios" style={{ backgroundColor: '#FAF7F2', borderTop: '1px solid var(--border-light)' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header-row">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-gold)', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
              <MessageSquare size={16} /> Edificación Mutua
            </div>
            <h2 className="section-title">COMUNIDAD Y PETICIONES DE ORACIÓN</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
              Déjanos tu opinión, pide oración o comparte una palabra de aliento con los demás hermanos.
            </p>
          </div>
        </div>

        <div className="two-col-layout" style={{ gridTemplateColumns: '1.4fr 1fr', gap: '32px' }}>
          
          {/* Left Column: Comments List */}
          <div>
            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
                <Filter size={14} /> Filtrar:
              </span>
              {['Todos', 'Petición de Oración', 'Testimonio', 'Agradecimiento'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  style={{
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    border: '1px solid',
                    borderColor: filterCategory === cat ? 'var(--primary-gold)' : 'var(--border-light)',
                    backgroundColor: filterCategory === cat ? 'var(--primary-gold)' : '#FFFFFF',
                    color: filterCategory === cat ? '#FFFFFF' : 'var(--text-muted)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredComments.map(comment => (
                <div key={comment.id} style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', position: 'relative' }}>
                  {isAdminLoggedIn && (
                    <button 
                      onClick={() => deleteComment(comment.id)}
                      style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#EF4444', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      title="Eliminar Comentario"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--primary-gold-light)', color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--bg-dark)' }}>{comment.author}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comment.date}</div>
                      </div>
                    </div>

                    <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '9999px', backgroundColor: 'var(--primary-gold-light)', color: 'var(--primary-gold)', fontWeight: '700', textTransform: 'uppercase' }}>
                      {comment.category}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: '1.6', marginBottom: '14px' }}>
                    {comment.content}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    <Heart size={15} color="#EF4444" fill="#EF4444" /> {comment.likes} personas están orando / apoyan esto
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: New Comment Form */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', height: 'fit-content', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--bg-dark)', marginBottom: '6px' }}>
              Escribir un Comentario o Petición
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Tu mensaje será visible para que todos los hermanos puedan unirse en oración.
            </p>

            {submittedMessage && (
              <div style={{ padding: '10px 14px', backgroundColor: '#ECFDF5', border: '1px solid #10B981', color: '#065F46', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> {submittedMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Tu Nombre o Seudónimo</label>
                <input 
                  type="text" 
                  placeholder="Ej: Hermano Juan / Anónimo" 
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Categoría</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontSize: '0.88rem', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Petición de Oración">Petición de Oración</option>
                  <option value="Testimonio">Testimonio</option>
                  <option value="Agradecimiento">Agradecimiento</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Tu Mensaje u Oración</label>
                <textarea 
                  required 
                  rows={4} 
                  placeholder="Escribe tu mensaje aquí..." 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontSize: '0.88rem', fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', padding: '12px', fontSize: '0.88rem' }}>
                <Send size={16} /> Publicar Comentario
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
