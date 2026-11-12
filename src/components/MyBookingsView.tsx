import React from 'react';
import { 
  CalendarCheck, 
  Video, 
  Clock, 
  Calendar, 
  Sparkles, 
  Trash2, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { TutorBooking, NavigationTab } from '../types';

interface MyBookingsViewProps {
  bookings: TutorBooking[];
  onCancelBooking: (id: string) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  onCancelBooking,
  onNavigate
}) => {
  return (
    <div className="my-bookings-view">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div className="badge badge-purple" style={{ marginBottom: '8px' }}>
          <CalendarCheck size={13} />
          <span>My Scheduled Sessions</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Your Booked 1-on-1 Learning Demos
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Manage your upcoming mentorship calls and access direct video meeting links.
        </p>
      </div>

      {bookings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookings.map(booking => (
            <div key={booking.id} className="card" style={{ borderLeft: '5px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                {/* Tutor & Topic Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src={booking.tutorAvatar}
                    alt={booking.tutorName}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: 'var(--radius-md)',
                      objectFit: 'cover',
                      border: '2px solid #EDE9FE'
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        {booking.tutorName}
                      </h3>
                      <span className="badge badge-green">✓ Demo Confirmed</span>
                      <span className="badge badge-purple">{booking.subject}</span>
                    </div>

                    <div style={{ fontSize: '0.84rem', color: '#6C5CE7', fontWeight: 700, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={14} />
                      <span>Focus Concept: {booking.topicToFocus}</span>
                    </div>

                    {booking.studentNotes && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Note: "{booking.studentNotes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Date & Time Pill */}
                <div style={{
                  background: 'var(--bg-app)',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'right'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    <Calendar size={14} color="#6C5CE7" />
                    <span>{booking.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', justifyContent: 'flex-end' }}>
                    <Clock size={14} />
                    <span>{booking.timeSlot} (20 min)</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      alert(`Joining session with ${booking.tutorName}!\nMeeting URL: ${booking.meetingLink}`);
                    }}
                  >
                    <Video size={16} />
                    <span>Join Session</span>
                  </button>

                  <button
                    className="btn btn-ghost"
                    onClick={() => onCancelBooking(booking.id)}
                    title="Cancel booking"
                    style={{ color: '#EF4444' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--primary-soft)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <GraduationCap size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            No Tutor Sessions Booked Yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto 20px' }}>
            Browse our verified mentors to book a free 20-minute 1-on-1 demo session and conquer difficult concepts.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('tutors')}
          >
            <GraduationCap size={16} />
            <span>Browse Tutors Now</span>
          </button>
        </div>
      )}
    </div>
  );
};
