import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { account, PROJECT_ID, client } from '@/lib/appwrite.config';

export async function middleware(request: NextRequest) {
  // Extract the token from cookies
  const token = request.cookies.get('session');

  if (!token) {
    // Redirect to the login page if the token is not present
    return NextResponse.redirect(new URL('/src/login', request.url));
  }

  // Set the session token for the Appwrite client
  client.headers['X-Fallback-Cookies'] = `a_session_${PROJECT_ID}=${token}`;

  try {
    // Validate the user session
    const user = await account.get();
    if (!user.$id) {
      // Redirect to the login page if the user session is not valid
      return NextResponse.redirect(new URL('/src/login', request.url));
    }
  } catch (error) {
    // Redirect to the login page if there is an error validating the session
    return NextResponse.redirect(new URL('/src/login', request.url));
  }

  // Allow the request to proceed if the user session is valid
  return NextResponse.next();
}
export const config = {
  matcher: ['/src/user-dash', '/src/appointment'],
}