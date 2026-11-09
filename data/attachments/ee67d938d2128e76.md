# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pdp.spec.ts >> Individual product >> should add quantity 3 to the cart
- Location: tests/pdp.spec.ts:100:7

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('.product-content .cart-plus-minus-box').first()
Expected: "3"
Received: "1"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('.product-content .cart-plus-minus-box').first()
    14 × locator resolved to <input readonly value="1" type="text" class="cart-plus-minus-box"/>
       - unexpected value "1"

```

```yaml
- textbox: "1"
```

# Test source

```ts
  307 |     const firstRow = boxes.filter((box) => Math.abs(box.top - firstTop) <= rowTolerance);
  308 |     const nextRow = boxes.filter((box) => box.top > firstTop + rowTolerance);
  309 |     if (nextRow.length === 0) {
  310 |       return null;
  311 |     }
  312 |     const firstRowBottom = Math.max(...firstRow.map((box) => box.bottom));
  313 |     const nextRowTop = Math.min(...nextRow.map((box) => box.top));
  314 |     return nextRowTop - firstRowBottom;
  315 |   }
  316 | 
  317 |   async expectWrappedSizeLabelsHaveRowGap(minGap = 8): Promise<void> {
  318 |     const gap = await this.wrappedSizeLabelRowGap();
  319 |     expect(gap, 'size chips should wrap onto a second row at this viewport').not.toBeNull();
  320 |     expect(gap as number, 'wrapped size chips should have a visible row gap').toBeGreaterThanOrEqual(
  321 |       minGap,
  322 |     );
  323 |   }
  324 | 
  325 |   async getListedSizes(): Promise<string[]> {
  326 |     return this.sizeLabels.allTextContents();
  327 |   }
  328 | 
  329 |   async expectAvailableSizeCount(minCount: number): Promise<void> {
  330 |     await expect.poll(async () => this.sizeRadios.count()).toBeGreaterThanOrEqual(minCount);
  331 |   }
  332 | 
  333 |   async expectOutOfStock(): Promise<void> {
  334 |     await expect(this.outOfStockButton).toBeVisible();
  335 |     await expect(this.outOfStockButton).toBeDisabled();
  336 |     await expect(this.addToCartButton).toHaveCount(0);
  337 |   }
  338 | 
  339 |   async expectPageNotFound(): Promise<void> {
  340 |     await expect(this.page.getByRole('heading', { name: /page not found/i })).toBeVisible();
  341 |   }
  342 | 
  343 |   async expectAddedToCart(): Promise<void> {
  344 |     await this.expectToast(AUTH_MESSAGES.addedToCartToast, ToastType.Success);
  345 |   }
  346 | 
  347 |   async dismissCartDrawer(): Promise<this> {
  348 |     if (await this.cartDrawerClose.isVisible().catch(() => false)) {
  349 |       await this.cartDrawerClose.click();
  350 |     }
  351 |     return this;
  352 |   }
  353 | 
  354 |   async expectProductDetailsVisible(): Promise<void> {
  355 |     await expect(this.productTitle).toBeVisible();
  356 |     await expect(this.price).toBeVisible();
  357 |     await expect(
  358 |       this.addToCartButton.or(this.selectSizePrompt).or(this.selectColorPrompt).or(this.outOfStockButton),
  359 |     ).toBeVisible();
  360 |   }
  361 | 
  362 |   async expectOnProductPage(): Promise<void> {
  363 |     await expect(this.page).toHaveURL(/\/products\//);
  364 |     await expect(this.productTitle).toBeVisible();
  365 |   }
  366 | 
  367 |   async expectProductTitle(name: string | RegExp): Promise<void> {
  368 |     await expect(this.productTitle).toHaveText(name);
  369 |   }
  370 | 
  371 |   async addToWishlist(): Promise<this> {
  372 |     await this.addToWishlistButton.click();
  373 |     return this;
  374 |   }
  375 | 
  376 |   async expectAddedToWishlist(): Promise<void> {
  377 |     await expect(
  378 |       this.page.locator('[data-sonner-toast]').filter({ hasText: AUTH_MESSAGES.wishlistToast }),
  379 |     ).toBeVisible();
  380 |   }
  381 | 
  382 |   async increaseQuantity(): Promise<this> {
  383 |     await this.increaseQtyButton.click();
  384 |     return this;
  385 |   }
  386 | 
  387 |   async decreaseQuantity(): Promise<this> {
  388 |     await this.decreaseQtyButton.click();
  389 |     return this;
  390 |   }
  391 | 
  392 |   async setQuantity(quantity: number): Promise<this> {
  393 |     const current = Number(await this.qtyInput.inputValue());
  394 |     if (current === quantity) {
  395 |       return this;
  396 |     }
  397 |     const clicks = quantity - current;
  398 |     const button = clicks > 0 ? this.increaseQtyButton : this.decreaseQtyButton;
  399 |     for (let i = 0; i < Math.abs(clicks); i += 1) {
  400 |       await button.click();
  401 |     }
  402 |     await this.expectQuantity(quantity);
  403 |     return this;
  404 |   }
  405 | 
  406 |   async expectQuantity(quantity: number): Promise<void> {
> 407 |     await expect(this.qtyInput).toHaveValue(String(quantity));
      |                                 ^ Error: expect(locator).toHaveValue(expected) failed
  408 |   }
  409 | 
  410 |   async expectQuantityStepperDisabled(): Promise<void> {
  411 |     await expect(this.increaseQtyButton).toBeDisabled();
  412 |     await expect(this.decreaseQtyButton).toBeDisabled();
  413 |   }
  414 | 
  415 |   async expectQuantityStepperEnabled(): Promise<void> {
  416 |     await expect(this.increaseQtyButton).toBeEnabled();
  417 |     await expect(this.decreaseQtyButton).toBeEnabled();
  418 |   }
  419 | 
  420 |   async expectQuantityDoesNotGoBelowOne(): Promise<void> {
  421 |     const minusEnabled = await this.decreaseQtyButton.isEnabled();
  422 |     if (minusEnabled) {
  423 |       await this.decreaseQtyButton.click();
  424 |     }
  425 |     await this.expectQuantity(1);
  426 |   }
  427 | 
  428 |   /** The stepper stops at the variant's available stock and ignores further clicks. */
  429 |   async expectQuantityStopsAtAvailableStock(): Promise<void> {
  430 |     let quantity = Number(await this.qtyInput.inputValue());
  431 |     expect(quantity).toBeGreaterThan(0);
  432 | 
  433 |     for (let attempt = 0; attempt < 30; attempt += 1) {
  434 |       await this.increaseQtyButton.click();
  435 |       const increased = await expect
  436 |         .poll(async () => Number(await this.qtyInput.inputValue()) > quantity, { timeout: 800 })
  437 |         .toBe(true)
  438 |         .then(() => true)
  439 |         .catch(() => false);
  440 |       if (!increased) {
  441 |         await this.increaseQtyButton.click();
  442 |         await this.expectQuantity(quantity);
  443 |         return;
  444 |       }
  445 |       const next = Number(await this.qtyInput.inputValue());
  446 |       expect(next).toBe(quantity + 1);
  447 |       quantity = next;
  448 |     }
  449 | 
  450 |     throw new Error(`Quantity kept increasing past ${quantity}`);
  451 |   }
  452 | 
  453 |   async expectFreeDeliveryNote(): Promise<void> {
  454 |     await expect(this.freeDeliveryNote).toBeVisible();
  455 |     await expect(this.freeDeliveryNote).toHaveText(FREE_DELIVERY.pdpNote);
  456 |   }
  457 | 
  458 |   async expectGalleryVisible(): Promise<void> {
  459 |     await expect(this.galleryImage).toBeVisible();
  460 |     await expect.poll(async () => this.galleryThumbs.count()).toBeGreaterThan(1);
  461 |   }
  462 | 
  463 |   async expectSizeChartVisible(): Promise<void> {
  464 |     await expect(this.page.getByRole('heading', { name: /size chart/i })).toBeVisible();
  465 |     await expect(
  466 |       this.page
  467 |         .getByRole('img', { name: /size chart/i })
  468 |         .or(this.page.getByText(/all measurements are in inches/i)),
  469 |     ).toBeVisible();
  470 |   }
  471 | 
  472 |   async expectAdditionalInformation(): Promise<void> {
  473 |     await expect(this.page.getByText(/additional information/i).first()).toBeVisible();
  474 |   }
  475 | 
  476 |   async open(path: string): Promise<this> {
  477 |     await this.goto(path);
  478 |     return this;
  479 |   }
  480 | }
  481 | 
```