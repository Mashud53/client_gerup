
"use server"

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"
import { redirect } from "next/navigation";

type LoginState={
    success: boolean,
    statusCode: number,
    message: string,
    data:{
        accessToken: string,
        refreshToken: string,
    }
}


export async function loginAction(prevState: LoginState, formData: FormData) {


    const email = formData.get("email");
    const password = formData.get("password")
   

    if (!email || !password) {
        throw new Error("email and password required")
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    const result = await res.json()
    const { accessToken, refreshToken } = result.data;

    if (result.success) {
        const cookieStore = await cookies()
        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            secure: true,
            sameSite: "lax",
          
        })
        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            secure: true,
            sameSite: "lax",
            
        })

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload

        if(decodedToken.role ==="USER"){
            redirect("/dashboard/profile")
        }else if(decodedToken.role ==="ADMIN"){
            redirect("/admin-dashboard/profile")
        }else if(decodedToken.role ==="PROVIDER"){
            redirect("/provider-dashboard/profile")
        }
        
    }

    return result
    
}