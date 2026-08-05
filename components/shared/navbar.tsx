'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronDown, LogOut, LayoutDashboard } from 'lucide-react'
import { logout } from '@/service/logout'
import { toast } from 'sonner'


const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Gears', href: '/gears' },
  
  // { label: 'About', href: '/' },
]

const userMenuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, action: 'dashboard' },
  { label: 'Logout', icon: LogOut, action: 'logout' },

]

type Iuser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    profile: {
      id: string;
      profilePhoto: string | null;
      userId: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export type NavbarProps = {
  user: Iuser
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()



  const { name, email, role } = user?.data ?? {};
  const handleUserAction = async (action: string) => {
    if (action === 'dashboard') {
      if (role === "USER") {
        router.push('/dashboard')
      }
      else if (role === "ADMIN") {
        router.push('/admin-dashboard')
      }
      else if (role === "PROVIDER") {
        router.push('/provider-dashboard')
      }

    } else if (action === 'logout') {
      await logout()
      toast.success("User Logged Out Successfull!")
      router.replace("/")
      router.refresh()

    }
  }

  

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className=" bg-primary rounded-lg flex items-center justify-center px-1">
            <span className="text-primary-foreground font-bold text-lg">Gear</span>
          </div>
          <span className="font-bold text-lg">Up</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User Dropdown */}
        {user?.data ? <>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 h-10 px-3 rounded-md hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>

              <span className="hidden sm:inline text-sm font-medium">User</span>

              <ChevronDown className="h-4 w-4 opacity-50" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm">
                <p className="font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
              </div>
              <DropdownMenuSeparator />

              {/* Mobile Nav Links - Only visible on small screens */}
              <div className="md:hidden">
                {navItems.map((item) => (
                  <DropdownMenuItem
                    key={item.href}

                    className="cursor-pointer"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>

              {/* User Menu Items */}
              {userMenuItems.map((item) => {
                const Icon = item.icon
                return (
                  <DropdownMenuItem
                    key={item.action}
                    onClick={() => handleUserAction(item.action)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

        </> : <>
          <div className='flex gap-2'>
            <Link
            href={"/login"}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Link
            href={"/signUp"}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Signup
          </Link>
          </div>

        </>}
      </div>
    </nav>
  )
}