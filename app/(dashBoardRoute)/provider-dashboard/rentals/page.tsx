"use server"

import { cookies } from "next/headers";
import AllRental from "../../admin-dashboard/rentals/_components/allRentals";


const AllRentals =async () => {
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
               <AllRental
                   rentals={rentals.data}
                   />
   
           </div>
       );
};

export default AllRentals;