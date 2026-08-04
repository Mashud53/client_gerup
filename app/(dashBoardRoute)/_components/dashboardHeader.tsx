"use client";

import { Bell, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavbarProps } from "@/components/shared/navbar";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { DashboardSidebar } from "./dashboardSidebar";

export function DashboardHeader({ user }: NavbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent">
              
                <Menu className="h-5 w-5" />
              
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-64 p-0"
            >
              <DashboardSidebar mobile />
            </SheetContent>
          </Sheet>
        </div>

        <h1 className="text-lg font-semibold">
         
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost">
          <Bell className="h-5 w-5" />
        </Button>

        <Avatar>
          <AvatarFallback>
            {user?.data?.name
              ?.slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}