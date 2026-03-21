import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // If they are visiting the Cart page...
  const isCartPage = request.nextUrl.pathname.startsWith("/cart");

  // Did we set a token cookie in LoginForm?
  const token = request.cookies.get("token")?.value;

  // If yes to cart page, but no token -> kick them to login
  if (isCartPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Otherwise, let them proceed normally!
  return NextResponse.next();
}

export const config = {
  // Only execute this middleware if they go to /cart
  matcher: ["/cart/:path*"],
};
