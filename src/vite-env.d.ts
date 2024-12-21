/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LINEAR_API_KEY: string
  readonly VITE_GOOGLE_SHEETS_API_KEY: string
  readonly VITE_GOOGLE_SHEETS_ID: string
  readonly VITE_TIMELINE_SHEETS_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}