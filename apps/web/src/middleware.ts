import { NextRequest, NextResponse } from 'next/server';
import { resolveAuthRedirect } from './lib/authRedirect';

export default
  (req: NextRequest) => {

    console.log(`----- middleware ${req.nextUrl.pathname} ------ \n`);

    if (!resolveAuthRedirect(req.nextUrl.pathname, !!req.cookies.get('SESSION_ID'))) {
      return NextResponse.next();
    }

  }
;

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
