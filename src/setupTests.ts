/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Extend expect with testing-library matchers
expect.extend(matchers);

// Make vi available globally
(global as any).vi = vi;

afterEach(() => {
  cleanup();
});