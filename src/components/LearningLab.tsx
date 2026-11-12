import React, { useState } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  RotateCcw,
  Zap,
  ArrowRight,
  Layers,
  Info
} from 'lucide-react';
import { StudyTopic, NavigationTab } from '../types';
import { SAMPLE_TOPICS } from '../data/sampleData';

interface LearningLabProps {
  currentTopic: StudyTopic;
  onUpdateTopicNotes: (title: string, subject: string, notes: string) => void;
  onGenerateQuiz: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const LearningLab: React.FC<LearningLabProps> = ({
  currentTopic,
  onUpdateTopicNotes,
  onGenerateQuiz,
  onNavigate
}) => {
  const [title, setTitle] = useState(currentTopic.title);
  const [subject, setSubject] = useState(currentTopic.subject);
  const [notes, setNotes] = useState(currentTopic.notesContent);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [successGenerated, setSuccessGenerated] = useState(false);

  // Quick preset loaders
  const loadPreset = (presetId: string) => {
    const found = SAMPLE_TOPICS.find(t => t.id === presetId);
    if (found) {
      setTitle(found.title);
      setSubject(found.subject);
      setNotes(found.notesContent);
      onUpdateTopicNotes(found.title, found.subject, found.notesContent);
      setSuccessGenerated(false);
    }
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Simulated extraction of study notes file
      setTitle(`Imported Notes: ${file.name.replace(/\.[^/.]+$/, '')}`);
      setNotes(`--- EXTRACTED STUDY NOTES: ${file.name} ---

1. Overview:
- This document contains uploaded study materials for ${file.name}.
- Main topics cover underlying principles, mechanism formulas, and diagnostic edge-cases.

2. Key Concept Checklist:
- Definition & terminology foundation
- Reaction steps, equations, or computational algorithms
- Critical pathways where students most frequently make conceptual mistakes.`);
    }
  };

  const handleGenerateClick = () => {
    if (!notes.trim()) {
      alert('Please paste some study notes first or select a preset sample!');
      return;
    }

    setIsGenerating(true);
    setSuccessGenerated(false);

    // Save changes to current topic
    onUpdateTopicNotes(title, subject, notes);

    // Simulated multi-step AI generation pipeline
    setGenerationStep('Scanning notes and identifying core biological & technical entities...');
    setTimeout(() => {
      setGenerationStep('Synthesizing 5 diagnostic questions targeting common misconceptions...');
      setTimeout(() => {
        setGenerationStep('Formulating answers, distractors, and "Explain Like I\'m 10" analogies...');
        setTimeout(() => {
          setIsGenerating(false);
          setSuccessGenerated(true);
          onGenerateQuiz();
        }, 800);
      }, 900);
    }, 900);
  };

  const wordCount = notes.trim().split(/\s+/).filter(Boolean).length;
  const charCount = notes.length;

  return (
    <div className="learning-lab-view">
      {/* Header section */}
      <div style={{ marginBottom: '24px' }}>
        <div className="badge badge-purple" style={{ marginBottom: '8px' }}>
          <Sparkles size={13} />
          <span>Feature 1: AI Learning Lab</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Synthesize Study Notes into a Diagnostic Quiz
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
          Paste lecture notes, textbook chapters, or bullet points. Our AI engine transforms them into a targeted diagnostic assessment.
        </p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Column: Notes Editor & File Upload */}
        <div className="card">
          {/* Quick preset selector buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              ⚡ Quick Sample Presets:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => loadPreset('topic-bio-1')}
              >
                🧬 Biology
              </button>
              <button 
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => loadPreset('topic-cs-1')}
              >
                💻 JavaScript
              </button>
              <button 
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => loadPreset('topic-phys-1')}
              >
                🚀 Physics
              </button>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => setNotes('')}
                title="Clear notes"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Topic Title & Subject Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Topic Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cellular Respiration & Photosynthesis"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Subject Category
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Biology"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Study Notes Textarea */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Study Notes / Raw Text Content
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {wordCount} words • {charCount} characters
              </span>
            </div>
            <textarea
              rows={12}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your study notes here..."
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                fontSize: '0.86rem',
                lineHeight: '1.6',
                fontFamily: 'inherit',
                resize: 'vertical',
                outline: 'none',
                background: '#FCFBFF'
              }}
            />
          </div>

          {/* File Upload Dropzone Mockup */}
          <div style={{
            border: '2px dashed #C4B5FD',
            borderRadius: 'var(--radius-md)',
            padding: '18px',
            textAlign: 'center',
            background: 'var(--primary-soft)',
            position: 'relative',
            cursor: 'pointer',
            marginBottom: '20px'
          }}>
            <input
              type="file"
              accept=".txt,.pdf,.docx,.md"
              onChange={handleSimulatedFileUpload}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer',
                width: '100%',
                height: '100%'
              }}
            />
            <UploadCloud size={28} color="#6C5CE7" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--primary)' }}>
              Click or drag a file to import notes
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Supports PDF, Markdown, Word (.docx), or plain text (.txt)
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Zap size={16} color="#6C5CE7" />
              <span>Uses ~150 AI Tokens per generation</span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleGenerateClick}
              disabled={isGenerating}
              style={{ minWidth: '240px' }}
            >
              {isGenerating ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <span>AI Analyzing Notes...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Generate Diagnostic Quiz</span>
                </>
              )}
            </button>
          </div>

          {/* Live Generation Progress Card */}
          {isGenerating && (
            <div style={{
              marginTop: '16px',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: '#F5F3FF',
              border: '1px solid #DDD6FE',
              animation: 'fadeIn 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#6C5CE7', fontSize: '0.85rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6C5CE7', animation: 'pulseGlow 1s infinite' }} />
                <span>{generationStep}</span>
              </div>
            </div>
          )}

          {/* Success Banner */}
          {successGenerated && (
            <div style={{
              marginTop: '16px',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={20} color="#10B981" />
                <div>
                  <div style={{ fontWeight: 700, color: '#065F46', fontSize: '0.88rem' }}>
                    Diagnostic Quiz Ready!
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#047857' }}>
                    5 questions formulated to test conceptual clarity and spot weak areas.
                  </div>
                </div>
              </div>

              <button
                className="btn btn-sm btn-primary"
                onClick={() => onNavigate('quiz')}
              >
                <span>Take Quiz Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: AI Model Info & Tips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Diagnostic Quiz Config Card */}
          <div className="card">
            <h4 className="card-title" style={{ fontSize: '0.95rem', marginBottom: '12px' }}>
              <Layers size={18} color="#6C5CE7" />
              Assessment Configuration
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Questions to Generate:</span>
                <span style={{ fontWeight: 700 }}>5 Multiple Choice</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Difficulty Spectrum:</span>
                <span style={{ fontWeight: 700 }}>Adaptive (Easy to Hard)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Diagnostic Objective:</span>
                <span style={{ fontWeight: 700, color: '#6C5CE7' }}>Pinpoint Blind Spots</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>AI Model Target:</span>
                <span style={{ fontWeight: 700 }}>FastAPI + Gemini 1.5</span>
              </div>
            </div>
          </div>

          {/* Tips for Best AI Results */}
          <div className="card" style={{ background: '#FAF9FE' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#6C5CE7', marginBottom: '10px', fontSize: '0.9rem' }}>
              <Info size={16} />
              <span>Hackathon Pro-Tips</span>
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Include key definitions, cause-and-effect steps, and formulas in your notes.</li>
              <li>The diagnostic quiz actively tests edge cases to find what you <em>don't</em> know yet.</li>
              <li>Once you finish the quiz, check the <strong>Personalized Learning</strong> tab to see simplified analogies!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
