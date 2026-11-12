/**
 * ArivuHub - Core TypeScript Definitions
 * Designed for beginner friendliness and hackathon extensibility
 */

export type NavigationTab = 
  | 'dashboard'
  | 'learning-lab'
  | 'quiz'
  | 'revision'
  | 'videos'
  | 'progress'
  | 'tutors'
  | 'my-bookings';

export interface StudyTopic {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  notesContent: string;
  lastStudied?: string;
  initialMastery: number; // percentage e.g. 55%
}

export interface QuizQuestion {
  id: string;
  conceptKey: string; // connects to WeakConcept
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface WeakConcept {
  id: string;
  name: string;
  topicId: string;
  accuracyRate: number; // e.g. 25%
  severity: 'High' | 'Medium' | 'Low';
  simpleExplanation: string; // "Explain like I'm 10"
  realWorldAnalogy: string;
  keyMisconception: string;
}

export interface Flashcard {
  id: string;
  topicId: string;
  front: string;
  back: string;
  category: string;
  isMastered: boolean;
}

export interface MnemonicItem {
  id: string;
  topicId: string;
  title: string;
  acronym: string;
  meaning: string;
  breakdown: Array<{
    letter: string;
    word: string;
    detail: string;
  }>;
  memoryHook: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  category: string;
  status: 'mastered' | 'review' | 'weak';
  x: number;
  y: number;
  details: string;
  connections: string[];
}

export interface RetestComparison {
  topicId: string;
  diagnosticScore: number;
  retestScore: number;
  improvementDelta: number;
  completedAt: string;
  clearedConcepts: string[];
}

export interface Tutor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  subjects: string[];
  bio: string;
  education: string;
  hourlyRate: number; // 0 for demo
  isDemoFree: boolean;
  availableDays: string[];
  availableSlots: string[];
  badges: string[];
}

export interface TutorBooking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  topicToFocus: string;
  date: string;
  timeSlot: string;
  studentNotes?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  meetingLink: string;
  createdAt: string;
}

export interface VideoReference {
  id: string;
  topicId: string;
  title: string;
  channelName: string;
  duration: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  embedId: string;
  keyTimestamps: string;
  description: string;
  weakConceptTag?: string;
}

