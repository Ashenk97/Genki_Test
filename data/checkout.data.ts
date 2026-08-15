import type { GuestBillingDetails } from '@models/checkout.types';

export function getGuestBillingDetails(): GuestBillingDetails {
  return {
    firstName: process.env.GENKI_CHECKOUT_FIRST_NAME?.trim() || 'Auto',
    lastName: process.env.GENKI_CHECKOUT_LAST_NAME?.trim() || 'Tester',
    phone: process.env.GENKI_CHECKOUT_PHONE?.trim() || '0771234567',
    addressOne: process.env.GENKI_CHECKOUT_ADDRESS?.trim() || '123 Test Street',
    addressTwo: process.env.GENKI_CHECKOUT_ADDRESS_2?.trim() || 'Colombo 07',
    city: process.env.GENKI_CHECKOUT_CITY?.trim() || 'Colombo',
  };
}

export function guestCheckoutEmail(prefix: string): string {
  return `${prefix}-${Date.now()}@mailinator.com`;
}
