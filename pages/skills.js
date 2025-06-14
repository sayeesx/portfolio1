import { useState, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Layout from '../components/Layout'
import ChatWidget from '../components/chatWidget'

const webDevSkills = [
  { name: 'JavaScript', logo: '/img/javascript.svg', projects: ['Interactive Web App',] },
  { name: 'HTML', logo: '/img/html.svg', projects: ['Responsive Website', 'Semantic Markup Project'] },
  { name: 'CSS', logo: '/img/css.svg', projects: ['CSS Animation Demo', 'Flexbox Layout'] },
  { name: 'React', logo: '/img/react.svg', projects: ['Mobile apps', 'Dynamic websites'] },
  { name: 'Next.js', logo: '/img/nextjs.svg', projects: ['Server-Side Rendered Blog', 'Static websites'] },
]

const aiSkills = [
  { name: 'Python', logo: '/img/python.svg', projects: ['Machine Learning Model', 'Data Visualization Tool'] },
  { name: 'TensorFlow', logo: '/img/tensorflow.png', projects: ['Neural Network for Image Classification', 'Natural Language Processing Model'] },
  { name: 'Pandas', logo: '/img/pandas.svg', projects: ['Data Analysis Pipeline', 'Reinforcement Learning Agent'] },
]

const otherSkills = [
  { name: 'C++', logo: '/img/cpp.svg', projects: ['OOPS', 'Data Structures Implementation'] },
  { name: 'Java', logo: '/img/java.svg', projects: ['Android App', 'Data Management'] },
  { name: 'SQL', logo: '/img/sql.svg', projects: ['Database Design and Normalization', 'CRUD Operations'] },
]

function SkillSection({ skills, hoveredSkill, setHoveredSkill, selectedSkill, setSelectedSkill }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center max-w-3xl mx-auto`}>
      {skills.map((skill) => (
        <button
          key={skill.name}
          onClick={() => setSelectedSkill(skill)}
          onMouseEnter={() => setHoveredSkill(skill)}
          onMouseLeave={() => setHoveredSkill(null)}
          className="flex flex-col items-center p-4 rounded-lg transition-all hover:scale-105"
        >
          <Image
            src={skill.logo}
            alt={`${skill.name} logo`}
            width={64}
            height={64}
            style={{
              marginBottom: '8px',
              filter: selectedSkill?.name === skill.name ? 'none' : hoveredSkill?.name === skill.name ? 'none' : 'grayscale(100%)',
            }}
          />
          <span className="text-black text-center">{skill.name}</span>
        </button>
      ))}
    </div>
  )
}

export default function SkillsPage() {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [activeTab, setActiveTab] = useState('webDev')
  const [showBackButton, setShowBackButton] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY + 5) {
        setShowBackButton(false)
      } else if (currentScrollY < lastScrollY - 5) {
        setShowBackButton(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <Layout>
      <Head>
        <title>My Skills</title>
        <meta name="description" content="A showcase of my programming skills and projects" />
      </Head>

      <Link 
        href="/"
        className={`fixed top-6 left-6 z-50 flex items-center gap-1 px-3 py-1.5 text-black hover:text-[#3d5be0] transition-all duration-300 text-xs ${
          showBackButton ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowLeft className="w-3 h-3" />
        Back to Home
      </Link>

      <Link 
        href="/works"
        className={`fixed top-6 right-6 z-50 flex items-center gap-1 px-3 py-1.5 text-black hover:text-[#3d5be0] transition-all duration-300 border border-black rounded-full hover:bg-black/5 text-xs ${
          showBackButton ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        My Projects
        <ArrowRight className="w-3 h-3" />
      </Link>

      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-black">My Skills</h1>
          
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="relative bg-gray-100 p-1 rounded-full shadow-lg">
                <div 
                  className="absolute h-[calc(100%-8px)] bg-white rounded-full transition-all duration-500 ease-in-out shadow-md"
                  style={{
                    width: 'calc(33.333% - 8px)',
                    transform: `translateX(${
                      activeTab === 'webDev' ? '0%' : 
                      activeTab === 'ai' ? '100%' : 
                      'calc(200% + 16px)'
                    })`,
                    left: '4px',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="relative flex">
                  <button
                    onClick={() => setActiveTab('webDev')}
                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === 'webDev' ? 'text-[#3d5be0]' : 'text-gray-600'
                    }`}
                  >
                    Web Dev
                  </button>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === 'ai' ? 'text-[#3d5be0]' : 'text-gray-600'
                    }`}
                  >
                    AI & Data
                  </button>
                  <button
                    onClick={() => setActiveTab('other')}
                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === 'other' ? 'text-[#3d5be0]' : 'text-gray-600'
                    }`}
                    style={{
                      paddingLeft: '2.25rem',
                      paddingRight: '2.25rem'
                    }}
                  >
                    Others
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div 
              className={`transition-all duration-500 ease-in-out transform ${
                activeTab === 'webDev' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%] absolute'
              }`}
              style={{
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <SkillSection
                skills={webDevSkills}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </div>
            <div 
              className={`transition-all duration-500 ease-in-out transform ${
                activeTab === 'ai' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100%] absolute'
              }`}
              style={{
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <SkillSection
                skills={aiSkills}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </div>
            <div 
              className={`transition-all duration-500 ease-in-out transform ${
                activeTab === 'other' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100%] absolute'
              }`}
              style={{
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <SkillSection
                skills={otherSkills}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          </div>

          {selectedSkill && (
            <div
              className="mx-auto max-w-2xl text-center mt-8 p-6 rounded-xl glassmorphic"
              style={{
                animation: 'slide-down 0.5s ease forwards',
              }}
            >
              <h3 className="text-lg font-semibold mb-4 text-black">{selectedSkill.name} Projects</h3>
              <ul className="list-none inline-block">
                {selectedSkill.projects.map((project, index) => (
                  <li key={index} className="mb-3">
                    <span className="inline-block px-4 py-2 bg-[#3d5be0]/10 text-[#3d5be0] rounded-full">
                      {project}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="backdrop-blur-md bg-transparent border border-white/30 rounded-full shadow-lg">
          <ChatWidget />
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glassmorphic {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        @media (max-width: 768px) {
          .relative.bg-gray-100 {
            padding: 0.25rem !important;
          }
          .relative.bg-gray-100 > div:first-child {
            height: calc(100% - 2px) !important;
            width: calc(33.333% - 4px) !important;
            left: 2px !important;
            top: 1px !important;
            transform: translateX(${
              activeTab === 'webDev' ? '0%' : 
              activeTab === 'ai' ? '100%' : 
              'calc(200% + 8px)'
            }) !important;
          }
          button {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            font-size: 0.75rem !important;
            padding-top: 0.25rem !important;
            padding-bottom: 0.25rem !important;
            line-height: 1 !important;
          }
          button:last-child {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
        }
      `}</style>
    </Layout>
  )
}
