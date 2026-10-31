import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
  const base = process.env.VITE_BASE_PATH || (isGithubActions ? '/mikhael-gold/' : '/');

  return {
    base,
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5005',
          changeOrigin: true,
        },
        '/uploads': {
          target: 'http://127.0.0.1:5005',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
    },
  };
});
