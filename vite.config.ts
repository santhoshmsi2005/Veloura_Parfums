// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

function previewServerShimPlugin(): Plugin {
  const writeShim = () => {
    try {
      const rootDir = process.cwd();
      const distDir = path.resolve(rootDir, "dist/server");
      const serverPath = path.join(distDir, "server.js");
      const publicSourceDir = path.join(rootDir, ".output", "public");
      const clientDistDir = path.join(rootDir, "dist", "client");

      fs.mkdirSync(distDir, { recursive: true });

      if (fs.existsSync(publicSourceDir)) {
        fs.mkdirSync(clientDistDir, { recursive: true });
        fs.cpSync(publicSourceDir, clientDistDir, { recursive: true });
      }

      const shimContent = `// Generated for TanStack Start preview server
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import server from "../../.output/server/index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../../.output/public");

const MIME_TYPES = {
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
};

function serveStaticAsset(pathname) {
  try {
    const safePath = path.normalize(pathname).replace(/^([\\.\\/\\\\])+/, "");
    const filePath = path.join(publicDir, safePath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      const data = fs.readFileSync(filePath);
      return new Response(data, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Length": String(data.byteLength),
          "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
        },
      });
    }
  } catch {}
  return null;
}

const assetsFetcher = {
  async fetch(req) {
    const url = new URL(req.url, "http://localhost");
    const resp = serveStaticAsset(url.pathname);
    if (resp) return resp;
    return new Response("Not found", { status: 404 });
  },
};

const env = { ASSETS: assetsFetcher };
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} };

export default {
  async fetch(request) {
    Object.defineProperty(request, "ip", { value: undefined, writable: true, configurable: true });
    const url = new URL(request.url, "http://localhost");
    const staticResp = serveStaticAsset(url.pathname);
    if (staticResp) {
      return staticResp;
    }
    return server.fetch(request, env, ctx);
  },
};
`;
      fs.writeFileSync(serverPath, shimContent, "utf8");
    } catch (e) {
      console.warn("[previewServerShimPlugin] Failed to write preview shim:", e);
    }
  };

  return {
    name: "preview-server-shim",
    closeBundle: {
      order: "post",
      handler() {
        writeShim();
      },
    },
    configurePreviewServer: {
      order: "pre",
      handler() {
        writeShim();
      },
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [previewServerShimPlugin()],
  },
});
