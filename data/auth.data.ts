import { requiredEnv } from '@fixtures/env';
import type { AuthCredentials, AuthValidationInputs } from '@models/auth.types';

const DEFAULT_DISPLAY_NAME = 'Ashen';

export const AUTH_VALIDATION: AuthValidationInputs = {
  invalidEmail: 'not-an-email',
  unknownEmail: 'nobody-exists-xyz@example.com',
  wrongPassword: 'WrongPassword123!',
  weakPassword: 'short',
};

export function getAuthCredentials(): AuthCredentials {
  return {
    email: requiredEnv('GENKI_TEST_EMAIL'),
    password: requiredEnv('GENKI_TEST_PASSWORD'),
    displayName: process.env.GENKI_TEST_DISPLAY_NAME?.trim() || DEFAULT_DISPLAY_NAME,
  };
}
