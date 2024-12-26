import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { runtimeKeys } from './src/config/environment';

// Filter sensitive env vars from build
function filterEnvKeys(env: Record<string, string>) {
  const filtered: Record<string, string> = {};
  for (const key in env) {
    if (!runtimeKeys.includes(key)) {
      filtered[key] = env[key];
    }
  }
  return filtered;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react']
    },
    define: {
      // Only include non-sensitive env vars
      'process.env': filterEnvKeys(env)
    }
  };
});