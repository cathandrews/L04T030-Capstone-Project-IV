// Polyfill TextEncoder and TextDecoder for jsdom
if (typeof window.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  window.TextEncoder = TextEncoder;
  window.TextDecoder = TextDecoder;
}

// Import jest-dom for extended expect matchers
import '@testing-library/jest-dom';
