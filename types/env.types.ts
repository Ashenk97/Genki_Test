export type TestEnvironmentName = 'staging' | 'production';

export interface EnvConfig {
  readonly name: TestEnvironmentName;
  readonly baseURL: string;
}

export interface LoadEnvOptions {
  readonly override?: boolean;
}
