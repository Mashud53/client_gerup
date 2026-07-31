"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({
    error,
    reset,
}: ErrorPageProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardContent className="flex flex-col items-center space-y-6 p-8 text-center">
                    <div className="rounded-full bg-destructive/10 p-4">
                        <AlertTriangle className="h-12 w-12 text-destructive" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">
                            Something went wrong
                        </h1>

                        <p className="text-muted-foreground">
                            An unexpected error occurred. Please try again or return to the
                            homepage.
                        </p>
                    </div>

                    {process.env.NODE_ENV === "development" && (
                        <div className="w-full rounded-md border bg-muted p-3 text-left">
                            <p className="text-sm font-medium text-destructive">
                                {error.message}
                            </p>
                        </div>
                    )}

                    <div className="flex w-full gap-3">
                        <Button
                            className="flex-1"
                            onClick={() => reset()}
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>

                        <Link href="/">
                            <Button variant="outline" className="w-full">
                                Home
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}