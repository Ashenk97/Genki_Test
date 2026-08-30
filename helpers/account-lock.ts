import fs from 'fs';
import path from 'path';

export const SHARED_ACCOUNT_TAG = '@shared-account';

const LOCK_PATH = path.resolve('.auth/account.lock');
const STALE_MS = 6 * 60 * 1000;
const WAIT_MS = 25 * 60 * 1000;
const POLL_MS = 250;

/** Same-worker re-entry so the auto fixture and `sharedAccount` can both lock. */
let holdCount = 0;

function isStaleLock(): boolean {
  try {
    const age = Date.now() - Number(fs.readFileSync(LOCK_PATH, 'utf8'));
    return Number.isFinite(age) && age > STALE_MS;
  } catch {
    return false;
  }
}

export async function acquireLoggedInAccountLock(): Promise<void> {
  if (holdCount > 0) {
    holdCount += 1;
    return;
  }

  const started = Date.now();
  while (Date.now() - started < WAIT_MS) {
    try {
      if (isStaleLock()) {
        fs.unlinkSync(LOCK_PATH);
      }
      fs.writeFileSync(LOCK_PATH, String(Date.now()), { flag: 'wx' });
      holdCount = 1;
      return;
    } catch {
      await new Promise((resolve) => {
        setTimeout(resolve, POLL_MS);
      });
    }
  }
  throw new Error('Timed out waiting for the shared logged-in account lock');
}

export function releaseLoggedInAccountLock(): void {
  if (holdCount > 1) {
    holdCount -= 1;
    return;
  }
  holdCount = 0;
  try {
    fs.unlinkSync(LOCK_PATH);
  } catch {
    // lock already released
  }
}
