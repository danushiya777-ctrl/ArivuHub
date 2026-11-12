import React, { useState } from 'react';
import { 
  FileText, 
  Brain, 
  Layers, 
  Network, 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  Check,
  Video,
  PlayCircle,
  ExternalLink,
  Clock
} from 'lucide-react';
import { StudyTopic, Flashcard, MnemonicItem, MindMapNode, VideoReference } from '../types';

interface RevisionToolsProps {
  currentTopic: StudyTopic;
  flashcards: Flashcard[];
  mnemonics: MnemonicItem[];
  mindMapNodes: MindMapNode[];
  videos: VideoReference[];
  initialSubTab?: 'flashcards' | 'mnemonics' | 'mindmap' | 'notes' | 'videos';
  onToggleFlashcardMastery: (id: string) => void;
  onSelectVideoToPlay?: (video: VideoReference) => void;
}

export const RevisionTools: React.FC<RevisionToolsProps> = ({
  currentTopic,
  flashcards,
  mnemonics,
  mindMapNodes,
  videos,
  initialSubTab = 'flashcards',
  onToggleFlashcardMastery,
  onSelectVideoToPlay
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'flashcards' | 'mnemonics' | 'mindmap' | 'notes' | 'videos'>(initialSubTab);

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mind map selected node state
  const [selectedMindMapNode, setSelectedMindMapNode] = useState<MindMapNode>(mindMapNodes[0] || null);

  const activeFlashcard = flashcards[currentCardIndex];
  const masteredCount = flashcards.filter(f => f.isMastered).length;

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="revision-tools-view">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div className="badge badge-purple" style={{ marginBottom: '8px' }}>
          <Sparkles size={13} />
          <span>Feature 3: AI Revision Suite</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Multi-Modal Active Recall & Revision Tools
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Reinforce weak concepts using interactive 3D flashcards, memorable mnemonics, visual mind maps, and curated YouTube video explanations.
        </p>
      </div>

      {/* Sub-tab Navigation Bar */}
      <div className="tabs-header">
        <button
          className={`tab-btn ${activeSubTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => { setActiveSubTab('flashcards'); setIsFlipped(false); }}
        >
          <Layers size={16} />
          <span>3D Flashcards ({masteredCount}/{flashcards.length})</span>
        </button>

        <button
          className={`tab-btn ${activeSubTab === 'mnemonics' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('mnemonics')}
        >
          <Brain size={16} />
          <span>Mnemonics & Memory Hooks</span>
        </button>

        <button
          className={`tab-btn ${activeSubTab === 'mindmap' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('mindmap')}
        >
          <Network size={16} />
          <span>Interactive Mind Map</span>
        </button>

        <button
          className={`tab-btn ${activeSubTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('videos')}
        >
          <Video size={16} />
          <span>YouTube Video Lessons ({videos.length})</span>
        </button>

        <button
          className={`tab-btn ${activeSubTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('notes')}
        >
          <FileText size={16} />
          <span>High-Yield Revision Notes</span>
        </button>
      </div>


      {/* ================= 1. FLASHCARDS TAB ================= */}
      {activeSubTab === 'flashcards' && activeFlashcard && (
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {/* Card counter & mastery pill */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Flashcard {currentCardIndex + 1} of {flashcards.length}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`badge ${activeFlashcard.isMastered ? 'badge-green' : 'badge-amber'}`}>
                {activeFlashcard.isMastered ? '✓ Mastered' : 'Needs Review'}
              </span>
              <span className="badge badge-purple">{activeFlashcard.category}</span>
            </div>
          </div>

          {/* Interactive 3D Flip Card */}
          <div 
            className="flashcard-perspective"
            onClick={() => setIsFlipped(prev => !prev)}
            title="Click anywhere on the card to flip!"
          >
            <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
              {/* Front Face */}
              <div className="flashcard-face flashcard-front">
                <span className="badge badge-purple" style={{ marginBottom: '16px' }}>
                  Prompt / Question
                </span>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.5', textAlign: 'center' }}>
                  {activeFlashcard.front}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '24px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <RotateCw size={14} />
                  <span>Click card to reveal answer</span>
                </div>
              </div>

              {/* Back Face */}
              <div className="flashcard-face flashcard-back">
                <span className="badge badge-green" style={{ marginBottom: '16px' }}>
                  Core Answer & Mechanism
                </span>
                <p style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1E1B4B', lineHeight: '1.6', textAlign: 'center', whiteSpace: 'pre-line' }}>
                  {activeFlashcard.back}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '24px', fontSize: '0.78rem', color: '#6C5CE7', fontWeight: 600 }}>
                  <RotateCw size={14} />
                  <span>Click to flip back</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flashcard Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
            <button 
              className="btn btn-secondary"
              onClick={handlePrevCard}
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <button
              className={`btn ${activeFlashcard.isMastered ? 'btn-secondary' : 'btn-success'}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFlashcardMastery(activeFlashcard.id);
              }}
            >
              <Check size={16} />
              <span>{activeFlashcard.isMastered ? 'Mark as Needs Review' : 'Mark as Mastered'}</span>
            </button>

            <button 
              className="btn btn-secondary"
              onClick={handleNextCard}
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ================= 2. MNEMONICS TAB ================= */}
      {activeSubTab === 'mnemonics' && (
        <div className="grid-2">
          {mnemonics.map(m => (
            <div key={m.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-purple">{m.title}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>AI Memory Hook</span>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #6C5CE7, #8A2BE2)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'center',
                marginBottom: '16px',
                boxShadow: '0 4px 14px rgba(108, 92, 231, 0.25)'
              }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '0.08em' }}>
                  {m.acronym}
                </div>
                <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '2px' }}>
                  {m.meaning}
                </div>
              </div>

              {/* Breakdown steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {m.breakdown.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      background: 'var(--bg-app)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <span style={{ fontWeight: 800, color: 'var(--primary)', minWidth: '48px', fontSize: '0.85rem' }}>
                      {item.letter}
                    </span>
                    <div style={{ fontSize: '0.82rem' }}>
                      <strong style={{ color: 'var(--text-main)' }}>{item.word}: </strong>
                      <span style={{ color: 'var(--text-secondary)' }}>{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Memory hook callout */}
              <div style={{
                background: '#FFFBEB',
                border: '1px solid #FDE68A',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                color: '#B45309',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={16} style={{ flexShrink: 0 }} />
                <div><strong>Memory Anchor:</strong> {m.memoryHook}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= 3. MIND MAP TAB ================= */}
      {activeSubTab === 'mindmap' && (
        <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Interactive SVG Canvas */}
          <div className="card" style={{ padding: '16px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-purple">Interactive Concept Map</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Click any node to inspect</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.72rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} /> Mastered
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} /> Review
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} /> Weak Spot
                </span>
              </div>
            </div>

            <svg 
              viewBox="0 0 640 400" 
              style={{ width: '100%', height: 'auto', background: '#FAF9FF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}
            >
              {/* Connecting Lines */}
              {mindMapNodes.map(node => {
                return node.connections.map(targetId => {
                  const target = mindMapNodes.find(n => n.id === targetId);
                  if (!target) return null;
                  return (
                    <line
                      key={`${node.id}-${target.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="#DDD6FE"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                  );
                });
              })}

              {/* Render Nodes */}
              {mindMapNodes.map(node => {
                const isSelected = selectedMindMapNode?.id === node.id;
                let fillColor = '#10B981';
                if (node.status === 'review') fillColor = '#F59E0B';
                if (node.status === 'weak') fillColor = '#EF4444';

                return (
                  <g 
                    key={node.id} 
                    className="mindmap-node"
                    onClick={() => setSelectedMindMapNode(node)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Pulsing selection aura */}
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="34"
                        fill="none"
                        stroke="#6C5CE7"
                        strokeWidth="3"
                        strokeDasharray="4 3"
                        opacity="0.8"
                      />
                    )}

                    {/* Outer Circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="26"
                      fill={fillColor}
                      stroke="white"
                      strokeWidth="3"
                      style={{
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))',
                        transition: 'all 0.2s ease'
                      }}
                    />

                    {/* Node Text Label */}
                    <text
                      x={node.x}
                      y={node.y + 40}
                      textAnchor="middle"
                      fill="#1E1B4B"
                      fontSize="11"
                      fontWeight="700"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node Detail Inspector Drawer */}
          <div className="card">
            {selectedMindMapNode ? (
              <div>
                <div className="badge badge-purple" style={{ marginBottom: '8px' }}>
                  {selectedMindMapNode.category} Node
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                  {selectedMindMapNode.label}
                </h3>

                <div style={{ marginBottom: '14px' }}>
                  <span className={`badge ${selectedMindMapNode.status === 'mastered' ? 'badge-green' : selectedMindMapNode.status === 'review' ? 'badge-amber' : 'badge-red'}`}>
                    Status: {selectedMindMapNode.status.toUpperCase()}
                  </span>
                </div>

                <div style={{
                  background: 'var(--bg-app)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.86rem',
                  lineHeight: '1.5',
                  color: 'var(--text-secondary)',
                  marginBottom: '16px'
                }}>
                  {selectedMindMapNode.details}
                </div>

                {selectedMindMapNode.status === 'weak' && (
                  <div style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    color: '#991B1B',
                    marginBottom: '16px'
                  }}>
                    <strong>⚠️ Diagnostic Alert:</strong> This concept showed the highest error rate during your last diagnostic quiz.
                  </div>
                )}

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Connected to {selectedMindMapNode.connections.length} other conceptual pathways.
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <Info size={32} style={{ margin: '0 auto 8px' }} />
                <p>Click on any node in the concept graph to view detailed breakdown</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= 4. REVISION NOTES TAB ================= */}
      {activeSubTab === 'notes' && (
        <div className="card">
          <div className="card-header">
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '6px' }}>
                AI Synthesized Summary
              </span>
              <h3 className="card-title">{currentTopic.title}</h3>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                navigator.clipboard.writeText(currentTopic.notesContent);
                alert('Revision notes copied to clipboard!');
              }}
            >
              Copy Notes
            </button>
          </div>

          <div style={{
            background: '#FCFBFF',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            fontSize: '0.9rem',
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
            color: 'var(--text-main)',
            fontFamily: 'inherit'
          }}>
            {currentTopic.notesContent}
          </div>
        </div>
      )}

      {/* ================= 5. YOUTUBE VIDEO LESSONS TAB ================= */}
      {activeSubTab === 'videos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #FAF8FF 0%, #EDE9FE 100%)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #DDD6FE'
          }}>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Video size={18} color="#6C5CE7" />
                <span>Curated Educational YouTube References</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Hand-picked, high-yield video explanations from trusted creators (Khan Academy, CrashCourse, Amoeba Sisters, Fireship) aligned directly with your diagnostic weak spots.
              </p>
            </div>
          </div>

          <div className="grid-2">
            {videos.map(video => (
              <div key={video.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
                {/* Video Thumbnail & Duration Bar */}
                <div style={{ position: 'relative', width: '100%', height: '170px', background: '#1E1B4B' }}>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <button
                      type="button"
                      onClick={() => onSelectVideoToPlay ? onSelectVideoToPlay(video) : window.open(video.youtubeUrl, '_blank')}
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.95)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#EF4444',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                        transition: 'transform 0.2s ease',
                        cursor: 'pointer'
                      }}
                      title="Play Video"
                    >
                      <PlayCircle size={32} />
                    </button>
                  </div>

                  {/* Duration Pill */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '12px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 7px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Clock size={12} />
                    <span>{video.duration}</span>
                  </div>

                  {/* Channel Tag */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#1E1B4B',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {video.channelName}
                  </div>
                </div>

                {/* Content Details */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {video.weakConceptTag && (
                    <span className="badge badge-red" style={{ alignSelf: 'flex-start', marginBottom: '8px' }}>
                      ⚠️ Targets Weak Area: {video.weakConceptTag}
                    </span>
                  )}

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px', lineHeight: '1.4' }}>
                    {video.title}
                  </h4>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px', flex: 1 }}>
                    {video.description}
                  </p>

                  {/* Key Timestamps Pill */}
                  <div style={{
                    background: 'var(--bg-app)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    color: '#6C5CE7',
                    fontWeight: 600,
                    marginBottom: '14px'
                  }}>
                    ⏱️ Key Segments: {video.keyTimestamps}
                  </div>

                  {/* Watch Link */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: '100%', gap: '8px' }}
                    onClick={() => onSelectVideoToPlay ? onSelectVideoToPlay(video) : window.open(video.youtubeUrl, '_blank')}
                  >
                    <PlayCircle size={16} />
                    <span>Watch Video Lesson</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

