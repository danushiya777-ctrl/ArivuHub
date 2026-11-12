import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  ArrowUpRight, 
  Flame, 
  Zap,
  HelpCircle,
  Clock
} from 'lucide-react';
import { QuizQuestion, WeakConcept, NavigationTab } from '../types';

interface ProgressTrackerProps {
  diagnosticScore: number;
  totalDiagnosticQuestions: number;
  retestQuestions: QuizQuestion[];
  weakConcepts: WeakConcept[];
  onRetestCompleted: (score: number) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  diagnosticScore,
  totalDiagnosticQuestions,
  retestQuestions,
  weakConcepts,
  onRetestCompleted,
  onNavigate
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isRetestSubmitted, setIsRetestSubmitted] = useState(false);
  const [retestScore, setRetestScore] = useState<number | null>(null);

  const initialPercentage = Math.round((diagnosticScore / totalDiagnosticQuestions) * 100);

  const handleSelectRetestOption = (questionIndex: number, optionIndex: number) => {
    if (isRetestSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmitRetest = () => {
    let score = 0;
    retestQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });

    const calculatedPercentage = Math.round((score / retestQuestions.length) * 100);
    setRetestScore(calculatedPercentage);
    setIsRetestSubmitted(true);
    onRetestCompleted(calculatedPercentage);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Graceful fallback if canvas is unavailable
    }
  };

  const handleRetakeRetest = () => {
    setSelectedAnswers({});
    setIsRetestSubmitted(false);
    setRetestScore(null);
  };

  const improvementDelta = retestScore !== null ? retestScore - initialPercentage : null;

  return (
    <div className="progress-tracker-view">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div className="badge badge-purple" style={{ marginBottom: '8px' }}>
          <TrendingUp size={13} />
          <span>Feature 4: Progress Tracking & Retest</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Verify Your Growth with Targeted Retesting
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Compare initial diagnostic scores against follow-up retest performance to prove concept mastery.
        </p>
      </div>

      {/* Comparative Growth Score Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #FAF8FF 0%, #FFFFFF 100%)', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          {/* Diagnostic Initial Score */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              1. Initial Diagnostic Score
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#4B5563' }}>
                {initialPercentage}%
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                ({diagnosticScore}/{totalDiagnosticQuestions} correct)
              </span>
            </div>
            <div className="progress-track" style={{ marginTop: '8px', height: '8px' }}>
              <div 
                className="progress-fill" 
                style={{ width: `${initialPercentage}%`, background: '#9CA3AF' }} 
              />
            </div>
          </div>

          {/* Growth Delta Indicator */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 24px',
            background: isRetestSubmitted && improvementDelta !== null && improvementDelta >= 0 ? '#ECFDF5' : 'var(--primary-soft)',
            border: `1px solid ${isRetestSubmitted && improvementDelta !== null && improvementDelta >= 0 ? '#A7F3D0' : '#DDD6FE'}`,
            borderRadius: 'var(--radius-lg)',
            minWidth: '160px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: isRetestSubmitted ? '#047857' : '#6C5CE7', textTransform: 'uppercase' }}>
              Growth Delta
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: isRetestSubmitted ? '#10B981' : '#6C5CE7' }}>
              {isRetestSubmitted && improvementDelta !== null ? (
                `${improvementDelta >= 0 ? '+' : ''}${improvementDelta}%`
              ) : (
                'Pending Retest'
              )}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {isRetestSubmitted ? 'Verified Mastery Boost' : 'Take retest below'}
            </div>
          </div>

          {/* Retest Follow-up Score */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              2. Follow-Up Retest Score
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 900, color: isRetestSubmitted ? '#10B981' : 'var(--text-muted)' }}>
                {retestScore !== null ? `${retestScore}%` : '--'}
              </span>
              {retestScore !== null && (
                <span className="badge badge-green">
                  ✓ Verified Mastery
                </span>
              )}
            </div>
            <div className="progress-track" style={{ marginTop: '8px', height: '8px' }}>
              <div 
                className="progress-fill green" 
                style={{ width: `${retestScore || 0}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Retest Question Runner */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-header">
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '6px' }}>
              Targeted Retest Assessment
            </span>
            <h3 className="card-title">
              <Sparkles size={20} color="#6C5CE7" />
              Retest on Identified Weak Concepts
            </h3>
            <p className="card-subtitle">
              These 3 questions test whether the simplified explanations and mnemonics helped close your conceptual gaps.
            </p>
          </div>

          {isRetestSubmitted && (
            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleRetakeRetest}
            >
              <RotateCcw size={14} />
              <span>Reset Retest</span>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {retestQuestions.map((q, qIdx) => {
            const isAnswered = selectedAnswers[qIdx] !== undefined;
            const isCorrect = selectedAnswers[qIdx] === q.correctIndex;

            return (
              <div 
                key={q.id}
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)' }}>
                    Question {qIdx + 1}
                  </span>
                  {isRetestSubmitted && (
                    <span className={`badge ${isCorrect ? 'badge-green' : 'badge-red'}`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  )}
                </div>

                <p style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--text-main)', marginBottom: '14px' }}>
                  {q.question}
                </p>

                {/* Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[qIdx] === optIdx;
                    let bg = 'white';
                    let border = 'var(--border-light)';

                    if (isRetestSubmitted) {
                      if (optIdx === q.correctIndex) {
                        bg = '#ECFDF5';
                        border = '#10B981';
                      } else if (isSelected) {
                        bg = '#FEF2F2';
                        border = '#EF4444';
                      }
                    } else if (isSelected) {
                      bg = 'var(--primary-soft)';
                      border = 'var(--primary)';
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectRetestOption(qIdx, optIdx)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          border: `1.5px solid ${border}`,
                          background: bg,
                          cursor: isRetestSubmitted ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.88rem',
                          fontWeight: isSelected ? 700 : 500
                        }}
                      >
                        <span style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: `1.5px solid ${border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: isSelected ? 'var(--primary)' : 'white',
                          color: isSelected ? 'white' : 'var(--text-secondary)'
                        }}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation once submitted */}
                {isRetestSubmitted && (
                  <div style={{
                    marginTop: '12px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: isCorrect ? '#ECFDF5' : '#FEF2F2',
                    fontSize: '0.82rem',
                    color: isCorrect ? '#065F46' : '#991B1B'
                  }}>
                    <strong>{isCorrect ? 'Great job!' : 'Key Takeaway:'}</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Retest Action */}
        {!isRetestSubmitted && (
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={handleSubmitRetest}
              disabled={Object.keys(selectedAnswers).length < retestQuestions.length}
            >
              <CheckCircle2 size={18} />
              <span>Submit Retest & Calculate Growth</span>
            </button>
          </div>
        )}

        {/* Celebratory Post-Retest Banner */}
        {isRetestSubmitted && improvementDelta !== null && (
          <div style={{
            marginTop: '20px',
            padding: '18px 24px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={22} />
                <span>Concept Mastery Verified: +{improvementDelta}% Improvement!</span>
              </div>
              <p style={{ fontSize: '0.86rem', opacity: 0.95, marginTop: '2px' }}>
                You have turned your previously identified weak areas into solid strengths.
              </p>
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => onNavigate('dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>

      {/* Assessment History Log */}
      <div className="card">
        <h4 className="card-title" style={{ fontSize: '1rem', marginBottom: '14px' }}>
          <Clock size={18} color="#6C5CE7" />
          Learning Session Log
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-purple">Diagnostic</span>
              <div>
                <div style={{ fontWeight: 700 }}>Cellular Respiration Diagnostic Quiz</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Identified 2 weak concepts</div>
              </div>
            </div>
            <div style={{ fontWeight: 800, color: '#4B5563' }}>{initialPercentage}% Score</div>
          </div>

          {isRetestSubmitted && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#ECFDF5', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-green">Retest</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#065F46' }}>Targeted Concept Retest</div>
                  <div style={{ fontSize: '0.75rem', color: '#047857' }}>All 2 weak concepts cleared!</div>
                </div>
              </div>
              <div style={{ fontWeight: 800, color: '#10B981' }}>{retestScore}% Score (+{improvementDelta}%)</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
