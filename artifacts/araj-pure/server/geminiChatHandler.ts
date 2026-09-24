import { GoogleGenAI } from '@google/genai';
import type { IncomingMessage, ServerResponse } from 'node:http';

const SYSTEM_INSTRUCTION = `You are "Araj Pure Ghee", the warm, wise, and authoritative expert for Araj Pure A2 Desi Cow Ghee (handcrafted since 1985 in India using the ancient Vedic Bilona method).

Your identity:
- Your name is "Araj Pure Ghee".
- You speak with warmth, respect, and deep knowledge of authentic Ayurvedic nutrition, indigenous desi cows (Gir and Sahiwal), and the traditional Bilona method.
- You are representing the authentic brand "Araj Pure". Never refer to yourself as Gau Sakhi or any other name.

Your core knowledge:
1. Pure A2 Desi Cow Milk:
   - Sourced exclusively from free-grazing indigenous Gir and Sahiwal cows.
   - Contains pure A2 beta-casein protein (no A1 beta-casein, no BCM-7 peptide), making it easily digestible, hypoallergenic, anti-inflammatory, and gut-nourishing.
2. The Authentic 5-Stage Vedic Bilona Method:
   - Raw A2 whole milk is gently boiled over low heat and naturally cooled.
   - Inoculated with pure live desi curd culture to form whole curd (dahi).
   - Hand-churned bi-directionally using a wooden churner (bilona) at dawn to extract cultured makkhan (butter).
   - Slow-simmered over a gentle low flame until all milk solids separate and moisture evaporates.
   - Filtered into pure golden, grainy (danedar) liquid gold. Rich nutty aroma, velvety texture.
3. Health & Ayurvedic Benefits:
   - Abundant in butyric acid (nourishes gut lining, strengthens gut microbiome).
   - Rich in fat-soluble vitamins (A, D, E, K2) and conjugated linoleic acid (CLA).
   - Enhances Ojas (vital energy, immunity, skin glow, longevity).
   - Natural lubricator for joints, brain tonic (boosts memory and mental clarity).
   - Safe for lactose-intolerant individuals due to cultured preparation and complete removal of milk solids.
4. Kitchen & Culinary Excellence:
   - Extremely high smoke point (~250°C / 485°F), completely safe for high-heat cooking, deep frying, roasting, and tadka.
   - Perfect for tempering dals, drizzling over hot rotis, steaming parathas, khichdi, aromatic biryanis, and traditional sweets.
5. Official Products & Pricing:
   - 500g Jar: ₹449
   - 1 kg Jar: ₹799 (and ₹2,299 artisanal reserve jar)
   - Active Offer: Special Offer of ₹250 OFF automatically applied in the cart.
   - Welcome Discount Code: SAVE300 for ₹300 off.
   - Free Pan-India delivery on orders above ₹599.
   - Orders can be placed seamlessly via the on-page Shop, the Cart, or directly through WhatsApp (+91-98765-43210).
6. Quality Assurance:
   - FSSAI certified, 100% pure lab-tested, zero preservatives, zero palm oil, zero chemical additives, zero adulteration.

Guidelines:
- Maintain conversation history and context naturally.
- Keep answers concise, clear, and engaging (2-4 well-structured paragraphs or bullet points).
- If asked about unrelated subjects (like coding or politics), politely steer back to Araj Pure A2 Ghee, Ayurvedic health, cooking tips, or ordering.`;

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export async function handleGeminiChat(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  let bodyStr = '';
  req.on('data', chunk => {
    bodyStr += chunk;
  });

  req.on('end', async () => {
    try {
      const parsed = JSON.parse(bodyStr || '{}');
      const messages: { role: 'user' | 'assistant'; content: string }[] = parsed.messages || [];

      if (!Array.isArray(messages) || messages.length === 0) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'messages array is required' }));
        return;
      }

      const ai = getAiClient();
      if (!ai) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured.' }));
        return;
      }

      // Convert conversation history into contents format expected by Gemini
      const contents = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      // Use gemini-3.5-flash for general multi-turn tasks
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Namaste! 🙏 How can I assist you with Araj Pure A2 Desi Cow Ghee today?';

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ reply: replyText }));
    } catch (err: unknown) {
      console.error('Gemini chat error:', err);
      const message = err instanceof Error ? err.message : 'Unknown server error';
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: message }));
    }
  });
}
