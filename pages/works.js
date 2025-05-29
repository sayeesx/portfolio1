import React from 'react';
import Layout from '../components/Layout';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    }
  ];

  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = React.useState({});

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingTop: '2rem'
    },
    heading: {
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      color: '#ffff',
      '@media (max-width: 768px)': {
        fontSize: '2rem',
        marginBottom: '1.5rem'
      }
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '2rem',
      padding: '2rem',
      position: 'relative',
      zIndex: 1,
      '@media (max-width: 768px)': {
        gap: '1rem',
        padding: '1rem'
      }
    },
    bg: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 0,
      pointerEvents: 'none',
      width: '100%',
      textAlign: 'center'
    },
    bgText: {
      fontSize: 'min(20vw, 20rem)',
      opacity: 0.1,
      color: '#3d5be0',
      whiteSpace: 'nowrap',
      transition: 'all 0.3s ease',
      '@media (max-width: 768px)': {
        fontSize: 'min(15vw, 10rem)'
      },
      '@media (max-width: 480px)': {
        fontSize: 'min(12vw, 6rem)'
      }
    },
    nft: {
      userSelect: 'none',
      width: '300px',
      height: '450px',
      margin: '1rem',
      perspective: '2000px', // Increased perspective for better 3D effect
      position: 'relative',
      '@media (max-width: 768px)': {
        width: '280px',
        height: '420px',
        margin: '0.5rem'
      }
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      padding: '1rem',
    },
    tokenImage: {
      borderRadius: '0.5rem',
      maxWidth: '100%',
      height: '250px',
      objectFit: 'cover',
      '@media (max-width: 768px)': {
        height: '200px'
      }
    },
    description: {
      margin: '0.5rem 0',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease-in-out',
      lineHeight: '1.5',
      fontSize: '0.95rem',
      maxHeight: '4.5em',
    },
    expandedDescription: {
      maxHeight: '1000px', // Large enough to contain any description
    },
    descriptionContainer: {
      position: 'relative',
      width: '100%',
    },
    descriptionGradient: {
      position: 'absolute',
      bottom: 0,
      left:-80,
      width: '200%',
      height: '100%',
      background: 'linear-gradient(180deg, transparent 0%, rgba(39, 42, 47, 0.68) 90%)',
      pointerEvents: 'none',
      transition: 'opacity 0.3s ease',
    },
    expandButton: {
      background: 'none',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.7)', // reduced opacity for button
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0',
      transition: 'all 0.3s ease',
      fontSize: '0.9rem',
      '&:hover': {
        opacity: 0.9,
        color: 'rgba(255, 255, 255, 0.9)'
      }
    },
    tokenInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0',
      borderTop: '1px solid #88888855',
      marginTop: '0.5rem'
    },
    techBadge: {
      background: '#3d5be0',
      color: 'white',
      padding: '0.25rem 0.5rem',
      borderRadius: '1rem',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    timeAgo: {
      color: '#a89ec9',
      fontSize: '0.8rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      maxWidth: '100%'
    },
    projectTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#3d5be0',
      marginBottom: '0.5rem',
      background: 'linear-gradient(45deg, #3d5be0 30%, #5c7bf7 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #ffffff22',
      padding: '0.3rem',
      margin: '0',
      marginRight: '0.5rem',
      borderRadius: '100%',
      boxShadow: 'inset 0 0 0 4px #000000aa'
    },
    creatorImage: {
      borderRadius: '100%',
      border: '1px solid #ffffff22',
      width: '2rem',
      height: '2rem',
      objectFit: 'cover',
      margin: 0
    },
    hr: {
      width: '100%',
      border: 'none',
      borderBottom: '1px solid #88888855',
      marginTop: 0
    },
    link: {
      color: '#3d5be0',
      textDecoration: 'none',
      transition: 'color 0.3s',
      '&:hover': {
        color: '#ffffff'
      }
    },
    card: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s ease',
      borderRadius: '0.7rem',
    },
    cardFlipped: {
      transform: 'rotateY(180deg)',
    },
    cardFront: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      backgroundColor: '#282c34',
      background: 'linear-gradient(0deg, rgba(40,44,52,1) 0%, rgba(255,255,255,0.1) 100%)',
      borderRadius: '0.7rem',
      border: '1px solid #ffffff22',
    },
    cardBack: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
      backgroundColor: '#282c34',
      background: 'linear-gradient(0deg, rgba(40,44,52,1) 0%, rgba(255,255,255,0.1) 100%)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '0.7rem',
      border: '1px solid #ffffff22',
    },
    techBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.5rem',
      padding: '0.5rem',
      width: '100%'
    },
    projectButton: {
      background: 'linear-gradient(45deg, #3d5be0 30%, #5c7bf7 90%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '2rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      textDecoration: 'none',
      marginTop: 'auto',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(61, 91, 224, 0.4)',
      },
    },
  };

  const getCardStyle = (id) => ({
    ...styles.nft,
    transform: hoveredCard === id ? 'scale(1.015)' : 'scale(1)',
    boxShadow: hoveredCard === id ? '0 7px 50px 10px #000000aa' : '0 7px 20px 5px #00000088',
  });

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Layout>
      <div style={styles.pageContainer}>
        <div style={{
          ...styles.bg,
          '@media (max-width: 768px)': {
            fontSize: hoveredCard ? '0' : '10rem'
          }
        }}>
          <h1 style={{
            ...styles.bgText,
            '@media (max-width: 768px)': {
              fontSize: '10rem'
            },
            '@media (max-width: 480px)': {
              fontSize: '6rem'
            }
          }}>Projects</h1>
        </div>
        
        <h1 style={styles.heading}>My Projects</h1>
        
        <div style={styles.container}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={getCardStyle(project.id)}
              onMouseEnter={() => {
                setHoveredCard(project.id);
                setExpandedDescriptions(prev => ({ ...prev, [project.id]: true }));
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
                setExpandedDescriptions(prev => ({ ...prev, [project.id]: false }));
              }}
            >
              <div style={{
                ...styles.card,
                transform: expandedDescriptions[project.id] ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}>
                {/* Front of card */}
                <div style={styles.cardFront}>
                  <div style={styles.main}>
                    <img
                      style={styles.tokenImage}
                      src={project.image}
                      alt={project.title}
                    />
                    <h2 style={styles.projectTitle}>{project.title}</h2>
                    <div style={styles.description}>
                      {project.description.substring(0, 100)}...
                    </div>
                    <div style={styles.techBox}>
                      <span>⚡ {project.tech.split(',')[0].split('+')[0].trim()}</span>
                      <span style={styles.timeAgo}>🕒 {project.timeAgo}</span>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div style={styles.cardBack}>
                  <h2 style={styles.projectTitle}>{project.title}</h2>
                  <p style={{color: '#fff', lineHeight: '1.6', marginBottom: 'auto'}}>
                    {project.description}
                  </p>
                  <div style={styles.techBox}>
                    <span>⚡ {project.tech}</span>
                  </div>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.projectButton}
                  >
                    View Project →
                  </a>
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