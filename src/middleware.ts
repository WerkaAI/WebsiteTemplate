import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { applySecurityHeaders, shouldHandleRequest } from "./lib/security/csp";

export function middleware(request: NextRequest) {
  if (!shouldHandleRequest(request)) {
    return NextResponse.next();
  }

  return applySecurityHeaders(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|site.webmanifest|sitemap.xml|fonts/).*)",
  ],
};
