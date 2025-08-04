'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [tokenValid, setTokenValid] = useState(true)

    const params = useSearchParams()
    const router = useRouter()
    const token = params.get('token')

    useEffect(() => {
        if (!token) {
            setTokenValid(false)
        }
    }, [token])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        try {
            setLoading(true)
            await axios.post(
                '/api/auth/reset-password',
                {
                    token,
                    newPassword: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )


            toast.success('Password reset successfully!')
            router.push('/auth')
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Reset failed')
        } finally {
            setLoading(false)
        }
    }

    if (!tokenValid) {
        return <p className="text-center mt-10 text-red-500">Invalid or missing reset token.</p>
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto my-16 space-y-8">
            <h1 className="text-2xl font-semibold">Reset your password</h1>
            <div className='flex flex-col gap-4'>
                <Label htmlFor="password">New Password</Label>
                <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <Button type="submit" disabled={loading} className='w-full bg-teal-600 hover:bg-teal-700'>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Resetting...</> : 'Reset Password'}
            </Button>
        </form>
    )
}
