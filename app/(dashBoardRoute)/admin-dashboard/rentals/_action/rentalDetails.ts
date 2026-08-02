"use server"
import { cookies } from "next/headers";

export const rentalDetails = async (gearId:string, userId:string) => {
    const accessToken = (await cookies()).get("accessToken")?.value;
 
    // const userDetails = await fetch(`${process.env.BACKEND_API_URL}/api/auth/${userId}`, {
    //     headers: {
    //         Authorization: `${accessToken}`
    //     },
        
    // });
    // const rentalUser = await userDetails.json()
    // const {name:userName} = rentalUser.data;

    const gearDetails = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${gearId}`)
    const rentalGear = await gearDetails.json()
    // const {name, price, category, brand}= rentalGear.data
    // console.log(rentalGear);
    
    return {
        user: userId,
        gear:rentalGear.data
    }
}