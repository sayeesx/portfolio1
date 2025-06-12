"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import TypeWriter from "./TypeWriter"

// Fixed timeout function
const fetchWithTimeout = async (url, options, timeout = 15000) => {
  // Increased to 15 seconds for Render
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [showBotIcon, setShowBotIcon] = useState(true)
  const [isCompact, setIsCompact] = useState(false)
  const [zoomOut, setZoomOut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTypingMessage, setIsTypingMessage] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)

  const quickActions = [
    { text: "👋 Who is Sayees?", query: "who is sayees" },
    { text: "🎓 Education", query: "education" },
    { text: "💼 Projects", query: "projects" },
    { text: "🛠 Skills", query: "skills" },
    { text: "📍 Location", query: "where are you from" },
  ]

  const messagesEndRef = useRef(null)
  const messageContainerRef = useRef(null)

  // Auto-scroll effect
  const scrollToBottom = () => {
    if (isAutoScrollEnabled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle scroll events
  useEffect(() => {
    const container = messageContainerRef.current
    let timeoutId

    const handleScroll = () => {
      if (!container) return
      clearTimeout(timeoutId)
      const isScrolledUp = container.scrollHeight - container.scrollTop - container.clientHeight > 50
      setIsAutoScrollEnabled(!isScrolledUp)
      timeoutId = setTimeout(() => setIsAutoScrollEnabled(true), 2000)
    }

    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0 || isTyping || isTypingMessage) {
      scrollToBottom()
    }
  }, [messages, isTyping, isTypingMessage])

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768
      setIsMobile(isMobileView)
      setIsCompact(isMobileView)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoomOut(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          text: "👋 Hi! I'm Sayees's AI assistant. How can I help you today?",
          sender: "bot",
        },
      ])
    }
  }, [isOpen])

  const handleSendMessage = async (message) => {
    if (!message.trim() || isSubmitting) return

    let timeoutId
    try {
      setShowQuickActions(false)
      setIsSubmitting(true)
      setMessages((prev) => [...prev, { text: message, sender: "user" }])
      setInputMessage("")
      setShowBotIcon(false)
      setIsTypingMessage(true)

      // Set a longer timeout for Render's free tier
      timeoutId = setTimeout(() => {
        throw new Error("Server taking too long to respond")
      }, 15000) // 15 seconds

      // ✅ FIXED: Correct URL and endpoint
      const res = await fetchWithTimeout(
        "https://chatbot-4cn8.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }), // ✅ FIXED: Correct field name
        },
        15000,
      ) // 15 second timeout

      clearTimeout(timeoutId)

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Server error:", errorText)
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log("API Response:", data) // Debug log

      // ✅ FIXED: Check for correct response field based on your API
      if (!data || !data.response) {
        console.error("Invalid response:", data)
        throw new Error("Invalid response format")
      }

      setMessages((prev) => [
        ...prev,
        {
          text: data.response, // ✅ FIXED: Correct field name
          sender: "bot",
        },
      ])
    } catch (err) {
      clearTimeout(timeoutId)
      console.error("Chat error:", err)

      let errorMessage = "Sorry, I couldn't connect to the chatbot server. Please try again later."

      if (err.name === "AbortError" || err.message === "Server taking too long to respond") {
        errorMessage = "Server seems to be down at the moment. Please try again later."
      } else if (err.message === "Invalid response format") {
        errorMessage = "Received an invalid response from the server."
      } else if (err.message.includes("HTTP error!")) {
        errorMessage = "The server encountered an error. Please try again later."
      }

      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          sender: "bot",
        },
      ])
    } finally {
      setIsSubmitting(false)
      setShowBotIcon(true)
      setIsTypingMessage(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onTouchStart={() => setShowTooltip(true)}
        onTouchEnd={() => setTimeout(() => setShowTooltip(false), 2000)}
        className={`
          flex items-center justify-center bg-blue-900 text-white rounded-full
          hover:bg-blue-800
          shadow-lg hover:shadow-xl
          active:transform active:scale-95
          relative
          border border-blue-400
          before:absolute before:inset-[-2px]
          before:rounded-full before:border-2
          before:border-blue-400/50
          before:animate-border-flow
          overflow-visible
          transition-all duration-500 ease-out
          transform origin-center
          ${zoomOut ? "scale-100 opacity-100" : "scale-90 opacity-0"}
          ${isMobile ? "w-12 h-12 min-w-0 p-0" : "w-auto min-w-[140px] px-4 py-2"}
        `}
        aria-label="Open chat"
      >
        <div
          className={`
            flex items-center justify-center
            transition-all duration-500 ease-in-out
            ${isMobile ? "scale-90" : "scale-100 gap-2"}
            w-full
          `}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div
              className={`
                absolute inset-0
                transition-all duration-300 ease-in-out
                flex items-center justify-center
                ${showBotIcon ? "opacity-100 scale-100" : "opacity-0 scale-0"}
              `}
            >
              <Bot className="w-5 h-5" />
            </div>
            <div
              className={`
                absolute inset-0
                transition-all duration-300 ease-in-out
                flex items-center justify-center
                ${!showBotIcon ? "opacity-100 scale-100" : "opacity-0 scale-0"}
              `}
            >
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>
          {!isMobile && <span className="text-xs whitespace-nowrap ml-2">Ask me anything</span>}
        </div>
      </button>

      {isOpen && (
        <div
          className={`fixed bottom-24 ${isMobile ? "right-2 w-72" : "right-8 w-80"} 
          h-[400px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200`}
        >
          <div className="flex items-center justify-between p-3 border-b bg-blue-900 text-white rounded-t-lg">
            <h3 className="font-semibold text-sm">Chat with Sayees</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-800 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-2 rounded-lg text-sm max-w-xs break-words ${
                    message.sender === "user"
                      ? "bg-blue-900 text-white rounded-br-none"
                      : "bg-gray-100 rounded-bl-none text-gray-700"
                  }`}
                >
                  {message.sender === "bot" && index === messages.length - 1 ? (
                    <TypeWriter
                      text={message.text}
                      onComplete={() => setIsTypingMessage(false)}
                      onCharacterTyped={scrollToBottom}
                    />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}

            {/* Quick Action Buttons */}
            {showQuickActions && messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(action.query)}
                    className="px-3 py-1.5 text-sm bg-blue-50 text-blue-900 rounded-full 
                      hover:bg-blue-100 transition-colors duration-200 
                      border border-blue-200 flex items-center gap-1"
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            )}

            {isTypingMessage && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-2 text-gray-700 rounded-bl-none">
                  <div className="typing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(inputMessage)
              }}
              className="flex w-full space-x-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm text-black placeholder:text-gray-500"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isSubmitting}
                className="p-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span className="sr-only">{isSubmitting ? "Sending..." : "Send message"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .typing-animation {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
        }
        
        .typing-animation span {
          width: 6px;
          height: 6px;
          background: #6b7280;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-animation span:nth-child(1) { animation-delay: 0s; }
        .typing-animation span:nth-child(2) { animation-delay: 0.2s; }
        .typing-animation span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes border-flow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-border-flow {
          animation: border-flow 3s linear infinite;
        }
      `}</style>
    </>
  )
}
