import type { PayHereCardBrand } from '@constants/payment';

export interface GuestBillingDetails {
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly addressOne: string;
  readonly addressTwo: string;
  readonly city: string;
}

export interface PayHereCardDetails {
  readonly number: string;
  readonly brand: PayHereCardBrand;
  readonly holder?: string;
  readonly expiry?: string;
  readonly cvv?: string;
}

export interface PayHereSandboxCard {
  readonly brand: PayHereCardBrand;
  readonly number: string;
}
