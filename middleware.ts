import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({  req : request});

  console.log('Token from getToken:', token); 

  if (token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/api/auth/signin', request.url));
}

export const config = {
  matcher: [
    '/create-account',                 
  ],
};
