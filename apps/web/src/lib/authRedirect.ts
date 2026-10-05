const PUBLIC = ['/signin', '/signup', '/password-recovery'];

export function resolveAuthRedirect(pathname: string, hasSession: boolean): string | null {
  const isPublic = PUBLIC.includes(pathname);
  if (!hasSession && !isPublic) return '/signin';
  if (hasSession && isPublic) return '/';
  return null;
}