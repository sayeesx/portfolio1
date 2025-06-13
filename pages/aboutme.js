"use client"

import { useEffect, useRef, useState } from "react"
import Layout from "../components/Layout"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function About() {
  const timelineData = [
    {
      id: 1,
      date: "2021 - 2023",
      title: "Higher Secondary Education",
      institution: "NHHSS Kottakkal",
      details: ["Science Stream"],
      fullDetails:
        "Completed higher secondary education with a focus on the Science stream with computer science laying a strong foundation for future academic pursuits.",
    },
    {
      id: 2,
      date: "2023 - 2026",
      title: "BCA",
      institution: "Yenepoya Deemed-To-Be University",
      details: ["Computer Science"],
      fullDetails:
        "Currently pursuing a Bachelor's degree in Computer Applications, gaining comprehensive knowledge in various aspects of computer science and technology.",
    },
    {
      id: 3,
      date: "2019 - present",
      title: "Trading Experience",
      institution: "Self-employed",
      details: ["Stock Market & Crypto Investments"],
      fullDetails:
        "Gained practical experience in stock market trading, developing skills in market analysis, risk management, and financial decision-making.",
    },
    {
      id: 4,
      date: "2023 - Present",
      title: "Software Developer Intern",
      institution: "Cyber Square",
      details: ["Web Development", "Full Stack Development", "Artificial Intelligence", "Data Science"],
      fullDetails:
        "Worked as a Software Developer Intern at Cyber Square, focusing on web and full-stack development. Gaining hands-on experience in project management and cutting-edge technologies.",
    },
    {
      id: 5,
      date: "Future",
      title: "Journey Continues",
      institution: "Next Chapter",
      details: ["More adventures await..."],
      isFinal: true,
    },
  ]

  const [activeSection, setActiveSection] = useState(1)
  const [flippedCards, setFlippedCards] = useState({})
  const [showBackButton, setShowBackButton] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const timelineRefs = useRef([])
  const timelineLineRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = Number(entry.target.getAttribute("data-id"))
            setActiveSection(sectionId)
          }
        })
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-5% 0px -5% 0px",
      },
    )

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Handle scroll for back button visibility and fluid animation
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = 50

      if (currentScrollY > lastScrollY + scrollThreshold) {
        setShowBackButton(false)
      } else if (currentScrollY < lastScrollY - scrollThreshold) {
        setShowBackButton(true)
      }

      setLastScrollY(currentScrollY)
      
      // Update fluid height based on active section
      if (timelineLineRef.current && containerRef.current) {
        const totalSections = timelineData.length
        const sectionHeight = 100 / (totalSections - 1)
        const targetHeight = activeSection * sectionHeight
        
        // Ensure the fluid moves dot by dot
        const currentHeight = parseFloat(timelineLineRef.current.style.height) || 0
        const nextDotHeight = Math.min(
          Math.ceil(currentHeight / sectionHeight) * sectionHeight,
          100
        )
        
        // Only update if we're not at the target height
        if (Math.abs(currentHeight - targetHeight) > 0.5) {
          const newHeight = currentHeight + (nextDotHeight - currentHeight) * 0.05
          timelineLineRef.current.style.height = `${newHeight}%`
        }
      }
    }

    // Initial fluid height
    if (timelineLineRef.current) {
      timelineLineRef.current.style.height = "0%"
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY, activeSection, timelineData.length])

  const toggleCard = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <Layout>
      <style jsx global>{`
        @keyframes flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .timeline-container {
          padding-top: 100px;
          padding-bottom: 50px;
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .timeline-line {
          position: relative;
          height: calc(100% - 50px);
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .timeline-line::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          width: 4px;
          height: 90%;
          background: rgba(200, 200, 200, 0.3);
          z-index: 1;
        }

        .timeline-fluid {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          width: 6px;
          height: 0%;
          background: #1d4ed8;
          z-index: 2;
          transition: height 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
        }

        .timeline-fluid::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, 
            #1d4ed8 0%, 
            #2563eb 50%,
            #1d4ed8 100%
          );
          animation: flow 15s ease-in-out infinite;
          background-size: 200% 200%;
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.7);
        }

        .ripple {
          position: absolute;
          width: 100%;
          z-index: 4;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: ripple 2s linear infinite;
        }

        .ripple-2 {
          animation-delay: 0.5s;
        }

        .ripple-3 {
          animation-delay: 1s;
        }

        .glassmorphic {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          position: relative;
          z-index: 3;
        }

        .card-flip {
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .card-flip.flipped {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .final-timeline-item {
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          padding-top: 1rem;
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .final-timeline-dot {
          position: absolute;
          width: 8px !important;
          height: 8px !important;
          left: 48.5%;
          top: 52px;
          transform: translateX(-50%);
          z-index: 4;
        }

        .final-timeline-card {
          width: 300px;
          margin: 3rem auto 0;
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          position: relative;
          z-index: 3;
          padding: 1.5rem;
          color: black !important;
        }
        
        .timeline-heading {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          color: #3b82f6;
          padding: 1rem;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin: 0.5rem 0 1.5rem 0;
          position: relative;
          z-index: 10;
        }

        .back-button {
          position: fixed;
          top: 12px;
          left: 6px;
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

        .back-button:hover {
          color: #3d5be0;
        }

        .back-button.hidden {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }

        .skills-button {
          position: fixed;
          top: 12px;
          right: 6px;
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

        .skills-button:hover {
          color: #3d5be0;
        }

        .skills-button.hidden {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }

        .card-front {
          color: black !important;
        }

        .card-front h3 {
          color: black !important;
        }

        .card-front p {
          color: black !important;
        }

        .card-front span {
          color: black !important;
        }

        .card-back {
          color: black !important;
        }

        .card-back p {
          color: black !important;
        }

        .final-timeline-card h3 {
          color: black !important;
        }

        .final-timeline-card p {
          color: black !important;
        }

        .final-timeline-card span {
          color: black !important;
        }

        .text-gray-600 {
          color: black !important;
        }

        .text-gray-500 {
          color: black !important;
        }

        .bg-blue-100 {
          background-color: rgba(59, 130, 246, 0.1) !important;
        }

        .text-blue-800 {
          color: black !important;
        }

        @media (max-width: 768px) {
          .timeline-container {
            padding-top: 80px;
            padding-bottom: 30px;
          }

          .timeline-heading {
            margin: 0.25rem 0 1rem 0;
          }

          .final-timeline-item {
            padding-top: 0.5rem;
          }

          .timeline-heading {
            font-size: 1.25rem !important;
          }

          h1.text-4xl {
            font-size: 1rem !important;
          }

          h3.text-xl, h3.text-2xl {
            font-size: 0.75rem !important;
          }

          p, .text-gray-500, .text-gray-600, div.text-gray-500, div.text-sm {
            font-size: 0.7rem !important;
          }

          span.inline-block {
            font-size: 0.55rem !important;
            padding: 0.2rem 0.4rem !important;
          }

          .card-front, .card-back {
            font-size: 0.7rem !important;
            padding: 0.75rem !important;
          }

          .final-timeline-card {
            width: 250px;
            padding: 1rem;
          }
          
          .timeline-container * {
            max-font-size: 0.9rem !important;
          }

          .final-timeline-dot {
            margin-top: 0;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>

      <button onClick={() => (window.location.href = "/")} className={`back-button ${showBackButton ? "" : "hidden"}`}>
        <ArrowRight className="w-3 h-3 rotate-180" />
        Back to Home
      </button>

      <Link href="/skills" className={`skills-button ${showBackButton ? "" : "hidden"}`}>
        My Skills
        <ArrowRight className="w-3 h-3" />
      </Link>

      <div ref={containerRef} className="max-w-4xl mx-auto px-4 py-2 timeline-container">
        <h1 className="text-4xl font-bold text-center mb-2 text-black">About Me</h1>
        <p className="max-w-2xl mx-auto mb-8 text-black text-center glassmorphic p-6 rounded-xl">
          I am a student pursuing a Bachelor&apos;s degree in Computer Applications and currently an intern at Cyber
          Square. I specialize in building startups and websites, with experience in trading and development.
        </p>

        <h2 className="timeline-heading text-black">My Journey</h2>

        <div className="relative timeline-line">
          <div ref={timelineLineRef} className="timeline-fluid" style={{ height: "0%" }}></div>
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (timelineRefs.current[index] = el)}
              data-id={item.id}
              className={`relative flex items-center transition-all duration-500 ${
                item.isFinal ? "final-timeline-item" : "mb-12"
              } ${activeSection === item.id ? "opacity-100 scale-105" : "opacity-50 scale-100"}`}
            >
              {/* Animated dot */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 ${item.isFinal ? "final-timeline-dot" : ""}`}
                style={{ zIndex: item.isFinal ? 4 : 3 }}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 relative ${
                    activeSection >= item.id ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {activeSection === item.id && (
                    <>
                      <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-75"></div>
                      {item.isFinal && (
                        <>
                          <div className="ripple"></div>
                          <div className="ripple ripple-2"></div>
                          <div className="ripple ripple-3"></div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Content */}
              {item.isFinal ? (
                <div className="w-full">
                  <div className="relative w-full glassmorphic p-6 rounded-xl final-timeline-card">
                    <span className="inline-block px-4 py-1.5 mb-3 text-sm bg-blue-100 text-blue-800 rounded-full font-medium">
                      {item.date}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.institution}</p>
                    <div className="text-gray-500">{item.details.join(" | ")}</div>
                  </div>
                </div>
              ) : (
                <div className={`w-5/12 h-64 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 ml-auto"}`}>
                  <div
                    className={`relative w-full h-full cursor-pointer card-flip ${
                      flippedCards[item.id] ? "flipped" : ""
                    }`}
                    onClick={() => toggleCard(item.id)}
                  >
                    {/* Front of card */}
                    <div
                      className={`card-front glassmorphic p-6 rounded-xl transform transition-all duration-500 ${
                        activeSection === item.id
                          ? "translate-y-0"
                          : index % 2 === 0
                            ? "translate-y-4"
                            : "-translate-y-4"
                      }`}
                    >
                      <span className="inline-block px-4 py-1.5 mb-3 text-sm bg-blue-100 text-blue-800 rounded-full font-medium">
                        {item.date}
                      </span>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.institution}</p>
                    </div>

                    {/* Back of card */}
                    <div className="card-back glassmorphic p-6 rounded-xl text-center">
                      <div className="text-sm text-gray-600">
                        {item.details.map((detail, detailIndex) => (
                          <p key={detailIndex}>{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
