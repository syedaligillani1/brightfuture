
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;

export function middleware(request: NextRequest) {

    console.log("Middleware ran:", request.nextUrl.pathname);

  // Protect the universities page
  if (request.nextUrl.pathname.startsWith('/screens/universities')) {

const token = request.cookies.get('accessToken')?.value;

if (!token) {
  return NextResponse.redirect(new URL('/screens/login', request.url));
}

try {
  // jwt.verify(token, accessTokenSecret);
  return NextResponse.next();
} catch {
  return NextResponse.redirect(new URL('/screens/login', request.url));
}
  }

  // For all other routes, let the request continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/screens/universities',
    '/screens/universities/:path*'
  ],
};
