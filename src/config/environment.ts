// Build-time environment variables - NO SENSITIVE DATA
export const environment = {
  production: import.meta.env.PROD,
  development: import.meta.env.DEV,
  mode: import.meta.env.MODE,
  base: import.meta.env.BASE_URL,
};

// Runtime-only keys that should never be bundled
export const runtimeKeys = [
  'VITE_GOOGLE_SHEETS_API_KEY',
  'VITE_GOOGLE_SHEETS_ID', 
  'VITE_TIMELINE_SHEETS_ID',
  'VITE_LINEAR_API_KEY'
];