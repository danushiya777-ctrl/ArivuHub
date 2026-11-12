import React, { useState } from 'react';
import { X, Calendar, Clock, GraduationCap, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { Tutor, TutorBooking, WeakConcept } from '../types';

interface BookingModalProps {
  tutor: Tutor | null;
  weakConcepts: WeakConcept[];
  onClose: () => void;
  onConfirmBooking: (booking: TutorBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tutor,
  weakConcepts,
  onClose,
  onConfirmBooking
}) => {
  if (!tutor) return null;

  const [selectedDate, setSelectedDate] = useState('Tomorrow, 5:30 PM');
  const [selectedSlot, setSelectedSlot] = useState(tutor.availableSlots[0] || '5:00 PM');
  const [selectedWeakConcept, setSelectedWeakConcept] = useState(weakConcepts[0]?.name || 'General Concept Review');
  const [studentNotes, setStudentNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const dates = [
    'Tomorrow, Oct 20',
    'Wednesday, Oct 21',
    'Thursday, Oct 22',
    'Saturday, Oct 24'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking: TutorBooking = {
      id: `booking-${Date.now()}`,
      tutorId: tutor.id,
      tutorName: tutor.name,
      tutorAvatar: tutor.avatar,
      subject: tutor.subjects[0] || 'General',
      topicToFocus: selectedWeakConcept,
      date: selectedDate,
      timeSlot: selectedSlot,
      studentNotes: studentNotes.trim() || 'Focus on diagnostic weak concepts identified by ArivuHub.',
      status: 'Confirmed',
      meetingLink: `https://meet.arivuhub.ai/session/${tutor.id}-${Date.now().toString().slice(-4)}`,
      createdAt: 'Just now'
    };

    setIsSuccess(true);
    setTimeout(() => {
      onConfirmBooking(newBooking);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '6px',
            borderRadius: '50%',
            background: 'var(--bg-app)',
            color: 'var(--text-secondary)'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleBookingSubmit}>
            {/* Modal Title & Tutor Snapshot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <img 
                src={tutor.avatar} 
                alt={tutor.name}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #DDD6FE' }}
              />
              <div>
                <span className="badge badge-green" style={{ marginBottom: '4px' }}>
                  ✓ 100% Free 20-Min Demo
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Book Demo with {tutor.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {tutor.title}
                </p>
              </div>
            </div>

            {/* Select Date */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Select Preferred Date:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {dates.map((d, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${selectedDate === d ? 'var(--primary)' : 'var(--border-light)'}`,
                      background: selectedDate === d ? 'var(--primary-soft)' : 'white',
                      fontWeight: selectedDate === d ? 700 : 500,
                      fontSize: '0.82rem',
                      textAlign: 'center',
                      color: selectedDate === d ? 'var(--primary)' : 'var(--text-main)'
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Time Slot */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <Clock size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Available Time Slots:
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {tutor.availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-full)',
                      border: `1.5px solid ${selectedSlot === slot ? 'var(--primary)' : 'var(--border-light)'}`,
                      background: selectedSlot === slot ? 'var(--primary)' : 'white',
                      color: selectedSlot === slot ? 'white' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.8rem'
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Concept to Focus On */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Weak Concept to Tackle in this Session:
              </label>
              <select
                value={selectedWeakConcept}
                onChange={(e) => setSelectedWeakConcept(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.86rem',
                  fontWeight: 600
                }}
              >
                {weakConcepts.map(wc => (
                  <option key={wc.id} value={wc.name}>
                    ⚠️ {wc.name} ({wc.accuracyRate}% Diagnostic Accuracy)
                  </option>
                ))}
                <option value="General Revision & Exam Prep">General Revision & Exam Prep</option>
              </select>
            </div>

            {/* Optional Student Note */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <MessageSquare size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Questions for the Tutor (Optional):
              </label>
              <textarea
                rows={3}
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                placeholder="e.g. I need help understanding why oxygen blockage halts ATP synthesis."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.84rem'
                }}
              />
            </div>

            {/* Confirm CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Session Fee:</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10B981' }}>
                  $0.00 (Free Demo)
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg">
                <GraduationCap size={18} />
                <span>Confirm Demo Booking</span>
              </button>
            </div>
          </form>
        ) : (
          /* Celebratory Confirmation State */
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#ECFDF5',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
              Demo Session Confirmed!
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              You are booked with {tutor.name} for {selectedDate} at {selectedSlot}.
            </p>
            <div className="badge badge-purple" style={{ marginTop: '12px' }}>
              Adding to "Booked Sessions"...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
