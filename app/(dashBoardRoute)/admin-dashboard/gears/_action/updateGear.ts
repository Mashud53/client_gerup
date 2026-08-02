"use server"

import { cookies } from "next/headers";




export interface Gear {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    available: boolean;
    stock: number;
}



export const updateGear = async (form: Gear) => {
    const cookieStore = await cookies()

    const accessToken = cookieStore.get("accessToken")?.value;

    const { id, name, description, price, category, brand, available, stock } = form;
    const payload = {
        name,
        description,
        price,
        category,
        brand,
        available,
        stock
    }


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`
        },
        body: JSON.stringify(
            payload,
        )
    })

    const result = await res.json()

    return result

}

export const deleteGear = async (id: string) => {
    const cookieStore = await cookies()

    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `${accessToken}`

        }
    })
    const result = await res.json()
    return result

}