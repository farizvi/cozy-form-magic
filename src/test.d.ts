/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toBeVisible(): R;
  toBeEmpty(): R;
  toBeEmptyDOMElement(): R;
  toBeInvalid(): R;
  toBeRequired(): R;
  toBeValid(): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toBePartiallyChecked(): R;
  toBeChecked(): R;
  toBeHidden(): R;
  toContainElement(element: HTMLElement | null): R;
  toContainHTML(html: string): R;
  toHaveAttribute(attr: string, value?: string): R;
  toHaveClass(...classNames: string[]): R;
  toHaveFocus(): R;
  toHaveFormValues(values: { [key: string]: any }): R;
  toHaveStyle(css: string | { [key: string]: any }): R;
  toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
  toHaveValue(value?: string | string[] | number): R;
  toBeInTheDOM(): R;
  toHaveDescription(text?: string | RegExp): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}