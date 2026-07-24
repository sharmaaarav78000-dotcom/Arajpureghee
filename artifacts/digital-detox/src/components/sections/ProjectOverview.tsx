import React from 'react';

export default function ProjectOverview() {
  return (
    <div className="glass-card" style={{ animationDelay: '0.1s' }}>
      <h2 style={{ color: '#fff', marginTop: 0, fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
        🎯 Project Overview
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7 }}>
        <strong style={{ color: '#fff' }}>Problem Statement:</strong> Many students spend 5–8 hours daily on phones, tablets, TVs, or computers. Excessive screen time can negatively affect physical health, mental well-being, sleep, academic performance, and social interactions.
      </p>

      <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '1.5rem 0 0.8rem', fontWeight: 500 }}>Objectives</h3>
      <ul className="check-list">
        <li>Understand what screen time is and how much is healthy.</li>
        <li>Learn the advantages and disadvantages of screen use.</li>
        <li>Measure personal daily screen time.</li>
        <li>Find practical ways to reduce screen time.</li>
        <li>Encourage healthy digital habits among students.</li>
      </ul>
    </div>
  );
}
