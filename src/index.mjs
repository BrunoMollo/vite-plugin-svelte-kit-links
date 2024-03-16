import path from "node:path";
import fs from "node:fs/promises";

async function printFilesRecursively(dirPath, routes = []) {
  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await printFilesRecursively(filePath, routes); // Recurse into subdirectory
      } else {
        if (filePath.includes("+page.svelte")) {
          routes.push(
            filePath
              .replace("src/routes", "")
              .replace("/+page.svelte", "")
              .replace(/\[(.*?)\]/g, "${string}")
          );
        }
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
  return routes;
}

export function svelteKitLinks() {
  return {
    name: "my-vite-plugin",
    configureServer(server) {
      server.watcher.on("change", async () => {
        const routes = await printFilesRecursively("src/routes");
        fs.writeFile(
          "./node_modules/vite-plugin-svelte-kit-links/src/links.ts",
          "export type SvelteKitLink = " +
            routes.map((x) => `\`${x}\``).join("|")
        );
      });
    },
  };
}

/**
 * .
 * @param {import("./index.d.ts").SvelteKitLink} url - Should be a vaild url inside the app.
 */
export function u(href) {
  return href;
}
