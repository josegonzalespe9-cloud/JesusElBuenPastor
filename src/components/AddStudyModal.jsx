import React, { useState } from 'react';
import { X, BookOpen, PlusCircle, Save } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function AddStudyModal({ isOpen, onClose }) {
  const { addStudy } = useSite();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Nuevo Testamento');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [passage, setPassage] = useState('');
  
  // Lesson 1 detail
  const [lessonTitle, setLessonTitle] = useState('Lección 1: Introducción');
  const [summary, setSummary] = useState('');
  const [reading, setReading] = useState('');
  
  // Quiz
  const [q1, setQ1] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    let cleanYoutubeId = youtubeId || "b3Wj-E1h5yU";
    if (youtubeId.includes('v=')) {
      cleanYoutubeId = youtubeId.split('v=')[1].split('&')[0];
    }

    const newStudyModule = {
      id: `study-${Date.now()}`,
      title,
      category,
      description: description || "Estudio bíblico interactivo.",
      thumbnail: thumbnail || "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&w=600&q=80",
      youtubeId: cleanYoutubeId,
      passage: passage || "Salmo 23:1",
      duration: "3 Semanas",
      level: "Todos los Niveles",
      lessons: [
        {
          title: lessonTitle,
          summary: summary || description,
          reading: reading || "Jehová es mi pastor; nada me faltará.",
          quiz: [
            {
              question: q1 || "¿Quién es nuestro Pastor según la Palabra?",
              options: [opt1 || "Dios / Jesucristo", opt2 || "El mundo"],
              correctAnswer: 0,
              explanation: "El Señor cuida de nosotros y es nuestro Salvador."
            }
          ]
        }
      ]
    };

    addStudy(newStudyModule);
    setTitle('');
    setDescription('');
    setYoutubeId('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={24} color="var(--primary-gold)" />
            <h3 className="modal-title">Crear Nuevo Módulo de Estudio Bíblico</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Título del Estudio</label>
              <input 
                type="text" 
                required 
                placeholder="Ej: Filipenses: Gozo en la Prueba" 
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
                  <option value="Nuevo Testamento">Nuevo Testamento</option>
                  <option value="Cartas Apostólicas">Cartas Apostólicas</option>
                  <option value="Antiguo Testamento">Antiguo Testamento</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Enlace / ID de Vídeo de YouTube</label>
                <input 
                  type="text" 
                  placeholder="Ej: https://www.youtube.com/watch?v=b3Wj-E1h5yU" 
                  value={youtubeId}
                  onChange={(e) => setYoutubeId(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--bg-dark)' }}>Descripción o Resumen del Curso</label>
              <textarea 
                rows={2} 
                placeholder="Breve descripción del estudio..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginTop: '4px', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ padding: '16px', backgroundColor: '#FAF7F2', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--bg-dark)' }}>
                Detalles de la Lección 1 y Cuestionario
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="text" 
                  placeholder="Pasaje Bíblico (Ej: Juan 3:16)" 
                  value={passage}
                  onChange={(e) => setPassage(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                />

                <textarea 
                  rows={2} 
                  placeholder="Texto del Pasaje Bíblico..." 
                  value={reading}
                  onChange={(e) => setReading(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                />

                <input 
                  type="text" 
                  placeholder="Pregunta del Test (Ej: ¿Quién es la luz del mundo?)" 
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary-gold" style={{ justifyContent: 'center', width: '100%', padding: '12px' }}>
              <PlusCircle size={18} /> Publicar Módulo de Estudio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
