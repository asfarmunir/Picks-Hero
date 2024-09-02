
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    console.log('Token from getToken:', token); // Check if the token is retrieved correctly
  
    if (token) {
      return NextResponse.next(); // Allow request to proceed if authenticated
    }
  
  // If the user is not authenticated, redirect them to the sign-in page
  return NextResponse.redirect(new URL('/api/auth/signin', request.url));
}

export const config = {
    matcher: [
     '/create-account'
    ],
  };