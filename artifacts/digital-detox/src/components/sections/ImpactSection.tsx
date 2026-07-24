import React from 'react';

const impacts = [
  {
    emoji: '👁️',
    label: 'Physical',
    color: '#ff4757',
    items: ['Eye strain & Headaches', 'Poor posture', 'Neck and back pain', 'Obesity'],
  },
  {
    emoji: '🧠',
    label: 'Mental',
    color: '#a855f7',
    items: ['Stress & Anxiety', 'Reduced concentration', 'Sleep problems', 'Screen addiction'],
  },
  {
    emoji: '📚',
    label: 'Academic',
    color: '#3b82f6',
    items: ['Lower concentration', 'Poor homework', 'Lower grades'],
  },
  {
    emoji: '🗣️',
    label: 'Social',
    color: '#f59e0b',
    items: ['Less family time', 'Reduced outdoor play', 'Fewer real conversations'],
  },
];

export default function ImpactSection() {
  return (
    <div className="glass-card" style={{ animationDelay: '0.3s' }}>
      <h2 style={{ color: '#fff', marginTop: 0, fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
        ⚠️ The Impact of Excessive Screen Time
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
        {impacts.map((impact) => (
          <div key={impact.label} className="impact-box">
            <h4 style={{ color: impact.color, margin: '0 0 0.8rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              {impact.emoji} {impact.label}
            </h4>
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {impact.items.map((item) => (
                <li key={item} style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
