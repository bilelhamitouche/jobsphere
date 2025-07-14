import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    if (request.url.includes("/recruiter")) {
      return NextResponse.redirect(new URL("/recruiter-signin", request.url));
    }
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/recruiter",
    "/recruiter/:path",
    "/jobseeker",
    "/jobseeker/:path",
    "/settings/:path",
  ],
};
