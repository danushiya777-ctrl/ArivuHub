import React from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  HelpCircle, 
  Sparkles, 
  TrendingUp, 
  GraduationCap, 
  CalendarCheck,
  Zap,
  Flame,
  Award,
  Video
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  isOpen: boolean;
  onClose: () => void;
  weakTopicsCount: number;
  bookingsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
  weakTopicsCount,
  bookingsCount
}) => {
  const handleNavClick = (tab: NavigationTab) => {
    onTabChange(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 35 }} 
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-icon-wrapper">
            <Zap size={22} fill="currentColor" />
          </div>
          <div className="brand-text">
            <h1>
              ArivuHub
            </h1>
            <p className="brand-tagline">Learn. Teach. Grow Together.</p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="sidebar-nav">
          <span className="nav-section-label">Core Platform</span>

          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavClick('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'learning-lab' ? 'active' : ''}`}
            onClick={() => handleNavClick('learning-lab')}
          >
            <FlaskConical size={18} />
            <span>AI Learning Lab</span>
            <span className="nav-badge">New</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => handleNavClick('quiz')}
          >
            <HelpCircle size={18} />
            <span>Personalized Quiz</span>
            {weakTopicsCount > 0 && (
              <span className="nav-badge" style={{ background: '#FEF2F2', color: '#EF4444' }}>
                {weakTopicsCount} Weak
              </span>
            )}
          </button>

          <button
            className={`nav-item ${activeTab === 'revision' ? 'active' : ''}`}
            onClick={() => handleNavClick('revision')}
          >
            <Sparkles size={18} />
            <span>Revision Tools</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => handleNavClick('videos')}
          >
            <Video size={18} />
            <span>Video Lessons</span>
            <span className="nav-badge" style={{ background: '#FEE2E2', color: '#DC2626' }}>
              YouTube
            </span>
          </button>

          <button
            className={`nav-item ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => handleNavClick('progress')}
          >
            <TrendingUp size={18} />
            <span>Progress & Retest</span>
          </button>


          <span className="nav-section-label">Human Mentorship</span>

          <button
            className={`nav-item ${activeTab === 'tutors' ? 'active' : ''}`}
            onClick={() => handleNavClick('tutors')}
          >
            <GraduationCap size={18} />
            <span>Find a Tutor</span>
            <span className="nav-badge" style={{ background: '#ECFDF5', color: '#10B981' }}>
              Free Demo
            </span>
          </button>

          <button
            className={`nav-item ${activeTab === 'my-bookings' ? 'active' : ''}`}
            onClick={() => handleNavClick('my-bookings')}
          >
            <CalendarCheck size={18} />
            <span>Booked Sessions</span>
            {bookingsCount > 0 && (
              <span className="nav-badge">{bookingsCount}</span>
            )}
          </button>

          {/* Hackathon Demo Highlight Box */}
          <div style={{
            marginTop: 'auto',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(145deg, #F5F3FF, #EDE9FE)',
            border: '1px dashed #C4B5FD',
            fontSize: '0.78rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#6C5CE7', marginBottom: '4px' }}>
              <Award size={16} />
              <span>Hackathon Prototype</span>
            </div>
            <p style={{ color: '#5B587B', lineHeight: '1.4' }}>
              Full frontend simulator with interactive quizzes, smart flashcards, mind maps & tutor booking!
            </p>
          </div>
        </nav>

        {/* User Mini Profile */}
        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="user-avatar">DA</div>
            <div className="user-info">
              <div className="user-name">Danus Student</div>
              <div className="user-role" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={12} color="#F97316" />
                <span>4-Day Learning Streak</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
