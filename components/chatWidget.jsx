"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Book, Code, MapPin } from "lucide-react";
import TypeWriter from "./TypeWriter";

const fetchWithTimeout = async (url, options, timeout = 15000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showBotIcon, setShowBotIcon] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTypingMessage, setIsTypingMessage] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [currentIcon, setCurrentIcon] = useState('chat'); // Add this state

  const quickActions = [
    { text: "Who is Sayees?", query: "who is sayees", icon: <User className="h-4 w-4" /> },
    { text: "Education", query: "education", icon: <Book className="h-4 w-4" /> },
    { text: "Projects", query: "projects", icon: <Code className="h-4 w-4" /> },
    { text: "Skills", query: "skills", icon: <Code className="h-4 w-4" /> },
    { text: "Location", query: "where are you from", icon: <MapPin className="h-4 w-4" /> },
  ];

  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0 || isTypingMessage) {
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  }, [messages, isTypingMessage]);

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
    }
  };

  useEffect(() => {
    const container = messageContainerRef.current;

    const handleScroll = () => {
      if (!container) return;
      // If the user has scrolled up more than a threshold, disable smooth scrolling
      const isScrolledUp = container.scrollHeight - container.scrollTop - container.clientHeight > 100;
      scrollToBottom(!isScrolledUp, false); // Disable smooth scroll if scrolled up
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      setIsCompact(isMobileView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoomOut(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          text: "\uD83D\uDC4B Hi! I'm Sayees's AI assistant. How can I help you today?",
          sender: "bot",
        },
      ]);
    }
  }, [isOpen]);

  const handleSendMessage = async (message) => {
    if (!message.trim() || isSubmitting) return;

    let timeoutId;
    try {
      setShowQuickActions(false);
      setIsSubmitting(true);
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setInputMessage("");
      setShowBotIcon(false);
      setIsTypingMessage(true);

      timeoutId = setTimeout(() => {
        throw new Error("Server taking too long to respond");
      }, 15000);

      const res = await fetchWithTimeout(
        "https://chatbot-4cn8.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        },
        15000
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (!data || !data.response) {
        throw new Error("Invalid response format");
      }

      setMessages((prev) => [
        ...prev,
        {
          text: data.response,
          sender: "bot",
        },
      ]);
    } catch (err) {
      clearTimeout(timeoutId);

      let errorMessage = "Sorry, I couldn't connect to the chatbot server. Please try again later.";

      if (
        err.name === "AbortError" ||
        err.message === "Server taking too long to respond"
      ) {
        errorMessage = "Server seems to be down at the moment. Please try again later.";
      } else if (err.message === "Invalid response format") {
        errorMessage = "Received an invalid response from the server.";
      } else if (err.message.includes("HTTP error!")) {
        errorMessage = "The server encountered an error. Please try again later.";
      }

      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          sender: "bot",
        },
      ]);
    } finally {
      setIsSubmitting(false);
      setShowBotIcon(true);
      setIsTypingMessage(false);
    }
  };

  // Add this effect for icon animation
  useEffect(() => {
    const icons = ['chat', 'thinking', 'robot'];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % icons.length;
      setCurrentIcon(icons[currentIndex]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const renderIcon = () => {
    switch(currentIcon) {
      case 'chat':
        return (
          <svg className={`w-6 h-6 ${!isMobile && "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'thinking':
        return <span className="text-xl mr-2">💭</span>;
      case 'robot':
        return <span className="text-xl mr-2">🤖</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="backdrop-blur-md bg-white/10 rounded-full shadow-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center justify-center text-black
            rounded-full
            hover:bg-white/20
            transition-all duration-300
            relative
            border border-[#3d5be0]/50
            before:absolute before:inset-[-2px]
            before:rounded-full before:border-2
            before:border-[#3d5be0]/30
            before:animate-border-flow
            overflow-visible
            transform origin-center
            ${zoomOut ? "scale-100 opacity-100" : "scale-90 opacity-0"}
            ${isMobile ? "w-12 h-12 min-w-0 p-0" : "w-auto min-w-[140px] px-4 py-2"}
          `}
          aria-label="Open chat"
        >
          {renderIcon()}
          {!isMobile && <span className="font-medium">Let's Chat</span>}
        </button>
      </div>

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
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 border border-gray-200 flex items-center gap-1"
                  >
                    {action.icon}
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
                className="p-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
