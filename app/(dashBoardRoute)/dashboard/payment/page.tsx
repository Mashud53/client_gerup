


import MyPaymentTable from "@/components/shared/payment/myPaymentTable";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MyPayment (){
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        redirect("/login")
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment`, {
        headers: {
            Authorization: `${accessToken}`
        },

    });

    const result = await res.json()
    const payments = result.data;


    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">Payments</h1>

            <MyPaymentTable payments={payments} />
        </div>
    );
};

