import React from 'react';
import { 
  Sparkles, 
  FlaskConical, 
  HelpCircle, 
  TrendingUp, 
  GraduationCap, 
  ArrowRight, 
  Brain, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Calendar,
  BookOpen,
  Video
} from 'lucide-react';
import { StudyTopic, WeakConcept, Tutor, NavigationTab, TutorBooking } from '../types';

interface DashboardOverviewProps {
  currentTopic: StudyTopic;
  weakConcepts: WeakConcept[];
  masteryScore: number;
  flashcardsMasteredCount: number;
  totalFlashcardsCount: number;
  bookings: TutorBooking[];
  featuredTutor?: Tutor;
  onNavigate: (tab: NavigationTab) => void;
  onBookTutor: (tutor: Tutor) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentTopic,
  weakConcepts,
  masteryScore,
  flashcardsMasteredCount,
  totalFlashcardsCount,
  bookings,
  featuredTutor,
  onNavigate,
  onBookTutor
}) => {
  return (
    <div className="dashboard-view">
      {/* Hero Welcome Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={14} />
            <span>AI-Powered Active Learning</span>
          </div>
          <h2 className="hero-title">
            Learn Anything. Teach What You Know. Grow Together.
          </h2>
          <p className="hero-subtitle">
            Upload your rough study notes to instantly generate diagnostic quizzes, pinpoint conceptual blind spots, 
            revise using AI mnemonics & mind maps, and connect with top human tutors.
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigate('learning-lab')}
              style={{ fontWeight: 800 }}
            >
              <FlaskConical size={18} color="#6C5CE7" />
              <span>Launch AI Learning Lab</span>
            </button>
            <button 
              className="btn btn-ghost" 
              style={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
              onClick={() => onNavigate('quiz')}
            >
              <HelpCircle size={18} />
              <span>Take Diagnostic Quiz</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Stat Overview Cards */}
      <section className="grid-4" style={{ marginBottom: '28px' }}>
        <div className="stat-card">
          <div className="stat-icon purple">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-value">{masteryScore}%</div>
            <div className="stat-label">Subject Mastery</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amber">
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="stat-value">{weakConcepts.length}</div>
            <div className="stat-label">Weak Concepts Flagged</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <Layers size={24} />
          </div>
          <div>
            <div className="stat-value">{flashcardsMasteredCount} / {totalFlashcardsCount}</div>
            <div className="stat-label">Flashcards Mastered</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pink">
            <Calendar size={24} />
          </div>
          <div>
            <div className="stat-value">{bookings.length}</div>
            <div className="stat-label">Booked Tutor Demos</div>
          </div>
        </div>
      </section>

      {/* Main Grid: Active Focus & 5-Step Learning Loop */}
      <div className="grid-2" style={{ marginBottom: '28px' }}>
        {/* Active Study Topic Summary Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="badge badge-purple" style={{ marginBottom: '6px' }}>
                {currentTopic.subject} • {currentTopic.difficulty}
              </div>
              <h3 className="card-title">
                <BookOpen size={20} color="#6C5CE7" />
                {currentTopic.title}
              </h3>
            </div>
            <button 
              className="btn btn-sm btn-ghost" 
              onClick={() => onNavigate('learning-lab')}
            >
              Edit Notes
            </button>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.6' }}>
            {currentTopic.summary}
          </p>

          {/* Mastery Progress Bar */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
              <span>Concept Retention Progress</span>
              <span style={{ color: '#6C5CE7' }}>{masteryScore}%</span>
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill purple" 
                style={{ width: `${masteryScore}%` }}
              />
            </div>
          </div>

          {/* Weak Topics Callout */}
          {weakConcepts.length > 0 ? (
            <div style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#B45309', marginBottom: '6px' }}>
                <AlertTriangle size={15} />
                <span>Identified Weak Concepts:</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {weakConcepts.map(wc => (
                  <span 
                    key={wc.id}
                    className="badge badge-red"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate('quiz')}
                    title="Click to view explanation"
                  >
                    {wc.name} ({wc.accuracyRate}% acc)
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#065F46',
              fontSize: '0.84rem'
            }}>
              <CheckCircle2 size={18} color="#10B981" />
              <span>All diagnostic concepts currently mastered! Great job!</span>
            </div>
          )}

          {/* Quick Action Navigation Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={() => onNavigate('quiz')}
            >
              <HelpCircle size={15} color="#6C5CE7" />
              <span>Quiz</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={() => onNavigate('revision')}
            >
              <Brain size={15} color="#6C5CE7" />
              <span>Revision</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={() => onNavigate('videos')}
              style={{ border: '1px solid #FECACA', background: '#FEF2F2', color: '#DC2626' }}
            >
              <Video size={15} color="#DC2626" />
              <span>Videos</span>
            </button>
          </div>
        </div>

        {/* 5-Step Learning Loop Visualizer */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <Sparkles size={20} color="#6C5CE7" />
                The ArivuHub Methodology
              </h3>
              <p className="card-subtitle">How our active feedback cycle turns weak spots into strengths</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
              onClick={() => onNavigate('learning-lab')}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6C5CE7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                1
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>AI Learning Lab</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Paste raw study notes & generate diagnostic questions</div>
              </div>
              <ArrowRight size={16} color="#A29BFE" />
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
              onClick={() => onNavigate('quiz')}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#8A2BE2', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                2
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Personalized Diagnostics</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Spot blind spots with "Explain Like I'm 10" analogies</div>
              </div>
              <ArrowRight size={16} color="#A29BFE" />
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
              onClick={() => onNavigate('revision')}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EC4899', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                3
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Active Revision Suite</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Interactive 3D flashcards, mnemonics & visual mind maps</div>
              </div>
              <ArrowRight size={16} color="#A29BFE" />
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
              onClick={() => onNavigate('progress')}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#10B981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                4
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Targeted Retest & Growth</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Re-evaluate weak areas and measure score delta (+35%)</div>
              </div>
              <ArrowRight size={16} color="#A29BFE" />
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
              onClick={() => onNavigate('tutors')}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3B82F6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                5
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Human Tutor Demo</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Still stuck? Book a free 20-min 1-on-1 expert session</div>
              </div>
              <ArrowRight size={16} color="#A29BFE" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tutor Recommendation */}
      {featuredTutor && (
        <section className="card" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF8FF 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src={featuredTutor.avatar} 
                alt={featuredTutor.name} 
                style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', objectFit: 'cover', border: '3px solid #EDE9FE' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {featuredTutor.name}
                  </h4>
                  <span className="badge badge-green">Recommended for {currentTopic.subject}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {featuredTutor.title} • {featuredTutor.education}
                </p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <span>⭐ {featuredTutor.rating} ({featuredTutor.reviewCount} reviews)</span>
                  <span>• Free 20-Min Demo Session</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => onNavigate('tutors')}
              >
                Browse All Tutors
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => onBookTutor(featuredTutor)}
              >
                <GraduationCap size={16} />
                <span>Book Free Demo</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
