"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Github, Linkedin, Twitter, Mail, Instagram, Facebook, ArrowRight, Home } from "lucide-react"
import emailjs from "emailjs-com"
import Layout from "@/components/Layout"
import Link from "next/link"

export default function Component() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState({ type: "", message: "" })
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showBackButton, setShowBackButton] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = 50

      if (currentScrollY > lastScrollY + scrollThreshold) {
        setShowBackButton(false)
      } else if (currentScrollY < lastScrollY - scrollThreshold) {
        setShowBackButton(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setStatus({ type: "", message: "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (
        !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      ) {
        throw new Error("Email configuration missing")
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )

      setStatus({
        type: "success",
        message: "Message sent successfully! 🎉",
      })
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => {
        setStatus({ type: "", message: "" })
      }, 3000)
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/sayeesx" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/muhammed-sayees-152390284/" },
    { name: "X", icon: Twitter, url: "https://x.com/sayeesck" },
    { name: "Email", icon: Mail, url: "mailto:sayeesck@yahoo.com" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/sayees__/" },
    { name: "Facebook", icon: Facebook, url: "https://facebook.com/sayees" },
  ]

  return (
    <Layout>
      <style jsx global>{`
        @keyframes flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .glassmorphic {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        .back-button, .home-button {
          position: fixed;
          top: 12px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 16px;
          background: transparent;
          color: black;
          border: none;
          font-weight: 500;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button {
          left: 6px;
        }

        .home-button {
          right: 6px;
        }

        .back-button:hover, .home-button:hover {
          color: #3d5be0;
        }

        .back-button.hidden, .home-button.hidden {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }

        .social-icon {
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-3px);
        }

        .form-input {
          transition: all 0.3s ease;
        }

        .form-input:focus {
          transform: translateY(-2px);
        }

        .contact-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
        }

        .content-wrapper {
          width: 100%;
          max-width: 2xl;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .social-links-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0;
        }

        .form-container {
          width: 100%;
          max-width: 32rem;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .contact-container {
            padding: 1rem;
          }

          .content-wrapper {
            gap: 1.5rem;
          }

          .social-links-container {
            gap: 0.75rem;
            margin: 1.5rem 0;
          }
        }
      `}</style>

      <button onClick={() => (window.location.href = "/works")} className={`back-button ${showBackButton ? "" : "hidden"}`}>
        <ArrowRight className="w-3 h-3 rotate-180" />
        Back to Projects
      </button>

      <button onClick={() => (window.location.href = "/")} className={`home-button ${showBackButton ? "" : "hidden"}`}>
        Home
        <Home className="w-3 h-3" />
      </button>

      {status.type === "success" && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm"></div>
          <div className="relative z-10 glassmorphic p-6 rounded-lg shadow-xl flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-black text-xl font-medium">Message sent successfully!</p>
          </div>
        </div>
      )}

      <div className="contact-container">
        <div className="content-wrapper">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3 md:mb-4">Let's Connect</h1>
            <p className="text-gray-600 glassmorphic p-4 rounded-lg max-w-xl mx-auto">
              Reach out through social media or send me a message directly
            </p>
          </div>

          <div className="social-links-container">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 glassmorphic rounded-full transition-all duration-300 social-icon"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5 md:h-6 md:w-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs glassmorphic text-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="glassmorphic text-black rounded-lg transition-all duration-300 hover:bg-blue-500/10 px-6 py-3"
          >
            {showForm ? "× Close Form" : "✉ Send Message"}
          </button>

          {showForm && (
            <div className="form-container glassmorphic p-6 rounded-lg">
              {status.message && (
                <div
                  className={`mb-4 md:mb-6 p-3 md:p-4 rounded-lg ${
                    status.type === "error" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-3 glassmorphic border border-blue-500/20 rounded-lg text-black placeholder:text-gray-500 focus:outline-none focus:border-blue-500 form-input"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full p-3 glassmorphic border border-blue-500/20 rounded-lg text-black placeholder:text-gray-500 focus:outline-none focus:border-blue-500 form-input"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full p-3 glassmorphic border border-blue-500/20 rounded-lg text-black placeholder:text-gray-500 focus:outline-none focus:border-blue-500 resize-none form-input"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 glassmorphic hover:bg-blue-500/10 disabled:bg-blue-800/10 text-black rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
