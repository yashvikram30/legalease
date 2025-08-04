'use client'

import { useSession, signOut } from 'next-auth/react'
import { LogOut, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function UserProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }) // Redirect to home after sign-out
    router.refresh()
  }

  if (status === 'loading') {
    return (
      <Button variant="ghost" size="sm" disabled>
        <UserIcon className="h-4 w-4 mr-2" />
        Loading...
      </Button>
    )
  }

  if (!session || !session.user) {
    return (
      <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-800">
        <a href="/auth">Sign In</a>
      </Button>
    )
  }

  const { email, image } = session.user
  const initials = email ? email.substring(0, 1).toUpperCase() : 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Avatar className="h-6 w-6 bg-teal-600">
            <AvatarImage src={image!} alt={email || ''} />
            <AvatarFallback className='bg-teal-600 text-white'>{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm hidden md:inline-block">{email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/dashboard">Dashboard</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/profile">Profile Settings</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
