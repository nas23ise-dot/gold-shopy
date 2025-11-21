import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple proxy to protect admin routes
export function proxy(request: NextRequest) {
  // Check if the user is authenticated by looking for the auth cookie
  const authCookie = request.cookies.get('adminAuthenticated');
  const isAuthenticated = authCookie?.value === 'true';
  
  // If not authenticated and trying to access protected admin pages, redirect to login
  if (!isAuthenticated && 
      (request.nextUrl.pathname.startsWith('/dashboard') ||
       request.nextUrl.pathname.startsWith('/inventory') ||
       request.nextUrl.pathname.startsWith('/billing') ||
       request.nextUrl.pathname.startsWith('/customers') ||
       request.nextUrl.pathname.startsWith('/reports') ||
       request.nextUrl.pathname.startsWith('/settings'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If authenticated and trying to access login page, redirect to admin dashboard
  if (isAuthenticated && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the proxy should run on
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/inventory/:path*',
    '/billing/:path*',
    '/customers/:path*',
    '/reports/:path*',
    '/settings/:path*',
    '/login'
  ],
};