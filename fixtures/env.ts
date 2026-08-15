import fs from 'fs';
import path from 'path';
import { resolveTestEnv } from './environments';

type LoadOptions = {
  override?: boolean;
};

export function loadEnvFile(fileName = '.env', options: LoadOptions = {}): void {
  const envPath = path.resolve(__dirname, '..', fileName);
  if (!fs.existsSync(envPath)) {
    return;
  }

  const { override = false } = options;

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const eq = trimmed.indexOf('=');
    if (eq === -1) {
      continue;
    }

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (override || process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

export function loadProjectEnv(): void {
  loadEnvFile('.env');
  const testEnv = resolveTestEnv();
  loadEnvFile(`.env.${testEnv}`);
}

export function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    const testEnv = resolveTestEnv();
    throw new Error(
      `Missing required environment variable "${name}" for TEST_ENV=${testEnv}. ` +
        `Copy .env.example to .env.${testEnv} (or .env) and set credentials, ` +
        'or configure the matching Actions secrets / environment secrets in CI.',
    );
  }
  return value;
}

loadProjectEnv();
