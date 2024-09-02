import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(_request : NextRequest) {
  return NextResponse.next()
}

export const config = {
    matcher : [
        '/((?!.*\\..*|_next).*)',
        '/(api|trpc)(.*)',
        '/',
    ],
};
