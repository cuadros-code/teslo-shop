import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import * as jwt from 'jose'

export async function middleware( req: NextRequest, ev: NextFetchEvent ) {
    
  try {
    const token  = req.cookies.get('token') || '';
    const seedWord: string = process.env.JWT_SECRET_SEED || '';
    await jwt.jwtVerify( token, new TextEncoder().encode(seedWord) );
    return NextResponse.next()
  } catch (error) {
    const { protocol, host, pathname } = req.nextUrl;
    return NextResponse.redirect(`${protocol}//${host}/auth/login?p=${pathname}`);
  }
}

export const config = {
  matcher: ["/checkout/:path*"],
};