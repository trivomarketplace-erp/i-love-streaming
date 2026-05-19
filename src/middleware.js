import { NextResponse } from "next/server";

export function middleware(request) {

  const isLoggedIn =
    request.cookies.get("admin-auth");

  const isAdminPage =
    request.nextUrl.pathname.startsWith("/admin");

  if (isAdminPage && !isLoggedIn) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );

  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/admin/:path*"],
};
