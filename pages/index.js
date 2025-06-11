'use client'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Layout from '../components/Layout'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import SmileyLoader from '../components/SmileyLoader'
import ChatWidget from '../components/chatWidget'
import TypeWriter from '../components/TypeWriter'

export default function Component() {
  const [isLoading, setIsLoading] = useState(false)
  const [zoomOut, setZoomOut] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedHomepage')
    const isNewPageLoad = performance.navigation.type === performance.navigation.TYPE_NAVIGATE
    const shouldShowLoading = pathname === '/' && !hasVisitedBefore && isNewPageLoad

    if (shouldShowLoading) {
      setIsLoading(true)
      localStorage.setItem('hasVisitedHomepage', 'true')

      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 2800)

      const zoomOutTimer = setTimeout(() => {
        setZoomOut(true)
      }, 2900)

      return () => {
        clearTimeout(loadingTimer)
        clearTimeout(zoomOutTimer)
      }
    } else {
      setIsLoading(false)
      setZoomOut(true)
    }
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isLoading) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="flex items-center justify-center min-h-screen">
          <SmileyLoader />
        </div>
      </>
    )
  }

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Fixed Background - lower z-index */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Fixed Content - middle z-index */}
      <div
        className={`fixed inset-0 z-10 flex flex-col items-center justify-center text-center px-4 transform transition-all duration-1000 ease-out mx-auto
          ${zoomOut ? 'scale-90 opacity-100' : 'scale-110 opacity-0'}`}
      >
        <div className="flex flex-col items-center gap-4 mb-4">
          <h1 className="text-3xl md:text-6xl font-bold text-white">Hello, I&apos;m Muhammed Sayees</h1>
          <p className="text-lg md:text-2xl bg-[#3d5be0] text-white px-4 py-1 rounded-md whitespace-nowrap shadow-lg animate-slideIn">
            Student | Developer | AI & ML Engineer
          </p>
        </div>

        <div>
          <p className="max-w-2xl mx-auto mb-4 text-white text-xl md:text-1.5xl">
            <TypeWriter text="Fuelled by curiosity. Driven by code." delay={30} />
          </p>
        </div>

        {/* About Me button and Download CV buttons */}
        <div className="flex flex-row items-center justify-center w-full max-w-4xl px-4 mt-2 gap-4">
          <Link
            href="/aboutme"
            className="w-[140px] bg-[#3d5be0] text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out flex items-center justify-center group hover:scale-105"
          >
            <span className="text-white text-sm flex items-center">
              About Me
              <ArrowRight className="ml-2 w-4 h-4 text-white transition-all duration-300 ease-in-out transform group-hover:translate-x-1" />
            </span>
          </Link>
          
          <button
            onClick={() => {
              window.open('/MUHAMMED_SAYEES_CV.pdf', '_blank');
            }}
            className="w-[140px] border-2 border-white text-white px-4 py-1.5 rounded-full font-semibold transition-all duration-300 ease-in-out flex items-center justify-center group hover:scale-105 hover:border-[#3d5be0] relative"
          >
            <span className="text-white text-sm flex items-center whitespace-nowrap">
              Download CV
              <Download className="ml-2 w-4 h-4 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-0.5" />
            </span>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              CV is of June 2025
            </div>
          </button>
        </div>
      </div>

      {/* Chat Widget - highest z-index */}
      <div className="fixed bottom-8 right-8 z-[99999]">
        <ChatWidget />
      </div>

      <style jsx>{`
        @keyframes borderAnimation {
          0% {
            transform: scale(1.05);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-border:hover::after {
          animation: borderAnimation 0.3s ease-out forwards;
        }

        @keyframes slideIn {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.8s ease-out forwards;
        }
      `}</style>
    </Layout>
  )
}
