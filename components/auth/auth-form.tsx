'use client'

import React, { useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiResponse } from "@/types/ApiResponse"
import Image from 'next/image'

export function AuthForm() {
  const [emailOrUsername, setEmailOrUsername] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")

  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: emailOrUsername,
        password,
        callbackUrl: `/dashboard`, // Correct placement
      })

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          toast('Invalid credentials. Please try again.', { icon: '❌' })
        } else {
          toast('An unexpected error occurred. Please try again later.', { icon: '❌' })
        }
      }

      // if (!result?.error && result?.url) {
      //   router.replace(result.url)
      // }

      if (!result?.error) {
        router.push('/dashboard') // more predictable
      }

    } catch (err) {
      console.error("SignIn error:", err) // <-- this will help you debug
      toast('There was a problem with your sign-in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', {
        username,
        email,
        password,
      })
      toast.success(response.data.message)
      // console.log(response.data.message)

      // Redirect directly to dashboard instead of verify page
      router.replace("/dashboard")
      setActiveTab("signin")

    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message;
      toast(errorMessage ?? 'There was a problem with your sign-up. Please try again.');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to LegalEase</CardTitle>
        <CardDescription>Sign in to access all features or create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signin" | "signup")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={async (e) => {
              await handleSignIn(e);
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOrUsername">Email or Username</Label>
                <Input
                  id="emailOrUsername"
                  type="text"
                  placeholder="your.email@example.com or username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-teal-600 hover:underline"
                  onClick={() => router.push("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>


              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="flex items-center justify-center">
                <span className="text-xs text-gray-400">or continue with</span>
              </div>
              <Button
                variant="outline"
                className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover-lift animate-fade-in-up"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                style={{ animationDelay: '0.5s' }}
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                Continue with Google
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={async (e) => {
              await handleSignUp(e);
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  type="text"
                  placeholder="your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-center text-slate-500">
        <span>
          By continuing, you agree to our{'\u00A0'}
          <a href="#" className="text-teal-600 hover:underline">Terms of Service</a>
          {'\u00A0'}and{'\u00A0'}
          <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>.
        </span>
      </CardFooter>
    </Card>
  )
}
