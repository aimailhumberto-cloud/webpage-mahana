import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/playwright-report/**', '**/test-results/**', '**/.agents/**'],
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3201',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
