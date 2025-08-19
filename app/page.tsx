"use client"

import { ArrowRight, Check, MessageSquare, Scale, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TestimonialCard } from "@/components/testimonial-card"

export default function LandingPage() {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "AI Legal Chatbot",
      description: "Get instant answers to your legal questions from our AI-powered chatbot.",
      link: "/chat",
    },
    {
      icon: <Search className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Case Tracker",
      description: "Track your legal cases in real-time with updates on status and next steps.",
      link: "/dashboard",
    },
    {
      icon: <Scale className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Legal Rights Visualizer",
      description: "Understand your legal rights in simple language with interactive visualizations.",
      link: "/rights",
    },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Small Business Owner",
      content:
        "LegalEase helped me understand my rights as a business owner without expensive legal consultations. The AI chatbot answered all my questions clearly.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Rahul Patel",
      role: "Tenant",
      content:
        "I was having issues with my landlord and didn't know my rights. The Rights Visualizer made everything clear, and I was able to resolve my dispute quickly.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Ananya Desai",
      role: "Student",
      content:
        "As a law student, I find LegalEase incredibly useful for research. The platform simplifies complex legal concepts and makes them accessible to everyone.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-navy-900 dark:text-white">
                  Simplifying Legal Access for All Indians
                </h1>
                <p className="max-w-[600px] text-slate-700 md:text-xl dark:text-slate-300">
                  LegalEase makes the justice system accessible through AI-powered tools, plain language explanations,
                  and personalized guidance.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Link href="/chat">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="dark:border-slate-600 dark:text-slate-300">
                  <Link href="/help">Find Legal Help</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="mx-auto lg:mx-0 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/image.png?height=500&width=500"
                width={500}
                height={500}
                alt="Legal assistance illustration"
                className="rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="w-full py-12 md:py-16 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto text-center space-y-4 max-w-[800px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-navy-900 dark:text-white">Our Mission</h2>
            <p className="text-slate-700 md:text-xl dark:text-slate-300">
              We believe that legal knowledge should be accessible to everyone, not just those who can afford expensive
              lawyers. LegalEase uses AI and plain language to demystify the legal system, empowering citizens to
              understand and exercise their rights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-12 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-navy-900 dark:text-white">Core Features</h2>
              <p className="max-w-[700px] text-slate-700 md:text-xl dark:text-slate-300">
                Powerful tools designed to simplify your legal journey
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch max-w-5xl pt-8 md:pt-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-lg bg-white dark:bg-slate-800">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900 w-fit mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl dark:text-white">{feature.title}</CardTitle>
                    <CardDescription className="text-slate-700 dark:text-slate-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" className="group dark:text-slate-300">
                      <Link href={feature.link}>
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-navy-900 dark:text-white">What Our Users Say</h2>
              <p className="max-w-[700px] text-slate-700 md:text-xl dark:text-slate-300">
                Real stories from people who have used LegalEase to navigate their legal challenges
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch max-w-5xl pt-8 md:pt-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto flex flex-col items-center justify-center space-y-4 text-center max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-navy-900 dark:text-white">
                Ready to Simplify Your Legal Journey?
              </h2>
              <p className="max-w-[700px] text-slate-700 md:text-xl dark:text-slate-300">
                Join thousands of Indians who are using LegalEase to understand their rights and navigate the legal
                system with confidence.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                <Link href="/chat">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="dark:border-slate-600 dark:text-slate-300">
                <Link href="/help">Find Legal Help</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-4">
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-teal-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">No credit card required</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-teal-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Free basic access</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-teal-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
