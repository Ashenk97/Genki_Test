import type { EnvConfig, TestEnvironmentName } from '@models/env.types';

export enum Environments {
  Staging = 'staging',
  Production = 'production',
}

export const ENVIRONMENT_CONFIG: Record<Environments, EnvConfig> = {
  [Environments.Staging]: {
    name: Environments.Staging,
    baseURL: 'https://staging.genkiwardrobe.com/',
  },
  [Environments.Production]: {
    name: Environments.Production,
    baseURL: 'https://www.genkiwardrobe.com/',
  },
};

export function resolveTestEnv(): TestEnvironmentName {
  const raw = (process.env.TEST_ENV ?? Environments.Staging).trim().toLowerCase();

  if (raw === Environments.Production || raw === 'prod') {
    return Environments.Production;
  }
  if (raw === Environments.Staging || raw === 'stage' || raw === '') {
    return Environments.Staging;
  }

  throw new Error(
    `Unknown TEST_ENV "${process.env.TEST_ENV}". Use "${Environments.Staging}" or "${Environments.Production}".`,
  );
}

export function getEnvConfig(): EnvConfig {
  return ENVIRONMENT_CONFIG[resolveTestEnv()];
}

export function isProductionEnv(): boolean {
  return resolveTestEnv() === Environments.Production;
}
