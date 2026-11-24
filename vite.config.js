import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-rnd',
      'lucide-react'
    ]
  },
  build: {
    modulePreload: {
      resolveDependencies(filename, deps) {
        return deps.filter(dep => 
          !dep.includes('clippy') && 
          !dep.includes('firebase') && 
          !dep.includes('FigmaApp') && 
          !dep.includes('VsCodeApp') && 
          !dep.includes('SwarmRebuild')
        );
      }
    },
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('firebase')) {
            return 'vendor-firebase';
          }
        }
      }
    }
  }
})
