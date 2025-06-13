import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Github, Linkedin, Twitter, Mail, Instagram, Facebook } from "lucide-react"

export default function ContactButton() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)

  const socialData = [
    { Icon: Github, color: '#333' },
    { Icon: Linkedin, color: '#0077b5' },
    { Icon: Twitter, color: '#1DA1F2' },
    { Icon: Mail, color: '#EA4335' },
    { Icon: Instagram, color: '#E4405F' },
    { Icon: Facebook, color: '#1877F2' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % socialData.length)
    }, 800)
    return () => clearInterval(interval)
  }, [socialData.length])

  const handleClick = () => {
    router.push('/contact')
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative px-6 py-3 bg-transparent border-2 border-black rounded-full hover:bg-gray-100 transition-all duration-300"
    >
      <div className="flex items-center space-x-2">
        <span className="text-black font-medium text-base whitespace-nowrap">
          Contact me via
        </span>
        
        <div className="relative w-6 h-6 flex items-center justify-center">
          {socialData.map(({ Icon, color }, index) => (
            <Icon
              key={index}
              className={`absolute w-5 h-5 transition-all duration-300 ${
                index === currentLogoIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ color }}
            />
          ))}
        </div>
      </div>
    </button>
  )
}