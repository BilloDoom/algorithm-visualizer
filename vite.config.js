import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/algorithm-visualizer/',

  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        drawAPI: path.resolve(__dirname, 'src/lib/drawAPI.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'drawAPI') {
            return 'public/[name].bundle.js';
          }
          return '[name].js';
        }
      }
    },
    emptyOutDir: false
  }
});
