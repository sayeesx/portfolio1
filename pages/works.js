"use client"

import React from 'react';
import Layout from '../components/Layout';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Works = () => {
  const projects = [
    {
      id: 1,
      title: "Exquio",
      description: "Doctor Appointment Booking App (React Native + Supabase): Built a cross-platform app to connect patients with doctors. Designed user and admin interfaces, handling auth, booking flow, backend logic, AI lab reports analysis, and payment integration.",
      image: "/assets/healo.jpg",
      tech: "python + react native + supabase + tailwind css",
      timeAgo: "4 months ago",
      projectLink: "https://github.com/sayeesx/exquio"
    },
    {
      id: 2,
      title: "Roamio",
      description: "Developed a platform connecting travelers with local guides for tailored experiences. Implemented an ML-based guide recommendation engine and AI-generated travel itinerary planner based on user preferences.",
      image: "/assets/roamio.png",
      tech: "Next.js + Supabase + MySQL + Java + Machine Learning + AI",
      timeAgo: "1 year ago",
      projectLink: "https://github.com/sayeesx/roamio"
    },
    {
      id: 3,
      title: "ZapIT",
      description: "ZapIT is a rapid development startup specializing in delivering high-quality dynamic and static websites and apps within just 24 hours. Whether you're a startup needing a quick launch or a business looking for a fast digital solution, Zapit combines speed, design, and performance to get you online—fast",
      image: "/assets/zapit.jpg",
      tech: "React + TypeScript",
      timeAgo: "2 years ago",
      projectLink: "https://github.com/sayeesx/zapit"
    },
    {
      id: 4,
      title: "Requery",
      description: "Student Complaint Portal: Complaint submission and tracking for college students. Developed using HTML, css, javascript and SQL, implemented user authentication, and real-time notifications.",
      image: "/assets/requery.png",
      tech: "html + css + js + MySQL",
      timeAgo: "2 years ago",
      projectLink: "https://github.com/sayeesx/requery-empire"
    },
    {
      id: 5,
      title: "New Project",
      description: "An exciting new project is coming soon! Stay tuned for updates as we work on bringing this innovative idea to life.",
      image: "/assets/updating.jpg",
      tech: "Coming Soon",
      timeAgo: "Updating...",
      projectLink: "#",
      isUpdating: true
    }
  ];

  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [flippedCards, setFlippedCards] = React.useState({});
  const [showBackButton, setShowBackButton] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50;

      if (currentScrollY > lastScrollY + scrollThreshold) {
        setShowBackButton(false);
      } else if (currentScrollY < lastScrollY - scrollThreshold) {
        setShowBackButton(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleCard = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Layout>
      <style jsx global>{`
        @keyframes flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .glassmorphic {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-flip {
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: transform 0.6s;
          width: 100%;
          height: 100%;
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
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .back-button, .contact-button {
          position: fixed;
          top: 12px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          background: transparent;
          color: black;
          font-weight: 500;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button {
          left: 6px;
          border: none;
        }

        .back-button:hover {
          color: #3d5be0;
        }

        .contact-button {
          right: 6px;
          border: 1.5px solid black;
          border-radius: 16px;
        }

        .contact-button:hover {
          background: black;
          color: white;
        }

        .back-button.hidden, .contact-button.hidden {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }

        .project-heading {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          color: #3b82f6;
          padding: 1rem;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin: 0.5rem 0 1.5rem 0;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .project-heading {
            font-size: 1.5rem;
            margin: 0.25rem 0 1rem 0;
          }
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        .updating {
          animation: pulse 2s infinite;
        }

        .updating-text {
          color: #3b82f6;
          font-weight: 500;
        }
      `}</style>

      <button onClick={() => (window.location.href = "/")} className={`back-button ${showBackButton ? "" : "hidden"}`}>
        <ArrowRight className="w-3 h-3 rotate-180" />
        Back to Home
      </button>

      <Link href="/contact" className={`contact-button ${showBackButton ? "" : "hidden"}`}>
        Contact Me
        <ArrowRight className="w-3 h-3" />
      </Link>

      <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
        <h1 className="project-heading">My Projects</h1>
        
        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[300px] h-[450px] m-4 perspective-1000"
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`card-flip ${flippedCards[project.id] ? "flipped" : ""}`}
                onClick={() => !project.isUpdating && toggleCard(project.id)}
              >
                {/* Front of card */}
                <div className="card-front p-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[200px] object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-bold text-[#3b82f6] mb-2">{project.title}</h2>
                  <span className="inline-block px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-sm mb-2">
                    ⚡ {project.tech}
                  </span>
                  <span className={`block text-gray-500 text-sm mb-2 ${project.isUpdating ? 'updating updating-text' : ''}`}>
                    {project.isUpdating ? '🔄 ' : '🕒 '}{project.timeAgo}
                  </span>
                  <p className="text-gray-600 text-sm italic">
                    Click to view details →
                  </p>
                </div>

                {/* Back of card */}
                <div className="card-back p-6">
                  <h2 className="text-xl font-bold text-[#3b82f6] mb-4">{project.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-sm">
                      ⚡ {project.tech}
                    </span>
                  </div>
                  {!project.isUpdating && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-[#3b82f6] text-white rounded-full text-sm font-medium hover:bg-[#2563eb] transition-colors"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Works;