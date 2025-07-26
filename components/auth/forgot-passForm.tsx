'use client'

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 1. Handle email submission — sends OTP
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post('/api/forgot-password', { email });
      toast.success(res.data.message);
      setStep('otp'); // Show OTP step
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle OTP verification only (using /api/reset-password with no newPassword)
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Call /api/reset-password with email and otp only
      const res = await axios.post('/api/reset-password', { email, otp });
      if (res.data.message && res.data.message.toLowerCase().includes('invalid')) {
        setError(res.data.message);
      } else {
        toast.success('OTP verified!');
        // Redirect to reset password page with email and otp as query params
        router.push(`/auth/resetPassword?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>Enter your email to receive an OTP and reset your password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={step === 'email' ? handleEmailSubmit : handleOtpSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="forgot-email">Email</Label>
            <Input
              id="forgot-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={step === 'otp'}
              required
            />
          </div>
          {step === 'otp' && (
            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <InputOTP
                id="otp"
                maxLength={6}
                value={otp}
                onChange={setOtp}
                containerClassName="justify-center"
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700">
            {loading
              ? 'Please wait...'
              : step === 'email'
              ? 'Send OTP'
              : 'Verify OTP'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="link"
          className="w-full text-xs text-teal-600 hover:underline p-0"
          type="button"
          onClick={() => router.push('/auth')}
        >
          Back to Sign In
        </Button>
      </CardFooter>
    </Card>
  );
};

