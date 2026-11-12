import React, { useState } from 'react';
import { 
  Search, 
  GraduationCap, 
  Star, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  BookOpen
} from 'lucide-react';
import { Tutor } from '../types';

interface TutorFinderProps {
  tutors: Tutor[];
  onSelectTutorToBook: (tutor: Tutor) => void;
}

export const TutorFinder: React.FC<TutorFinderProps> = ({
  tutors,
  onSelectTutorToBook
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const subjects = ['All', 'Biology', 'Computer Science', 'Physics'];

  const filteredTutors = tutors.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || t.subjects.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="tutor-finder-view">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div className="badge badge-purple" style={{ marginBottom: '8px' }}>
          <GraduationCap size={13} />
          <span>Feature 5: Human Tutor Network</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Connect with Expert Tutors for 1-on-1 Guidance
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          When AI explanations aren't enough, book a <strong>free 20-minute demo session</strong> with vetted academic mentors.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          {/* Search input */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by tutor name, subject (e.g. Biology, CS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 42px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
                fontSize: '0.88rem',
                outline: 'none',
                background: 'var(--bg-app)'
              }}
            />
          </div>

          {/* Subject Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {subjects.map(s => (
              <button
                key={s}
                className={`btn btn-sm ${selectedSubject === s ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedSubject(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tutor Cards Grid */}
      <div className="grid-2">
        {filteredTutors.map(tutor => (
          <div key={tutor.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Tutor Header */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <img
                src={tutor.avatar}
                alt={tutor.name}
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: 'var(--radius-lg)',
                  objectFit: 'cover',
                  border: '2px solid #EDE9FE',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {tutor.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 700, color: '#D97706' }}>
                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                    <span>{tutor.rating}</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.76rem' }}>
                      ({tutor.reviewCount})
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.84rem', color: '#6C5CE7', fontWeight: 600, marginTop: '2px' }}>
                  {tutor.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {tutor.education}
                </div>
              </div>
            </div>

            {/* Badges & Subjects */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
              {tutor.subjects.map((sub, idx) => (
                <span key={idx} className="badge badge-purple">
                  {sub}
                </span>
              ))}
              {tutor.badges.map((badge, idx) => (
                <span key={idx} className="badge badge-green">
                  <ShieldCheck size={12} />
                  {badge}
                </span>
              ))}
            </div>

            {/* Bio text */}
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              marginBottom: '16px',
              flex: 1
            }}>
              {tutor.bio}
            </p>

            {/* Availability details */}
            <div style={{
              background: 'var(--bg-app)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '18px',
              fontSize: '0.78rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)', fontWeight: 700, marginBottom: '4px' }}>
                <Calendar size={14} color="#6C5CE7" />
                <span>Available Days: {tutor.availableDays.join(', ')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                <Clock size={14} />
                <span>Next Slots: {tutor.availableSlots.join(' • ')}</span>
              </div>
            </div>

            {/* Pricing & Booking Action */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '14px',
              borderTop: '1px solid var(--border-light)',
              marginTop: 'auto'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Introductory Offer
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10B981' }}>
                  $0 Free Demo <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>({tutor.hourlyRate}/hr afterwards)</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => onSelectTutorToBook(tutor)}
              >
                <GraduationCap size={16} />
                <span>Book Free Demo</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
