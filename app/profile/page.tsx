'use client'

import { useSession } from 'next-auth/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log('Session data:', session?.user)
  }, [session])

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="text-gray-600">Loading...</span>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="my-24 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md flex flex-col gap-6 text-center">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-2xl">You are not signed in</CardTitle>
            <CardDescription>Please sign in to view your profile.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild className="bg-teal-600 hover:bg-teal-700 w-full">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="my-24 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md flex flex-col gap-6">
        <CardHeader className="">
          <CardTitle className="text-2xl">Your Profile</CardTitle>
          <CardDescription className="text-gray-600">View your account details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-sm sm:text-base   ">
          <div className="flex gap-2">
            <span className="font-semibold text-gray-700">Username: </span>
            <span>{session.user.name || '-'}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold text-gray-700">Email: </span>
            <span>{session.user.email || '-'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
