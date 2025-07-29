"use client";

import {
  ArrowRight,
  Check,
  MessageSquare,
  Scale,
  Search,
  Shield,
  Award,
  Users,
  FileText,
  BookOpen,
  Globe,
  UserCheck,
  BarChart2,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Counter utility for animated achievements
function useCounter(end, speed = 40, isPercent = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    if (end === 0) return;
    const increment = Math.max(1, Math.floor(end / (speed * 3)));
    const interval = setInterval(() => {
      start += increment;
      if (start > end) start = end;
      setCount(start);
      if (start === end) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [end, speed]);
  return isPercent ? `${count}%` : count.toLocaleString();
}

export default function LandingPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-teal-400 dark:text-teal-300" />,
      title: "AI Legal Chatbot",
      description: "Instant authoritative legal answers using Indian case law.",
      link: "/chat",
    },
    {
      icon: <Search className="h-8 w-8 text-teal-400 dark:text-teal-300" />,
      title: "Case Tracker",
      description: "Track your legal cases in real-time, every stage.",
      link: "/dashboard",
    },
    {
      icon: <Scale className="h-8 w-8 text-teal-400 dark:text-teal-300" />,
      title: "Rights Visualizer",
      description: "Your rights explained in clear, friendly language.",
      link: "/rights",
    },
    {
      icon: <FileText className="h-8 w-8 text-teal-400 dark:text-teal-200" />,
      title: "Document Generator",
      description: "Auto-generate contracts and legal documents tailored for you.",
      link: "/documents",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-teal-400" />,
      title: "Knowledge Hub",
      description: "Explore a growing library of explainer articles and legal guides.",
      link: "/knowledge",
    },
    {
      icon: <Globe className="h-8 w-8 text-teal-300" />,
      title: "Regional Languages",
      description: "Access services in your preferred Indian language.",
      link: "/languages",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Small Business Owner",
      content: "LegalEase provided clarity without expensive consultations. The AI chatbot gave me confidence.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Rahul Patel",
      role: "Property Owner",
      content: "The Rights Visualizer made tenant law crystal clear—helped me resolve a dispute painlessly.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Ananya Desai",
      role: "Legal Professional",
      content: "As a lawyer, LegalEase speeds up my research and offers reliable up-to-date information.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ];

  const areas = [
    "Corporate Law",
    "Property Law",
    "Employment Law",
    "Consumer Rights",
    "Family Law",
    "Criminal Law",
    "Tax Law",
    "Contract Law",
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, label: "Clients Served", value: "10,000+" },
    { icon: <Scale className="h-6 w-6" />, label: "Success Rate", value: "95%" },
    { icon: <Award className="h-6 w-6" />, label: "Legal Support", value: "24/7" },
  ];

  // Achievement section state counters
  const usersCount = useCounter(27777, 60);
  const casesCount = useCounter(8333, 50);
  const lawyersCount = useCounter(272, 20);
  const rateCount = useCounter(53, 32, true);

  // Achievements data/config
  const achievements = [
    { icon: <Users className="h-8 w-8 text-teal-400" />, label: "Users Connected", num: usersCount },
    { icon: <Briefcase className="h-8 w-8 text-teal-400" />, label: "Cases Solved", num: casesCount },
    { icon: <UserCheck className="h-8 w-8 text-teal-500" />, label: "Verified Lawyers", num: lawyersCount },
    { icon: <BarChart2 className="h-8 w-8 text-teal-300" />, label: "Success Rate", num: rateCount },
  ];

  return (
    <div className="font-sans bg-gray-50 dark:bg-black text-black dark:text-gray-100 transition-colors duration-500">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 py-24 bg-gray-50 dark:bg-black overflow-hidden transition-colors">
        {/* Teal blob for light, cyan for dark, alternate */}
        <div className="absolute left-[-100px] top-[-140px] w-[500px] h-[360px] z-0 pointer-events-none rounded-full
          bg-gradient-to-br from-teal-300 via-white to-white
          dark:from-cyan-400 dark:via-cyan-200 dark:to-white blur-[40px] opacity-70" />
        {/* Second blob */}
        <div className="absolute right-[-80px] bottom-[-70px] w-[380px] h-[230px] z-0 pointer-events-none rounded-full
          bg-gradient-to-br from-cyan-100 via-white to-white blur-2xl opacity-30 dark:from-white dark:via-teal-500 dark:to-cyan-200" />

        <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
          <motion.div
            className="mb-4 flex items-center gap-2 text-teal-500 dark:text-cyan-200 font-bold tracking-wide text-xs sm:text-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="h-4 w-4" />
            TRUSTED BY 10,000+ LEGAL PROFESSIONALS
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif mb-3 text-black dark:text-white leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            India's Most Trusted
            <br />
            <span className="text-teal-500 dark:text-cyan-300">LegalTech Platform</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-2 mb-8 max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experience the convergence of legal expertise and seamless technology.
            Get instant guidance, transparent tracking, and friendly rights visualization.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-center">
            <Link href="/chat">
              <button className="px-7 py-3 rounded-full font-medium shadow-lg bg-teal-500 dark:bg-cyan-400 text-white dark:text-black transition hover:bg-teal-600 hover:scale-105 flex items-center gap-2">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-7 py-3 rounded-full border-2 border-teal-500 dark:border-cyan-300 text-teal-500 dark:text-cyan-200 font-medium bg-transparent hover:bg-white hover:text-black dark:hover:bg-gray-900 dark:hover:text-cyan-100 transition flex items-center gap-2">
                Book a Demo
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 justify-center text-sm text-gray-400 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <Check className="h-4 w-4 text-teal-400 dark:text-cyan-200" />
              Free for individuals
            </div>
            <div className="flex items-center gap-1">
              <Check className="h-4 w-4 text-teal-400 dark:text-cyan-200" />
              No credit card required
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative py-12 -mt-16 rounded-t-[5vw] rounded-b-[4vw] px-2 bg-transparent transition-colors overflow-hidden">
        <div className="absolute left-[-50px] top-4 w-[200px] h-[120px] rounded-full bg-teal-200 blur-xl opacity-20 mix-blend-lighten pointer-events-none animate-pulse dark:bg-cyan-400 dark:opacity-20" />
        <div className="absolute right-[-30px] bottom-2 w-[150px] h-[80px] rounded-full bg-white blur-lg opacity-15 mix-blend-lighten pointer-events-none animate-pulse delay-500 dark:bg-white dark:opacity-10" />

        <div className="container mx-auto flex flex-wrap justify-center gap-12 md:gap-20 relative z-10">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="bg-gradient-to-br from-teal-100/80 to-white/40 dark:from-cyan-500/40 dark:to-black/60 rounded-full p-4 shadow-lg text-2xl text-teal-600 dark:text-cyan-300">{s.icon}</span>
              <div>
                <div className="font-bold text-xl text-black dark:text-white">{s.value}</div>
                <div className="text-sm tracking-wide text-gray-600 dark:text-gray-300">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="relative py-16 bg-gray-50 dark:bg-black transition-colors overflow-hidden">
        <div className="absolute -left-28 top-8 w-[520px] h-[320px] rounded-full bg-teal-300 blur-3xl opacity-40 dark:bg-cyan-500 dark:opacity-35 pointer-events-none animate-pulse" />
        <div className="absolute right-0 -bottom-32 w-[320px] h-[160px] rounded-full bg-cyan-200 blur-2xl opacity-30 dark:bg-white/10 dark:opacity-15 pointer-events-none animate-pulse delay-1000" />
        <div className="absolute left-1/2 top-[80%] w-[300px] h-[150px] rounded-full bg-white blur-2xl opacity-20 dark:bg-cyan-100 dark:opacity-10 pointer-events-none animate-spin-slow" />
        <div className="absolute left-1/4 top-1/4 w-[200px] h-[120px] rounded-full bg-white blur-xl opacity-15 dark:bg-teal-400 dark:opacity-10 pointer-events-none animate-bounce" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-teal-700 dark:text-cyan-200 mb-4 text-center">
            Practice Areas We Cover
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-center text-gray-400 dark:text-gray-300">
            Comprehensive legal guidance across the most common areas of Indian law
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((area, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border-2 bg-white dark:bg-black border-teal-200 dark:border-cyan-900 text-black dark:text-white shadow-lg hover:border-teal-400 transition flex flex-col items-center justify-center hover:shadow-2xl hover:scale-105"
              >
                {/* Vibrant Icon with unique colors */}
                <span className={`
                  flex items-center justify-center rounded-full mb-4 w-12 h-12 shadow-md text-black text-xl group-hover:scale-110 group-hover:rotate-3 transition
                  ${i % 8 === 0 ? "bg-gradient-to-tr from-teal-400 to-white dark:from-cyan-400 dark:to-white"
                    : i % 8 === 1 ? "bg-gradient-to-tr from-white to-teal-200 dark:from-white dark:to-cyan-200"
                      : i % 8 === 2 ? "bg-gradient-to-tr from-cyan-200 to-teal-50 dark:from-cyan-200 dark:to-teal-200"
                        : i % 8 === 3 ? "bg-gradient-to-tr from-white to-cyan-300 dark:from-white dark:to-cyan-400"
                          : i % 8 === 4 ? "bg-gradient-to-tr from-teal-100 to-white dark:from-cyan-200 dark:to-white"
                            : i % 8 === 5 ? "bg-gradient-to-tr from-cyan-100 to-white dark:from-cyan-400 dark:to-teal-100"
                              : i % 8 === 6 ? "bg-gradient-to-tr from-teal-200 to-white dark:from-cyan-400 dark:to-white"
                                : "bg-gradient-to-tr from-white to-teal-100 dark:from-white dark:to-cyan-200"}
                `}>
                  <Scale className="w-7 h-7" />
                </span>
                <div className="font-semibold group-hover:text-teal-400 dark:group-hover:text-cyan-200 text-center transition">{area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-20 bg-gray-50 dark:bg-black overflow-hidden rounded-t-[6vw] transition-colors">
        <div className="absolute right-[-10vw] -top-[9vw] w-[400px] h-[180px] rounded-full bg-white blur-3xl opacity-25 dark:bg-cyan-300 dark:opacity-10 pointer-events-none animate-pulse" />
        <div className="absolute left-[-5vw] bottom-[10%] w-[250px] h-[120px] rounded-full bg-teal-100 blur-2xl opacity-20 dark:bg-teal-600 dark:opacity-10 pointer-events-none animate-pulse delay-700" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-teal-700 dark:text-cyan-200 mb-7 text-center">
            Professional-Grade Legal Tools
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-center text-gray-400 dark:text-gray-300">
            Sophisticated technology meets legal expertise for reliable, accessible solutions.
          </p>
          <div className="grid lg:grid-cols-3 gap-7">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border-2 border-teal-100 dark:border-cyan-900 bg-white dark:bg-black px-7 py-10 shadow-lg flex flex-col items-center hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4 bg-gradient-to-br from-teal-100 via-white to-white dark:from-cyan-700 dark:via-black dark:to-cyan-800 rounded-full w-14 h-14 flex items-center justify-center shadow-md">
                  {feature.icon}
                </div>
                <div className="font-serif text-black dark:text-white text-lg font-semibold mb-2">
                  {feature.title}
                </div>
                <p className="text-center mb-7 text-gray-500 dark:text-gray-300">{feature.description}</p>
                <Link
                  href={feature.link}
                  className="text-teal-500 hover:text-teal-700 dark:text-cyan-200 dark:hover:text-cyan-100 transition font-medium flex items-center gap-2"
                >
                  Explore Feature <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section className="relative py-20 bg-gray-50 dark:bg-black transition-colors overflow-hidden">
        <div className="absolute left-[-100px] top-10 w-[300px] h-[200px] rounded-full bg-white blur-2xl opacity-20 dark:bg-cyan-100 dark:opacity-10 pointer-events-none animate-pulse" />
        <div className="absolute right-[-80px] bottom-10 w-[250px] h-[150px] rounded-full bg-cyan-100 blur-xl opacity-15 dark:bg-white dark:opacity-10 pointer-events-none animate-pulse delay-500" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-teal-700 dark:text-cyan-200 mb-8">
            See LegalEase in Action
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-gray-400 dark:text-gray-300">
            Watch our quick demo to understand how LegalEase transforms complex legal processes into actionable insights.
          </p>
          <div className="mx-auto max-w-3xl bg-white dark:bg-black rounded-3xl shadow-2xl overflow-hidden border-2 border-teal-100 dark:border-cyan-900 p-2">
            <video
              src="/legalease-demo.mp4"
              controls
              poster="/demo-poster.png"
              className="w-full rounded-2xl"
              aria-label="LegalEase platform demonstration video"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20 bg-gray-50 dark:bg-black rounded-t-[7vw] transition-colors overflow-hidden">
        <div className="absolute right-[-120px] top-16 w-[350px] h-[200px] rounded-full bg-teal-100 blur-2xl opacity-15 dark:bg-white dark:opacity-10 pointer-events-none animate-pulse" />
        <div className="absolute left-[-90px] bottom-20 w-[280px] h-[160px] rounded-full bg-cyan-100 blur-xl opacity-15 dark:bg-cyan-400 dark:opacity-10 pointer-events-none animate-pulse delay-800" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-teal-700 dark:text-cyan-200 mb-6 text-center">
            Trusted by Legal Professionals
          </h2>
          <p className="max-w-3xl mx-auto mb-14 text-center text-gray-400 dark:text-gray-300">
            Real stories from clients and legal professionals who rely on LegalEase for critical legal guidance and case management.
          </p>
          <div className="grid lg:grid-cols-3 gap-7">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white dark:bg-black border-2 border-teal-100 dark:border-cyan-900 shadow-md px-7 py-8 text-left hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-3 gap-3">
                  <Image
                    src={testimonial.avatar}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-teal-200 dark:border-cyan-700"
                    alt=""
                  />
                  <div>
                    <div className="font-bold text-black dark:text-white">{testimonial.name}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-300">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-800 dark:text-white italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 bg-black dark:bg-black overflow-hidden">
        <div className="absolute left-0 bottom-0 w-[280px] h-[140px] rounded-full bg-teal-200/60 blur-3xl opacity-40 mix-blend-lighten pointer-events-none animate-pulse" />
        <div className="absolute right-[-50px] top-10 w-[200px] h-[100px] rounded-full bg-white/60 blur-2xl opacity-30 mix-blend-lighten pointer-events-none animate-pulse delay-1000 dark:bg-cyan-200 dark:opacity-10" />

        <div className="container mx-auto px-6 max-w-4xl text-center text-white relative z-10">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-8">
            Ready to Transform Your Legal Practice?
          </h2>
          <p className="mb-12 text-xl max-w-2xl mx-auto leading-relaxed text-gray-100/90">
            Join thousands across India who trust LegalEase to navigate legal challenges with clarity and confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            <a href="/chat">
              <button className="px-7 py-3 rounded-full font-semibold bg-teal-400 text-black hover:bg-white hover:text-teal-700 shadow-lg transition-all flex items-center gap-2">
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </button>
            </a>
            <a href="/contact">
              <button className="px-7 py-3 rounded-full border-2 border-teal-100 bg-transparent text-teal-100 hover:bg-white hover:text-black font-semibold transition-all">
                Schedule Consultation
              </button>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-teal-50 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-teal-300" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-teal-300" />
              <span>Free consultation available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-teal-300" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
