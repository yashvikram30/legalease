import { NextResponse } from "next/server";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, otp, newPassword } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Check if OTP is valid and not expired
  if (
    !user.otp ||
    !user.otpExpiry ||
    user.otp !== otp ||
    new Date(user.otpExpiry).getTime() < Date.now()
  ) {
    return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
  }

  // If newPassword is not provided, just verify OTP
  if (!newPassword) {
    return NextResponse.json({ message: "OTP verified" }, { status: 200 });
  }

  // If newPassword is provided, reset password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.otp = "";
  user.otpExpiry = null;
  await user.save();

  return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
}
