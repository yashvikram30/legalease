"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserProfile } from "@/components/auth/user-profile"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const {data: session} = useSession();

  const navItems = [
    ...(!session?.user ? [{ name: "Home", href: "/" }] : []),
    { name: "AI Legal Chatbot", href: "/chat" },
    { name: "Case Tracker", href: "/dashboard" },
    { name: "Rights Visualizer", href: "/rights" },
    { name: "Document Simplifier", href: "/simplify" },
    { name: "Find Legal Help", href: "/help" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm dark:bg-slate-900/95 dark:shadow-slate-800/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-navy-900 dark:text-white">
                Legal<span className="text-teal-600 dark:text-teal-400">Ease</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-slate-700 hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <ModeToggle />
            <UserProfile />

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t dark:border-slate-700"
        >
          <div className="container mx-auto px-4 py-3 bg-white dark:bg-slate-900">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-slate-100 text-teal-600 dark:bg-slate-800 dark:text-teal-400"
                        : "text-slate-700 hover:bg-slate-100 hover:text-teal-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-teal-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
