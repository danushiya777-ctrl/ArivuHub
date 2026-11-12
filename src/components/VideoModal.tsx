import React from 'react';
import { X, ExternalLink, Clock, Sparkles, Video, PlayCircle } from 'lucide-react';
import { VideoReference } from '../types';

interface VideoModalProps {
  video: VideoReference | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 110 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', padding: '24px' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '8px',
            borderRadius: '50%',
            background: 'var(--bg-app)',
            color: 'var(--text-secondary)',
            zIndex: 10
          }}
          aria-label="Close video player"
        >
          <X size={20} />
        </button>

        {/* Video Player Header */}
        <div style={{ marginBottom: '16px', paddingRight: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-red" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Video size={14} />
              <span>{video.channelName}</span>
            </span>
            {video.weakConceptTag && (
              <span className="badge badge-purple">
                Fixes: {video.weakConceptTag}
              </span>
            )}
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} />
              <span>{video.duration}</span>
            </span>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: '1.3' }}>
            {video.title}
          </h3>
        </div>

        {/* Embedded YouTube Iframe */}
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%', /* 16:9 aspect ratio */
          height: 0,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: '#000',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '18px'
        }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.embedId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
          />
        </div>

        {/* Description & Key Timestamps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {video.description}
          </p>

          <div style={{
            background: 'var(--bg-app)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8rem',
            color: '#6C5CE7',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={16} style={{ flexShrink: 0 }} />
            <span>Key Video Chapters: {video.keyTimestamps}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Source: YouTube Education Partner Network
            </span>

            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
            >
              <span>Open directly on YouTube</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
