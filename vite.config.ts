import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
      base: './', // REQUIRED for GitHub Pages to find assets
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // securely pass the 3 keys from GitHub Secrets to the app
        'process.env.GEMINI_KEY_1': JSON.stringify(process.env.GEMINI_KEY_1 || env.GEMINI_KEY_1),
        'process.env.GEMINI_KEY_2': JSON.stringify(process.env.GEMINI_KEY_2 || env.GEMINI_KEY_2),
        'process.env.GEMINI_KEY_3': JSON.stringify(process.env.GEMINI_KEY_3 || env.GEMINI_KEY_3),
        'process.env.API_KEY': JSON.stringify(process.env.GEMINI_KEY_1 || env.GEMINI_KEY_1)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist', // Standard output folder
      }
    };
});
