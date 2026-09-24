import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ── Built-in curated fallback knowledge for instant resilience ───────────────
const KB: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/\bhi\b|\bhello\b|\bhey\b|\bnamaste\b|\bnamskar\b/i],
    answer: 'Namaste! 🙏 I am Araj Pure Ghee. So glad you\'re here. Ask me anything about our authentic A2 Desi Cow Ghee — our 5-stage Bilona process, Ayurvedic health benefits, culinary uses, or how to order!',
  },
  {
    patterns: [/what is a2|a2 ghee|a2 cow|difference.*ghee|ghee.*difference|a1.*a2|a2.*a1/i],
    answer: 'Araj Pure Ghee is made exclusively from the milk of free-grazing indigenous desi cows (Gir & Sahiwal), producing natural A2 beta-casein protein. Unlike conventional A1 ghee, A2 ghee is significantly easier to digest, anti-inflammatory, and rich in gut-healing butyric acid and CLA. We have maintained this pure standard since 1985. 🐄',
  },
  {
    patterns: [/bilona|hand.churn|traditional.*method|how.*made|process|method of/i],
    answer: 'Our ghee is prepared using the sacred Vedic 5-stage Bilona method: Whole A2 milk is boiled in clay vessels, cultured into curd (dahi) overnight, churned bi-directionally with a wooden bilona at dawn to separate cultured makkhan (butter), and slow-simmered over low flame until golden and granular (danedar). No machines, no shortcuts.',
  },
  {
    patterns: [/health benefit|good for|benefit.*ghee|ghee.*benefit|why.*ghee|nutrition/i],
    answer: 'Araj Pure A2 Ghee is revered as pure Ayurvedic Ojas! ✨ Key benefits:\n• Cultivates gut flora and enhances digestion via butyric acid\n• Fortifies natural immunity with fat-soluble vitamins A, D, E, K2\n• Enhances cognitive focus, memory, and brain function\n• Deeply lubricates joints and eases inflammation\n• Gives a glowing, radiant complexion from within\n• Cultured preparation makes it safe for lactose-intolerant people',
  },
  {
    patterns: [/digest|gut|stomach|ibs|lactose|bowel/i],
    answer: 'Araj Pure Ghee is a natural tonic for digestion. Its rich butyric acid content directly nourishes the colonocytes lining your intestinal wall, repairing gut permeability and reducing inflammation. Because cultured curd butter is clarified, all milk solids and lactose are removed. Start with 1 tsp daily with warm water or food. 🌿',
  },
  {
    patterns: [/brain|memory|focus|child|kids|baby|infant|growing/i],
    answer: 'In Ayurveda, pure A2 ghee is regarded as Medhya (brain-rejuvenating). Its natural DHA and healthy fats support neurodevelopment, retention, and concentration in children. 1 tsp in warm rice or dal daily is ideal for growing kids. For babies over 6 months, a drop or two can be blended into soft food. 🧠',
  },
  {
    patterns: [/skin|hair|beauty|glow|moistur|dry|face/i],
    answer: 'Pure A2 ghee is Ayurvedic nectar for your skin and hair! Packed with vitamins A and E, it seals deep moisture, heals chapped lips and dry skin, and promotes an unmistakable inner glow when taken daily. Apply a few drops topically or enjoy a spoonful in your diet.',
  },
  {
    patterns: [/weight|fat|calor|diet|keto|obesity|lose|gain/i],
    answer: 'Pure A2 Ghee contains healthy medium-chain fatty acids (MCTs) and CLA that accelerate cellular metabolism and promote lasting satiety. When consumed mindfully (1–2 tsp daily), it supports lean body mass and sustained energy, making it a favorite for ketogenic and clean ancestral diets.',
  },
  {
    patterns: [/cook|recipe|tadka|temperature|smoke point|fry|roast|bake|roti|paratha|dal|rice/i],
    answer: 'Araj Pure Ghee possesses a remarkable smoke point of ~250°C (485°F), preventing oxidation and harmful smoke breakdown during high-heat cooking. It is sublime for dal tadka, hot rotis, crisp parathas, khichdi, biryanis, and traditional Indian mithai.',
  },
  {
    patterns: [/dose|dosage|how much|how many|per day|daily|teaspoon|tablespoon|quantity/i],
    answer: 'For healthy adults, 1 to 2 tablespoons (10–20 ml) daily across your meals is ideal. Start with 1 teaspoon on an empty stomach with warm water in the morning, or stirred into warm bedtime milk for restorative sleep. Listen to your body\'s natural balance.',
  },
  {
    patterns: [/store|storage|shelf.life|expire|refrigerat|keep|preserve/i],
    answer: 'Store your jar of Araj Pure Ghee in a cool, dry place away from direct sunlight. No refrigeration is needed; pure clarified butter stays fresh for 12+ months. Simply ensure you always use a clean, dry wooden or steel spoon.',
  },
  {
    patterns: [/price|cost|rate|₹|rs|rupee|how much.*cost|1 ?kg|500 ?g|500g|1kg/i],
    answer: 'Araj Pure A2 Cow Ghee is available in two sizes:\n\n🫙 **500g Glass Jar** — ₹449\n🫙 **1 kg Glass Jar** — ₹799\n\nFree delivery Pan-India on orders above ₹599. Use coupon code **SAVE300** to save ₹300 on your order!',
  },
  {
    patterns: [/order|buy|purchase|whatsapp|how.*get|delivery|ship/i],
    answer: 'You can order right here through our website Cart, or click the WhatsApp button to chat directly with our team (+91-98765-43210). We offer Pan-India shipping in 3–5 days with secure payment and Cash on Delivery options.',
  },
  {
    patterns: [/coupon|discount|offer|promo|code|save|250/i],
    answer: 'We have an active **Special Offer of ₹250 OFF** automatically applied at checkout in your cart! You can also use coupon code **SAVE300** or chat directly with our team on WhatsApp (+91-98765-43210).',
  },
];

