import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./service/refreshToken";
import { cookies } from "next/headers";



const AUTH_ROUTES = ["/login", "/signUp"]
const PUBLIC_ROUTES = ["/", "/gears", "/login", "/signUp"]

export async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const decodedRefreshToken = refreshToken ? jwtUtils.verifiedToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    let accessToken = cookieStore.get("accessToken")?.value
    let decodedAccessToken = accessToken ? jwtUtils.verifiedToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

       

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken()
       
        if (result.success) {
            const newAccessToken = result.data.accessToken;
           
            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                secure: true,
                sameSite: "lax",

            });
            accessToken = newAccessToken

            decodedAccessToken = jwtUtils.verifiedToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);
            
        }
        

    }

    let userRole = null;
   

    if (!decodedAccessToken?.success) {
        cookieStore.delete("accessToken");
       
    }

  
    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role
    }

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