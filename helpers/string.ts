export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normalizePathname(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/';
}
