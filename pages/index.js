"use client"

import Head from "next/head"
import Link from "next/link" // Add this import
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import ContactButton from "../components/RotatingContactButton"
import {
  ArrowRight,
  Download,
  ChevronDown,
} from "lucide-react"
import ChatWidget from "../components/chatWidget"
import TypeWriter from "../components/TypeWriter"
import AspiringRoleCube from "../components/AspiringRoleCube"
import Image from 'next/image'

export default function Component() {
  const router = useRouter()
  const [zoomOut, setZoomOut] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavButtons, setShowNavButtons] = useState(true)
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState(null) // null, 'success', or 'error'
  const [isProjectsVisible, setIsProjectsVisible] = useState(false)
  const [isContactVisible, setIsContactVisible] = useState(false)

  // Scroll detection for hiding elements
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
      setShowNavButtons(scrollPosition < 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setZoomOut(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToProjects = () => {
    document.getElementById("projects-section").scrollIntoView({
      behavior: "smooth",
    })
  }

  const scrollToContact = () => {
    document.getElementById("contact-section").scrollIntoView({
      behavior: "smooth",
    })
  }

  const getCardStyle = (id) => ({
    userSelect: "none",
    width: "200px", // Reduced from 250px
    height: "200px", // Reduced from 250px
    margin: "1rem",
    position: "relative",
    transform: hoveredCard === id ? "scale(1.02)" : "scale(1)",
    transition: "all 0.3s ease",
    opacity: "0",
    animation: "fadeInUp 0.6s ease forwards",
    animationDelay: `${id * 0.1}s`,
  })

  // Add projects array
  const projects = [
    {
      id: 1,
      title: "Exquio",
      image: "/assets/healo.jpg",
      tech: "python + react native + supabase + tailwind css",
      timeAgo: "4 months ago",
      projectLink: "https://github.com/sayeesx/exquio",
    },
    {
      id: 2,
      title: "Roamio",
      image: "/assets/roamio.png",
      tech: "Next.js + Supabase + MySQL + Java + Machine Learning + AI",
      timeAgo: "1 year ago",
      projectLink: "https://github.com/sayeesx/roamio",
    },
    {
      id: 3,
      title: "ZapIT",
      image: "/assets/zapit.jpg",
      tech: "React + TypeScript",
      timeAgo: "2 years ago",
      projectLink: "https://github.com/sayeesx/zapit",
    },
    {
      id: 4,
      title: "Requery",
      image: "/assets/requery.png",
      tech: "html + css + js + MySQL",
      timeAgo: "2 years ago",
      projectLink: "https://github.com/sayeesx/requery-empire",
    },
  ]

  const certifications = [
    { name: 'Accenture', logo: '/logos/accenture.png' },
    { name: 'AWS', logo: '/logos/aws.png' },
    { name: 'GDG', logo: '/logos/gdg.png' },
    { name: 'HP', logo: '/logos/hp.png' },
    { name: 'Hugging Face', logo: '/logos/huggingface.png' },
    { name: 'Infosys', logo: '/logos/infosys.png' },
    { name: 'Intel', logo: '/logos/intel.png' },
    { name: 'NIS', logo: '/logos/nism.png' },
    { name: 'ONE', logo: '/logos/one.png' },
    { name: 'SEBI', logo: '/logos/sebi.png' },
    { name: 'NSDC', logo: '/logos/nsdc.png' },
  ]

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      setEmailStatus('error')
      return
    }
    // Here you would typically handle the email submission
    // For now, we'll just simulate a successful submission
    setEmailStatus('success')
    setEmail('')
    // Reset status after 3 seconds
    setTimeout(() => setEmailStatus(null), 3000)
  }

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const projectsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsProjectsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContactVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const projectsSection = document.getElementById('projects-section')
    const contactSection = document.getElementById('contact-section')

    if (projectsSection) projectsObserver.observe(projectsSection)
    if (contactSection) contactObserver.observe(contactSection)

    return () => {
      if (projectsSection) projectsObserver.unobserve(projectsSection)
      if (contactSection) contactObserver.unobserve(contactSection)
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>Muhammed Sayees - Portfolio</title>
        <meta name="description" content="Portfolio of Muhammed Sayees" />
      </Head>

      {/* Navigation Buttons */}
      <div className={`fixed top-12 right-6 z-50 flex gap-2 transition-all duration-300 ${showNavButtons ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <Link href="/aboutme" className="group flex items-center gap-1 px-2 py-1 text-black hover:text-[#3d5be0] transition-all duration-300 text-xs">
          About Me
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link href="/skills" className="group flex items-center gap-1 px-2 py-1 border border-black text-black rounded-full hover:bg-black/5 transition-all duration-300 text-xs">
          Show My Skills
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hero Section - Shifted down with more padding and centered */}
      <section className="min-h-[85vh] flex items-center justify-center pt-32 pb-0">
        {/* Content - Centered with more padding */}
        <div
          className={`flex flex-col items-center justify-center text-center px-4 py-12 transform transition-all duration-1000 ease-out mx-auto
            ${zoomOut ? "scale-90 opacity-100" : "scale-110 opacity-0"}`}
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            {/* Added text shadow for 3D effect */}
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-2 text-shadow-3d">
              Hello, I&apos;m Muhammed Sayees
            </h1>

            {/* 3D cube component */}
            <AspiringRoleCube />
          </div>

          <div className="mb-6">
            <p className="max-w-2xl mx-auto mb-4 text-black text-lg md:text-1.5xl">
              <TypeWriter text="I build and code beautifully simple things, and I love what I do." delay={30} />
            </p>
          </div>

          {/* Download CV button moved back to center */}
          <div className="mt-4 mb-8">
            <button
              onClick={() => {
                window.open("/MUHAMMED_SAYEES_CV.pdf", "_blank")
              }}
              className="border-2 border-black text-black px-4 py-1.5 rounded-full font-semibold transition-all duration-300 ease-in-out flex items-center justify-center group hover:scale-105 hover:border-[#3d5be0] relative shadow-3d"
            >
              <span className="text-black text-sm flex items-center whitespace-nowrap">
                Download CV
                <Download className="ml-2 w-4 h-4 text-black transition-all duration-300 ease-in-out transform group-hover:translate-y-0.5" />
              </span>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                CV is of June 2025
              </div>
            </button>
          </div>

          {/* Certification Carousel Section */}
          <section className="w-full py-8 overflow-hidden bg-transparent">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-black">
                Certified by Industry Leaders
              </h2>
            </div>
            <div className="relative">
              <div className="flex animate-carousel">
                {/* First set of logos */}
                {certifications.map((cert, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 mx-8 opacity-60 hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="relative w-24 h-24">
                      <Image
                        src={cert.logo}
                        alt={`${cert.name} certification`}
                        fill
                        className="object-contain filter brightness-0"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {certifications.map((cert, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 mx-8 opacity-60 hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="relative w-24 h-24">
                      <Image
                        src={cert.logo}
                        alt={`${cert.name} certification`}
                        fill
                        className="object-contain filter brightness-0"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Navigation buttons - hide "Get In Touch" when scrolled */}
          <div className={`
            flex flex-wrap justify-center gap-6 mb-24
            transition-all duration-300 ease-in-out
            ${isScrolled ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100'}
          `}>
            <button
              onClick={scrollToProjects}
              className="flex flex-col items-center text-black hover:text-[#3d5be0] transition-colors duration-300 group"
            >
              <span className="text-sm mb-2">View My Projects</span>
              <ChevronDown className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform" />
            </button>

            {!isScrolled && (
              <button
                onClick={scrollToContact}
                className="flex flex-col items-center text-black hover:text-[#3d5be0] transition-colors duration-300 group"
              >
                <span className="text-sm mb-2">Get In Touch</span>
                <ChevronDown className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section - adjust position when scrolled */}
      <section 
        id="projects-section" 
        className={`min-h-[90vh] pt-20 pb-0 transition-all duration-1000 ease-out transform ${
          isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-black text-shadow-3d">
            Featured Projects
          </h2>

          <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-4 md:gap-6 pb-8 px-4 hide-scrollbar">
            {projects.map((project, index) => (
              <div
                key={project.id}
                style={getCardStyle(project.id)}
                className={`relative group cursor-pointer w-full md:w-auto ${
                  isMobile && index >= 2 ? 'hidden' : ''
                } ${isMobile && index === 1 ? 'opacity-50 translate-y-8' : ''}`}
                onClick={() => router.push("/works")}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="w-full h-full rounded-xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20 shadow-3d-card shimmer">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 bg-[#3d5be0] text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-3d shimmer-button"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section with Glass Effect */}
      <section id="contact-section" className="min-h-[85vh] pt-20 pb-0">
        <div className="max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold text-center text-black mb-6">
            Get in touch with me
          </h2>
          
          <div className="flex flex-col items-center">
            <div className="scale-75 mb-4">
              <ContactButton />
            </div>
            
            <div className="w-full flex items-center gap-4 mt-2">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-gray-400 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>

            {/* Email Form with Status Messages */}
            <form onSubmit={handleEmailSubmit} className="w-full mt-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 md:py-3 pr-20 md:pr-24 rounded-lg bg-white/10 border ${
                    emailStatus === 'error' 
                      ? 'border-red-500' 
                      : emailStatus === 'success' 
                        ? 'border-green-500' 
                        : 'border-white/20'
                  } text-black placeholder-gray-500 focus:outline-none focus:border-[#3d5be0]`}
                />
                <button
                  type="submit"
                  className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 px-3 md:px-4 py-1 md:py-1.5 bg-[#3d5be0] text-white rounded-md font-semibold hover:bg-[#2d4bd0] transition-colors text-sm md:text-base"
                >
                  Send
                </button>
              </div>
              
              {/* Status Messages */}
              {emailStatus === 'success' && (
                <div className="mt-2 text-sm text-green-600 animate-fade-in">
                  Email sent successfully!
                </div>
              )}
              {emailStatus === 'error' && (
                <div className="mt-2 text-sm text-red-600 animate-fade-in">
                  Please enter a valid email address.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Chat Widget - Made transparent with blur and border */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="backdrop-blur-md bg-transparent border border-white/30 rounded-full shadow-lg">
          <ChatWidget />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* 3D Text Shadow Effect */
        .text-shadow-3d {
          text-shadow: 1px 1px 1px rgba(0,0,0,0.1),
                      2px 2px 2px rgba(0,0,0,0.05),
                      3px 3px 3px rgba(0,0,0,0.025);
        }
        
        /* 3D Button Shadow */
        .shadow-3d {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                    0 2px 4px -1px rgba(0, 0, 0, 0.06),
                    0 1px 0 rgba(255, 255, 255, 0.1) inset;
          transform: translateY(0);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .shadow-3d:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                    0 4px 6px -2px rgba(0, 0, 0, 0.05),
                    0 1px 0 rgba(255, 255, 255, 0.1) inset;
          transform: translateY(-2px);
        }
        
        /* 3D Card Shadow */
        .shadow-3d-card {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                    0 4px 6px -2px rgba(0, 0, 0, 0.05),
                    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        /* 3D Glass Container Shadow */
        .shadow-3d-glass {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                    0 10px 10px -5px rgba(0, 0, 0, 0.04),
                    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        /* Add smooth scrolling to the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Ensure the body takes full height and allows scrolling */
        body {
          min-height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        /* Ensure sections are properly spaced */
        section {
          position: relative;
          width: 100%;
          overflow: visible;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .getCardStyle {
            width: 100% !important;
            height: 250px !important;
            margin: 0.5rem 0 !important;
          }

          button {
            font-size: 0.75rem !important;
            padding: 0.4rem 0.8rem !important;
          }

          input, textarea {
            font-size: 0.875rem !important;
          }

          /* Navigation buttons */
          .fixed.top-12.right-6 button {
            font-size: 0.65rem !important;
            padding: 0.3rem 0.6rem !important;
          }

          .fixed.top-12.right-6 .w-3 {
            width: 0.75rem !important;
            height: 0.75rem !important;
          }

          /* Project cards */
          .shadow-3d-card {
            transform: scale(0.95);
          }

          /* Contact form button */
          #contact-section button {
            font-size: 0.7rem !important;
            padding: 0.35rem 0.7rem !important;
          }

          /* View All Projects button */
          .inline-flex.items-center.gap-2 {
            font-size: 0.8rem !important;
            padding: 0.4rem 0.8rem !important;
          }

          /* Adjust spacing for mobile */
          section {
            padding-top: 2rem !important;
          }

          #projects-section {
            margin-top: -0.5rem;
          }

          #contact-section {
            margin-top: -0.5rem;
          }

          .text-4xl {
            font-size: 2.5rem !important;
          }

          .text-lg {
            font-size: 1rem !important;
          }

          .text-1.5xl {
            font-size: 1.25rem !important;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        /* Remove all bottom padding and margins */
        section {
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }

        /* Ensure proper spacing between sections */
        #projects-section {
          margin-top: -4rem;
        }

        #contact-section {
          margin-top: -4rem;
          padding-bottom: 0 !important;
        }

        /* Ensure main content takes full height */
        main {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Remove any extra space from the layout wrapper */
        .layoutWrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Adjust contact section spacing */
        #contact-section {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #contact-section form {
          margin-bottom: 0;
        }

        #contact-section .max-w-md {
          margin-bottom: 0;
        }

        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-carousel {
          animation: carousel 40s linear infinite;
          display: flex;
          width: max-content;
        }

        .animate-carousel:hover {
          animation-play-state: paused;
        }

        /* Enhanced glass shimmer effect */
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer {
          position: relative;
          overflow: hidden;
        }

        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 25%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.1) 75%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 3s infinite;
          background-size: 200% 100%;
          z-index: 1;
        }

        /* Enhanced 3D button with shimmer */
        .shimmer-button {
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            0 1px 0 rgba(255, 255, 255, 0.1) inset,
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        .shimmer-button::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 25%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 2s infinite;
          background-size: 200% 100%;
          z-index: 1;
        }

        .shimmer-button:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            0 1px 0 rgba(255, 255, 255, 0.1) inset,
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .text-2xl {
            font-size: 1.5rem !important;
          }

          .text-4xl {
            font-size: 2rem !important;
          }

          .shimmer-button {
            padding: 0.5rem 1rem !important;
            font-size: 0.875rem !important;
          }
        }
      `}</style>
    </Layout>
  )
}
