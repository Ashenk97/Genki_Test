import { Frame, Page, expect } from '@playwright/test';
import { TEST_DATA } from '../fixtures/test-data';

export type PayHereCardBrand = 'VISA' | 'MASTER' | 'AMEX';

export type PayHereCardDetails = {
  number: string;
  holder?: string;
  expiry?: string;
  cvv?: string;
  brand: PayHereCardBrand;
};

/**
 * PayHere onsite checkout: outer #ph-iframe + nested test_ipg card form.
 */
export class PayHereCheckout {
  constructor(private readonly page: Page) {}

  private checkoutFrame(): Frame | undefined {
    return this.page.frames().find((f) => /checkoutRe/i.test(f.url()));
  }

  async waitForCheckoutFrame(timeout = 30_000): Promise<Frame> {
    await this.page.waitForSelector('#ph-iframe', { timeout });
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const frame = this.checkoutFrame();
      if (frame) {
        const ready = await frame
          .locator('#methods_crcd_container, #payment_container_VISA')
          .first()
          .isVisible()
          .catch(() => false);
        if (ready) {
          return frame;
        }
      }
      await this.page.waitForTimeout(250);
    }
    throw new Error('PayHere checkout frame did not become interactive');
  }

  async selectCardBrand(brand: PayHereCardBrand): Promise<void> {
    const frame = await this.waitForCheckoutFrame();
    await frame.evaluate((method) => {
      const select = (window as unknown as { selectPaymentMethod?: (m: string) => void })
        .selectPaymentMethod;
      if (typeof select !== 'function') {
        throw new Error('selectPaymentMethod is not available on PayHere frame');
      }
      select(method);
    }, brand);
  }

  private async waitForIpgFrame(timeout = 20_000): Promise<Frame> {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const frame = this.page.frames().find((f) => /test_ipg/i.test(f.url()));
      if (frame) {
        await frame.locator('#cardNo').waitFor({ state: 'visible', timeout: 10_000 });
        return frame;
      }
      await this.page.waitForTimeout(250);
    }
    throw new Error('PayHere test_ipg card frame did not appear');
  }

  async fillCard(card: PayHereCardDetails): Promise<void> {
    await this.selectCardBrand(card.brand);
    const ipg = await this.waitForIpgFrame();
    const { payhere } = TEST_DATA;
    await ipg.locator('#cardHolderName').fill(card.holder ?? payhere.cardHolder);
    await ipg.locator('#cardNo').click();
    await ipg.locator('#cardNo').fill('');
    await ipg.locator('#cardNo').pressSequentially(card.number, { delay: 15 });
    await ipg.locator('#cardSecureId').fill(card.cvv ?? payhere.cardCvv);
    await ipg.locator('#cardExpiry').fill('');
    await ipg.locator('#cardExpiry').pressSequentially(card.expiry ?? payhere.cardExpiry, {
      delay: 15,
    });
    await ipg.locator('#cardHolderName').click();
  }

  async submitCard(): Promise<void> {
    const ipg = this.page.frames().find((f) => /test_ipg/i.test(f.url()));
    if (!ipg) {
      throw new Error('PayHere test_ipg frame missing at submit');
    }
    const submit = ipg.getByRole('button', { name: /^submit$/i });
    await expect(submit).toBeEnabled({ timeout: 15_000 });
    await submit.click();
  }

  async payWithCard(card: PayHereCardDetails): Promise<void> {
    await this.fillCard(card);
    await this.submitCard();
  }

  async expectPaymentApproved(): Promise<void> {
    const outer = this.page.frameLocator('#ph-iframe');
    await expect(outer.getByText(/thank you!/i)).toBeVisible({ timeout: 45_000 });
    await expect(outer.getByText(/payment approved/i)).toBeVisible();
  }

  async expectPaymentDeclined(): Promise<void> {
    const outer = this.page.frameLocator('#ph-iframe');
    await expect(outer.getByText(/payment declined/i)).toBeVisible({ timeout: 45_000 });
  }
}
