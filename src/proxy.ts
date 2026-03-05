import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
	const token = await getToken({
		req,
		secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
	});

	const { nextUrl } = req;
	const isLoggedIn = !!token;
	const isAdmin = token?.role === "ADMIN";

	const isAdminRoute = nextUrl.pathname.startsWith("/admin");
	const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

	if (isAdminRoute) {
		if (!isLoggedIn) {
			return NextResponse.redirect(new URL("/login", nextUrl));
		}
		if (!isAdmin) {
			return NextResponse.redirect(new URL("/dashboard", nextUrl));
		}
	}

	if (isDashboardRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL("/login", nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/admin/:path*"],
};
