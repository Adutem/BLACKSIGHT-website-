import React, { useState, useRef, useEffect } from "react"
import { Send, Mic } from 'lucide-react'

type Message = {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

type ChatInterfaceProps = {
  initialMessages?: Message[]
}

export default function ChatInterface({ initialMessages = [] }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom on message change
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage: Message = {
        id: String(Date.now()),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages([...messages, userMessage])
      setNewMessage("")

      // Simulate assistant reply (replace with actual AI logic)
      setTimeout(() => {
        const assistantMessage: Message = {
          id: String(Date.now() + 1),
          text: "This is an automated response. Thank you for your message!",
          sender: "assistant",
          timestamp: new Date(),
        }
        setMessages((prevMessages) => [...prevMessages, assistantMessage])
      }, 1000)
    }
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col h-[500px]">
      {/* Top bar */}
      <div className="flex items-center justify-between rounded-t-2xl bg-blue-500 px-4 py-3 text-white">
        <div className="font-semibold tracking-wide">Chat with Nova AI</div>
      </div>

      {/* Chat body */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_65%)]"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : ""}`}
          >
            {message.sender === "assistant" && (
              <span className="mt-2 h-3.5 w-3.5 rounded-full bg-blue-500" />
            )}
            <div
              className={`max-w-[75%] rounded-xl px-3.5 py-2 text-[15px] shadow-sm ${
                message.sender === "user" ? "bg-gray-100 text-gray-800" : "bg-white border border-gray-100"
              }`}
            >
              {message.text}
            </div>
            {message.sender === "user" && (
              <span className="mt-2 h-3.5 w-3.5 rounded-full bg-gray-800" />
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="rounded-b-2xl bg-white p-2 shadow-sm border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message…"
          className="flex-1 rounded-md px-3 py-2 outline-none text-[15px]"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
        />
        <Mic className="h-5 w-5 text-gray-500" />
        <button
          aria-label="Send"
          className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 active:bg-blue-600"
          onClick={handleSendMessage}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
