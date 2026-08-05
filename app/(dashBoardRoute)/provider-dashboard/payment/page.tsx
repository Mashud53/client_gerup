"use server"

import AllPayments from "@/components/shared/allPayments/allPayments";
import { cookies } from "next/headers";

const Payment = async() => {
    const cookieStore = await cookies()
     const accessToken = cookieStore.get("accessToken")?.value;
    
        if (!accessToken) {
            return {
                success: false,
                message: "user not logged in!"
            }
        }
    
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment/allpayments`, {
            headers: {
                Authorization: `${accessToken}`
            },
            
        });
    
        const result =await res.json()
        const payments = result.data;
        console.log(payments,"all Payments ======");
    return (
        <div>
             <h1 className="mb-6 text-2xl font-bold">All Payments</h1>
            <AllPayments payments={payments}/>
        </div>
    );
};

export default Payment;