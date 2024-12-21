// Polyfills for Linear SDK browser compatibility
export default function setupPolyfills() {
  // Ensure proper global object
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.global = window;
    // @ts-ignore
    window.process = {
      env: {},
      version: 'v16.0.0',
      versions: {},
      platform: 'browser'
    };
  }

  // Ensure Buffer is available
  if (typeof window !== 'undefined' && !window.Buffer) {
    // @ts-ignore
    window.Buffer = {
      isBuffer: () => false,
      from: (data: any) => data,
      alloc: () => ({}),
      allocUnsafe: () => ({}),
      toString: () => ''
    };
  }
}