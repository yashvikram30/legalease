"use client";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

    useEffect(()=>{
    console.log("Session data:", session?.user);
  })

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <span>Loading...</span>
      </div>
    );
  }



  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <span className="mb-4">You are not signed in.</span>
        <Button asChild>
          <a href="/sign-in">Sign In</a>
        </Button>
      </div>
    );
  }

  

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="font-semibold">Username:</span>{" "}
            {session.user.name || "-"}
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            {session.user.email || "-"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}