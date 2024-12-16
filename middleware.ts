import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

//  Protected and public routes
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/", "/*", "/**"];

export default async function middleware(req: NextRequest) {
    // Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // Get userId from the cookie
    const cookie = (await cookies()).get("userId")?.value;
    // Redirect to / if the user is not authenticated
    if (isProtectedRoute && !cookie) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    // Redirect to /dashboard if the user is authenticated
    if (isPublicRoute && cookie && !req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
