import Link from "next/link";
import { Home, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-lg">
                <CardContent className="flex flex-col items-center gap-6 py-10 text-center">
                    <div className="rounded-full bg-muted p-5">
                        <SearchX className="h-14 w-14 text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-5xl font-bold tracking-tight">404</h1>

                        <h2 className="text-2xl font-semibold">
                            Page Not Found
                        </h2>

                        <p className="text-muted-foreground">
                            The page you are looking for does not exist or may have been moved.
                        </p>
                    </div>

                    <Link href="/">
                        <Button className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}