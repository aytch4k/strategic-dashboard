import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { loadRuntimeConfig } from './config/runtime';

async function init() {
  // Load runtime config before rendering
  window.__RUNTIME_CONFIG__ = await loadRuntimeConfig();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

init();