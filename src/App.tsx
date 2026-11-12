import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { LearningLab } from './components/LearningLab';
import { QuizEvaluation } from './components/QuizEvaluation';
import { RevisionTools } from './components/RevisionTools';
import { ProgressTracker } from './components/ProgressTracker';
import { TutorFinder } from './components/TutorFinder';
import { MyBookingsView } from './components/MyBookingsView';
import { BookingModal } from './components/BookingModal';
import { VideoModal } from './components/VideoModal';

import { 
  SAMPLE_TOPICS, 
  SAMPLE_QUIZ_QUESTIONS, 
  SAMPLE_WEAK_CONCEPTS, 
  SAMPLE_FLASHCARDS, 
  SAMPLE_MNEMONICS, 
  SAMPLE_MINDMAP_NODES, 
  SAMPLE_RETEST_QUESTIONS, 
  SAMPLE_TUTORS, 
  INITIAL_BOOKINGS,
  SAMPLE_VIDEOS 
} from './data/sampleData';
import { NavigationTab, StudyTopic, Tutor, TutorBooking, Flashcard, WeakConcept, VideoReference } from './types';

export const App: React.FC = () => {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Topics and Active Selection
  const [topics, setTopics] = useState<StudyTopic[]>(SAMPLE_TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<StudyTopic>(SAMPLE_TOPICS[0]);

  // Topic-specific data states
  const [flashcards, setFlashcards] = useState<Flashcard[]>(
    SAMPLE_FLASHCARDS[selectedTopic.id] || SAMPLE_FLASHCARDS['topic-bio-1']
  );
  const [weakConcepts, setWeakConcepts] = useState<WeakConcept[]>(
    SAMPLE_WEAK_CONCEPTS[selectedTopic.id] || SAMPLE_WEAK_CONCEPTS['topic-bio-1']
  );
  const [diagnosticScore, setDiagnosticScore] = useState<number>(3); // 3 of 5 initially
  const [masteryScore, setMasteryScore] = useState<number>(selectedTopic.initialMastery);

  // Tutors & Bookings State
  const [tutors] = useState<Tutor[]>(SAMPLE_TUTORS);
  const [bookings, setBookings] = useState<TutorBooking[]>(INITIAL_BOOKINGS);
  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState<Tutor | null>(null);
  const [activeVideoForModal, setActiveVideoForModal] = useState<VideoReference | null>(null);

  // Streak & Credits
  const [streakDays] = useState(4);
  const [aiCredits, setAiCredits] = useState(2450);

  // Switch topic handler
  const handleSelectTopic = (topic: StudyTopic) => {
    setSelectedTopic(topic);
    setFlashcards(SAMPLE_FLASHCARDS[topic.id] || SAMPLE_FLASHCARDS['topic-bio-1']);
    setWeakConcepts(SAMPLE_WEAK_CONCEPTS[topic.id] || []);
    setMasteryScore(topic.initialMastery);
  };

  // Update notes from Learning Lab
  const handleUpdateTopicNotes = (title: string, subject: string, notes: string) => {
    setTopics(prev => prev.map(t => {
      if (t.id === selectedTopic.id) {
        return { ...t, title, subject, notesContent: notes };
      }
      return t;
    }));
    setSelectedTopic(prev => ({
      ...prev,
      title,
      subject,
      notesContent: notes
    }));
  };

  // Quiz completed callback
  const handleQuizCompleted = (score: number, total: number) => {
    setDiagnosticScore(score);
    const calculatedPercentage = Math.round((score / total) * 100);
    setMasteryScore(calculatedPercentage);
    setAiCredits(prev => Math.max(0, prev - 150));
  };

  // Retest completed callback (boosts mastery!)
  const handleRetestCompleted = (retestPercentage: number) => {
    const newMastery = Math.min(100, Math.round((masteryScore + retestPercentage) / 2));
    setMasteryScore(newMastery);
    // Mark weak concepts as resolved
    setWeakConcepts(prev => prev.map(w => ({ ...w, severity: 'Low', accuracyRate: 90 })));
  };

  // Flashcard mastery toggle
  const handleToggleFlashcardMastery = (id: string) => {
    setFlashcards(prev => prev.map(f => {
      if (f.id === id) {
        return { ...f, isMastered: !f.isMastered };
      }
      return f;
    }));
  };

  // Tutor Booking handlers
  const handleConfirmBooking = (newBooking: TutorBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this demo session?')) {
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    }
  };

  const questions = SAMPLE_QUIZ_QUESTIONS[selectedTopic.id] || SAMPLE_QUIZ_QUESTIONS['topic-bio-1'];
  const mnemonics = SAMPLE_MNEMONICS[selectedTopic.id] || SAMPLE_MNEMONICS['topic-bio-1'];
  const mindMapNodes = SAMPLE_MINDMAP_NODES[selectedTopic.id] || SAMPLE_MINDMAP_NODES['topic-bio-1'];
  const retestQuestions = SAMPLE_RETEST_QUESTIONS[selectedTopic.id] || SAMPLE_RETEST_QUESTIONS['topic-bio-1'];
  const videos = SAMPLE_VIDEOS[selectedTopic.id] || SAMPLE_VIDEOS['topic-bio-1'];
  const flashcardsMasteredCount = flashcards.filter(f => f.isMastered).length;

  return (
    <div className="app-container">
      {/* Responsive Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        weakTopicsCount={weakConcepts.length}
        bookingsCount={bookings.length}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Sticky Top Header */}
        <Header
          topics={topics}
          selectedTopic={selectedTopic}
          onSelectTopic={handleSelectTopic}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
          streakDays={streakDays}
          aiCredits={aiCredits}
        />

        {/* Dynamic Page Views */}
        <main className="page-content">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              currentTopic={selectedTopic}
              weakConcepts={weakConcepts}
              masteryScore={masteryScore}
              flashcardsMasteredCount={flashcardsMasteredCount}
              totalFlashcardsCount={flashcards.length}
              bookings={bookings}
              featuredTutor={tutors[0]}
              onNavigate={(tab) => setActiveTab(tab)}
              onBookTutor={(tutor) => setSelectedTutorForBooking(tutor)}
            />
          )}

          {activeTab === 'learning-lab' && (
            <LearningLab
              currentTopic={selectedTopic}
              onUpdateTopicNotes={handleUpdateTopicNotes}
              onGenerateQuiz={() => {
                setAiCredits(prev => Math.max(0, prev - 150));
              }}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizEvaluation
              questions={questions}
              weakConcepts={weakConcepts}
              videos={videos}
              onQuizCompleted={handleQuizCompleted}
              onNavigate={(tab) => setActiveTab(tab)}
              onConnectTutor={() => {
                setSelectedTutorForBooking(tutors[0]);
              }}
              onSelectVideoToPlay={(vid) => setActiveVideoForModal(vid)}
            />
          )}

          {activeTab === 'revision' && (
            <RevisionTools
              currentTopic={selectedTopic}
              flashcards={flashcards}
              mnemonics={mnemonics}
              mindMapNodes={mindMapNodes}
              videos={videos}
              initialSubTab="flashcards"
              onToggleFlashcardMastery={handleToggleFlashcardMastery}
              onSelectVideoToPlay={(vid) => setActiveVideoForModal(vid)}
            />
          )}

          {activeTab === 'videos' && (
            <RevisionTools
              currentTopic={selectedTopic}
              flashcards={flashcards}
              mnemonics={mnemonics}
              mindMapNodes={mindMapNodes}
              videos={videos}
              initialSubTab="videos"
              onToggleFlashcardMastery={handleToggleFlashcardMastery}
              onSelectVideoToPlay={(vid) => setActiveVideoForModal(vid)}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressTracker
              diagnosticScore={diagnosticScore}
              totalDiagnosticQuestions={questions.length}
              retestQuestions={retestQuestions}
              weakConcepts={weakConcepts}
              onRetestCompleted={handleRetestCompleted}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'tutors' && (
            <TutorFinder
              tutors={tutors}
              onSelectTutorToBook={(tutor) => setSelectedTutorForBooking(tutor)}
            />
          )}

          {activeTab === 'my-bookings' && (
            <MyBookingsView
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}
        </main>
      </div>

      {/* Booking Modal */}
      {selectedTutorForBooking && (
        <BookingModal
          tutor={selectedTutorForBooking}
          weakConcepts={weakConcepts}
          onClose={() => setSelectedTutorForBooking(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Interactive YouTube Video Player Modal */}
      {activeVideoForModal && (
        <VideoModal
          video={activeVideoForModal}
          onClose={() => setActiveVideoForModal(null)}
        />
      )}
    </div>
  );
};

export default App;