function getFallbackResponse(input: string): string {
  const trimmed = input.trim();
  for (const item of KB) {
    for (const pattern of item.patterns) {
      if (pattern.test(trimmed)) {
        return item.answer;
      }
    }
  }
  return 'Namaste! 🙏 Araj Pure A2 Desi Cow Ghee is handcrafted from the milk of indigenous Gir and Sahiwal cows using the traditional Vedic Bilona method since 1985. How can I assist you with your health, cooking, or order today?';
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'Namaste! 🙏 I am Araj Pure Ghee, your expert guide to authentic A2 Desi Cow Ghee. Ask me about our traditional Bilona method, Ayurvedic benefits, kitchen secrets, or how to order!',
};

const SUGGESTIONS = [
  'What makes Araj Pure A2 ghee special?',
  'Explain the 5-stage Bilona method',
  'What are the Ayurvedic health benefits?',
  'How do I place an order?',
];

export default function GheeChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || typing) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setTyping(true);

    try {
      // Send conversation history to the Gemini-powered server endpoint
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || getFallbackResponse(text);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.warn('Falling back to local knowledge base:', err);
      const reply = getFallbackResponse(text);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } finally {
      setTyping(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isFirstMessage = messages.length === 1;

  return (
    <>
      {/* Toggle button: Obsidian & Champagne styling */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open Araj Pure Ghee chat"
        style={{
          position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 1000,
          width: 58, height: 58, borderRadius: '50%',
          border: '1.5px solid #D6B36A',
          background: 'rgba(18, 20, 20, 0.92)',
          backdropFilter: 'blur(24px) saturate(180%)',
          color: '#D6B36A', fontSize: '1.6rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 12px 35px rgba(0,0,0,0.8), 0 0 24px rgba(214,179,106,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          const b = e.currentTarget as HTMLButtonElement;
          b.style.transform = 'scale(1.08)';
          b.style.boxShadow = '0 14px 42px rgba(0,0,0,0.9), 0 0 35px rgba(214,179,106,0.45)';
        }}
        onMouseLeave={e => {
          const b = e.currentTarget as HTMLButtonElement;
          b.style.transform = 'scale(1)';
          b.style.boxShadow = '0 12px 35px rgba(0,0,0,0.8), 0 0 24px rgba(214,179,106,0.3)';
        }}
      >
        {open ? '✕' : '🫙'}
      </button>

      {/* Chat panel */}
      <div style={{
        position: 'fixed', bottom: '5.5rem', left: '2rem', zIndex: 999,
        width: 'min(410px, calc(100vw - 2rem))', maxHeight: '72vh',
        display: 'flex', flexDirection: 'column',
        background: 'rgba(18, 20, 20, 0.96)',
        backdropFilter: 'blur(32px) saturate(190%)',
        border: '1px solid rgba(214,179,106,0.32)', borderRadius: 24,
        boxShadow: '0 28px 75px rgba(0,0,0,0.9), 0 0 0 1px rgba(214,179,106,0.12)',
        overflow: 'hidden', transformOrigin: 'bottom left',
        transform: open ? 'scale(1)' : 'scale(0.85)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'transform 0.22s cubic-bezier(.4,1.4,.6,1), opacity 0.18s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '1rem 1.25rem', borderBottom: '1px solid rgba(214,179,106,0.22)',
          background: 'rgba(8,9,9,0.85)', display: 'flex', alignItems: 'center',
          gap: 12, flexShrink: 0,
        }}>
          <span style={{ fontSize: '1.5rem' }}>🫙</span>
          <div>
            <div style={{
              color: '#D6B36A',
              fontFamily: 'Cinzel, serif',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.05em',
            }}>
              Araj Pure Ghee
            </div>
            <div style={{
              color: 'rgba(214,179,106,0.75)',
              fontSize: '0.72rem',
              fontFamily: 'Inter, sans-serif',
            }}>
              AI Ghee & Wellness Specialist · Powered by Gemini
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#D6B36A', display: 'inline-block',
              boxShadow: '0 0 8px #D6B36A',
            }} />
            <span style={{
              color: '#E8D39A',
              fontSize: '0.72rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
            }}>
              Online
            </span>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '1.1rem',
          display: 'flex', flexDirection: 'column', gap: 12,
          scrollbarWidth: 'thin', scrollbarColor: 'rgba(214,179,106,0.25) transparent',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '86%', padding: '0.75rem 1rem',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #BFA05A, #D6B36A)'
                  : 'rgba(255,255,255,0.06)',
                color: msg.role === 'user' ? '#080909' : '#F5F1E8',
                fontSize: '0.875rem', lineHeight: 1.6,
                fontFamily: 'Inter, sans-serif',
                fontWeight: msg.role === 'user' ? 600 : 400,
                border: msg.role === 'assistant' ? '1px solid rgba(214,179,106,0.18)' : 'none',
                wordBreak: 'break-word', whiteSpace: 'pre-wrap',
                boxShadow: msg.role === 'user' ? '0 4px 15px rgba(214,179,106,0.25)' : 'none',
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '0.7rem 1.1rem', borderRadius: '18px 18px 18px 4px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(214,179,106,0.18)',
                display: 'flex', gap: 5, alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: 7, height: 7, borderRadius: '50%', background: '#D6B36A',
                    display: 'inline-block', opacity: 0.7,
                    animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        {isFirstMessage && !typing && (
          <div style={{ padding: '0 1rem 0.85rem', display: 'flex', flexWrap: 'wrap', gap: 6, flexShrink: 0 }}>
            {SUGGESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  background: 'rgba(214,179,106,0.12)', border: '1px solid rgba(214,179,106,0.35)',
                  borderRadius: 20, color: '#D6B36A', fontSize: '0.75rem',
                  padding: '5px 12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(214,179,106,0.25)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(214,179,106,0.12)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: '0.85rem 1rem', borderTop: '1px solid rgba(214,179,106,0.18)',
          display: 'flex', gap: 8, flexShrink: 0, background: 'rgba(0,0,0,0.4)',
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask Araj Pure Ghee anything…"
            disabled={typing}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(214,179,106,0.28)', borderRadius: 50,
              padding: '0.6rem 1.1rem', color: '#F5F1E8',
              fontSize: '0.875rem', fontFamily: 'Inter, sans-serif', outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(214,179,106,0.65)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(214,179,106,0.28)')}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={typing || !input.trim()}
            style={{
              width: 40, height: 40, borderRadius: '50%', border: 'none', flexShrink: 0,
              background: typing || !input.trim() ? 'rgba(214,179,106,0.2)' : 'linear-gradient(135deg, #BFA05A, #D6B36A)',
              color: typing || !input.trim() ? 'rgba(214,179,106,0.4)' : '#080909',
              fontSize: '1rem', cursor: typing || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, transform 0.15s',
            }}
          >
            ➤
          </button>
        </div>
      </div>

      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
