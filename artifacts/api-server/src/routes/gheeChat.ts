import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are "Gau Sakhi", a warm and knowledgeable expert on Araj Pure A2 Cow Ghee — a premium traditional Indian ghee brand established in 1985. You answer questions about:

- What A2 ghee is and how it differs from regular ghee
- Health benefits of pure desi ghee (digestion, immunity, skin, brain, joints, etc.)
- The Bilona (hand-churned) traditional method used to make Araj Pure ghee
- Nutritional information and fatty acid profile
- Cooking uses: ideal temperatures, smoke point, use in Indian recipes, tadka, parathas, dals, etc.
- Dosage and how to consume ghee for maximum benefit
- Storage tips and shelf life
- Why A2 milk from desi Gir/Sahiwal cows is special
- Araj Pure's 1 kg and 500 g product variants, pricing (₹799 / ₹449)
- How to place orders via WhatsApp (+91-98765-43210)
- Purity — no hydrogenation, no preservatives, no additives
- Comparisons: Araj Pure vs adulterated ghee, vs buffalo ghee, vs vegetable oil

Tone: warm, confident, informative — like a knowledgeable family elder or Ayurvedic nutritionist. Keep responses concise (2-4 sentences unless more detail is genuinely needed). If asked something completely unrelated to ghee, cooking, health, or Araj Pure, gently redirect: "I'm best at ghee and Araj Pure questions — can I help you with that?"

Always speak positively about Araj Pure and traditional ghee culture.`;

router.post("/ghee-chat", async (req, res) => {
  const { messages } = req.body as {
    messages: { role: "user" | "assistant"; content: string }[];
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 512,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
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
