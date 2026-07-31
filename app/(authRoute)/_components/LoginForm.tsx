"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "../_action/auth";
import Link from "next/link";
import { LogIn} from 'lucide-react'
import { useRouter } from "next/navigation";
import { toast } from "sonner";



export default function LoginForm() {
    const router = useRouter()
    const [state, formAction, isPending] = useActionState(
        loginAction,
        false
    );
   
    useEffect(()=>{
       
        if(state.success){
            toast.success("Login Successfull")            
            //  router.replace("/dashboard")
        }
    },[state, router])

    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted/30 px-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="mb-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-4">
                        <LogIn className="h-6 w-6" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                    <p className="mt-2 text-muted-foreground">Sign in to access your account</p>
                </div>

                {/* Login Card */}
                <Card className="border border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter your details to get started</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form action={formAction} className="space-y-5">
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
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                {isPending ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                        <div className="space-y-2 text-center text-sm">
                            <p className="text-muted-foreground">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/signUp"
                                    className="font-semibold text-primary hover:underline transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                            <p className="text-muted-foreground">
                                <Link
                                    href="/login"
                                    className="font-semibold text-primary hover:underline transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

               
            </div>
        </main>
    );
}