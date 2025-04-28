import { useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
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
          className="flex flex-col items-center p-4 rounded-lg transition-all"
          style={{
            filter: hoveredSkill && hoveredSkill.name !== skill.name ? 'blur(2px)' : 'none',
            transition: 'filter 0.3s ease',
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
          <span className="text-white text-center">{skill.name}</span>
        </button>
      ))}
    </div>
  )
}

export default function SkillsPage() {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [activeTab, setActiveTab] = useState('webDev')

  return (
    <Layout>
      <Head>
        <title>My Skills</title>
        <meta name="description" content="A showcase of my programming skills and projects" />
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', paddingTop: '1in' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">My Skills</h1>
          
          <div className="mb-8">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab('webDev')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'webDev' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-300'}`}
              >
                Web Development
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'ai' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-300'}`}
              >
                AI & Data Science
              </button>
              <button
                onClick={() => setActiveTab('other')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'other' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-300'}`}
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
              className="mx-auto max-w-2xl text-center"
              style={{
                marginTop: '2rem',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                backgroundColor: '#1F2937',
                animation: 'slide-down 0.5s ease forwards',
              }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">{selectedSkill.name} Projects</h3>
              <ul className="list-none inline-block">
                {selectedSkill.projects.map((project, index) => (
                  <li key={index} className="mb-3">
                    <span className="inline-block px-4 py-2 bg-[#374151] rounded-lg">{project}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 50 }}>
        <ChatWidget />
      </div>

      {/* Inline CSS for animations */}
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
      `}</style>
    </Layout>
  )
}
