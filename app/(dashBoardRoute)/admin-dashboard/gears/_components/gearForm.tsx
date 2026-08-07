"use client";

import {useState } from "react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";
import { Gear } from "./gearTable";
import { updateGear } from "../_action/updateGear";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface Props {
    gear: Gear | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


const GearForm = ({
    gear,
    open,
    onOpenChange,
}: Props) => {
    const [form, setForm] = useState(gear);
    const router = useRouter()

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            setForm(gear);
        }

        onOpenChange(isOpen);
    };

    if (!form) return null;

    const handleChange = (
        key: keyof Gear,
        value: string | number | boolean
    ) => {
        setForm((prev) =>
            prev
                ? {
                    ...prev,
                    [key]: value,
                }
                : prev
        );
    };

    const handleSubmit = async() => {
       const result= await updateGear(form)
       
        if(result.success){
            toast.success("Gear Updated Successfull!")
            router.refresh()
        }
        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Gear</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">

                    <div>
                        <Label>Name</Label>

                        <Input
                            value={form.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <Label>Description</Label>

                        <Input
                            value={form.description}
                            onChange={(e) =>
                                handleChange(
                                    "description",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <Label>Price</Label>

                            <Input
                                type="number"
                                value={form.price}
                                onChange={(e) =>
                                    handleChange(
                                        "price",
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </div>

                        <div>
                            <Label>Stock</Label>

                            <Input
                                type="number"
                                value={form.stock}
                                onChange={(e) =>
                                    handleChange(
                                        "stock",
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </div>

                        <div>
                            <Label>Category</Label>

                            <Input
                                value={form.category}
                                onChange={(e) =>
                                    handleChange(
                                        "category",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div>
                            <Label>Brand</Label>

                            <Input
                                value={form.brand}
                                onChange={(e) =>
                                    handleChange(
                                        "brand",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3">
                            <Label>Available</Label>

                            <Switch
                                checked={form.available}
                                onCheckedChange={(checked) =>
                                    handleChange(
                                        "available",
                                        checked
                                    )
                                }
                            />
                        </div>

                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GearForm;