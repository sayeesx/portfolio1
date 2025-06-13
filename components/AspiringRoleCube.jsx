"use client"

import { useState, useEffect } from "react"

const AspiringRoleCube = () => {
  const [animationStage, setAnimationStage] = useState("animating") // Start directly with animation
  const [currentFace, setCurrentFace] = useState(0)
  const roles = ["Student", "Developer", "AI Engineer"]

  useEffect(() => {
    if (animationStage !== "animating") return

    // Rotate through faces
    const rotationInterval = setInterval(() => {
      setCurrentFace((prev) => {
        // After showing all roles, complete the animation
        // We check for the last role specifically
        if (prev === roles.length - 1) {
          clearInterval(rotationInterval)

          // Short delay before showing final text
          setTimeout(() => {
            setAnimationStage("completed")
          }, 800) // Longer delay for smoother transition

          // Don't change the face, keep it on the last one
          return prev
        }

        // Otherwise, move to the next face
        return prev + 1
      })
    }, 2000) // Change face every 2 seconds

    return () => clearInterval(rotationInterval)
  }, [animationStage, roles.length])

  return (
    <div className="relative h-[60px] flex items-center justify-center">
      {animationStage === "completed" ? (
        // Final text with enhanced fade in animation
        <div className="wide-fade-in">
          <p className="text-lg md:text-2xl bg-[#3d5be0] text-white px-4 py-1 rounded-md whitespace-nowrap shadow-lg h-[38px] md:h-[42px] flex items-center justify-center">
            Student | Developer | AI & ML Engineer
          </p>
        </div>
      ) : (
        // Animation container - with no gap between blocks and consistent font size
        <div className="bg-[#3d5be0] text-white rounded-md shadow-lg h-[38px] md:h-[42px] flex items-center">
          {/* Single container for both words with consistent styling */}
          <div className="flex items-center pl-6 pr-0 h-full">
            {/* First word with consistent font size */}
            <span className="text-lg md:text-2xl">Aspiring</span>
            
            {/* Small space between words */}
            <span className="w-[4px]"></span>
            
            {/* Rotating word with same font size */}
            <div className="cube-container h-full -mr-6">

              <div
                className="cube"
                style={{
                  transform: `rotateX(${-90 * currentFace}deg)`,
                }}
              >
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="cube-face text-lg md:text-2xl" // Same font size as "aspiring"
                    style={{
                      transform: `rotateX(${90 * index}deg) translateZ(40px)`,
                      opacity: currentFace === index ? 1 : 0.5,
                    }}
                  >
                    {role}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes wideFadeIn {
          0% { 
            opacity: 0;
            transform: scale(0.95);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .wide-fade-in {
          animation: wideFadeIn 1.2s ease-out forwards;
        }
        
        .cube-container {
          perspective: 1000px;
          width: 150px; /* Reduced width */
          display: flex;
          align-items: center;
          justify-content: flex-start; /* Align to start for better word spacing */
          overflow: hidden;
        }
        
        .cube {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s ease;
        }
        
        .cube-face {
          position: absolute;
          width: 80%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center; /* Align to start for better word spacing */
          color: white;
          backface-visibility: hidden;
          transition: opacity 0.3s ease;
        }
        
        @media (min-width: 768px) {
          .cube-container {
            width: 180px; /* Reduced width for desktop */
          }
        }
      `}</style>
    </div>
  )
}

export default AspiringRoleCube
