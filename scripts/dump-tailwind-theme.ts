#!/usr/bin/env tsx
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import resolveConfig from "tailwindcss/resolveConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadTailwindConfig() {
  const configUrl = pathToFileURL(path.resolve(__dirname, "../tailwind.config.ts"));
  const module = await import(configUrl.href);
  const config = module.default ?? module;
  return resolveConfig(config);
}

function pickSerializable(value: unknown): unknown {
  if (value === null) return value;
  if (Array.isArray(value)) {
    return value.map((entry) => pickSerializable(entry));
  }
  if (typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (typeof entry === "function") continue;
      output[key] = pickSerializable(entry);
    }
    return output;
  }
  return value;
}

async function run() {
  const fullConfig = await loadTailwindConfig();
  const theme = fullConfig.theme ?? {};

  const subset = {
    colors: pickSerializable(theme.colors),
    spacing: pickSerializable(theme.spacing),
    fontFamily: pickSerializable(theme.fontFamily),
    fontSize: pickSerializable(theme.fontSize),
    borderRadius: pickSerializable(theme.borderRadius),
    boxShadow: pickSerializable(theme.boxShadow),
    screens: pickSerializable(theme.screens),
  };

  const outputDir = path.resolve(__dirname, "../docs/review/artifacts/mobile");
  await fs.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "tokens.json");

  await fs.writeFile(
    outputPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), tokens: subset }, null, 2),
    "utf8"
  );
  console.log(`Tailwind tokens written to ${outputPath}`);
}

run().catch((error) => {
  console.error("Failed to dump Tailwind theme:", error);
  process.exitCode = 1;
});
