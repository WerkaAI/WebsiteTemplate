#!/usr/bin/env node
import http from "node:http";
import path from "node:path";
import { fileURLToPath, parse as parseUrl } from "node:url";
import next from "next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const projectRoot = path.resolve(__dirname, "../..");

export async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function isServerReachable(url, timeoutMs = 1500) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal, method: "GET" });
    return response.ok;
  } catch (error) {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function startEmbeddedDevServer(hostname, port) {
  const devApp = next({ dev: true, hostname, port, dir: projectRoot });
  await devApp.prepare();

  const handler = devApp.getRequestHandler();
  const server = http.createServer((req, res) => {
    const parsedUrl = parseUrl(req.url ?? "", true);
    handler(req, res, parsedUrl);
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, hostname, resolve);
  });

  console.log(`Embedded Next dev server ready at http://${hostname}:${port}`);

  return async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
    await devApp.close();
  };
}

export async function ensureServer(baseUrlInput, { autoStartEnvVar = "REVIEW_AUTO_START", maxAttempts = 90 } = {}) {
  const baseUrl = baseUrlInput instanceof URL ? baseUrlInput : new URL(baseUrlInput || "http://localhost:3000");
  const healthcheckUrl = new URL("/", baseUrl).toString();

  if (await isServerReachable(healthcheckUrl)) {
    return { stop: async () => {}, baseUrl };
  }

  const allowAutoStart = (process.env[autoStartEnvVar] ?? "1") !== "0";
  if (!allowAutoStart) {
    throw new Error(`Server not reachable at ${healthcheckUrl}. Either start it manually or set ${autoStartEnvVar}=1.`);
  }

  if (!["localhost", "127.0.0.1"].includes(baseUrl.hostname)) {
    throw new Error(`Auto-start is only supported for localhost URLs. Current base URL: ${baseUrl.href}`);
  }

  const port = Number.parseInt(baseUrl.port || "3000", 10);
  console.log(`No server detected at ${healthcheckUrl}. Booting embedded Next dev server on port ${port}...`);

  const stopServer = await startEmbeddedDevServer(baseUrl.hostname, port);

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    if (await isServerReachable(healthcheckUrl, 10000)) {
      return { stop: stopServer, baseUrl };
    }
    await sleep(500);
  }

  await stopServer();
  throw new Error(`Timed out waiting for embedded server to respond at ${healthcheckUrl}`);
}
