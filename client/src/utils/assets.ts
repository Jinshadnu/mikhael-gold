/**
 * Resolve an asset URL taking into account Vite's base path
 * (e.g. '/mikhael-gold/' on GitHub Pages vs '/' on localhost).
 * Fully idempotent to prevent double-prefixing.
 */
export function assetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // Idempotence: if already prefixed with baseUrl, return as-is
  if (path.startsWith(cleanBase)) {
    return path;
  }
  const noSlashBase = cleanBase.replace(/\/$/, '');
  if (noSlashBase && (path === noSlashBase || path.startsWith(noSlashBase + '/'))) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
