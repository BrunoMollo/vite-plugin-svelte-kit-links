import type * as links from "./links";
export type SvelteKitLink = links.SvelteKitLink;

export declare function svelteKitLinks(): {
  name: string;
  configureServer(server: any): void;
};

/**
 * @param {links.SvelteKitLink} url - Should be a valid url inside the app.
 * @returns {string} The provided URL.
 */
export declare function u(url: links.SvelteKitLink): string;
