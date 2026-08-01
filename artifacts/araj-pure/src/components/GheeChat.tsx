import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ── Knowledge base ──────────────────────────────────────────────────────────
const KB: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/\bhi\b|\bhello\b|\bhey\b|\bnamaste\b|\bnamskar\b/i],
    answer: 'Namaste! 🙏 So glad you\'re here. Ask me anything about Araj Pure A2 Cow Ghee — benefits, cooking, our Bilona process, or how to order!',
  },
  {
    patterns: [/what is a2|a2 ghee|a2 cow|difference.*ghee|ghee.*difference|a1.*a2|a2.*a1/i],
    answer: 'A2 ghee is made exclusively from the milk of indigenous desi cows like Gir and Sahiwal, which produce A2 beta-casein protein. Unlike regular ghee (often A1), A2 is easier to digest, anti-inflammatory, and far richer in beneficial fatty acids. Araj Pure has used only pure A2 milk since 1985. 🐄',
  },
  {
    patterns: [/bilona|hand.churn|traditional.*method|how.*made|process|method of/i],
    answer: 'We use the ancient Bilona method — 🥛 curd is made from A2 milk, hand-churned with a wooden churner (bilona) to separate butter, then slow-cooked on a low flame to produce pure golden ghee. This preserves all nutrients and gives our ghee its distinctive grainy texture and rich aroma. No shortcuts, no machines.',
  },
  {
    patterns: [/health benefit|good for|benefit.*ghee|ghee.*benefit|why.*ghee|nutrition/i],
    answer: 'Araj Pure A2 Ghee is a superfood! ✨ Key benefits:\n• Boosts digestion & gut health (butyric acid)\n• Strengthens immunity (fat-soluble vitamins A, D, E, K)\n• Improves brain function & memory\n• Lubricates joints and reduces inflammation\n• Nourishes skin and hair from within\n• Supports healthy weight when consumed mindfully\n• Safe for lactose-intolerant people',
  },
  {
    patterns: [/digest|gut|stomach|ibs|lactose|bowel/i],
    answer: 'Ghee is exceptional for gut health! It contains butyric acid, which feeds the cells lining your intestines and reduces inflammation. Many people who are lactose intolerant can enjoy ghee because the milk solids are removed during preparation. Start with 1 tsp daily and work up to 2–3 tsp. 🌿',
  },
  {
    patterns: [/brain|memory|focus|child|kids|baby|infant|growing/i],
    answer: 'Ghee is known as "brain food" in Ayurveda! The DHA and fat-soluble vitamins in A2 ghee support cognitive development, memory, and focus. For children, 1 tsp mixed into warm rice or dal daily is ideal. For infants above 6 months, a tiny amount in food is traditionally recommended — always consult your doctor first. 🧠',
  },
  {
    patterns: [/skin|hair|beauty|glow|moistur|dry|face/i],
    answer: 'Araj Pure ghee is liquid gold for your skin! Rich in vitamins A, E, and essential fatty acids, it deeply nourishes and hydrates. Apply a tiny amount to dry lips, cracked heels, or as a night moisturizer. Consuming it daily gives a natural inner glow. Many of our customers report softer skin within weeks! ✨',
  },
  {
    patterns: [/weight|fat|calor|diet|keto|obesity|lose|gain/i],
    answer: 'Contrary to old myths, quality A2 ghee can actually support healthy weight management! The medium-chain fatty acids (MCTs) boost metabolism and keep you satiated longer. On a keto or high-fat diet, ghee is excellent fuel. The key is moderation — 1–2 tsp per day is ideal for most adults. 🔥',
  },
  {
    patterns: [/cook|recipe|tadka|temperature|smoke point|fry|roast|bake|roti|paratha|dal|rice/i],
    answer: 'Araj Pure ghee is perfect for cooking! 🍳 It has a high smoke point (~250°C), making it safe for deep frying, sautéing, and roasting without toxic breakdown. Use it for:\n• Tadka on dal and sabzis\n• Smearing on hot rotis & parathas\n• Drizzling over rice and khichdi\n• Baking (replaces butter 1:1)\n• Biryani and pulaos for aroma\nThe aroma alone is unforgettable!',
  },
  {
    patterns: [/dose|dosage|how much|how many|per day|daily|teaspoon|tablespoon|quantity/i],
    answer: 'For adults: 1–3 teaspoons (5–15 ml) per day is ideal. Start with 1 tsp and increase gradually. Children: ½–1 tsp mixed into food. Best times to consume:\n• Morning on an empty stomach with warm water\n• Mixed into warm milk at night\n• With meals as a cooking medium\nListen to your body — ghee is food, not medicine. 🌿',
  },
  {
    patterns: [/store|storage|shelf.life|expire|refrigerat|keep|preserve/i],
    answer: 'Araj Pure ghee stores beautifully! Keep it in a cool, dry place away from direct sunlight. No refrigeration needed. Shelf life is 12+ months when stored properly and kept moisture-free (always use a dry spoon). The natural antioxidants in pure A2 ghee act as preservatives. Our ghee contains zero artificial preservatives. 🫙',
  },
  {
    patterns: [/price|cost|rate|₹|rs|rupee|how much.*cost|1 ?kg|500 ?g|500g|1kg/i],
    answer: 'Araj Pure A2 Cow Ghee is available in two sizes:\n\n🫙 **500g** — ₹449\n🫙 **1 kg** — ₹799\n\nFree delivery on orders above ₹599. We ship Pan-India! To place an order, click the WhatsApp button on this page or ask me "how to order". 📦',
  },
  {
    patterns: [/order|buy|purchase|whatsapp|how.*get|delivery|ship/i],
    answer: 'Ordering is simple! 😊\n\n1. Click the green WhatsApp button on this page\n2. Send us your name, address, and quantity\n3. We\'ll confirm availability and share payment details\n4. Pay via UPI or COD\n5. Delivered in 3–5 days Pan-India\n\nYou can also use code **SAVE300** for ₹300 off on your first order! 🎉',
  },
  {
    patterns: [/coupon|discount|offer|promo|code|save/i],
    answer: 'Yes! 🎉 Use coupon code **SAVE300** to get ₹300 off on your order. Just mention it on WhatsApp when ordering. This is our special welcome offer for new customers!',
  },
  {
    patterns: [/pure|adulterat|fake|original|genuine|certif|fssai|test/i],
    answer: 'Purity is our promise since 1985! ✅ Araj Pure ghee is:\n• FSSAI certified\n• No hydrogenation\n• Zero preservatives or additives\n• No vegetable oil blending\n• Lab-tested for purity\n• Made in small batches for quality control\n\nA simple purity test: refrigerate a small amount — pure ghee solidifies uniformly with a grainy texture and a creamy white/yellow color.',
  },
  {
    patterns: [/gir|sahiwal|desi|indigenous|cow breed|breed/i],
    answer: 'Our ghee is sourced from free-grazing Gir and Sahiwal cows — two of India\'s most prized indigenous (desi) breeds. These breeds naturally produce A2 beta-casein milk, which is genetically closer to human breast milk. The cows graze on natural grass and are treated with care and respect. 🐄🌿',
  },
  {
    patterns: [/ayurved|ancient|traditional|heritage|vedic|sattvic/i],
    answer: 'Ghee has been central to Ayurveda for over 5,000 years, described as "the king of fats" in ancient texts. Our Bilona method is unchanged from what our ancestors practiced. Sattvic, pure, and nourishing — Araj Pure ghee is Ayurveda in a jar. 🙏',
  },
  {
    patterns: [/1985|since|history|brand|story|founder|legacy|years/i],
    answer: 'Araj Pure was founded in 1985 with a single mission: bring the purest A2 cow ghee to Indian families. For nearly four decades, we have used the same traditional Bilona method, the same indigenous cows, and the same commitment to zero compromise on quality. Some things should never change. 🌟',
  },
  {
    patterns: [/thank|thanks|shukriya|dhanyawad/i],
    answer: 'You\'re most welcome! 🙏 May Araj Pure ghee nourish you and your family with health and warmth. Feel free to ask anything else anytime!',
  },
  {
    patterns: [/bye|goodbye|see you|ok.*thanks|that.*all/i],
    answer: 'Namaste! 🙏 Take care and stay nourished. Remember — a spoonful of pure ghee a day keeps the doctor away! Visit us again anytime.',
  },
];

