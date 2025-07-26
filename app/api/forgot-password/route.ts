import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import userModel from "@/model/User";
import { sendMail } from "@/lib/mailer";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  await dbConnect();
  const user = await userModel.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // 🔐 Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Save OTP and expiry to user
  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  // ✉️ Send OTP via email
  await sendMail({
    to: email,
    subject: "Your LegalEase OTP for Password Reset",
    html: `<p>Your OTP for resetting your LegalEase password is: <b>${otp}</b></p><p>This OTP will expire in 10 minutes.</p>`,
  });

  return NextResponse.json({ message: "OTP sent to your email." });
}
