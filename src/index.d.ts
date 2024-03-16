// index.d.ts

// Define the type for SvelteKitLink
export type SvelteKitLink = string;

// Define the module for svelteKitLinks function
export declare function svelteKitLinks(): {
  name: string;
  configureServer(server: any): void;
};

// Define the module for u function
/**
 * @param {SvelteKitLink} url - Should be a valid url inside the app.
 * @returns {string} The provided URL.
 */
export declare function u(url: SvelteKitLink): string;
