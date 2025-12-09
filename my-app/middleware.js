import { NextResponse } from "next/server";

export function middleware(req) {
  // Read auth token from cookies
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/dashboard", "/app", "/profile", "/products"];

  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/app/:path*",
    "/profile/:path*",
    "/products/:path*",
  ],
};
