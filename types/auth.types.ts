export interface AuthCredentials {
  readonly email: string;
  readonly password: string;
  readonly displayName: string;
}

export interface AuthValidationInputs {
  readonly invalidEmail: string;
  readonly unknownEmail: string;
  readonly wrongPassword: string;
  readonly weakPassword: string;
}

export type AccountSection =
  | 'orders'
  | 'loyalty'
  | 'address'
  | 'accountDetails'
  | 'rewards';
