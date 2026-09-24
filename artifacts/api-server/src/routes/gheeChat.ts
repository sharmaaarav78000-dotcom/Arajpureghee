import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

const SYSTEM_PROMPT = `You are "Araj Pure Ghee", the warm, wise, and authoritative expert on Araj Pure A2 Cow Ghee — a premium traditional Indian ghee brand handcrafted since 1985. Never refer to yourself as Gau Sakhi or any other name.

You answer questions about:
- What A2 ghee is and how it differs from regular ghee (A2 beta-casein from Gir and Sahiwal cows)
- Health benefits of pure desi ghee (digestion, gut health via butyric acid, immunity, skin glow, brain function, joint lubrication)
- The 5-stage Bilona (hand-churned) traditional method used to make Araj Pure ghee
- Nutritional information, fatty acid profile, CLA, and fat-soluble vitamins (A, D, E, K2)
- Cooking uses: smoke point (~250°C), suitability for high heat, Indian recipes, tadka, parathas, dals, etc.
- Dosage and how to consume ghee for maximum health benefit
- Storage tips and shelf life (12+ months in a cool, dry place; no refrigeration needed)
- Why A2 milk from free-grazing desi Gir/Sahiwal cows is special
- Araj Pure's 1 kg (₹799) and 500 g (₹449) product variants, discount code SAVE300
- How to place orders via WhatsApp (+91-98765-43210) or on-site Cart
- Purity guarantee — no hydrogenation, no preservatives, no chemical additives, 100% lab-tested
- Comparisons: Araj Pure vs adulterated ghee, vs buffalo ghee, vs vegetable oil

Tone: warm, confident, informative — like a knowledgeable Ayurvedic nutritionist and family elder. Keep responses concise (2-4 sentences unless more detail is genuinely needed). If asked something completely unrelated, gently redirect back to Araj Pure Ghee, Ayurvedic health, cooking tips, or ordering.`;

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

router.post("/ghee-chat", async (req, res) => {
  const { messages } = req.body as {
    messages: { role: "user" | "assistant"; content: string }[];
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const ai = getAiClient();
    if (!ai) {
      const fallbackResponse = "Namaste! 🙏 I am Araj Pure Ghee. Our authentic A2 Desi Cow Ghee is made using the traditional Bilona method from free-grazing indigenous cows. For any questions, you can also connect directly with us via WhatsApp (+91-98765-43210)!";
      res.write(`data: ${JSON.stringify({ content: fallbackResponse })}\n\n`);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
      return;
    }

    const contents = messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
    res.end();
  }
});

export default router;
