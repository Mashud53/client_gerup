/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";


export async function createGearAction(
    prevState: any,
    formData: FormData
) {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const payload = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        category: formData.get("category"),
        brand: formData.get("brand"),
        available: formData.get("available") === "on",
        stock: Number(formData.get("stock")),
    };

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/gear`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${accessToken}`,
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: result.message,
        };
    }

    revalidatePath("/admin-dashboard/gears");

    return {
        success: true,
        message: "Gear added successfully",
    };
}