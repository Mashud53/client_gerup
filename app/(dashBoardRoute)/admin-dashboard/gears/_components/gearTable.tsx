"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import GearForm from "./gearForm";
import { deleteGear } from "../_action/updateGear";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

interface Props {
    gears: Gear[];
}

const GearTable = ({ gears }: Props) => {
    const [selectedGear, setSelectedGear] = useState<Gear | null>(null);
    const router = useRouter() 
    const handleDelete = async (id: string) => {
        const result = await deleteGear(id)
        console.log(result,"Result =================");
        if(result.success){
            toast.success("Gear delete successfull!")
            router.refresh()
        }
        

    }
    return (
        <>
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Available</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">
                                Upadate
                            </TableHead>
                            <TableHead className="text-right">
                                Delete
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {gears.map((gear) => (
                            <TableRow key={gear.id}>
                                <TableCell>{gear.name}</TableCell>

                                <TableCell className="max-w-xs truncate">
                                    {gear.description}
                                </TableCell>

                                <TableCell>${gear.price}</TableCell>

                                <TableCell>{gear.category}</TableCell>

                                <TableCell>{gear.brand}</TableCell>

                                <TableCell>
                                    {gear.available ? "Yes" : "No"}
                                </TableCell>

                                <TableCell>{gear.stock}</TableCell>

                                <TableCell className="text-right">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => setSelectedGear(gear)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => handleDelete(gear.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />

                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <GearForm
                key={selectedGear?.id}
                gear={selectedGear}
                open={!!selectedGear}
                onOpenChange={(open) => {
                    if (!open) setSelectedGear(null);
                }}
            />
        </>
    );
};

export default GearTable;