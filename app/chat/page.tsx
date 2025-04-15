"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Send } from "lucide-react"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatSidebar } from "@/components/chat-sidebar"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI legal assistant. How can I help you with your legal questions today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192")

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Memoize handleSend to prevent unnecessary re-creations
  const handleSend = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
        model: selectedModel,
      }),
    })

    if (!res.ok || !res.body) {
      setIsLoading(false)
      return
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder("utf-8")
    let done = false
    let assistantMessage = {
      id: (Date.now() + 1).toString(),
      content: "",
      role: "assistant" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      assistantMessage.content += chunkValue

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id ? { ...m, content: assistantMessage.content } : m
        )
      )
    }

    setIsLoading(false)
  }, [input, messages, selectedModel])

  // Memoize model options to prevent unnecessary re-rendering
  const modelOptions = useMemo(() => [
    { value: "llama3-8b-8192", label: "LLaMA 3 8B (Fast)" },
    { value: "llama3-70b-8192", label: "LLaMA 3 70B (Powerful)" },
    { value: "llama3-70b-4096", label: "LLaMA 3 70B (4096 ctx)" },
  ], [])

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* <div className="w-75 h-full border-r dark:border-slate-700 overflow-y-auto">
        <ChatSidebar />
      </div> */}

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-6 sm:p-8">
            <div className="w-full max-w-2xl mx-auto space-y-4 pb-20">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                        ? "bg-teal-600 text-white dark:bg-teal-700"
                        : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                        }`}
                    >
                      {message.role === "assistant" ? (
                        <div className="prose prose-slate dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p>{message.content}</p>
                      )}
                      <div
                        className={`text-xs mt-1 ${message.role === "user" ? "text-teal-100" : "text-slate-500 dark:text-slate-400"
                          }`}
                      >
                        {format(message.timestamp, "h:mm a")}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-800">
                      <div className="flex space-x-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-4 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        <div className="border-t bg-white dark:bg-slate-900 dark:border-slate-700 p-4">
          <div className="max-w-3xl mx-auto mb-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-sm"
              disabled={isLoading}
            >
              {modelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your legal question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-800"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center max-w-3xl mx-auto">
            This AI assistant provides general legal information, not specific legal advice. For personalized advice,
            please consult a qualified legal professional.
          </p>
        </div>
      </div>
    </div>
  )
}
