export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normalizePathname(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/';
}

export function lkrAmountPattern(amount: number): RegExp {
  const grouped = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',?');
  return new RegExp(`lkr\\s*${grouped}(?:\\.00)?`, 'i');
}
