import { ForgotPasswordForm} from "@/components/auth/forgot-passForm"

export default function AuthPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md">
        <ForgotPasswordForm/>
      </div>
    </div>
  )
}