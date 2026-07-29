import React, { useState } from 'react';
import { X, BookOpen, CheckCircle, HelpCircle, Award, RefreshCw, Video } from 'lucide-react';

export default function StudyModuleModal({ studyModule, onClose }) {
  if (!studyModule) return null;

  const currentLesson = studyModule.lessons ? studyModule.lessons[0] : null;
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState('leccion');

  const handleSelectOption = (qIndex, optionIndex) => {
    if (submittedQuiz) return;
    setUserAnswers({
      ...userAnswers,
      [qIndex]: optionIndex
    });
  };

  const calculateScore = () => {
    if (!currentLesson || !currentLesson.quiz) return 0;
    let score = 0;
    currentLesson.quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSubmittedQuiz(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-container" style={{ maxWidth: '900px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary-gold)', fontWeight: '700' }}>
              {studyModule.category} • {studyModule.level}
            </span>
            <h3 className="modal-title">{studyModule.title}</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', backgroundColor: '#FAF7F2' }}>
          <button 
            onClick={() => setActiveTab('leccion')}
            style={{ 
              padding: '14px 24px', 
              fontSize: '0.88rem', 
              fontWeight: '700', 
              borderBottom: activeTab === 'leccion' ? '3px solid var(--primary-gold)' : 'none',
              color: activeTab === 'leccion' ? 'var(--primary-gold)' : 'var(--text-muted)'
            }}
          >
            <BookOpen size={16} style={{ display: 'inline', marginRight: '6px' }} /> 1. Lección y Vídeo
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            style={{ 
              padding: '14px 24px', 
              fontSize: '0.88rem', 
              fontWeight: '700', 
              borderBottom: activeTab === 'quiz' ? '3px solid var(--primary-gold)' : 'none',
              color: activeTab === 'quiz' ? 'var(--primary-gold)' : 'var(--text-muted)'
            }}
          >
            <HelpCircle size={16} style={{ display: 'inline', marginRight: '6px' }} /> 2. Cuestionario de Aprendizaje
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'leccion' ? (
            <div>
              <div className="youtube-responsive-wrapper" style={{ marginBottom: '24px' }}>
                <iframe 
                  src={`https://www.youtube.com/embed/${studyModule.youtubeId}?rel=0`} 
                  title={studyModule.title}
                  allowFullScreen
                ></iframe>
              </div>

              {currentLesson && (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '12px', color: 'var(--bg-dark)' }}>
                    {currentLesson.title}
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>
                    {currentLesson.summary}
                  </p>

                  <div style={{ padding: '16px', backgroundColor: 'var(--primary-gold-light)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-gold)', marginBottom: '24px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-gold)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      PASAJE BÍBLICO DE LECTURA ({studyModule.passage}):
                    </div>
                    <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--text-dark)' }}>
                      "{currentLesson.reading}"
                    </p>
                  </div>

                  <button 
                    onClick={() => setActiveTab('quiz')}
                    className="btn-primary-gold"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    CONTINUAR AL CUESTIONARIO INTERACTIVO
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '16px', color: 'var(--bg-dark)' }}>
                Demuestra lo Aprendido: Cuestionario Interactivo
              </h4>

              {currentLesson && currentLesson.quiz ? (
                <div>
                  {currentLesson.quiz.map((q, qIndex) => (
                    <div key={qIndex} className="quiz-question-box">
                      <div style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--bg-dark)', marginBottom: '12px' }}>
                        {qIndex + 1}. {q.question}
                      </div>

                      {q.options.map((opt, optIndex) => {
                        const isSelected = userAnswers[qIndex] === optIndex;
                        let optionClass = 'quiz-option-btn';

                        if (submittedQuiz) {
                          if (optIndex === q.correctAnswer) {
                            optionClass += ' correct';
                          } else if (isSelected && optIndex !== q.correctAnswer) {
                            optionClass += ' incorrect';
                          }
                        } else if (isSelected) {
                          optionClass += ' selected';
                        }

                        return (
                          <button
                            key={optIndex}
                            className={optionClass}
                            onClick={() => handleSelectOption(qIndex, optIndex)}
                          >
                            {opt}
                          </button>
                        );
                      })}

                      {submittedQuiz && (
                        <div style={{ marginTop: '10px', fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                          💡 Explicación: {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}

                  {!submittedQuiz ? (
                    <button
                      onClick={() => setSubmittedQuiz(true)}
                      className="btn-primary-gold"
                      style={{ width: '100%', justifyContent: 'center' }}
                      disabled={Object.keys(userAnswers).length < currentLesson.quiz.length}
                    >
                      Enviar Cuestionario y Ver Calificación
                    </button>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <Award size={36} color="var(--primary-gold)" style={{ margin: '0 auto 12px auto' }} />
                      <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>
                        ¡Tu Calificación: {calculateScore()} de {currentLesson.quiz.length}!
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                        {calculateScore() === currentLesson.quiz.length 
                          ? '¡Excelente trabajo! Has comprendido perfectamente la lección de hoy.' 
                          : '¡Buen intento! Puedes repasar la lección y volver a responder.'}
                      </p>
                      <button onClick={handleResetQuiz} className="btn-card-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <RefreshCw size={14} /> Intentar de nuevo
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
