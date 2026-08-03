"use server"
import { cookies } from "next/headers";

const MyRental =async () => {
     const accessToken = (await cookies()).get("accessToken")?.value;
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/rentals`,
            {
                headers: {
                    Authorization: `${accessToken}`,
                },
            }
        );
        console.log(res);
    return (
        <div>
            
        </div>
    );
};

export default MyRental;