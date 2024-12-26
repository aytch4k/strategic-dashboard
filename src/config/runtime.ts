// Runtime configuration that loads after the app starts
export async function loadRuntimeConfig() {
  try {
    const response = await fetch('/config.json');
    if (!response.ok) {
      throw new Error('Failed to load runtime configuration');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading runtime configuration:', error);
    return {};
  }
}

// Type-safe config access
export function getConfig<T>(key: string, fallback: T): T {
  const value = window.__RUNTIME_CONFIG__?.[key];
  return value !== undefined ? value : fallback;
}

// Declare global runtime config
declare global {
  interface Window {
    __RUNTIME_CONFIG__?: Record<string, any>;
  }
}