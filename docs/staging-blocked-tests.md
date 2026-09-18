# Staging blocked tests (mailer / ops)

Not frontend tickets. These specs skip or do not run because of staging mail or admin/ops config. They can still work when run by hand.

After the block is lifted, tell QA so the matching `test.skip()` can be removed.

---

## Summary

| # | Status | Title | File | Why |
| --- | --- | --- | --- | --- |
| 1 | Skip | Forgot-password email does not send | `tests/auth.spec.ts` | Mailer |
| 2 | Skip | Register never reaches email confirmation | `tests/auth.spec.ts` | Mailer |
| 3 | Not run | Confirmation email (`@email`) | `tests/register-email.spec.ts` | Mailer |
| 4 | Not run | Reset password from email (`@email`) | `tests/forgot-password-email.spec.ts` | Mailer |
| 5 | Not run | Order confirmation email (`@email`) | `tests/order-confirmation-email.spec.ts` | Mailer |
| 6 | Skip | Guest bank transfer success page | `tests/checkout.spec.ts` | Admin / ops |
| 7 | Skip | Purchase does not credit usable points | `tests/rewards.spec.ts` | Admin / ops |

- **Skip** = started by `npm test`, then skipped.
- **Not run** = tagged `@email`, excluded from `npm test` (`--grep-invert @email`). Run with `npm run test:email`.

Do **not** run `@email` specs against production. Those files skip the whole describe when `TEST_ENV=production`. `@email` specs poll an [AgentMail](https://agentmail.to) inbox (`AGENTMAIL_API_KEY`, inbox `genkiqa@agentmail.to`).

---

## Mailer

Staging outbound mail is down. Re-checked 30 Aug 2026 with Gmail, Outlook, Mailinator, and AgentMail (`genkiqa@agentmail.to`). Inbox stayed empty.

Typical on-screen copy: `Error sending confirmation email`. Forgot-password also shows `Internal Server Error` / `Failed to send reset password email`.

Guest COD, bank transfer, and card still work as flows except where listed under Admin / ops.

### 1. Forgot-password email does not send

| | |
| --- | --- |
| **Status** | Skip at runtime |
| **File** | `tests/auth.spec.ts` |
| **Skip when** | Form shows a send-failure toast (`Staging failed to send the password reset email`) |

1. Stay logged out.
2. Open [https://staging.genkiwardrobe.com/forgot-password](https://staging.genkiwardrobe.com/forgot-password).
3. Enter the staging test customer email (or `genkiqa@agentmail.to`) and submit.

**Actual:** `Internal Server Error` / `Failed to send reset password email`.

**Expected:** success that a reset email was sent; user stays logged out.

### 2. Register never reaches email confirmation

| | |
| --- | --- |
| **Status** | Skip at runtime |
| **File** | `tests/auth.spec.ts` |
| **Skip when** | Never reaches `/email-confirmation` (`Staging did not complete registration`) |

1. Stay logged out.
2. Open [https://staging.genkiwardrobe.com/register](https://staging.genkiwardrobe.com/register).
3. Register with a **new unused** email (including `genkiqa@agentmail.to`) and a valid password (length, uppercase, number, special). Submit.

**Actual:** `Error sending confirmation email`. Browser stays on `/register`.

**Expected:** redirect to [email-confirmation](https://staging.genkiwardrobe.com/email-confirmation) showing that email; still logged out.

### 3. Confirmation email (`@email`)

| | |
| --- | --- |
| **Status** | Not run by `npm test` |
| **File** | `tests/register-email.spec.ts` |
| **Why not run** | tagged `@email` |
| **Skip if you run it** | production, missing `AGENTMAIL_API_KEY`, or `Staging could not send a confirmation email (tried …)` |

1. Stay logged out. Use the shared AgentMail inbox `genkiqa@agentmail.to` (the spec uses `genkiqa+{tag}@agentmail.to`).
2. Open [Register](https://staging.genkiwardrobe.com/register) and create an account with that address.
3. Wait for the confirmation email and open the confirm link.

**Actual:** `Error sending confirmation email`. No message arrives in AgentMail.

**Expected:** confirmation email arrives; the link confirms the account; login with that email works.

### 4. Reset password from email (`@email`)

| | |
| --- | --- |
| **Status** | Not run by `npm test` |
| **File** | `tests/forgot-password-email.spec.ts` |
| **Why not run** | tagged `@email` |
| **Skip if you run it** | production, mailer down on register, or `Staging could not send the password reset email` |

1. Stay logged out. Use the shared AgentMail inbox.
2. Register that address and confirm from email (already fails — see 2 and 3).
3. Open [Forgot password](https://staging.genkiwardrobe.com/forgot-password), submit that inbox, wait for the reset email.
4. Open the reset link, set a new password, log in with it.

**Actual:** confirmation and/or reset mail never sends.

**Expected:** register → confirm → reset from email → login with the new password.

### 5. Order confirmation email (`@email`)

| | |
| --- | --- |
| **Status** | Not run by `npm test` |
| **File** | `tests/order-confirmation-email.spec.ts` |
| **Why not run** | tagged `@email` and `@checkout` |
| **Skip if you run it** | production, or `Staging did not send order confirmation email for {orderId}` after the order succeeds |

1. Stay logged out. Use the shared AgentMail inbox.
2. Add [test-white-only](https://staging.genkiwardrobe.com/products/test-white-only) size **M** as a guest.
3. Open [Checkout](https://staging.genkiwardrobe.com/checkout), fill guest billing with that inbox, choose **Cash on Delivery**, accept terms, place the order.
4. Note the order id on the success page.
5. Wait for an email whose subject or body includes that order id.

**Actual:** the **order still places**. No confirmation email arrives.

**Expected:** confirmation email arrives and includes the order id.

---

## Admin / ops

Blocked by staging admin config. Manual checks on 19 Sep 2026 succeeded. Automation against the shared staging data does not.

### 6. Guest bank transfer success page

| | |
| --- | --- |
| **Status** | Skip |
| **File** | `tests/checkout.spec.ts` |
| **Skip reason** | `Staging admin: guest bank transfer success page is blocked` |
| **Tests** | `should place a bank transfer order as a guest` |

1. Stay logged out.
2. Add [test-white-only](https://staging.genkiwardrobe.com/products/test-white-only) size **M**.
3. Open [Checkout](https://staging.genkiwardrobe.com/checkout), fill guest billing, choose **Bank Transfer**, accept terms, place the order.

**Actual (automation):** stays on `/checkout`, then *Something went wrong on our end*.

**Expected:** [order-success](https://staging.genkiwardrobe.com/order-success) with bank transfer instructions.

### 7. Purchase does not credit usable points

| | |
| --- | --- |
| **Status** | Skip |
| **File** | `tests/rewards.spec.ts` |
| **Skip reason** | `Staging admin: purchase does not credit usable points` |
| **Tests** | `should gain usable points after purchasing an item` |

1. Log in as the staging test customer.
2. Open [Rewards](https://staging.genkiwardrobe.com/rewards) and note **usable points**.
3. Add [test-white-only](https://staging.genkiwardrobe.com/products/test-white-only) size **M**. Complete logged-in **COD**. Do not redeem a reward.
4. Open Rewards again and compare usable points.

**Actual (automation):** COD succeeds. Usable points stay the same.

**Expected:** usable points increase after the purchase.
