import React, { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  sender: 'bot' | 'user';
}

let chatUserName = '';
let chatStep = 0;

function generateAIResponse(input: string): string {
  const text = input.toLowerCase();

  if (chatStep === 0) {
    chatUserName = text.split(' ')[0];
    chatUserName = chatUserName.charAt(0).toUpperCase() + chatUserName.slice(1);
    chatStep = 1;
    return `It is an absolute pleasure to meet you, ${chatUserName}! 🌈 As your AI guide, I am fully equipped to answer any question you throw at me—whether it's about screen time, project research, or general knowledge. What would you like to discuss?`;
  }

  if (text.includes('hello') || text.includes('hi') || text.includes('hey'))
    return `Hello again, ${chatUserName}! How can I help you excel in your project or answer your questions today?`;
  if (text.includes('sleep') || text.includes('bed') || text.includes('insomnia'))
    return `An essential health query, ${chatUserName}! Blue light from screens suppresses melatonin, disrupting deep sleep cycles. Keeping devices out of the bedroom is a proven remedy.`;
  if (text.includes('eye') || text.includes('headache') || text.includes('strain') || text.includes('vision'))
    return `That relates to digital strain, ${chatUserName}. Remember our project's 20-20-20 rule: every 20 minutes, focus on an object 20 feet away for 20 seconds to protect your eyes.`;
  if (text.includes('addict') || text.includes('dopamine') || text.includes('scroll'))
    return `Tech platforms engineer infinite scrolls to trigger dopamine loops, ${chatUserName}. Breaking the cycle requires conscious boundaries like grayscale mode and app limits.`;
  if (text.includes('study') || text.includes('focus') || text.includes('grade') || text.includes('homework'))
    return `Multitasking with screens severely fragments your cognitive attention, ${chatUserName}. Isolating your phone in another room while studying exponentially increases retention and output.`;
  if (text.includes('who made') || text.includes('creators') || text.includes('team') || text.includes('developer'))
    return `This brilliant digital wellbeing project was crafted by Aarav Sharma, Arjun Parihar, Advit Malik, Panshul Sabharwal, and Samarth Pratap Singh, ${chatUserName}!`;
  if (text.includes('thank'))
    return `You are most welcome, ${chatUserName}! I'm always here to provide answers for any question you have.`;

  return `That is a fascinating question, ${chatUserName}! From the perspective of our digital detox framework, balancing your focus and maintaining mindfulness is key. Regarding "${input}", addressing it requires conscious intent—just like managing your daily screen time. Let me know if you need deeper details on this or any other topic!`;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Greetings! 🌟 I am your AI Digital Wellbeing Coach. What is your name?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = () => {
    const msg = input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { text: msg, sender: 'user' }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const response = generateAIResponse(msg);
      setTyping(false);
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 1000 + Math.random() * 600);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-widget">
      {/* Chat window */}
      <div className={`chat-window ${open ? 'open' : ''}`}>
        <div className="chat-header">
          <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
            🤖 AI Wellness Guide
          </h3>
          <span
            onClick={() => setOpen(false)}
            style={{ cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            ✖
          </span>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {typing && (
            <div className="typing-indicator">
              <span /><span /><span />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            className="glass-input"
            style={{ borderRadius: 50, fontSize: '0.9rem', padding: '12px 18px' }}
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="rainbow-btn chat-send-btn" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>

      {/* Toggle button */}
      <div className="chat-btn" onClick={() => setOpen(o => !o)}>
        🤖
      </div>
    </div>
  );
}
