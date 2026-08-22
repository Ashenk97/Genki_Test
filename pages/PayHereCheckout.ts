import { Frame, Page, expect } from '@playwright/test';
import { PayHereCardBrand } from '@constants/payment';
import { Timeouts } from '@constants/timeouts';
import { getPayHereCardDefaults } from '@data/payhere.data';
import type { PayHereCardDetails } from '@models/checkout.types';
import { BasePage } from '@pages/BasePage';

/**
 * PayHere onsite checkout: outer #ph-iframe + nested test_ipg card form.
 */
export class PayHereCheckout extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private checkoutFrame(): Frame | undefined {
    return this.page.frames().find((f) => /checkoutRe/i.test(f.url()));
  }

  async waitForCheckoutFrame(timeout = Timeouts.PayHereFrame): Promise<Frame> {
    const iframe = this.page.locator('#ph-iframe');
    await expect(iframe).toBeVisible({ timeout });

    await expect
      .poll(
        async () => {
          const frame = this.checkoutFrame();
          if (!frame) {
            return false;
          }
          return frame
            .locator('#methods_crcd_container, #payment_container_VISA')
            .first()
            .isVisible()
            .catch(() => false);
        },
        { timeout },
      )
      .toBe(true);

    const frame = this.checkoutFrame();
    if (!frame) {
      throw new Error('PayHere checkout frame did not become interactive');
    }
    return frame;
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

  private async waitForIpgFrame(timeout = Timeouts.PayHereIpg): Promise<Frame> {
    await expect
      .poll(
        async () => {
          const frame = this.page.frames().find((f) => /test_ipg/i.test(f.url()));
          if (!frame) {
            return false;
          }
          return frame.locator('#cardNo').isVisible().catch(() => false);
        },
        { timeout },
      )
      .toBe(true);

    const frame = this.page.frames().find((f) => /test_ipg/i.test(f.url()));
    if (!frame) {
      throw new Error('PayHere test_ipg card frame did not appear');
    }
    await expect(frame.locator('#cardNo')).toBeVisible({ timeout: Timeouts.ShortUi });
    return frame;
  }

  private async clickTryAgainIfDeclined(): Promise<void> {
    for (const frame of this.page.frames()) {
      const tryAgain = frame.getByRole('link', { name: /^try again$/i }).or(
        frame.getByText(/^try again$/i),
      );
      if (await tryAgain.first().isVisible().catch(() => false)) {
        await tryAgain.first().click();
        return;
      }
    }
  }

  async fillCard(card: PayHereCardDetails): Promise<this> {
    await this.clickTryAgainIfDeclined();
    const existingIpg = this.page.frames().find((f) => /test_ipg/i.test(f.url()));
    const cardFormReady = existingIpg
      ? await existingIpg.locator('#cardNo').isVisible().catch(() => false)
      : false;
    if (!cardFormReady) {
      await this.selectCardBrand(card.brand);
    }
    const ipg = await this.waitForIpgFrame();
    const defaults = getPayHereCardDefaults();
    const cvv =
      card.cvv ?? (card.brand === PayHereCardBrand.Amex ? '1234' : defaults.cardCvv);
    await ipg.locator('#cardHolderName').fill(card.holder ?? defaults.cardHolder);
    await ipg.locator('#cardNo').click();
    await ipg.locator('#cardNo').fill('');
    await ipg.locator('#cardNo').pressSequentially(card.number, { delay: 15 });
    await ipg.locator('#cardSecureId').fill(cvv);
    await ipg.locator('#cardExpiry').fill('');
    await ipg.locator('#cardExpiry').pressSequentially(card.expiry ?? defaults.cardExpiry, {
      delay: 15,
    });
    await ipg.locator('#cardHolderName').click();
    return this;
  }

  async submitCard(): Promise<this> {
    const ipg = this.page.frames().find((f) => /test_ipg/i.test(f.url()));
    if (!ipg) {
      throw new Error('PayHere test_ipg frame missing at submit');
    }
    const submit = ipg.getByRole('button', { name: /^submit$/i });
    await expect(submit).toBeEnabled({ timeout: Timeouts.Assertion });
    await submit.click();
    return this;
  }

  async payWithCard(card: PayHereCardDetails): Promise<this> {
    await this.fillCard(card);
    await this.submitCard();
    return this;
  }

  async expectPaymentApproved(): Promise<void> {
    const outer = this.page.frameLocator('#ph-iframe');
    await expect(outer.getByText(/thank you!/i)).toBeVisible({
      timeout: Timeouts.PayHereResult,
    });
    await expect(outer.getByText(/payment approved/i)).toBeVisible();
  }

  async expectPaymentMethodUnavailable(): Promise<void> {
    await expect
      .poll(
        async () => {
          for (const frame of this.page.frames()) {
            const hit = await frame
              .getByText(/payment method unavailable|not enabled in sandbox/i)
              .first()
              .isVisible()
              .catch(() => false);
            if (hit) {
              return true;
            }
          }
          return false;
        },
        { timeout: Timeouts.PayHereIpg },
      )
      .toBe(true);
  }

  async expectPaymentDeclined(): Promise<void> {
    const outer = this.page.frameLocator('#ph-iframe');
    await expect(outer.getByText(/payment declined/i)).toBeVisible({
      timeout: Timeouts.PayHereResult,
    });
  }

  async cancelCheckout(): Promise<this> {
    const outer = this.page.frameLocator('#ph-iframe');
    const cancel = outer.getByRole('button', { name: /cancel|close|back/i }).first();
    if (await cancel.isVisible({ timeout: Timeouts.ShortUi }).catch(() => false)) {
      await cancel.click();
      return this;
    }
    // Fallback: leave checkout without completing payment.
    await this.page.goto('/cart');
    await this.waitForPageLoad();
    await this.acceptCookiesIfVisible();
    return this;
  }

  async expectCheckoutFrameVisible(): Promise<void> {
    await expect(this.page.locator('#ph-iframe')).toBeVisible({ timeout: Timeouts.PayHereFrame });
  }
}
