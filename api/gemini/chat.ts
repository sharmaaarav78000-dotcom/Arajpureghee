import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleGeminiChat } from '../../artifacts/araj-pure/server/geminiChatHandler.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  return handleGeminiChat(req, res);
}
