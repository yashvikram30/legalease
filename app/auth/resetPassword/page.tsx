import { ResetPasswordForm } from "@/components/auth/reset-passwordForm";
export default function AuthPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md">
        <ResetPasswordForm/>
      </div>
    </div>
  )
}