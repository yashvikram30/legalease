// /api/auth/forgot-password.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import sendMail from '@/lib/sendMail'; // You'll create this

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
  }

  await dbConnect();

  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  user.resetPasswordToken = token;
  user.resetPasswordExpires = expiry;
  await user.save();

  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await sendMail({
    to: user.email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });

  return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' });
}
