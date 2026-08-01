"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type Status = "ACTIVE" | "SUSPEND";

export async function updateUser(id: string) {
    console.log(id);
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
    if (result.success){
        // revalidatePath("/dashboard/users");
    }
    // console.log(result,"result ====================");
    return result

}