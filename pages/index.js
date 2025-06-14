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

// Add skills data
const skills = [
  { name: 'JavaScript', logo: '/img/javascript.svg' },
  { name: 'HTML', logo: '/img/html.svg' },
  { name: 'CSS', logo: '/img/css.svg' },
  { name: 'React', logo: '/img/react.svg' },
  { name: 'Next.js', logo: '/img/nextjs.svg' },
  { name: 'Python', logo: '/img/python.svg' },
  { name: 'TensorFlow', logo: '/img/tensorflow.png' },
  { name: 'Pandas', logo: '/img/pandas.svg' },
  { name: 'C++', logo: '/img/cpp.svg' },
  { name: 'Java', logo: '/img/java.svg' },
  { name: 'SQL', logo: '/img/sql.svg' },
]

export default function Component() {
  const router = useRouter()
  const [zoomOut, setZoomOut] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavButtons, setShowNavButtons] = useState(false) // Changed to false initially
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState(null) // null, 'success', or 'error'
  const [isProjectsVisible, setIsProjectsVisible] = useState(false)
  const [isContactVisible, setIsContactVisible] = useState(false)
  const [isSuperpowersVisible, setIsSuperpowersVisible] = useState(false)

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
    {
      id: 5,
      title: "Coming Soon",
      image: "/assets/coming-soon.jpg",
      tech: "New Project in Development",
      timeAgo: "Coming Soon",
      projectLink: "#",
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

  // Add useEffect for nav buttons fade in
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavButtons(true)
    }, 1000) // Delay of 1 second
    return () => clearTimeout(timer)
  }, [])

  // Add Intersection Observer for superpowers section
  useEffect(() => {
    const superpowersObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSuperpowersVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const superpowersSection = document.getElementById('superpowers-section')
    if (superpowersSection) superpowersObserver.observe(superpowersSection)

    return () => {
      if (superpowersSection) superpowersObserver.unobserve(superpowersSection)
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>Muhammed Sayees - Portfolio</title>
        <meta name="description" content="Portfolio of Muhammed Sayees" />
      </Head>

      {/* Navigation Buttons - Updated with fade-in animation */}
      <Link href="/contact" className={`fixed top-12 left-6 z-50 flex items-center gap-1 px-2 py-1 text-black hover:text-[#3d5be0] transition-all duration-300 text-xs ${showNavButtons ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Contact Me
      </Link>

      <Link href="/aboutme" className={`fixed top-12 right-6 z-50 flex items-center gap-1 px-2 py-1 border border-black text-black rounded-full hover:bg-black/5 transition-all duration-300 text-xs ${showNavButtons ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        About Me
        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Hero Section - Shifted down with more padding and centered */}
      <section className="min-h-[85vh] md:min-h-[85vh] min-h-[60vh] flex items-center justify-center pt-32 md:pt-32 pt-40 pb-0">
        {/* Content - Centered with more padding */}
        <div
          className={`flex flex-col items-center justify-center text-center px-4 py-12 md:py-12 py-6 transform transition-all duration-1000 ease-out mx-auto mt-12 md:mt-0
            ${zoomOut ? "scale-90 opacity-100" : "scale-110 opacity-0"}`}
        >
          <div className="flex flex-col items-center gap-4 md:gap-4 gap-2 mb-6 md:mb-6 mb-3">
            {/* Added text shadow for 3D effect */}
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
              <h1 className="text-3xl md:text-6xl text-4xl font-bold text-black mb-0 md:mb-2 text-shadow-3d">
                Hello, I&apos;m
              </h1>
              <h1 className="text-3xl md:text-6xl text-4xl font-bold text-black mb-2 md:mb-2 text-shadow-3d">
                Muhammed Sayees
              </h1>
            </div>

            {/* 3D cube component */}
            <div className="scale-100 md:scale-100 scale-75">
              <AspiringRoleCube />
            </div>
          </div>

          <div className="mb-6 md:mb-6 mb-3">
            <p className="max-w-2xl mx-auto mb-4 md:mb-4 mb-2 text-black text-lg md:text-1.5xl text-sm">
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

      {/* Projects Section */}
      <section id="projects-section" className={`min-h-[90vh] pt-20 pb-0 transition-all duration-1000 ease-out transform ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                onClick={() => project.id === 5 ? null : router.push("/works")}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`w-full h-full rounded-xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20 shadow-3d-card shimmer ${project.id === 5 ? 'coming-soon' : ''}`}>
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

          <div className="text-center mt-8 md:mt-12 mb-16 md:mb-24">
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

      {/* New Superpowers Section */}
      <section 
        id="superpowers-section" 
        className={`min-h-[40vh] py-20 transition-all duration-1000 ease-out transform ${
          isSuperpowersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-black text-shadow-3d">
            My Superpowers
          </h2>
          
          <div className="relative overflow-hidden">
            <div className="relative flex justify-center items-center gap-3 md:gap-6 overflow-x-auto hide-scrollbar py-8">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center transform transition-all duration-700 ease-out hover:scale-110 flex-shrink-0"
                  style={{
                    opacity: isSuperpowersVisible ? 1 : 0,
                    transform: `translateX(${isSuperpowersVisible ? '0' : index % 2 === 0 ? '100px' : '-100px'})`,
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="relative w-8 h-8 md:w-14 md:h-14 mb-1 glass-shimmer">
                    <Image
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      fill
                      className="object-contain transition-all duration-500 ease-out"
                    />
                  </div>
                  <span className="text-[10px] md:text-xs text-black font-medium transition-all duration-300">{skill.name}</span>
                </div>
              ))}
            </div>
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
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 2rem;
        }

        /* Enhanced animations */
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

        @keyframes fadeInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Smooth transitions for all elements */
        * {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }

        /* Enhanced hover effects */
        .hover\:scale-110:hover {
          transform: scale(1.1);
          transition-duration: 500ms;
        }

        /* Smooth scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }

        /* Hide scrollbar but keep functionality */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Smooth section transitions */
        section {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          width: 100%;
          overflow: visible;
        }

        /* Enhanced button transitions */
        button, a {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth image transitions */
        img {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced text transitions */
        h1, h2, h3, p, span {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth navigation transitions */
        .fixed {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          /* Base styles */
          * {
            transition-duration: 200ms;
          }

          /* Hero section */
          section.min-h-\[85vh\] {
            min-height: 60vh !important;
            padding-top: 6rem !important;
            padding-bottom: 2rem !important;
          }

          /* Typography */
          h1.text-4xl, h1.text-6xl {
            font-size: 1.75rem !important;
            line-height: 1.2 !important;
          }

          h2.text-2xl, h2.text-4xl {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
          }

          p.text-lg, p.text-1.5xl {
            font-size: 0.875rem !important;
            line-height: 1.4 !important;
          }

          /* Navigation */
          .fixed.top-12 {
            top: 1rem !important;
          }

          .fixed.top-12.left-6,
          .fixed.top-12.right-6 {
            font-size: 0.65rem !important;
            padding: 0.3rem 0.6rem !important;
          }

          /* Projects section */
          #projects-section {
            padding-top: 3rem !important;
            margin-top: 0 !important;
          }

          .getCardStyle {
            width: 100% !important;
            height: 200px !important;
            margin: 0.5rem 0 !important;
          }

          /* Superpowers section */
          #superpowers-section {
            padding-top: 3rem !important;
            margin-top: 0 !important;
          }

          .glass-shimmer {
            padding: 6px !important;
            border-radius: 8px !important;
          }

          /* Contact section */
          #contact-section {
            padding-top: 3rem !important;
            margin-top: 0 !important;
          }

          /* Buttons and interactive elements */
          button, .shimmer-button {
            font-size: 0.75rem !important;
            padding: 0.4rem 0.8rem !important;
          }

          /* Spacing adjustments */
          .gap-2 {
            gap: 0.5rem !important;
          }

          .gap-3 {
            gap: 0.75rem !important;
          }

          .gap-4 {
            gap: 1rem !important;
          }

          .mb-3 {
            margin-bottom: 0.75rem !important;
          }

          .mb-6 {
            margin-bottom: 1.5rem !important;
          }

          .py-6 {
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }

          /* Container adjustments */
          .max-w-7xl {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          /* Chat widget */
          .fixed.bottom-8.right-8 {
            bottom: 1rem !important;
            right: 1rem !important;
          }
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

        /* Ensure the body takes full height and allows scrolling */
        body {
          min-height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          margin-bottom: 0;
          padding-bottom: 0;
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

        /* Carousel animation */
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

        /* Glass shimmer effect */
        .glass-shimmer {
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border-radius: 12px;
          padding: 8px;
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .glass-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 3s infinite;
          transform: skewX(-25deg);
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        /* Bevel effect */
        .glass-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.1) 100%
          );
          pointer-events: none;
        }

        /* Coming soon card effect */
        .coming-soon {
          position: relative;
          overflow: hidden;
        }

        .coming-soon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          animation: shimmer 2s infinite;
          z-index: 1;
        }

        .coming-soon::after {
          content: 'Coming Soon';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .coming-soon:hover::after {
          opacity: 1;
        }
      `}</style>
    </Layout>
  )
}
