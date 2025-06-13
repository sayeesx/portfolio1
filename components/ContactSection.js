import { useState } from 'react'
import RotatingContactButton from './RotatingContactButton'
import { Check, X } from 'lucide-react'

export default function ContactSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Replace with your actual email submission logic
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
      
      setNotification({
        type: 'success',
        message: 'Message sent successfully!'
      })
      setEmail('')
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      })
    } finally {
      setLoading(false)
      setTimeout(() => setNotification(null), 3000)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-32">
      <h2 className="text-2xl font-bold text-center text-white mb-12">
        Get in touch with me
      </h2>
      
      <div className="flex flex-col items-center gap-8">
        <div className="scale-75">
          <RotatingContactButton />
        </div>
        
        <div className="w-full flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        <form onSubmit={handleSubmit} className="w-full relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
            className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg 
                     text-white placeholder:text-gray-500 focus:border-blue-500 
                     focus:outline-none transition-colors disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 
                     bg-blue-600 text-white rounded-md hover:bg-blue-700 
                     transition-colors text-sm disabled:bg-blue-800"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Sending...
              </span>
            ) : 'Send'}
          </button>
        </form>

        {notification && (
          <div
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 
                      transition-all duration-300 ${
                        notification.type === 'success' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-red-500/20 text-red-500'
                      }`}
          >
            {notification.type === 'success' ? (
              <Check className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
            <span>{notification.message}</span>
          </div>
        )}
      </div>
    </div>
  )
}