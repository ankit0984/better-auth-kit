import { NextResponse } from "next/server";

export async function middleware(request) {

	const session = request.cookies.get("better-auth.session_token")?.value;
	const currentPath = request.nextUrl.pathname;

	// Public pages that don't require authentication
	const publicPaths = [
		"/login",
		"/register",
		"/reset-password",
		"/forget-password",
	];
	// Allow access to public pages
	if (publicPaths.includes(currentPath)) {
		// If the user is already logged in and tries to access "/login" or similar, redirect them to home
		if (session && currentPath === "/login") {
			return NextResponse.redirect(new URL("/", request.url));
		}
		return NextResponse.next(); // Allow access to other public pages
	}
	if (session && currentPath === publicPaths){
		// If the user is logged in and tries to access a public page, redirect them to home
		return NextResponse.redirect(new URL("/", request.url));
	}
	if (!session) {
		// Store the attempted URL to redirect back after login
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", currentPath);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

// Configure which routes are protected
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 *
		 * Ensure public paths like /register and /change-password are accessible
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|public).*)",
	],
};
