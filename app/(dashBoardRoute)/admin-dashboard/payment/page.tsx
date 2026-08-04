"use server"

// import PaymentTable from "@/components/shared/payment/myPaymentTable";
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

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment`, {
        headers: {
            Authorization: `${accessToken}`
        },
       
    });

    const result = await res.json()
    const payments = result.data;
    
    console.log(payments, "payment=========");
    return (
       <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Payments</h1>

      {/* <PaymentTable payments={payments} /> */}
    </div>
    );
};

export default Payment;