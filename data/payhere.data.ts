import { PayHereCardBrand } from '@constants/payment';
import type { PayHereSandboxCard } from '@models/checkout.types';

export interface PayHereCardDefaults {
  readonly cardExpiry: string;
  readonly cardCvv: string;
  readonly cardHolder: string;
}

/** Official PayHere sandbox cards — https://support.payhere.lk/api-&-mobile-sdk/payhere-checkout */
export const PAYHERE_SANDBOX_CARDS = {
  success: {
    visa: { brand: PayHereCardBrand.Visa, number: '4916217501611292' } satisfies PayHereSandboxCard,
    master: { brand: PayHereCardBrand.Master, number: '5307732125531191' } satisfies PayHereSandboxCard,
    amex: { brand: PayHereCardBrand.Amex, number: '346781005510225' } satisfies PayHereSandboxCard,
  },
  insufficientFunds: {
    visa: { brand: PayHereCardBrand.Visa, number: '4024007194349121' } satisfies PayHereSandboxCard,
    master: { brand: PayHereCardBrand.Master, number: '5459051433777487' } satisfies PayHereSandboxCard,
    amex: { brand: PayHereCardBrand.Amex, number: '370787711978928' } satisfies PayHereSandboxCard,
  },
  limitExceeded: {
    visa: { brand: PayHereCardBrand.Visa, number: '4929119799365646' } satisfies PayHereSandboxCard,
    master: { brand: PayHereCardBrand.Master, number: '5491182243178283' } satisfies PayHereSandboxCard,
    amex: { brand: PayHereCardBrand.Amex, number: '340701811823469' } satisfies PayHereSandboxCard,
  },
  doNotHonor: {
    visa: { brand: PayHereCardBrand.Visa, number: '4929768900837248' } satisfies PayHereSandboxCard,
    master: { brand: PayHereCardBrand.Master, number: '5388172137367973' } satisfies PayHereSandboxCard,
    amex: { brand: PayHereCardBrand.Amex, number: '374664175202812' } satisfies PayHereSandboxCard,
  },
  networkError: {
    visa: { brand: PayHereCardBrand.Visa, number: '4024007120869333' } satisfies PayHereSandboxCard,
    master: { brand: PayHereCardBrand.Master, number: '5237980565185003' } satisfies PayHereSandboxCard,
    amex: { brand: PayHereCardBrand.Amex, number: '373433500205887' } satisfies PayHereSandboxCard,
  },
} as const;

export function getPayHereCardDefaults(): PayHereCardDefaults {
  return {
    cardExpiry: process.env.GENKI_PAYHERE_CARD_EXPIRY?.trim() || '12/28',
    cardCvv: process.env.GENKI_PAYHERE_CARD_CVV?.trim() || '123',
    cardHolder: process.env.GENKI_PAYHERE_CARD_HOLDER?.trim() || 'Auto Tester',
  };
}
