import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authenticationRoutes = [
  "/login",
  "/register",
  "/new-password",
  "/reset",
  "/error",
];

const loginProtectedRoutes = ["/dashboard", "/upgrade"];

/* const clientRoutes = [
  "/api/colors",
  "/api/sizes",
  "/api/categories",
  "/api/products",
  "/api/checkout",
  "/api/billboards/home",
]; */

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const session = await auth();
    const user = session?.user;

    // const reqType = request.method;

    if (pathname.startsWith("/api/admin") && !user?.role?.includes("ADMIN")) {
      return NextResponse.json({ message: "Access Denied" }, { status: 403 });
    }
    if (pathname.startsWith("/admin") && !user?.role?.includes("ADMIN")) {
      return NextResponse.json({ message: "Access Denied" }, { status: 403 });
    }

    if (!user && pathname.startsWith("/users")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!user && loginProtectedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow unauthenticated access to authentication routes
    if (authenticationRoutes.includes(pathname)) {
      if (user) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
