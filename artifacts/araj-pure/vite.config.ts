import fs from 'node:fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import { handleGeminiChat } from './server/geminiChatHandler';

const rawPort = process.env.PORT || '3000';
const parsedPort = Number(rawPort);
const port = !Number.isNaN(parsedPort) && parsedPort > 0 ? parsedPort : 3000;

const basePath = process.env.BASE_PATH ?? '/';

function geminiChatApiPlugin(): Plugin {
  return {
    name: 'gemini-chat-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/gemini/chat') {
          handleGeminiChat(req, res);
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/gemini/chat') {
          handleGeminiChat(req, res);
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    geminiChatApiPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': fs.existsSync(path.resolve(import.meta.dirname, 'attached_assets'))
        ? path.resolve(import.meta.dirname, 'attached_assets')
        : path.resolve(import.meta.dirname, '..', '..', 'attached_assets'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, '../../dist'),
    emptyOutDir: true,
  },
  server: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
