import React from 'react';

export default function SolutionsBenefits() {
  return (
    <div className="glass-card" style={{ animationDelay: '0.5s' }}>
      <h2 style={{ color: '#fff', marginTop: 0, fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
        ✅ Solutions &amp; Benefits
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        <div>
          <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 0.8rem', fontWeight: 500 }}>Practical Solutions</h3>
          <ul className="check-list">
            <li><strong style={{ color: '#fff' }}>20-20-20 Rule:</strong> Every 20 mins, look 20 feet away for 20 secs.</li>
            <li><strong style={{ color: '#fff' }}>App Timers:</strong> Block apps after 30 minutes.</li>
            <li><strong style={{ color: '#fff' }}>No screens before bed:</strong> Use an analog clock.</li>
            <li><strong style={{ color: '#fff' }}>Turn off notifications:</strong> Stop dopamine triggers.</li>
            <li><strong style={{ color: '#fff' }}>Keep phones away:</strong> Out of sight while studying.</li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: 'var(--success)', fontSize: '1.3rem', margin: '0 0 0.8rem', fontWeight: 500 }}>Benefits of Reducing</h3>
          <ul className="check-list">
            <li>Better, deeper sleep</li>
            <li>Sharper focus and concentration</li>
            <li>Healthier eyesight</li>
            <li>Increased physical activity</li>
            <li>Higher academic performance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
