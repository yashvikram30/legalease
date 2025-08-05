// /api/auth/forgot-password.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import sendMail from '@/lib/sendMail';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log('[Forgot Password] Request received:', email);

    if (!email || typeof email !== 'string') {
      console.warn('[Forgot Password] Invalid email input:', email);
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    await dbConnect();
    // console.log('[Forgot Password] Database connected');

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.warn('[Forgot Password] Email not found:', email);
      // Still return success message to prevent email enumeration
      return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiry;
    await user.save();

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    // console.log('[Forgot Password] Token generated:', token);
    // console.log('[Forgot Password] Reset link:', resetLink);

    await sendMail({
      to: user.email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    console.log('[Forgot Password] Email sent to:', user.email);

    // Optionally return token & link in dev mode for easier frontend testing
    const response: Record<string, any> = {
      message: 'If that email exists, a reset link has been sent.',
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('[Forgot Password] Error occurred:', error);
    return NextResponse.json({ error: 'An error occurred. Please try again later.' }, { status: 500 });
  }
}
