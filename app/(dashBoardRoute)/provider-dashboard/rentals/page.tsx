

import { cookies } from "next/headers";
import AllRental from "../../admin-dashboard/rentals/_components/allRentals";


export default async function AllRentals ()  {
   const accessToken = (await cookies()).get("accessToken")?.value;
       const res = await fetch(
           `${process.env.BACKEND_API_URL}/api/rentals`,
           {
               headers: {
                   Authorization: `${accessToken}`,
               },
           }
       );
       const rentals = await res.json()
       return (
           <div>
            <h1 className="mb-6 text-2xl font-bold">All Rentals</h1>
               <AllRental
                   rentals={rentals.data}
                   />
   
           </div>
       );
};

