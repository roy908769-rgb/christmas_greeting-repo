import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PlayOverlay({ onPlay }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, rgba(2,6,23,0.85), rgba(2,6,23,0.95))',
      zIndex: 9999
    }}>
      <button
        onClick={onPlay}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '28px 56px',
          fontSize: '1.6rem',
          borderRadius: '16px',
          background: 'linear-gradient(90deg, #d4af37, #fbf5b7)',
          color: '#061228',
          border: 'none',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
          cursor: 'pointer'
        }}
      >
        <Sparkles size={20} />
        Play Music & Enter
        <Sparkles size={20} />
      </button>
    </div>
  );
}
