import path from "node:path";
import fs from "node:fs/promises";

async function printFilesRecursively(dirPath: string, routes = [] as string[]) {
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
    configureServer(server: any) {
      server.watcher.on("change", async () => {
        const routes = await printFilesRecursively("src/routes");
        fs.writeFile(
          "./node_modules/svelte-links/index.d.ts",
          "export type SvelteKitLink = " +
            routes.map((x) => `\`${x}\``).join("|")
        );
      });
    },
  };
}
