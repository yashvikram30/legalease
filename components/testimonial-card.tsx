import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type TestimonialProps = {
  testimonial: {
    name: string
    role: string
    content: string
    avatar: string
  }
}

export function TestimonialCard({ testimonial }: TestimonialProps) {
  return (
    <Card className="h-full bg-white dark:bg-slate-900 transition-colors">
      <CardContent className="p-6">
        <div className="flex flex-col h-full space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
              />
              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-navy-900 dark:text-white">
                {testimonial.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {testimonial.role}
              </p>
            </div>
          </div>
          <blockquote className="flex-1 text-slate-700 dark:text-slate-300 italic">
            “{testimonial.content}”
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
}