const FALLBACK = [
  'That\'s a great question! For the most accurate information, please reach out to us directly on WhatsApp — our team is happy to help. 📱',
  'I\'m best at questions about A2 ghee, health benefits, cooking tips, and ordering. Could you rephrase or ask something along those lines? 🫙',
  'Interesting! For detailed queries, feel free to WhatsApp us directly. Meanwhile, I\'m happy to answer anything about Araj Pure ghee, its benefits, or how to order!',
];

let fallbackIndex = 0;

function getResponse(input: string): string {
  const text = input.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.patterns.some(p => p.test(text))) {
      return entry.answer;
    }
  }
  return FALLBACK[fallbackIndex++ % FALLBACK.length];
}

// ── Component ────────────────────────────────────────────────────────────────
const SUGGESTIONS = ['What is A2 ghee?', 'Health benefits?', 'How to cook with ghee?', 'How to order?'];

export default function GheeChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Namaste! 🙏 I am Gau Sakhi, your Araj Pure ghee expert. Ask me anything — health benefits, cooking tips, our Bilona process, pricing, or how to order!',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const sendMessage = (text: string) => {
    const msg = text.trim();
    if (!msg || typing) return;
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setTyping(true);

    const delay = 600 + Math.random() * 500;
    setTimeout(() => {
      const reply = getResponse(msg);
      setTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }, delay);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const isFirstMessage = messages.length === 1;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open Gau Sakhi chat"
        style={{
          position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 1000,
          width: 60, height: 60, borderRadius: '50%',
          border: '2px solid #C8A45E',
          background: 'linear-gradient(135deg, #1a0f06 60%, #2a1a08)',
          color: '#C8A45E', fontSize: '1.7rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(200,164,94,0.35)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'scale(1.08)'; b.style.boxShadow = '0 6px 32px rgba(200,164,94,0.55)'; }}
        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'scale(1)'; b.style.boxShadow = '0 4px 24px rgba(200,164,94,0.35)'; }}
      >
        {open ? '✕' : '🫙'}
      </button>

      {/* Chat panel */}
      <div style={{
        position: 'fixed', bottom: '5.5rem', left: '2rem', zIndex: 999,
        width: 'min(380px, calc(100vw - 2rem))', maxHeight: '70vh',
        display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(160deg, #110903 0%, #1c1007 100%)',
        border: '1px solid rgba(200,164,94,0.35)', borderRadius: 20,
        boxShadow: '0 16px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,164,94,0.1)',
        overflow: 'hidden', transformOrigin: 'bottom left',
        transform: open ? 'scale(1)' : 'scale(0.85)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'transform 0.22s cubic-bezier(.4,1.4,.6,1), opacity 0.18s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '1rem 1.25rem', borderBottom: '1px solid rgba(200,164,94,0.2)',
          background: 'rgba(200,164,94,0.07)', display: 'flex', alignItems: 'center',
          gap: 10, flexShrink: 0,
        }}>
          <span style={{ fontSize: '1.5rem' }}>🫙</span>
          <div>
            <div style={{ color: '#C8A45E', fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.05em' }}>Gau Sakhi</div>
            <div style={{ color: 'rgba(200,164,94,0.6)', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif' }}>Your Ghee Expert · Araj Pure</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
            <span style={{ color: '#4ade80', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif' }}>Online</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: 10,
          scrollbarWidth: 'thin', scrollbarColor: 'rgba(200,164,94,0.2) transparent',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '84%', padding: '0.65rem 0.9rem',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #C8A45E, #a07c3a)'
                  : 'rgba(255,255,255,0.06)',
                color: msg.role === 'user' ? '#1a0a02' : '#e8d5b0',
                fontSize: '0.875rem', lineHeight: 1.6,
                fontFamily: 'Inter, sans-serif',
                fontWeight: msg.role === 'user' ? 600 : 400,
                border: msg.role === 'assistant' ? '1px solid rgba(200,164,94,0.15)' : 'none',
                wordBreak: 'break-word', whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '0.65rem 1rem', borderRadius: '16px 16px 16px 4px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(200,164,94,0.15)',
                display: 'flex', gap: 5, alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: 7, height: 7, borderRadius: '50%', background: '#C8A45E',
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
          <div style={{ padding: '0 1rem 0.75rem', display: 'flex', flexWrap: 'wrap', gap: 6, flexShrink: 0 }}>
            {SUGGESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  background: 'rgba(200,164,94,0.1)', border: '1px solid rgba(200,164,94,0.3)',
                  borderRadius: 20, color: '#C8A45E', fontSize: '0.75rem',
                  padding: '4px 12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
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

        {/* Input */}
        <div style={{
          padding: '0.75rem 1rem', borderTop: '1px solid rgba(200,164,94,0.15)',
          display: 'flex', gap: 8, flexShrink: 0, background: 'rgba(0,0,0,0.25)',
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about ghee…"
            disabled={typing}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(200,164,94,0.25)', borderRadius: 50,
              padding: '0.55rem 1rem', color: '#e8d5b0',
              fontSize: '0.875rem', fontFamily: 'Inter, sans-serif', outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(200,164,94,0.6)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(200,164,94,0.25)')}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={typing || !input.trim()}
            style={{
              width: 38, height: 38, borderRadius: '50%', border: 'none', flexShrink: 0,
              background: typing || !input.trim() ? 'rgba(200,164,94,0.2)' : 'linear-gradient(135deg, #C8A45E, #a07c3a)',
              color: typing || !input.trim() ? 'rgba(200,164,94,0.4)' : '#1a0a02',
              fontSize: '1rem', cursor: typing || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
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
