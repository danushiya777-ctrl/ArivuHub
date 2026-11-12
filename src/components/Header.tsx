import React from 'react';
import { Menu, Flame, Zap, Sparkles, BookOpen } from 'lucide-react';
import { StudyTopic } from '../types';

interface HeaderProps {
  topics: StudyTopic[];
  selectedTopic: StudyTopic;
  onSelectTopic: (topic: StudyTopic) => void;
  onToggleSidebar: () => void;
  streakDays: number;
  aiCredits: number;
}

export const Header: React.FC<HeaderProps> = ({
  topics,
  selectedTopic,
  onSelectTopic,
  onToggleSidebar,
  streakDays,
  aiCredits
}) => {
  return (
    <header className="top-header">
      <div className="header-left">
        <button 
          className="mobile-menu-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        {/* Current Active Topic Switcher */}
        <div className="active-topic-selector">
          <BookOpen size={16} color="#6C5CE7" />
          <span className="topic-label">Active Topic:</span>
          <select
            className="topic-dropdown"
            value={selectedTopic.id}
            onChange={(e) => {
              const found = topics.find(t => t.id === e.target.value);
              if (found) onSelectTopic(found);
            }}
          >
            {topics.map(t => (
              <option key={t.id} value={t.id}>
                {t.subject}: {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="header-right">
        {/* Streak Pill */}
        <div className="stat-pill streak" title="Keep learning daily to maintain your streak!">
          <Flame size={16} fill="#F97316" color="#F97316" />
          <span>{streakDays} Days</span>
        </div>

        {/* AI Credits Pill */}
        <div className="stat-pill tokens" title="AI Tokens available for notes synthesis & diagnostics">
          <Zap size={15} color="#6C5CE7" />
          <span>{aiCredits.toLocaleString()} AI Tokens</span>
        </div>

        {/* Hackathon Badge */}
        <div className="hackathon-badge">
          <Sparkles size={14} />
          <span>Hackathon Ready</span>
        </div>
      </div>
    </header>
  );
};
