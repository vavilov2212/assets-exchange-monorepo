const PUBLIC_PATHS = ['/signin', '/signup', '/password-recovery'];

const matchPublicPathIncludingNested = (pathName: string) => {
  const pathNameBase = pathName.split('/')[1];

  return PUBLIC_PATHS.find(publicPath => {
    const publicPathBase = publicPath.split('/')[1];

    return !!pathNameBase && publicPathBase === pathNameBase;
  });
}

export function resolveAuthRedirect(pathname: string, hasSession: boolean): string | null {
  const isPublic = matchPublicPathIncludingNested(pathname);

  if (!hasSession && !isPublic) return '/signin';
  if (hasSession && isPublic) return '/';

  return null;
}