
"use client";

import { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { changeStatus, rentalDetails } from "../_action/rentalDetails";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


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

interface RentalUser {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN" | "PROVIDER";
    status: "ACTIVE" | "SUSPEND";
    createdAt: string;
    updatedAt: string;
}

export default function AllRental({
    rentals,

}: AllRentalProps) {
    const router = useRouter();

    const [loadingId, setLoadingId] = useState<string | null>(null);

    const [selectedRental, setSelectedRental] =
        useState<Rental | null>(null);
    const [selectedGear, setSelectedGear] = useState<RentalGear | null>(null)
    const [selectedUser, setSelectedUser] = useState<RentalUser | null>(null)

    const handleClick = async (gear: Rental) => {

        try {
            setLoadingId(gear.id);
            const rental = await rentalDetails(gear.gearId, gear.userId)

            const gearDetails = rental.gear.result;
            const rentalUser = rental.user

            setSelectedRental(gear);
            setSelectedGear(gearDetails)
            setSelectedUser(rentalUser)

        } finally {
            setLoadingId(null);
        }
    };

   
    const onStatusChange=async(id : string, status: RentalStatus)=>{
        
        const res = await changeStatus(id, status)
                
                if(res.success){
                    toast.success("Status Update successfull!")
                    router.refresh()
                }

    }

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
                                    <Badge variant={getVariant(rental.status)}

                                    >
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
                        setSelectedUser(null);
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

                               
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-medium">Status:</span>

                                <Select
                                    defaultValue={selectedRental.status}
                                    onValueChange={(value) =>
                                        onStatusChange?.(
                                            selectedRental.id,
                                            value as RentalStatus
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="PENDING">
                                            PENDING
                                        </SelectItem>

                                        <SelectItem value="APPROVED">
                                            APPROVED
                                        </SelectItem>

                                        <SelectItem value="REJECTED">
                                            REJECTED
                                        </SelectItem>

                                        <SelectItem value="RETURNED">
                                            RETURNED
                                        </SelectItem>

                                        <SelectItem value="CANCELLED">
                                            CANCELLED
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>


                            {selectedUser && (
                                <div className="space-y-2 rounded-lg border p-4">
                                    <h3 className="font-semibold">User Information</h3>

                                    <p>
                                        <span className="font-medium">Name:</span>{" "}
                                        {selectedUser?.name}
                                    </p>


                                    <p>
                                        <span className="font-medium">Email:</span>{" "}
                                        {selectedUser?.email}
                                    </p>
                                </div>
                            )}
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