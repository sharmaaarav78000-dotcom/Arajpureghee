import React from 'react';

const TEAM = ['Aarav Sharma', 'Arjun Parihar', 'Advit Malik', 'Panshul Sabharwal', 'Samarth Pratap Singh'];

export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '3rem 2rem',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      marginTop: '2rem',
      background: 'rgba(0,0,0,0.5)',
    }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Designed to help you live more in the real world.
      </p>
      <div className="signature">
        {TEAM.map(name => (
          <span key={name}>{name}</span>
        ))}
      </div>
    </footer>
  );
}
