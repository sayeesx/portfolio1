'use client'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Layout from '../components/Layout'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
          <p className="text-lg md:text-2xl bg-[#3d5be0] text-white px-4 py-1 rounded-md whitespace-nowrap shadow-lg">
            I am a Developer and Entrepreneur
          </p>
        </div>

        <div>
          <p className="max-w-2xl mx-auto mb-4 text-white">
            <TypeWriter text="Turning caffeine into code and ideas into ventures—one keystroke at a time." delay={30} />
          </p>
        </div>

        {/* About Me button */}
        <div className="flex flex-col items-center w-full max-w-4xl px-4 mt-2 gap-6">
          <Link
            href="/aboutme"
            className="bg-[#3d5be0] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out flex items-center group hover:scale-105"
          >
            <span className="text-white">About Me</span>
            <ArrowRight className="ml-2 text-white transition-all duration-300 ease-in-out transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Chat Widget - highest z-index */}
      <div className="z-[99999] relative">
        <ChatWidget />
      </div>
    </Layout>
  )
}
