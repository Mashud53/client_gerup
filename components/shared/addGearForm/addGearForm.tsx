"use client";

import { useActionState, useEffect} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { createGearAction } from "@/app/(dashBoardRoute)/admin-dashboard/add-gear/_action/addGear";
// import { createGearAction } from "./_action/addGear";



const initialState = {
    success: false,
    message: "",
};

const AddGearForm = () => {
   
    
    const [state, formAction, isPending] = useActionState(
        createGearAction,
        initialState
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);
    

   

    return (
        <Card className="mx-auto max-w-3xl">
            <CardHeader>
                <CardTitle>Add New Gear</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    action={formAction} className="space-y-5"
                >
                    <div>
                        <Label>Name</Label>
                        <Input
                            name="name"
                            placeholder="Gear Name"
                            required
                        />
                    </div>
                    <div>
                        <Label>Image URL</Label>
                        <Input
                            name="image"
                            placeholder="image-url"
                            
                        />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            required
                        />
                    </div>

                    <div>
                        <Label>Price</Label>
                        <Input
                            type="number"
                            name="price"
                            required
                        />
                    </div>

                    <div>
                        <Label>Category</Label>
                        <Input
                            name="category"
                            required
                        />
                    </div>

                    <div>
                        <Label>Brand</Label>
                        <Input
                            name="brand"
                            required
                        />
                    </div>

                    <div>
                        <Label>Stock</Label>
                        <Input
                            type="number"
                            name="stock"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-4">
                        <Label>Available</Label>

                        <Switch name="available" defaultChecked />
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full"
                    >
                        {isPending ? "Adding..." : "Add Gear"}
                    </Button>
                </form>
            </CardContent>
        </Card >
    );
};

export default AddGearForm;