/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
  interface Window {
    Drupal: any;
    drupalSettings: any;
  }
  const Drupal: any;
}

export {};
