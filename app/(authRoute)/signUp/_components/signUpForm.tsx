"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupAction } from "../_action/signUp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const initialState = {
  success: false,
  message: "",
};

const SignUpForm = () => {
    const router = useRouter()
      const [state, formAction, pending] = useActionState(
    signupAction,
    initialState
  );
  useEffect(()=>{
       
        if(state.success){
            toast.success("User Created Successfull")            
             router.replace("/")
        }
    },[state, router])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create an Account
        </h1>

        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              required
            />
          </div>

          {state.message && (
            <p
              className={`text-sm ${
                state.success ? "text-green-600" : "text-red-500"
              }`}
            >
              {state.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;