"use client"

import { useEffect, useRef, useState } from "react"
import Layout from "../components/Layout"

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
            setActiveSection(Number(entry.target.getAttribute("data-id")))
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px",
      },
    )

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Handle scroll for back button visibility
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide button when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY + 5) {
        setShowBackButton(false)
      } else if (currentScrollY < lastScrollY - 5) {
        setShowBackButton(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  // Calculate fluid height based on active section
  useEffect(() => {
    if (timelineLineRef.current && containerRef.current) {
      // For more accurate fluid filling, calculate percentage based on active section
      // If we're at the last section (5), fill 100%
      if (activeSection === timelineData.length) {
        timelineLineRef.current.style.height = "100%"
      } else {
        // Otherwise calculate the percentage based on active section
        // We need to account for the spacing between dots
        const fillPercentage = ((activeSection - 0.5) / (timelineData.length - 1)) * 100
        timelineLineRef.current.style.height = `${fillPercentage}%`
      }
    }
  }, [activeSection, timelineData.length])

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
          padding-top: 1700px;
          padding-bottom: 300px;
          position: relative;
        }
        
        .timeline-line {
          position: relative;
        }

        .timeline-line::before {
          content: '';
          position: absolute;
          left: 50%;
          top: -95px;
          transform: translateX(-50%);
          width: 4px;
          height: 118%;
          background: rgba(200, 200, 200, 0.3);
          z-index: 1;
        }

        .timeline-fluid {
          position: absolute;
          left: 50%;
          top: -95px;
          transform: translateX(-50%);
          width: 4px;
          height: 0%;
          background: linear-gradient(180deg, 
            rgba(59, 130, 246, 0.8) 0%, 
            rgba(59, 130, 246, 1) 50%,
            rgba(59, 130, 246, 0.8) 100%
          );
          z-index: 2;
          transition: height 0.8s ease-in-out;
          background-size: 400% 400%;
          animation: flow 8s linear infinite;
        }

        .ripple {
          position: absolute;
          width: 100%;
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
          margin-left: auto;
          margin-right: auto;
          padding-top: 2rem;
          position: absolute;
          bottom: 50;
          left: 50%;
          transform: translateX(-50%);
        }

        .final-timeline-dot {
          margin-top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px !important;
          height: 8px !important;
        }

        .final-timeline-card {
          transform: translateY(0) !important;
          text-align: center !important;
          margin-top: 1rem;
          width: 300px;
          height: auto !important;
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
          margin: 1rem 0 6rem 0;
        }

        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 1000;
          padding: 10px 15px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .back-button.hidden {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }

        @media (max-width: 768px) {
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
            width: 250px !important;
            padding: 0.75rem !important;
          }
          
          .timeline-container * {
            max-font-size: 0.9rem !important;
          }

          .final-timeline-dot {
            margin-top: -200px;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>

      <button onClick={() => (window.location.href = "/")} className={`back-button ${showBackButton ? "" : "hidden"}`}>
        Back to Home
      </button>

      <div ref={containerRef} className="max-w-4xl mx-auto px-4 py-8 timeline-container">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">About Me</h1>
        <p className="max-w-2xl mx-auto mb-24 text-gray-600 text-center glassmorphic p-6 rounded-xl">
          I am a student pursuing a Bachelor&apos;s degree in Computer Applications and currently an intern at Cyber
          Square. I specialize in building startups and websites, with experience in trading and development.
        </p>

        <h2 className="timeline-heading">My Journey</h2>

        <div className="relative timeline-line">
          <div ref={timelineLineRef} className="timeline-fluid"></div>
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (timelineRefs.current[index] = el)}
              data-id={item.id}
              className={`relative flex items-center transition-all duration-500 ${item.isFinal ? "final-timeline-item" : "mb-24"}
                ${activeSection === item.id ? "opacity-100 scale-105" : "opacity-50 scale-100"}`}
            >
              {/* Animated dot */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 ${item.isFinal ? "final-timeline-dot" : ""}`}
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
