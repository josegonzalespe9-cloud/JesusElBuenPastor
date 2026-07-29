import React, { useState } from 'react';
import { Search, BookOpen, PlayCircle, Clock, Award } from 'lucide-react';
import { interactiveStudies } from '../data/churchData';

export default function InteractiveStudies({ onSelectModule }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Nuevo Testamento', 'Cartas Apostólicas', 'Antiguo Testamento'];

  const filteredStudies = interactiveStudies.filter(study => {
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
            <div key={study.id} className="study-card">
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
