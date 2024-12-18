import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { account } from '@/lib/appwrite.config';

export async function middleware(request: NextRequest) {
  const user = await account.get();
  if (user.$id !== "") {
    return NextResponse.redirect(new URL('/src/login', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/src/user-dash', '/src/appointment'],
}