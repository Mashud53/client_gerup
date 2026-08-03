"use server"
import { cookies } from "next/headers";

export const rentalDetails = async (gearId: string, userId: string) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const [userRes, gearRes] = await Promise.all([
        fetch(`${process.env.BACKEND_API_URL}/api/auth/user/${userId}`, {
            headers: {
                Authorization: `${accessToken}`,
            },
        }),
        fetch(`${process.env.BACKEND_API_URL}/api/gear/${gearId}`),
    ])
    const [rentalUser, rentalGear] = await Promise.all([
        userRes.json(),
        gearRes.json(),
    ]);

    
    return {
        user: rentalUser.data,
        gear: rentalGear.data,
    }
}

export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "RETURNED"
  | "CANCELLED";

export const changeStatus = async (id: string, status: RentalStatus) => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    console.log(id,status,"paylod======");
        
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(
            {status},
        )
    }
    )
    const result = await res.json()
    console.log(result,"staus result =======");
    return result
}