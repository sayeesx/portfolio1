"use client"
import { useState } from "react"

// Add timeout utility function
const fetchWithTimeout = async (url, options, timeout = 5000) => {
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

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Sayees's AI assistant. Ask me anything about my skills, projects, and experience!" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { from: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    const messageToSend = input
    setInput("")
    setIsLoading(true)

    try {
      // Use the correct endpoint: /api/chat (not /chatbot)
      const res = await fetchWithTimeout(
        "https://chatbot-4cn8.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: messageToSend }), // Your API expects 'message' field
        },
        15000,
      ) // 15 second timeout

      if (!res.ok) {
        const errorData = await res.text()
        console.error("Server error:", errorData)
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log("API Response:", data) // Debug log

      // Your API returns 'response' field, not 'reply'
      if (!data || typeof data.response !== "string") {
        console.error("Invalid response:", data)
        throw new Error("Invalid response format")
      }

      const botMessage = { from: "bot", text: data.response }
      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      console.error("ChatBot error:", err)
      let errorMessage = "Sorry, I couldn't connect to the bot."

      if (err.name === "AbortError") {
        errorMessage = "Request timed out. The server might be starting up - please try again."
      } else if (err.message === "Invalid response format") {
        errorMessage = "Received an invalid response from the server."
      } else if (err.message.includes("HTTP error!")) {
        errorMessage = "The server encountered an error. Please try again later."
      }

      setMessages((prev) => [...prev, { from: "bot", text: errorMessage }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl max-w-md w-full mx-auto shadow-2xl">
      <h2 className="text-xl font-bold mb-3 text-center">💬 SayeesBot</h2>
      <div className="h-64 overflow-y-auto bg-gray-800 rounded-lg p-2 mb-2 border border-gray-700">
        {messages.map((msg, i) => (
          <div key={i} className={`my-1 ${msg.from === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block px-3 py-1 rounded-lg max-w-xs break-words ${
                msg.from === "user" ? "bg-blue-600" : "bg-green-700"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-left my-1">
            <span className="inline-block px-3 py-1 rounded-lg bg-green-700">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 rounded-md text-black"
          placeholder="Ask about skills, projects, experience..."
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 px-4 py-2 rounded-md transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  )
}
