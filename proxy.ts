import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = ["/login", "/register"]
const PUBLIC_ROUTES = ["/", "/gears", "/login", "/register"]

export async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname

    const cookieStore = request.cookies;
    const accessToken = cookieStore.get("accessToken")?.value
    const refreshToken = cookieStore.get("refreshToken")?.value

    const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null;
    // const decodedToken = accessToken ? jwtUtils.verifiedToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
    console.log(decodedToken, "decodec=============");
    let userRole = null;
    if (!decodedToken) {
        cookieStore.delete("accessToken");
        // return NextResponse.redirect(new URL('/login', request.url))
    }

    // if(!decodedToken?.success){
    //     cookieStore.delete("accessToken");
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }

    if (decodedToken) {
        userRole = decodedToken.role
    }

    //    if(decodedToken?.success && decodedToken.data){
    //     userRole = (decodedToken.data as JwtPayload).role
    //    }

    if (accessToken && AUTH_ROUTES.includes(pathName)) {
        if (userRole === "USER") {

            return NextResponse.redirect(new URL('/dashboard', request.url))
        } else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        } else if (userRole === "PROVIDER") {
            return NextResponse.redirect(new URL('/provider-dashboard', request.url))
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    const isPUblicRoute = PUBLIC_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"))

    if (!accessToken && !isPUblicRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // Authorization
    if (pathName.startsWith("/dashboard") && userRole !== "USER") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    } else if (pathName.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        console.log(userRole, "user========");
        return NextResponse.redirect(new URL('/not-found', request.url))
    } else if (pathName.startsWith("/provider-dashboard") && userRole !== "PROVIDER") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }

    return NextResponse.next()

}
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ]
}