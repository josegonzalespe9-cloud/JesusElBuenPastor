import React, { useState } from 'react';
import { Search, BookOpen, PlayCircle, Clock, Award, Trash2, PlusCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function InteractiveStudies({ onSelectModule, onOpenAddStudyModal }) {
  const { studiesList, deleteStudy, isAdminLoggedIn } = useSite();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Nuevo Testamento', 'Cartas Apostólicas', 'Antiguo Testamento'];

  const filteredStudies = studiesList.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          study.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || study.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section-padding" id="estudios">
      <div className="section-container">
        {/* Header Row */}
        <div className="section-header-row">
          <div>
            <h2 className="section-title">EXPLORA NUESTROS ESTUDIOS INTERACTIVOS</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
              Elige un módulo para ver la lección en vídeo, leer el texto y responder el test.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Search Box */}
            <div className="filter-search-box">
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Buscar por libro, tema o nivel..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {isAdminLoggedIn && (
              <button 
                onClick={onOpenAddStudyModal}
                className="btn-primary-gold" 
                style={{ fontSize: '0.82rem', padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <PlusCircle size={16} /> Crear Nuevo Módulo
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: '600',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--primary-gold)' : 'var(--border-light)',
                backgroundColor: selectedCategory === cat ? 'var(--primary-gold)' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Studies Cards Grid */}
        <div className="studies-grid">
          {filteredStudies.map(study => (
            <div key={study.id} className="study-card" style={{ position: 'relative' }}>
              {isAdminLoggedIn && (
                <button 
                  onClick={() => deleteStudy(study.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10,
                    backgroundColor: '#EF4444',
                    color: '#FFFFFF',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                  title="Eliminar Módulo"
                >
                  <Trash2 size={16} />
                </button>
              )}

              <div className="study-card-image">
                <img src={study.thumbnail} alt={study.title} />
                <span className="study-tag">{study.category}</span>
              </div>
              <div className="study-card-content">
                <h3 className="study-card-title">{study.title}</h3>
                <p className="study-card-desc">{study.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {study.duration}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Award size={14} /> {study.level}
                  </span>
                </div>

                <button 
                  onClick={() => onSelectModule(study)}
                  className="btn-card-gold" 
                  style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <PlayCircle size={16} /> Iniciar Módulo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
