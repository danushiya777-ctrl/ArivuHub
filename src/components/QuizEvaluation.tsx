import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Lightbulb, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Brain, 
  GraduationCap, 
  ChevronRight,
  ChevronLeft,
  Video,
  PlayCircle
} from 'lucide-react';
import { QuizQuestion, WeakConcept, NavigationTab, Tutor, VideoReference } from '../types';

interface QuizEvaluationProps {
  questions: QuizQuestion[];
  weakConcepts: WeakConcept[];
  videos?: VideoReference[];
  onQuizCompleted: (score: number, total: number) => void;
  onNavigate: (tab: NavigationTab) => void;
  onConnectTutor: () => void;
  onSelectVideoToPlay?: (video: VideoReference) => void;
}

export const QuizEvaluation: React.FC<QuizEvaluationProps> = ({
  questions,
  weakConcepts,
  videos = [],
  onQuizCompleted,
  onNavigate,
  onConnectTutor,
  onSelectVideoToPlay
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState<'quiz' | 'report'>('quiz');

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return; // Locked once submitted
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleCheckCurrentAnswer = () => {
    setShowExplanation(prev => ({
      ...prev,
      [currentIndex]: true
    }));
  };

  const handleSubmitQuiz = () => {
    // Calculate total score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    setIsSubmitted(true);
    setActiveViewTab('report');
    onQuizCompleted(correctCount, questions.length);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setShowHint({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setActiveViewTab('quiz');
  };

  // Calculate score if submitted
  const score = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="quiz-evaluation-view">
      {/* View Switcher Bar */}
      <div className="tabs-header" style={{ marginBottom: '20px' }}>
        <button
          className={`tab-btn ${activeViewTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveViewTab('quiz')}
        >
          <HelpCircle size={16} />
          <span>Diagnostic Quiz ({Object.keys(selectedAnswers).length}/{questions.length} answered)</span>
        </button>

        <button
          className={`tab-btn ${activeViewTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveViewTab('report')}
        >
          <Brain size={16} />
          <span>Personalized Diagnosis & Explanations</span>
          {isSubmitted && (
            <span className="badge badge-purple" style={{ marginLeft: '4px' }}>
              Score: {percentage}%
            </span>
          )}
        </button>
      </div>

      {activeViewTab === 'quiz' ? (
        /* ================= QUIZ MODE ================= */
        <div className="card">
          {/* Header with question counter and difficulty badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-purple">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className={`badge ${currentQ.difficulty === 'Easy' ? 'badge-green' : currentQ.difficulty === 'Medium' ? 'badge-amber' : 'badge-red'}`}>
                {currentQ.difficulty} Difficulty
              </span>
            </div>

            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Diagnostic Mode
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-track" style={{ marginBottom: '24px', height: '6px' }}>
            <div 
              className="progress-fill purple" 
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '20px', lineHeight: '1.4' }}>
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              const isRevealed = showExplanation[currentIndex] || isSubmitted;
              const isCorrect = optIdx === currentQ.correctIndex;

              let cardBg = 'white';
              let borderColor = 'var(--border-light)';
              let textColor = 'var(--text-main)';

              if (isRevealed) {
                if (isCorrect) {
                  cardBg = '#ECFDF5';
                  borderColor = '#10B981';
                  textColor = '#065F46';
                } else if (isSelected) {
                  cardBg = '#FEF2F2';
                  borderColor = '#EF4444';
                  textColor = '#991B1B';
                }
              } else if (isSelected) {
                cardBg = 'var(--primary-soft)';
                borderColor = 'var(--primary)';
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${borderColor}`,
                    background: cardBg,
                    color: textColor,
                    cursor: isSubmitted ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.15s ease',
                    fontWeight: isSelected ? 700 : 500
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `2px solid ${borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: isSelected ? (isRevealed && !isCorrect ? '#EF4444' : 'var(--primary)') : 'white',
                    color: isSelected ? 'white' : 'var(--text-secondary)',
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span style={{ fontSize: '0.92rem', flex: 1 }}>{option}</span>
                  {isRevealed && isCorrect && <CheckCircle2 size={18} color="#10B981" />}
                  {isRevealed && isSelected && !isCorrect && <XCircle size={18} color="#EF4444" />}
                </div>
              );
            })}
          </div>

          {/* Hint Section */}
          {showHint[currentIndex] && (
            <div style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '18px',
              fontSize: '0.84rem',
              color: '#B45309',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Lightbulb size={18} />
              <div><strong>Hint:</strong> {currentQ.hint}</div>
            </div>
          )}

          {/* Explanation Section */}
          {(showExplanation[currentIndex] || isSubmitted) && (
            <div style={{
              background: selectedAnswers[currentIndex] === currentQ.correctIndex ? '#ECFDF5' : '#FEF2F2',
              border: `1px solid ${selectedAnswers[currentIndex] === currentQ.correctIndex ? '#A7F3D0' : '#FECACA'}`,
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              fontSize: '0.86rem',
              color: selectedAnswers[currentIndex] === currentQ.correctIndex ? '#065F46' : '#991B1B'
            }}>
              <div style={{ fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {selectedAnswers[currentIndex] === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Correct Explanation:</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={16} />
                    <span>Why that answer was incorrect:</span>
                  </>
                )}
              </div>
              <p style={{ lineHeight: '1.5' }}>{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation & Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '18px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={currentIndex === questions.length - 1}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>

              {!showHint[currentIndex] && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowHint(prev => ({ ...prev, [currentIndex]: true }))}
                >
                  <Lightbulb size={14} />
                  <span>Show Hint</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {selectedAnswers[currentIndex] !== undefined && !showExplanation[currentIndex] && !isSubmitted && (
                <button
                  className="btn btn-secondary"
                  onClick={handleCheckCurrentAnswer}
                >
                  Check Answer
                </button>
              )}

              {currentIndex === questions.length - 1 || Object.keys(selectedAnswers).length === questions.length ? (
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < questions.length}
                >
                  <CheckCircle2 size={16} />
                  <span>Complete & Diagnose ({Object.keys(selectedAnswers).length}/{questions.length})</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        /* ================= DIAGNOSIS & EXPLANATIONS REPORT ================= */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Score Header Card */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #FAF8FF 0%, #FFFFFF 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '8px' }}>
                  Diagnostic Report
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Quiz Score: {score} of {questions.length} ({percentage}%)
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
                  {percentage >= 80 
                    ? 'Superb performance! You have strong conceptual foundation.' 
                    : `We identified ${weakConcepts.length} high-yield concepts that caused errors in this diagnostic.`}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={handleResetQuiz}
                >
                  <RotateCcw size={16} />
                  <span>Retake Quiz</span>
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => onNavigate('revision')}
                >
                  <Sparkles size={16} />
                  <span>Open Revision Tools</span>
                </button>
              </div>
            </div>
          </div>

          {/* Identified Weak Topics & "Explain Like I'm 10" Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <AlertTriangle size={20} color="#EF4444" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Targeted Weak Concept Diagnosis & Simple Explanations
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {weakConcepts.map(wc => (
                <div 
                  key={wc.id}
                  className="card"
                  style={{ borderLeft: '5px solid #EF4444' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        {wc.name}
                      </h4>
                      <span className="badge badge-red">
                        {wc.severity} Priority ({wc.accuracyRate}% Diagnostic Accuracy)
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => onNavigate('revision')}
                      >
                        <Brain size={14} color="#6C5CE7" />
                        <span>Practice Flashcard</span>
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => onNavigate('revision')}
                        title="Watch curated YouTube explanation"
                      >
                        <Video size={14} color="#EF4444" />
                        <span>Watch Video Lesson</span>
                      </button>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={onConnectTutor}
                      >
                        <GraduationCap size={14} />
                        <span>Ask Tutor</span>
                      </button>
                    </div>
                  </div>

                  {/* Explain Like I'm 10 Box */}
                  <div style={{
                    background: '#F5F3FF',
                    border: '1px solid #DDD6FE',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#6C5CE7', fontSize: '0.84rem', marginBottom: '6px' }}>
                      <Sparkles size={15} />
                      <span>"Explain Like I'm 10" Simplified Concept:</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                      {wc.simpleExplanation}
                    </p>
                  </div>

                  {/* Real World Analogy */}
                  <div style={{
                    background: '#FFFBEB',
                    border: '1px solid #FDE68A',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#B45309', fontSize: '0.82rem', marginBottom: '4px' }}>
                      <Lightbulb size={15} />
                      <span>Intuitive Real-World Analogy:</span>
                    </div>
                    <p style={{ fontSize: '0.86rem', color: '#78350F', lineHeight: '1.5' }}>
                      {wc.realWorldAnalogy}
                    </p>
                  </div>

                  {/* Common Misconception */}
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: '#EF4444' }}>⚠️ Common Exam Pitfall: </strong>
                    {wc.keyMisconception}
                  </div>

                  {/* Curated Relevant YouTube Video Attachment */}
                  {(() => {
                    const matchingVideo = videos.find(v => v.weakConceptTag === wc.name) || videos[0];
                    if (!matchingVideo) return null;
                    return (
                      <div style={{
                        marginTop: '12px',
                        padding: '10px 14px',
                        background: '#FFF5F5',
                        border: '1px solid #FED7D7',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={matchingVideo.thumbnailUrl}
                            alt={matchingVideo.title}
                            style={{ width: '48px', height: '34px', borderRadius: '4px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1E1B4B' }}>
                              🎬 Relevant Video Lesson: {matchingVideo.title}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#DC2626', fontWeight: 600 }}>
                              {matchingVideo.channelName} • {matchingVideo.duration} • {matchingVideo.keyTimestamps}
                            </div>
                          </div>
                        </div>

                        <button
                          className="btn btn-sm"
                          style={{ background: '#DC2626', color: 'white', gap: '6px' }}
                          onClick={() => {
                            if (onSelectVideoToPlay) {
                              onSelectVideoToPlay(matchingVideo);
                            } else {
                              window.open(matchingVideo.youtubeUrl, '_blank');
                            }
                          }}
                        >
                          <PlayCircle size={14} />
                          <span>Watch Video</span>
                        </button>
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
