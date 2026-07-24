import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const API_URL = `${BASE.replace(/\/[^/]*$/, '')}/api/ghee-chat`;

export default function GheeChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Namaste! 🙏 I am Gau Sakhi, your guide to Araj Pure A2 Cow Ghee. Ask me anything — health benefits, cooking tips, our Bilona process, or how to order!',
    },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput('');

    const newHistory: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newHistory);
    setStreaming(true);

    // Placeholder for streaming response
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const json = line.slice(6).trim();
          if (!json) continue;
          try {
            const parsed = JSON.parse(json);
            if (parsed.done) break;
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.content) {
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: updated[updated.length - 1].content + parsed.content,
                };
                return updated;
              });
            }
          } catch {
            // skip malformed lines
          }
        }
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open Ghee Chat"
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          zIndex: 1000,
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '2px solid #C8A45E',
          background: 'linear-gradient(135deg, #1a0f06 60%, #2a1a08)',
          color: '#C8A45E',
          fontSize: '1.7rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(200,164,94,0.35)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 32px rgba(200,164,94,0.55)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(200,164,94,0.35)';
        }}
      >
        {open ? '✕' : '🫙'}
      </button>

      {/* Chat panel */}
      <div
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          left: '2rem',
          zIndex: 999,
          width: 'min(380px, calc(100vw - 2rem))',
          maxHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(160deg, #110903 0%, #1c1007 100%)',
          border: '1px solid rgba(200,164,94,0.35)',
          borderRadius: 20,
          boxShadow: '0 16px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,164,94,0.1)',
          overflow: 'hidden',
          transformOrigin: 'bottom left',
          transform: open ? 'scale(1)' : 'scale(0.85)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 0.22s cubic-bezier(.4,1.4,.6,1), opacity 0.18s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid rgba(200,164,94,0.2)',
            background: 'rgba(200,164,94,0.07)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>🫙</span>
          <div>
            <div style={{ color: '#C8A45E', fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.05em' }}>
              Gau Sakhi
            </div>
            <div style={{ color: 'rgba(200,164,94,0.6)', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif' }}>
              Your AI Ghee Expert · Araj Pure
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
            <span style={{ color: '#4ade80', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif' }}>Online</span>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(200,164,94,0.2) transparent',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '82%',
                  padding: '0.65rem 0.9rem',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background:
                    msg.role === 'user'
                      ? 'linear-gradient(135deg, #C8A45E, #a07c3a)'
                      : 'rgba(255,255,255,0.06)',
                  color: msg.role === 'user' ? '#1a0a02' : '#e8d5b0',
                  fontSize: '0.875rem',
                  lineHeight: 1.55,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: msg.role === 'user' ? 600 : 400,
                  border: msg.role === 'assistant' ? '1px solid rgba(200,164,94,0.15)' : 'none',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.content}
                {/* Blinking cursor while streaming last assistant message */}
                {streaming && i === messages.length - 1 && msg.role === 'assistant' && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: '1em',
                      background: '#C8A45E',
                      marginLeft: 2,
                      verticalAlign: 'text-bottom',
                      animation: 'blink 0.8s step-end infinite',
                    }}
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions (shown when no user messages yet) */}
        {messages.length === 1 && (
          <div style={{ padding: '0 1rem 0.5rem', display: 'flex', flexWrap: 'wrap', gap: 6, flexShrink: 0 }}>
            {[
              'What is A2 ghee?',
              'Health benefits?',
              'How to use in cooking?',
              'How to order?',
            ].map(q => (
              <button
                key={q}
                onClick={() => { setInput(q); setTimeout(send, 0); }}
                style={{
                  background: 'rgba(200,164,94,0.1)',
                  border: '1px solid rgba(200,164,94,0.3)',
                  borderRadius: 20,
                  color: '#C8A45E',
                  fontSize: '0.75rem',
                  padding: '4px 12px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,164,94,0.22)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,164,94,0.1)')}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input row */}
        <div
          style={{
            padding: '0.75rem 1rem',
            borderTop: '1px solid rgba(200,164,94,0.15)',
            display: 'flex',
            gap: 8,
            flexShrink: 0,
            background: 'rgba(0,0,0,0.25)',
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about ghee…"
            disabled={streaming}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(200,164,94,0.25)',
              borderRadius: 50,
              padding: '0.55rem 1rem',
              color: '#e8d5b0',
              fontSize: '0.875rem',
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(200,164,94,0.6)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(200,164,94,0.25)')}
          />
          <button
            onClick={send}
            disabled={streaming || !input.trim()}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: 'none',
              background: streaming || !input.trim()
                ? 'rgba(200,164,94,0.2)'
                : 'linear-gradient(135deg, #C8A45E, #a07c3a)',
              color: streaming || !input.trim() ? 'rgba(200,164,94,0.4)' : '#1a0a02',
              fontSize: '1rem',
              cursor: streaming || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.15s',
            }}
          >
            {streaming ? '⏳' : '➤'}
          </button>
        </div>
      </div>

      {/* Blink keyframe injected inline */}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </>
  );
}
