"use server"
import { cookies } from "next/headers";
import RentalCard from "./_components/rentalCard";

export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "RETURNED"
  | "CANCELLED";

export interface Gear {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  available: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Rental {
  id: string;
  userId: string;
  gearId: string;
  totalAmount: number;
  status: RentalStatus;
  gear: Gear;
}

const MyRental = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentals/myrental`,
        {
            headers: {
                Authorization: `${accessToken}`,
            },
        }
    );
    const result = await res.json()
    const myRentals = result.data;
    // console.log(myRentals);
    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Payments</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myRentals.map((rental: Rental) => (
                    <RentalCard
                        key={rental.id}
                        rental={rental}
                    />
                ))}
            </div>

        </div>
    );
};

export default MyRental;