import React from 'react';

export default function ResearchSurvey() {
  return (
    <div className="glass-card" style={{ animationDelay: '0.2s' }}>
      <h2 style={{ color: '#fff', marginTop: 0, fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
        📊 Research & Survey
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7 }}>
        To understand the depth of the problem, survey 20–30 students with the following questions to collect your data (You can visualize this data later using pie charts or bar graphs):
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        <div className="impact-box">
          <h4 style={{ color: '#fff', margin: '0 0 0.8rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            Survey Questions
          </h4>
          <ul style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, paddingLeft: '1.2rem', margin: 0 }}>
            <li>How many hours do you spend on screens daily?</li>
            <li>What device do you use most?</li>
            <li>What do you mainly use screens for? (Study, Gaming, Social Media, Videos)</li>
            <li>Do you feel tired after long screen use?</li>
            <li>Have you ever tried reducing screen time?</li>
            <li>Would you like to spend more time outdoors?</li>
          </ul>
        </div>
        <div className="impact-box">
          <h4 style={{ color: '#fff', margin: '0 0 0.8rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            Core Research Topics
          </h4>
          <ul style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, paddingLeft: '1.2rem', margin: 0 }}>
            <li>What exactly defines screen time?</li>
            <li>What is the recommended healthy limit?</li>
            <li>What are the hidden effects of overuse?</li>
            <li>Why are students drawn to screens?</li>
            <li>What are realistic reduction strategies?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
