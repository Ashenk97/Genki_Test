export type TestEnvironment = 'staging' | 'production';

export type EnvConfig = {
  name: TestEnvironment;
  baseURL: string;
};

export const ENVIRONMENTS: Record<TestEnvironment, EnvConfig> = {
  staging: {
    name: 'staging',
    baseURL: 'https://staging.genkiwardrobe.com/',
  },
  production: {
    name: 'production',
    baseURL: 'https://www.genkiwardrobe.com/',
  },
};

export function resolveTestEnv(): TestEnvironment {
  const raw = (process.env.TEST_ENV ?? 'staging').trim().toLowerCase();

  if (raw === 'production' || raw === 'prod') {
    return 'production';
  }
  if (raw === 'staging' || raw === 'stage' || raw === '') {
    return 'staging';
  }

  throw new Error(
    `Unknown TEST_ENV "${process.env.TEST_ENV}". Use "staging" or "production".`,
  );
}

export function getEnvConfig(): EnvConfig {
  return ENVIRONMENTS[resolveTestEnv()];
}
