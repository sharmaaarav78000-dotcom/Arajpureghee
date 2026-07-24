import React, { useState } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

type DayData = { screenTime: string; achieved: string };

export default function SevenDayChallenge() {
  const [rows, setRows] = useState<DayData[]>(
    DAYS.map(() => ({ screenTime: '', achieved: '' }))
  );

  const update = (i: number, field: keyof DayData, val: string) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
  };

  return (
    <div className="glass-card" style={{ animationDelay: '0.6s' }}>
      <h2 style={{ color: '#fff', marginTop: 0, fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
        🏆 Activity: 7-Day Screen Time Challenge
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7 }}>
        Record your daily screen time. Set a target goal and see if you can achieve it all week.
      </p>
      <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
        <table className="glass-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Screen Time Logged</th>
              <th>Target Achieved (Yes/No)</th>
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day, i) => (
              <tr key={day}>
                <td style={{ color: '#fff', fontWeight: 500 }}>{day}</td>
                <td>
                  <input
                    className="glass-table-input"
                    placeholder={i === 0 ? 'e.g. 3h 15m' : i === 1 ? 'e.g. 2h 45m' : '...'}
                    value={rows[i].screenTime}
                    onChange={e => update(i, 'screenTime', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="glass-table-input"
                    placeholder={i < 2 ? 'Y/N' : '...'}
                    value={rows[i].achieved}
                    onChange={e => update(i, 'achieved', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
