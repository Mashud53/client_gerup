"use client";

import Image from "next/image";
import { startTransition, useActionState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,

  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,

} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { returnGearAction } from "../_action/returnGear";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RentalStatus = "PENDING" | "APPROVED" | "RETURNED" | "CANCELLED";

interface RentalCardProps {
  rental: {
    id: string;
    totalAmount: number;
    status: RentalStatus;
    gear: {
      image: string;
      name: string;
    };
  };
}

const initialState = {
  success: false,
  message: "",
};

const RentalCard = ({ rental }: RentalCardProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const [state, formAction, pending] = useActionState(
    returnGearAction,
    initialState
  );

useEffect(() => {
  if (state.success) {
    startTransition(() => {
      router.refresh()
      setOpen(false);
      toast.success("Gear Return successfull")
    });
  }
}, [state.success, router]);




  // const handleReturn = (id: string) => {
  //   console.log(id, "returned id =========");
  //   setOpen(false);

  // };

  const badgeVariant = () => {
    switch (rental.status) {
      case "APPROVED":
        return "default";
      case "PENDING":
        return "secondary";
      case "RETURNED":
        return "outline";
      case "CANCELLED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-52 w-full">
        <Image
          src={rental?.gear?.image}
          alt={rental?.gear?.name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="space-y-4 pt-5">
        <h2 className="text-xl font-semibold">
          {rental.gear.name}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            Total Amount
          </span>

          <span className="font-semibold">
            ${rental.totalAmount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            Status
          </span>

          <Badge variant={badgeVariant()}>
            {rental.status}
          </Badge>
        </div>
      </CardContent>

      <CardFooter>
       {
        rental.status ==="APPROVED" &&  <Button onClick={() => setOpen(true)} disabled={rental.status !== "APPROVED"}>
          Return Gear
        </Button>
       }

        
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>

            <form action={formAction} className="space-y-4">

              <input
                type="hidden"
                name="rentalId"
                value={rental.id}
              />

              <AlertDialogHeader>
                <AlertDialogTitle>
                  Return Gear?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Rate this gear before returning.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>

                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min={1}
                  max={5}
                  placeholder="1-5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Comment</Label>

                <Textarea
                  id="comment"
                  name="comment"
                  placeholder="Write your experience..."
                  required
                />
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel type="button">
                  Cancel
                </AlertDialogCancel>

                <Button type="submit" disabled={pending}>
                  {pending ? "Returning..." : "Confirm Return"}
                </Button>
              </AlertDialogFooter>

            </form>

          </AlertDialogContent>
        </AlertDialog>

      </CardFooter>
    </Card>
  );
};

export default RentalCard;