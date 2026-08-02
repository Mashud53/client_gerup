/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { rentalDetails } from "../_action/rentalDetails";


export type RentalStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "RETURNED"
    | "CANCELLED";

export interface Rental {
    id: string;
    userId: string;
    gearId: string;
    totalAmount: number;
    status: RentalStatus;
}

interface AllRentalProps {
    rentals: Rental[];

}

interface RentalGear {
    id: string;
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

export default function AllRental({
    rentals,

}: AllRentalProps) {

    const [loadingId, setLoadingId] = useState<string | null>(null);

    const [selectedRental, setSelectedRental] =
        useState<Rental | null>(null);
    const [selectedGear, setSelectedGear] = useState<RentalGear | null>(null)

    const handleClick = async (gear: Rental) => {

        try {
            setLoadingId(gear.id);
            const rental = await rentalDetails(gear.gearId, gear.userId)
            console.log(rental);
            const gearDetails = rental.gear.result;



            setSelectedRental(gear);
            setSelectedGear(gearDetails)


        } finally {
            setLoadingId(null);
        }
    };
    // useEffect(() => {
    //     console.log("selectedRental:", selectedRental);
    // }, [selectedRental]);
    //   const handleClick = async (id: string) => {
    //     try {
    //       setLoadingId(id);

    //       const res = await fetch(`/api/rental/${id}`);

    //       if (!res.ok) {
    //         throw new Error("Failed to fetch rental.");
    //       }

    //       const rental = await res.json();

    //       onRentalSelect?.(rental);
    //     } catch (error) {
    //       console.error(error);
    //     } finally {
    //       setLoadingId(null);
    //     }
    //   };

    const getVariant = (status: RentalStatus) => {
        switch (status) {
            case "APPROVED":
                return "default";

            case "RETURNED":
                return "secondary";

            case "PENDING":
                return "outline";

            case "REJECTED":
                return "destructive";

            default:
                return "outline";
        }
    };

    return (
        <>
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rental ID</TableHead>
                            <TableHead>User ID</TableHead>
                            <TableHead>Gear ID</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rentals?.map((rental) => (
                            <TableRow
                                key={rental.id}
                                className="cursor-pointer"
                                onClick={() => handleClick(rental)}
                            >
                                <TableCell className="font-medium">
                                    {rental.id.slice(0, 8)}...
                                </TableCell>

                                <TableCell>
                                    {rental.userId.slice(0, 8)}...
                                </TableCell>

                                <TableCell>
                                    {rental.gearId.slice(0, 8)}...
                                </TableCell>

                                <TableCell>
                                    ${rental.totalAmount.toFixed(2)}
                                </TableCell>

                                <TableCell>
                                    <Badge variant={getVariant(rental.status)}>
                                        {loadingId === rental.id
                                            ? "Loading..."
                                            : rental.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
            <Dialog
                open={selectedRental !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedRental(null);
                        setSelectedGear(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rental Details</DialogTitle>
                    </DialogHeader>

                    {selectedRental && (
                        <div className="space-y-6">
                            {/* Rental Information */}
                            <div className="space-y-2 rounded-lg border p-4">
                                <h3 className="font-semibold">Rental Information</h3>

                                <p>
                                    <span className="font-medium">Rental ID:</span>{" "}
                                    {selectedRental?.id}
                                </p>

                                <p>
                                    <span className="font-medium">Total Amount:</span> $
                                    {selectedRental?.totalAmount}
                                </p>

                                <p>
                                    <span className="font-medium">Status:</span>{" "}
                                    {selectedRental?.status}
                                </p>
                            </div>

                            {/* Gear Information */}
                            {selectedGear && (
                                <div className="space-y-2 rounded-lg border p-4">
                                    <h3 className="font-semibold">Gear Information</h3>

                                    <p>
                                        <span className="font-medium">Name:</span>{" "}
                                        {selectedGear.name}
                                    </p>

                                    <p>
                                        <span className="font-medium">Brand:</span>{" "}
                                        {selectedGear?.brand}
                                    </p>

                                    <p>
                                        <span className="font-medium">Category:</span>{" "}
                                        {selectedGear?.category}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}