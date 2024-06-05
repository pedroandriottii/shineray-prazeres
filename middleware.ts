import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken');
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/painel') && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/painel/:path*'],
};
