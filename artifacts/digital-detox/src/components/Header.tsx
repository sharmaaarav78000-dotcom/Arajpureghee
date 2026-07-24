import React from 'react';

export default function Header() {
  return (
    <header style={{ textAlign: 'center', padding: '5rem 1.5rem 3rem', animation: 'fadeInUp 0.8s ease-out' }}>
      <h1
        className="rainbow-text"
        style={{ margin: 0, fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 700, letterSpacing: '-1.5px' }}
      >
        Digital Detox Project
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: 650, margin: '1.2rem auto 0', fontWeight: 300, lineHeight: 1.6 }}>
        Break the scroll cycle, improve your mental health, and reclaim your daily focus with our interactive wellness toolkit.
      </p>
      <div style={{
        marginTop: '1.5rem',
        display: 'inline-block',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.2)',
        padding: '0.8rem 1.5rem',
        borderRadius: 50,
        color: '#fff',
        fontWeight: 500,
        boxShadow: '0 0 15px rgba(255,255,255,0.05)',
      }}>
        💡 <strong>Driving Question:</strong> How can students reduce unnecessary screen time and develop healthier habits?
      </div>
    </header>
  );
}
