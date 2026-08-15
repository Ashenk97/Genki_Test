export function randomString(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function randomEmail(domain = 'genki-test.com'): string {
  return `qa.automation.${randomString(10)}@${domain}`;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function strongPassword(suffix = ''): string {
  return `Genki!${randomString(10)}${suffix}`;
}
