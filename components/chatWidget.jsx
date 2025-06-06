import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import TypeWriter from './TypeWriter';

// Add this helper function at the top of your component
const fetchWithTimeout = async (url, options, timeout = 2000) => { // Reduced timeout to 2 seconds
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
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
  const [inputMessage, setInputMessage] = useState('');
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showBotIcon, setShowBotIcon] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTypingMessage, setIsTypingMessage] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const quickActions = [
    { text: "👋 Who is Sayees?", query: "who is sayees" },
    { text: "🎓 Education", query: "education" },
    { text: "💼 Projects", query: "projects" },
    { text: "🛠 Skills", query: "skills" },
    { text: "📍 Location", query: "where are you from" },
  ];

  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  // Auto-scroll effect
  const scrollToBottom = () => {
    if (isAutoScrollEnabled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle scroll events
  useEffect(() => {
    const container = messageContainerRef.current;
    let timeoutId;

    const handleScroll = () => {
      if (!container) return;
      clearTimeout(timeoutId);
      const isScrolledUp = container.scrollHeight - container.scrollTop - container.clientHeight > 50;
      setIsAutoScrollEnabled(!isScrolledUp);
      timeoutId = setTimeout(() => setIsAutoScrollEnabled(true), 2000);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0 || isTyping || isTypingMessage) {
      scrollToBottom();
    }
  }, [messages, isTyping, isTypingMessage]); // Add isTyping and isTypingMessage as dependencies

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      setIsCompact(isMobileView); // Always compact on mobile
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoomOut(true);
    }, 500); // Reduced from 3000ms to 500ms for quicker appearance
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMessages([{
        text: "👋 Hi! I'm Sayees's AI assistant. How can I help you today?",
        sender: 'bot'
      }]);
    }
  }, [isOpen]);

  const handleTypingAnimation = async () => {
    setIsTyping(true);
    // Remove the artificial delay
    setIsTyping(false);
  };

  const handleSendMessage = async (message) => {
  if (!message.trim() || isSubmitting) return;

  let timeoutId;
  try {
    setShowQuickActions(false);
    setIsSubmitting(true);
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInputMessage('');
    setShowBotIcon(false);
    setIsTypingMessage(true);

       timeoutId = setTimeout(() => {
      throw new Error('Server taking too long to respond');
    }, 2000);

    const res = await fetchWithTimeout("https://chatbot-2-xx4t.onrender.com//chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }, 2000); // Reduced timeout to 2 seconds

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
      
       if (!data.response) {
      throw new Error('Invalid response format');
    }

    setMessages(prev => [...prev, {
      text: data.response,
      sender: 'bot'
    }]);

  } catch (err) {
    clearTimeout(timeoutId);
    console.error('Chat error:', err);
      setMessages(prev => [...prev, {
      text: err.message === 'Server taking too long to respond' 
        ? "Server seems to be down at the moment. Please try again later."
        : err.message === 'Invalid response format'
          ? "Received an invalid response from the server."
          : "Sorry, I couldn't connect to the chatbot server. Please try again later.",
      sender: 'bot'
    }]);
  } finally {
    setIsSubmitting(false);
    setShowBotIcon(true);
    setIsTypingMessage(false);
  }
  };

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
          ${zoomOut ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
          ${isMobile 
            ? 'w-12 h-12 min-w-0 p-0' 
            : 'w-auto min-w-[140px] px-4 py-2'}
        `}
        aria-label="Open chat"
      >
        <div 
          className={`
            flex items-center justify-center
            transition-all duration-500 ease-in-out
            ${isMobile ? 'scale-90' : 'scale-100 gap-2'}
            w-full
          `}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div 
              className={`
                absolute inset-0
                transition-all duration-300 ease-in-out
                flex items-center justify-center
                ${showBotIcon 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-0'
                }
              `}
            >
              <Bot className="w-5 h-5" />
            </div>
            <div 
              className={`
                absolute inset-0
                transition-all duration-300 ease-in-out
                flex items-center justify-center
                ${!showBotIcon 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-0'
                }
              `}
            >
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>
          {!isMobile && (
            <span className="text-xs whitespace-nowrap ml-2">
              Ask me anything
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className={`fixed bottom-24 ${isMobile ? 'right-2 w-72' : 'right-8 w-80'} 
          h-[400px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200`}>
          <div className="flex items-center justify-between p-3 border-b bg-blue-900 text-white rounded-t-lg">
            <h3 className="font-semibold text-sm">Chat with me</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-900 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-900 text-white rounded-br-none'
                      : 'bg-gray-100 rounded-bl-none text-gray-700'
                  }`}
                >
                  {message.sender === 'bot' && index === messages.length - 1 ? (
                    <TypeWriter 
                      text={message.text} 
                      onComplete={() => setIsTypingMessage(false)}
                      onCharacterTyped={scrollToBottom} // Add this prop
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

            {isTyping && (
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
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }} className="flex w-full space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm text-black placeholder:text-black"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isSubmitting}
                className="p-2 bg-blue-900 text-white rounded-lg hover:bg-blue-900 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span className="sr-only">
                  {isSubmitting ? "Sending..." : "Send message"}
                </span>
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
          opacity: 1;
          animation: fadeInOut 0.3s ease-in-out;
        }
        
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(5px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-5px);
          }
        }

        .message-transition {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes smoothTyping {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .typing-animation span:nth-child(1) { animation-delay: 0s; }
        .typing-animation span:nth-child(2) { animation-delay: 0.2s; }
        .typing-animation span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes iconRotate {
          from {
            transform: rotate(0deg) scale(1);
          }
          to {
            transform: rotate(360deg) scale(1);
          }
        }

        .icon-enter {
          animation: iconRotate 0.5s ease-in-out;
        }

        @keyframes switchIcon {
          0% {
            transform: rotate(0deg) translateY(0) scale(1);
          50% {
            transform: rotate(180deg) translateY(-5px) scale(1.1);
          }
          100% {
            transform: rotate(360deg) translateY(0) scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        button:active {
          transform: translateY(2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .transform {
          transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        .overflow-hidden {
          overflow: hidden;
        }

        @keyframes border-flow {
          0% {
            clip-path: circle(100% at 50% 50%);
            transform: rotate(0deg);
          }
          50% {
            clip-path: circle(100% at 50% 50%);
            transform: rotate(180deg);
          }
          100% {
            clip-path: circle(100% at 50% 50%);
            transform: rotate(360deg);
          }
        }

        .animate-border-flow {
          animation: border-flow 3s linear infinite;
        }

        .animate-float {
          animation: none;
        }

        .transition-all {
          transition: all 1000ms cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }

        /* Add smooth width transition */
        button {
          transition: all 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center;
        }

        button > div {
          transition: all 1000ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Center positioning for compact mode */
        button.compact {
          display: grid;
          place-items: center;
        }

        /* Smooth scale transition */
        @keyframes zoomIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .typing-text {
          display: inline-block;
          border-right: 2px solid #4B5563;
          animation: blink-caret 0.75s step-end infinite;
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #4B5563 }
        }

        /* Add smooth fade in for new messages */
        .flex {
          transition: all 0.3s ease-in-out;
          animation: messageAppear 0.3s ease-in-out;
        }

        @keyframes messageAppear {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Quick Action Buttons Animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        button {
          animation: fadeInUp 0.3s ease-out;
          animation-fill-mode: both;
        }

        button:nth-child(1) { animation-delay: 0.1s; }
        button:nth-child(2) { animation-delay: 0.2s; }
        button:nth-child(3) { animation-delay: 0.3s; }
        button:nth-child(4) { animation-delay: 0.4s; }
        button:nth-child(5) { animation-delay: 0.5s; }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: currentColor;
          margin-left: 2px;
          animation: blink 0.7s step-end infinite;
          opacity: 0.7;
        }

        @keyframes blink {
          from, to { opacity: 0; }
          50% { opacity: 1; }
        }

        /* Smooth transition for message appearance */
        .message-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}