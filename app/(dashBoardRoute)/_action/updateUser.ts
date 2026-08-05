"use server"


import { cookies } from "next/headers";

type Status = "ACTIVE" | "SUSPEND";
type Role = "ADMIN" | "PROVIDER" | "USER";
// interface UserPayload {
//     status?: Status;
//     role?: Role;
// }

export async function updateUser(id: string, role: Role) {
    
    const cookieStore = await cookies()

    const accessToken = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/user/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify({
            role,
        })
    })

    const result = await res.json()


    return result
}

export const updateStatus = async (id: string, status: Status) => {
    const cookieStore = await cookies()

    const accessToken = cookieStore.get("accessToken")?.value;
    console.log(id, status);
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/user/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify({
            status,
        })
    })

    const result = await res.json()


    return result

}