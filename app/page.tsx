"use client"

import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Scale, Bot, FileText, Users, Search, Shield, ChevronRight, Zap, Play, Star, Gavel, BookOpen, MessageSquare, MapPin, Clock, Award, ChevronLeft, Pause, Sparkles, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    icon: <Bot className="h-7 w-7 text-white" />,
    title: "AI Legal Assistant",
    description: "Get instant answers to legal questions with our advanced AI trained on Indian law. 24/7 support in multiple languages.",
    highlight: "Instant Answers"
  },
  {
    icon: <Search className="h-7 w-7 text-white" />,
    title: "Smart Case Tracker",
    description: "Track your legal cases in real-time with automated status updates, hearing reminders, and document management.",
    highlight: "Real-time Updates"
  },
  {
    icon: <Shield className="h-7 w-7 text-white" />,
    title: "Rights Navigator",
    description: "Interactive guides to understand your fundamental rights, consumer rights, and legal protections in India.",
    highlight: "Know Your Rights"
  },
  {
    icon: <FileText className="h-7 w-7 text-white" />,
    title: "Document Decoder",
    description: "Upload legal documents and get simplified explanations in plain language. Supports PDF, Word, and text files.",
    highlight: "Plain Language"
  },
  {
    icon: <Users className="h-7 w-7 text-white" />,
    title: "Legal Network",
    description: "Connect with verified lawyers, legal aid providers, and law clinics across all major Indian cities.",
    highlight: "Verified Professionals"
  },
  {
    icon: <Scale className="h-7 w-7 text-white" />,
    title: "Legal Knowledge Hub",
    description: "Comprehensive database of Indian laws, precedents, and legal procedures with regular updates.",
    highlight: "Always Updated"
  }
]

const achievements = [
  {
    icon: <Users className="h-8 w-8 text-teal-600" />,
    number: 50000,
    suffix: "+",
    label: "Users Connected",
    description: "Active users across India"
  },
  {
    icon: <Scale className="h-8 w-8 text-teal-600" />,
    number: 15000,
    suffix: "+",
    label: "Cases Solved",
    description: "Successfully resolved cases"
  },
  {
    icon: <Shield className="h-8 w-8 text-teal-600" />,
    number: 500,
    suffix: "+",
    label: "Verified Lawyers",
    description: "Expert legal professionals"
  },
  {
    icon: <Award className="h-8 w-8 text-teal-600" />,
    number: 98,
    suffix: "%",
    label: "Success Rate",
    description: "User satisfaction rate"
  }
]

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Small Business Owner",
    company: "Sharma Enterprises",
    content: "This platform transformed how I handle legal documents. The AI analysis saved me countless hours and thousands in legal fees. Absolutely revolutionary for small businesses like mine!",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    role: "Legal Consultant",
    company: "Kumar Legal Associates",
    content: "As a practicing lawyer, I'm impressed by the accuracy and depth of legal insights. It's become an indispensable tool in my daily practice and has improved my client service significantly.",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    name: "Anita Patel",
    role: "Startup Founder",
    company: "TechVenture Inc",
    content: "The 24/7 support and expert consultation feature helped me navigate complex regulatory requirements. Couldn't have launched without it! Game-changer for startups.",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    name: "Dr. Vikram Singh",
    role: "Medical Professional",
    company: "City Hospital",
    content: "Dealing with medical malpractice concerns was overwhelming until I found this platform. The legal guidance was precise, professional, and incredibly helpful.",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    name: "Meera Gupta",
    role: "Real Estate Agent",
    company: "Premium Properties",
    content: "Property law can be complex, but this platform makes it accessible. The document analysis feature has saved me from potential legal pitfalls multiple times.",
    avatar: "/placeholder.svg",
    rating: 5
  },
  {
    name: "Arjun Reddy",
    role: "E-commerce Owner",
    company: "Digital Bazaar",
    content: "From privacy policies to terms of service, this platform helped me ensure my online business is legally compliant. The peace of mind is invaluable!",
    avatar: "/placeholder.svg",
    rating: 5
  }
];

