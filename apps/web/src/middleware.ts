import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { /*NextRequest,*/ NextResponse } from 'next/server';

// `withAuth` augments your `Request` with the user's token.
export default withAuth(
  (req: NextRequestWithAuth) => {
    console.log('req.nextauth', req.nextauth);
    console.log('----- middleware middleware func ------ \n');

    if (!req.nextauth.token && !['/signin', '/signup'].includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    if (req.nextauth.token && ['/signin', '/signup'].includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: (/*{ token }*/) => true,
    },
  }
);

export const config = {
  /**
   * This `matcher` property is a regular expression that is used to determine which paths should be handled by this middleware.
   *
   * The expression `((?!api|static|.*\\..*|_next).*)` is a negative lookahead assertion that matches any path that does not start with "api", "static", or have a file extension.
   *
   * - `(?!api|static|.*\\..*|_next)` is a negative lookahead assertion that ensures the path does not start with "api", "static", or have a file extension.
   *   - `api` does not match because it starts with "api"
   *   - `static` does not match because it starts with "static"
   *   - `.*\\..*` does not match because it has a file extension
   *   - `_next` does not match because it starts with "_next"
   * - `.*` matches any remaining path segments
   *
   * In summary, this middleware will handle any path that is not an API route, a static asset, or a file with an extension.
   */
  // matcher: '/((?!api|static|.*\\..*|_next).*)',

  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
