"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Send } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatbotSkeleton } from "@/components/ui/chat-skeleton";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI legal assistant. How can I help you with your legal questions today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192");
  const [showprompts, setShowprompts] = useState(true);
  const [location, setlocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  // Starter prompts
  const starterPrompts = useMemo(
    () => [
      "How is alimony calculated?",
      "What are my tenant rights?",
      "Explain copyright law basics",
      "How does small claims court work?",
    ],
    []
  );

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Memorize handleSend to prevent unnecessary re-creations
  const handleSend = useCallback(
    async (e?: React.FormEvent, customInput?: string) => {
      e?.preventDefault();
      const messageContent = customInput || input.trim();
      if (!messageContent) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        content: messageContent,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
          model: selectedModel,
        }),
      });

      if (!res.ok || !res.body) {
        setIsLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant" as const,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        assistantMessage.content += chunkValue;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: assistantMessage.content }
              : m
          )
        );
      }

      setIsLoading(false);
    },
    [input, messages, selectedModel]
  );

  // Memorize model options to prevent unnecessary re-rendering
  const modelOptions = useMemo(
    () => [
      { value: "llama3-8b-8192", label: "LLaMA 3 8B (Fast)" },
      { value: "llama3-70b-8192", label: "LLaMA 3 70B (Powerful)" },
      { value: "llama3-70b-4096", label: "LLaMA 3 70B (4096 ctx)" },
    ],
    []
  );

  const selectedModelLabel = useMemo(
  () =>
    modelOptions.find((m) => m.value === selectedModel)?.label ??
    "LLaMA 3 8B (Fast)",
  [modelOptions, selectedModel]
);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <ChatbotSkeleton />;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* <div className="w-75 h-full border-r dark:border-slate-700 overflow-y-auto">
        <ChatSidebar />
      </div> */}

      <div className="flex-1 flex flex-col ">
      <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label="Select model"
          className="fixed top-20 left-4 z-50 flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-ring dark:text-slate-100 w-52"
        >
          <span className="">{selectedModelLabel}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2 rounded-xl shadow-lg dark:text-slate-100">
        <p className="px-2 pb-2 text-sm text-slate-400">Choose your model</p>
        {modelOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setSelectedModel(option.value)}
            aria-checked={selectedModel === option.value}
            className="flex justify-between items-start py-2 px-2 rounded-lg cursor-pointer"
          >
            <div>
              <p className="font-medium">{option.label}</p>
              
            </div>
            {selectedModel === option.value && (
              <Check className="h-4 w-4 text-teal-400" />
            )}
          </DropdownMenuItem>
        ))}
        
      </DropdownMenuContent>
    </DropdownMenu>




        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-8 pt-16">
            <div className="w-full max-w-2xl mx-auto space-y-4 pb-20">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
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
                        className={`text-xs mt-1 ${
                          message.role === "user"
                            ? "text-teal-100"
                            : "text-slate-500 dark:text-slate-400"
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
          {/* Prompt Toggle & Location Picker */}

          <div className="max-w-3xl mx-auto mb-3 space-y-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowprompts(!showprompts)}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-2"
              >
                {showprompts ? "▼ Hide prompts" : "▲ Show prompts"}
              </button>

              <input
                type="text"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
                placeholder="Add location (e.g., California, UK)"
                className="text-xs p-1.5 border border-gray-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-md bg-transparent w-1/3"
              />
            </div>

            {showprompts && (
              <div className="grid grid-cols-2 gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      const finalInput = location
                        ? `In ${location} , ${prompt} `
                        : prompt;
                      setInput(finalInput);
                      setShowprompts(false);
                      handleSend(undefined, finalInput);
                    }}
                    className="text-left p-2 text-sm rounded border hover:bg-slate-50 dark:hover:bg-slate-800 truncate"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
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
            This AI assistant provides general legal information, not specific
            legal advice. For personalized advice, please consult a qualified
            legal professional.
          </p>
        </div>
      </div>
    </div>
  );
}
