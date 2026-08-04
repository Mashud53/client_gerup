"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const rentPayment = async (gearId: string) => {
    
    const cookieStore = await cookies()

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "user not logged in!"
        }
    }
     const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment/checkout?gearId=${gearId}`, {
        method:"POST",
        headers: {
            Authorization: `${accessToken}`
        },
       
    });
    const result = await res.json()
   
    if(result.success && result.data.checkoutUrl){
        redirect(result.data.checkoutUrl)
    }
    
    return result
}