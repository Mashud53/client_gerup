// app/actions/rental.ts
"use server";

import { cookies } from "next/headers";

export async function returnGearAction(
    prevState: { success: boolean; message: string },
    formData: FormData
) {
    const rentalId = formData.get("rentalId") as string;
    const rating = Number(formData.get("rating"));
    const comment = formData.get("comment") as string;

    const accessToken = (await cookies()).get("accessToken")?.value;
    // const payload ={
    //     rating:rating, 
    //     comment: comment
    // }

    console.log({
        rentalId,
        rating,
        comment,
    });

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/gearReturn/${rentalId}`, {
        method: "POST",
        headers: {
             Authorization: `${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rating:rating,
            comment:comment
        })
    })

    const result = await res.json()
    console.log(result);

    // await prisma...

    return {
        success: true,
        message: "Gear returned successfully",
    };
}