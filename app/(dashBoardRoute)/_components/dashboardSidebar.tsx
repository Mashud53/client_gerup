"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    User,
    CreditCard,
    Backpack,
    Users,
    LogOut,
    Home,
    Handshake,
    ClipboardPlus
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { logout } from "@/service/logout";

const userNavItems = [
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
    {
        title: "Payment",
        href: "/dashboard/payment",
        icon: CreditCard,
    },
    {
        title: "My Rental",
        href: "/dashboard/rental",
        icon: Backpack,
    },

];
const adminNavItems = [
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
    {
        title: "Payment",
        href: "/admin-dashboard/payment",
        icon: CreditCard,
    },
    {
        title: "Add Gear",
        href: "/admin-dashboard/add-gear",
        icon: ClipboardPlus,
    },
    {
        title: "Gears",
        href: "/admin-dashboard/gears",
        icon: Backpack,
    },
    {
        title: "All Rental",
        href: "/admin-dashboard/rentals",
        icon: Handshake,
    },
    
    {
        title: "Users",
        href: "/admin-dashboard/allUsers",
        icon: Users,
    },
]

const providerNavItems = [
    {
        title: "Profile",
        href: "/provider-dashboard/profile",
        icon: User,
    },
    {
        title: "Payment",
        href: "/provider-dashboard/payment",
        icon: CreditCard,
    },
     {
        title: "Add Gear",
        href: "/provider-dashboard/add-gear",
        icon: ClipboardPlus,
    },
    {
        title: "Gears",
        href: "/provider-dashboard/gears",
        icon: Backpack,
    },
    {
        title: "All Rental",
        href: "/provider-dashboard/rentals",
        icon: Handshake,
    }

]

interface DashboardSidebarProps {
    mobile?: boolean;
    role?: "ADMIN" | "USER" | "PROVIDER"
}

export function DashboardSidebar({
    mobile = false,
    role,
}: DashboardSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    console.log(role, "role=========");
    const handleLogout = async () => {
        await logout();
        router.replace("/");
    };

    return (
        <aside
            className={cn(
                "bg-background",
                mobile
                    ? "w-full"
                    : "hidden w-64 border-r md:flex"
            )}
        >
            <div className="flex min-h-screen w-full flex-col">
                <div className="border-b p-6">
                    <h2 className="text-xl font-bold">Dashboard</h2>
                </div>

                <nav className="p-4">
                    <Link href="/">
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Button>
                    </Link>
                </nav>

                {
                    role === "USER" && <nav className="flex-1 space-y-2 p-4">
                        {userNavItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={
                                            pathname === item.href
                                                ? "default"
                                                : "ghost"
                                        }
                                        className="w-full justify-start"
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {item.title}
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>
                }
                {
                    role === "ADMIN" && <nav className="flex-1 space-y-2 p-4">
                        {adminNavItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={
                                            pathname === item.href
                                                ? "default"
                                                : "ghost"
                                        }
                                        className="w-full justify-start"
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {item.title}
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>
                }
                {
                    role === "PROVIDER" && <nav className="flex-1 space-y-2 p-4">
          {providerNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={
                    pathname === item.href
                      ? "default"
                      : "ghost"
                  }
                  className="w-full justify-start"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </nav>
                }

                <div className="p-4">
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full justify-start"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </aside>
    );
}