function SectionBlurredTealBG({ className = "", style = {} }) {
  return (
    <div
      className={`absolute inset-0 -z-10 bg-teal-400/10 dark:bg-teal-900/20 blur-2xl ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

function SectionHeroSVGBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg className="absolute left-[-10vw] top-[-10vw] w-[60vw] h-[60vw] opacity-60 dark:opacity-40 animate-spin-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <ellipse fill="url(#grad1)" cx="100" cy="100" rx="100" ry="100" />
      </svg>
      <svg className="absolute right-[-10vw] bottom-[-10vw] w-[50vw] h-[50vw] opacity-50 dark:opacity-30 animate-pulse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <ellipse fill="url(#grad2)" cx="100" cy="100" rx="100" ry="100" />
      </svg>
      <div className="absolute left-1/2 top-0 w-[80vw] h-[60vw] -translate-x-1/2 bg-teal-400/20 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-0 w-[40vw] h-[30vw] bg-teal-200/10 rounded-full blur-2xl" />
    </div>
  );
}

function CountUp({ end, duration = 2 }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return

    let startTime
    let animationFrame

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [hasStarted, end, duration])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasStarted(true)}
    >
      {count}
    </motion.span>
  )
}

function TestimonialCard({ testimonial, isActive = false }: { testimonial: any; isActive?: boolean }) {
  return (
    <div className="relative h-full flex flex-col items-center justify-between p-8 rounded-3xl border border-teal-200/60 dark:border-teal-900/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-xl transition-all duration-500 hover:border-teal-400/80 hover:shadow-2xl hover:shadow-teal-500/10 overflow-hidden transform-gpu group">
      {/* Gradient/Glow border on hover */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-br from-teal-400/20 via-transparent to-teal-600/20 blur-sm" />
      </div>
      {/* Testimonial content */}
      <blockquote className="flex-1 italic text-lg leading-relaxed mb-6 text-slate-800 dark:text-slate-200 font-medium text-center z-10">
        "{testimonial.content}"
      </blockquote>
      {/* Author info (no avatar) */}
      <div className="flex flex-col items-center mt-4 z-10">
        <div className="font-semibold text-navy-900 dark:text-white text-base">{testimonial.name}</div>
        <div className="text-xs text-teal-600 dark:text-teal-400 font-medium">{testimonial.role}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{testimonial.company}</div>
        {/* Rating stars */}
        <div className="flex space-x-1 mt-2">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-sm" viewBox="0 0 20 20"><polygon points="10,1 12.59,6.99 19,7.64 14,12.26 15.18,18.51 10,15.27 4.82,18.51 6,12.26 1,7.64 7.41,6.99" /></svg>
          ))}
        </div>
      </div>
      {/* Gradient bottom border */}
      <div className="absolute left-0 bottom-0 w-full h-2 rounded-b-3xl bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600" />
    </div>
  );
}

function AutoMovingTestimonials() {
  // Duplicate testimonials for seamless looping
  const testimonialsLoop = [...testimonials, ...testimonials];
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (rowRef.current) {
      setWidth(rowRef.current.scrollWidth / 2); // width of one set
    }
  }, []);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 relative"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            style={{ background: "linear-gradient(90deg, #1e293b 0%, #14b8a6 50%, #1e293b 100%)", backgroundSize: "200% 100%", WebkitBackgroundClip: "text", backgroundClip: "text" }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            What Our Users Say
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "40%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Real stories from satisfied customers who transformed their legal experience
          </motion.p>
        </motion.div>
        {/* Smooth Infinite Horizontal Scroll */}
        <div className="relative overflow-hidden w-full">
          <motion.div
            ref={rowRef}
            className="flex gap-8"
            style={{ width: width ? width * 2 : 'auto' }}
            animate={{ x: [0, -width] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: width ? width / 80 : 40, // speed: 80px/sec
                ease: 'linear',
              },
            }}
          >
            {testimonialsLoop.map((testimonial, idx) => (
              <div key={idx} className="min-w-[350px] max-w-[350px] flex-shrink-0">
                <TestimonialCard testimonial={testimonial} isActive={false} />
              </div>
            ))}
          </motion.div>
        </div>
   
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-slate-900 text-navy-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative z-10 w-full pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh] overflow-hidden">
        <SectionHeroSVGBackground />
        <div className="max-w-4xl mx-auto w-full text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-teal-100 text-teal-600 border border-teal-200 dark:text-teal-400 dark:bg-teal-900/30 shadow-lg">
              <Zap className="h-4 w-4 animate-bounce" />
              <span>India's #1 Legal SaaS Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-balance text-navy-900 dark:text-white drop-shadow-xl">
              Simplifying Legal<br />
              <span className="text-teal-600 dark:text-teal-400">Access for All</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
              Navigate India's complex legal system with confidence. Get instant AI-powered legal guidance, track cases, and understand your rights in plain language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-4 rounded-xl font-semibold bg-teal-600 hover:bg-teal-700 text-white flex items-center space-x-2 shadow-xl shadow-teal-500/10 scale-100 hover:scale-105 transition-transform duration-200">
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 border-slate-300 dark:border-slate-600 hover:bg-teal-50/40 dark:hover:bg-teal-900/30 transition-colors text-teal-600 dark:text-teal-400">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Check className="h-5 w-5 text-teal-500 animate-pulse" />
              <span className="text-sm text-slate-500 dark:text-slate-400">No credit card required • 14-day free trial</span>
            </div>
          </motion.div>
        </div>
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-16px); }
          }
          .animate-float { animation: float 5s ease-in-out infinite; }
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 6s ease-in-out infinite;
          }
          .animate-spin-slow { animation: spin 24s linear infinite; }
        `}</style>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <SectionBlurredTealBG className="" />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-32 left-1/4 w-4 h-4 bg-teal-400/30 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 right-1/4 w-6 h-6 bg-teal-500/20 rotate-45"
            animate={{ 
              rotate: [45, 135, 45],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-teal-600/40 rounded-full"
            animate={{ 
              x: [0, 15, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative inline-block"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy-900 dark:text-white relative">
                Our Features
                <motion.div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </h2>
            </motion.div>
            <motion.p 
              className="text-lg md:text-xl max-w-3xl mx-auto text-slate-700 dark:text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Everything you need to understand and navigate the Indian legal system with confidence
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }} whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }} className="group perspective-1000 h-full">
                <Card className="relative p-8 rounded-3xl border border-teal-200/50 dark:border-teal-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-xl transition-all duration-500 hover:border-teal-400/60 hover:shadow-2xl hover:shadow-teal-500/10 overflow-hidden transform-gpu h-full flex flex-col">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.div className="w-full h-full bg-gradient-to-br from-teal-400/10 via-transparent to-teal-600/10" animate={{ background: [ "linear-gradient(135deg, rgba(20,184,166,0.1) 0%, transparent 50%, rgba(20,184,166,0.1) 100%)", "linear-gradient(225deg, rgba(20,184,166,0.1) 0%, transparent 50%, rgba(20,184,166,0.1) 100%)", "linear-gradient(135deg, rgba(20,184,166,0.1) 0%, transparent 50%, rgba(20,184,166,0.1) 100%)" ] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                  </div>
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-teal-400/20 via-transparent to-teal-600/20 blur-sm" />
                  </div>
                  {/* Icon container with enhanced styling */}
                  <motion.div className="relative w-16 h-16 rounded-2xl p-4 mb-6 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/25" whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0], boxShadow: "0 8px 32px rgba(20,184,166,0.4)" }} transition={{ duration: 0.3 }}>
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                      {feature.icon}
                    </motion.div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/30 to-teal-600/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  <CardHeader className="p-0 mb-4 relative z-10">
                    <CardTitle className="text-xl font-semibold text-navy-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed relative z-10 flex-grow">
                    {feature.description}
                  </CardDescription>
                  {/* Enhanced highlight badge */}
                  <motion.div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-gradient-to-r from-teal-100 to-teal-50 text-teal-700 dark:from-teal-900/40 dark:to-teal-800/40 dark:text-teal-400 border border-teal-200/50 dark:border-teal-700/50 relative z-10 mt-auto" whileHover={{ scale: 1.05, boxShadow: "0 4px 16px rgba(20,184,166,0.2)" }} transition={{ duration: 0.2 }}>
                    <motion.div className="w-2 h-2 rounded-full bg-teal-500 mr-2" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                    {feature.highlight}
                  </motion.div>
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
                    <div className="absolute top-3 right-3 w-2 h-2 bg-teal-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 right-6 w-1 h-1 bg-teal-500/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative elements */}
          <div className="flex justify-center mt-16">
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-teal-400/60 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950/20 dark:to-blue-950/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy-900 dark:text-white">
              Our <span className="text-teal-600 dark:text-teal-400">Achievements</span>
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-700 dark:text-slate-300">
              Empowering Indians with legal knowledge and support
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-teal-200 dark:border-teal-900 hover:shadow-xl transition-all duration-300 group-hover:border-teal-400/60">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30 group-hover:scale-110 transition-transform duration-300">
                      {achievement.icon}
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-navy-900 dark:text-white">
                      <CountUp end={achievement.number} />
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-teal-600 dark:text-teal-400">
                      {achievement.suffix}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy-900 dark:text-white mb-2">
                    {achievement.label}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Testimonials Section */}
      <AutoMovingTestimonials />
{/* CTA Section */}
<section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <SectionBlurredTealBG className="opacity-60" />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-32 left-1/4 w-4 h-4 bg-teal-400/30 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 right-1/4 w-6 h-6 bg-teal-500/20 rotate-45"
            animate={{ 
              rotate: [45, 135, 45],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className="relative p-12 rounded-3xl border border-teal-200/50 dark:border-teal-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-2xl transition-all duration-500 hover:border-teal-400/60 hover:shadow-2xl hover:shadow-teal-500/10 overflow-hidden transform-gpu">
              
              {/* Animated gradient background */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div 
                  className="w-full h-full bg-gradient-to-br from-teal-400/10 via-transparent to-teal-600/10" 
                  animate={{ 
                    background: [ 
                      "linear-gradient(135deg, rgba(20,184,166,0.1) 0%, transparent 50%, rgba(20,184,166,0.1) 100%)", 
                      "linear-gradient(225deg, rgba(20,184,166,0.1) 0%, transparent 50%, rgba(20,184,166,0.1) 100%)", 
                      "linear-gradient(135deg, rgba(20,184,166,0.1) 0%, transparent 50%, rgba(20,184,166,0.1) 100%)" 
                    ] 
                  }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                />
              </div>

              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-teal-400/20 via-transparent to-teal-600/20 blur-sm" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-teal-100 to-teal-50 text-teal-700 dark:from-teal-900/40 dark:to-teal-800/40 dark:text-teal-400 border border-teal-200/50 dark:border-teal-700/50 mb-8"
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-teal-500 mr-2" 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} 
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
                  />
                  Transform Your Legal Experience
                </motion.div>

                {/* Main heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-6"
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-navy-900 dark:text-white relative">
                    Ready to <span className="text-teal-600 dark:text-teal-400">Transform</span>?
                    
                  </h2>
                </motion.div>
                
                {/* Description */}
                <motion.p 
                  className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Join 10,000+ users simplifying legal
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mb-8"
                >
                  <Button 
                    size="lg" 
                    className="px-10 py-5 text-lg font-semibold rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 scale-100 hover:scale-105 transition-all duration-300 group"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-500 dark:text-slate-400"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Free for 14 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>No card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Cancel anytime</span>
                  </div>
                </motion.div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                <div className="absolute top-4 right-4 w-3 h-3 bg-teal-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-8 right-8 w-2 h-2 bg-teal-500/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

           
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
