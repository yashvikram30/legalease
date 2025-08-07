"use client"

import type React from "react"

import { Inter } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"

import ThemeProvider  from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {Toaster} from "react-hot-toast"
import AuthProvider from '../context/AuthProvider';

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        
          <Toaster/>
        </ThemeProvider>
      </body>
      </AuthProvider>
    </html>
  )
}
