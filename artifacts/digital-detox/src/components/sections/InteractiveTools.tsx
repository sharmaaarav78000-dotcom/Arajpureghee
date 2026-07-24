import React, { useState, useRef, useEffect } from 'react';
import { triggerLockScreen } from '@/components/LockScreen';

export default function InteractiveTools() {
  // ── Focus Lock Timer ──
  const [minutes, setMinutes] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (secs: number) =>
    `${Math.floor(secs / 60).toString().padStart(2, '0')}:${(secs % 60).toString().padStart(2, '0')}`;

  const startTimer = () => {
    const secs = parseInt(minutes) * 60;
    if (isNaN(secs) || secs <= 0) { alert('Please enter valid minutes.'); return; }
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimerRunning(true);
    setTimeLeft(secs);
    let remaining = secs;
    intervalRef.current = setInterval(() => {
      remaining--;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(intervalRef.current!);
        setTimerRunning(false);
        setTimeLeft(null);
        triggerLockScreen();
      }
    }, 1000);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  // ── Time Debt Calculator ──
  const [screenHours, setScreenHours] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateImpact = () => {
    const hours = parseFloat(screenHours);
    if (isNaN(hours) || hours < 0 || hours > 24) {
      setResult('<strong>Oops!</strong> Please enter a valid number between 0 and 24.');
      return;
    }
    const fullDays = (hours * 365) / 24;
    const lifePercent = (hours / 16) * 100;
    setResult(
      `Based on <strong>${hours} hours</strong> a day, every year you spend:<br/><br/>
      📉 <strong>${fullDays.toFixed(1)} full days</strong> staring at a screen.<br/>
      ⏳ <strong>${lifePercent.toFixed(1)}%</strong> of your waking life on your device.<br/><br/>
      <span style="color:#38bdf8;"><em>Cut 1 hour a day, and gain back <strong>15 full days</strong> a year!</em></span>`
    );
  };

  return (
    <div className="glass-card" style={{ animationDelay: '0.4s' }}>
      <h2 style={{ color: '#fff', marginTop: 0, fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
        ⏱️ Interactive Tools
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>

        {/* Focus Lock Timer */}
        <div>
          <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 0.5rem', fontWeight: 500 }}>Focus Lock Timer</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, marginBottom: '1rem' }}>
            Force a break. Set a timer for your current session.
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 500, color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
              Minutes until lock
            </label>
            <input
              className="glass-input"
              type="number"
              min={1}
              max={120}
              placeholder="e.g. 25"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              disabled={timerRunning}
            />
          </div>
          {!timerRunning && (
            <button className="rainbow-btn" onClick={startTimer}>
              Start Focus Session
            </button>
          )}
          {timerRunning && timeLeft !== null && (
            <div className="timer-display" style={{ marginTop: '1.5rem' }}>
              {formatTime(timeLeft)}
            </div>
          )}
        </div>

        {/* Time Debt Calculator */}
        <div>
          <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 0.5rem', fontWeight: 500 }}>Time Debt Calculator</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, marginBottom: '1rem' }}>
            Enter your daily average screen time to see the yearly cost.
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 500, color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
              Daily hours
            </label>
            <input
              className="glass-input"
              type="number"
              min={0}
              max={24}
              step={0.1}
              placeholder="e.g. 4.5"
              value={screenHours}
              onChange={e => setScreenHours(e.target.value)}
            />
          </div>
          <button className="rainbow-btn" onClick={calculateImpact}>
            Calculate Reality
          </button>
          {result && (
            <div
              className="result-box"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          )}
        </div>

      </div>
    </div>
  );
}
