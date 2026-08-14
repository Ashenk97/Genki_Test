/**
 * Generate a random alphanumeric string of the given length.
 */
export function randomString(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/**
 * Generate a unique email address suitable for registration flows.
 */
export function randomEmail(domain = 'genki-test.com'): string {
  return `qa.automation.${randomString(10)}@${domain}`;
}

/**
 * Generate a random integer between min and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
