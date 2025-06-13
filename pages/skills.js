import { useState, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
          style={{
            filter: hoveredSkill && hoveredSkill.name !== skill.name ? 'blur(2px)' : 'none',
            transition: 'all 0.3s ease',
          }}
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
        className={`fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-[#3d5be0] text-white rounded-full hover:bg-[#2d4bd0] transition-all duration-300 ${
          showBackButton ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-black">My Skills</h1>
          
          <div className="mb-8">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab('webDev')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === 'webDev' 
                    ? 'bg-[#3d5be0] text-white' 
                    : 'bg-white text-[#3d5be0] border border-[#3d5be0] hover:bg-[#3d5be0] hover:text-white'
                }`}
              >
                Web Development
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === 'ai' 
                    ? 'bg-[#3d5be0] text-white' 
                    : 'bg-white text-[#3d5be0] border border-[#3d5be0] hover:bg-[#3d5be0] hover:text-white'
                }`}
              >
                AI & Data Science
              </button>
              <button
                onClick={() => setActiveTab('other')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === 'other' 
                    ? 'bg-[#3d5be0] text-white' 
                    : 'bg-white text-[#3d5be0] border border-[#3d5be0] hover:bg-[#3d5be0] hover:text-white'
                }`}
              >
                Other Languages
              </button>
            </div>
          </div>

          {activeTab === 'webDev' && (
            <SkillSection
              skills={webDevSkills}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              selectedSkill={selectedSkill}
              setSelectedSkill={setSelectedSkill}
            />
          )}
          {activeTab === 'ai' && (
            <SkillSection
              skills={aiSkills}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              selectedSkill={selectedSkill}
              setSelectedSkill={setSelectedSkill}
            />
          )}
          {activeTab === 'other' && (
            <SkillSection
              skills={otherSkills}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              selectedSkill={selectedSkill}
              setSelectedSkill={setSelectedSkill}
            />
          )}

          {selectedSkill && (
            <div
              className="mx-auto max-w-2xl text-center mt-8 p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm"
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

        @media (max-width: 768px) {
          button {
            font-size: 0.875rem !important;
            padding: 0.5rem 1rem !important;
          }
        }
      `}</style>
    </Layout>
  )
}
