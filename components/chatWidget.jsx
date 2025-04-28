import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import personalData from './personalData';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(-1);
  const [displayedText, setDisplayedText] = useState('');
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [typoCount, setTypoCount] = useState(0);
  const [needsClarification, setNeedsClarification] = useState(false);
  
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  const isPersonalQuestion = (message) => {
    const personalKeywords = [
      'family', 'relationship', 'girlfriend', 'boyfriend', 'married',
      'dating', 'personal', 'private', 'address', 'phone',
      'salary', 'money', 'income', 'religious', 'politics'
    ];

    const identityKeywords = [
      'who are you', 'tell me about yourself', 'introduce yourself',
      'what do you do', 'what\'s your name', 'your background'
    ];

    const lowerMessage = message.toLowerCase();

    // Check if it's an identity question
    if (identityKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        isPersonal: false,
        isIdentity: true
      };
    }

    // Check if it's a private personal question
    if (personalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        isPersonal: true,
        isIdentity: false
      };
    }

    return {
      isPersonal: false,
      isIdentity: false
    };
  };

  const countTypos = (message) => {
    const words = message.toLowerCase().trim().split(' ');
    let typoCount = 0;

    const commonMisspellings = {
      'educaton': 'education',
      'skils': 'skills',
      'projcts': 'projects',
      'expereince': 'experience',
      'programing': 'programming',
      'wat': 'what',
      'hw': 'how',
      'r': 'are',
      'u': 'you',
      'ur': 'your',
      'plz': 'please',
      'ai': 'AI',
      'ml': 'machine learning',
      'ds': 'data science'
    };

    words.forEach(word => {
      // Check for common misspellings
      if (commonMisspellings[word]) {
        typoCount++;
        return;
      }

      // Check for very short words that aren't common
      if (word.length < 2 && !['a', 'i'].includes(word)) {
        typoCount++;
        return;
      }

      // Check for special characters in wrong places
      if (word.length > 2 && /[^a-z0-9\s-']/.test(word)) {
        typoCount++;
      }
    });

    return typoCount;
  };

  const conversationalResponses = {
    greetings: {
      triggers: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup'],
      responses: [
        `Hi there! I'm ${personalData.basic.name}, a ${personalData.education.current.degree} student!`,
        `Hello! I'm currently studying ${personalData.education.current.specialization} at ${personalData.education.current.college}.`,
        `Hey! Thanks for reaching out. I love discussing ${personalData.basic.interests.join(', ')}!`
      ]
    },
    goodbye: {
      triggers: ['bye', 'goodbye', 'see you', 'take care', 'talk later'],
      responses: [
        "Thanks for chatting! Feel free to reach out again if you'd like to discuss more.",
        "Great talking with you! Let's connect again soon.",
        "Bye! Don't hesitate to reach out for collaborations or opportunities."
      ]
    },
    thanks: {
      triggers: ['thanks', 'thank you', 'appreciate', 'helpful'],
      responses: personalData?.conversational?.thanks || [
        "You're welcome! Let me know if there's anything else you'd like to know."
      ]
    },
    unknown: {
      responses: [
        "I'd love to share more about my education, skills, or projects. What would you like to know?",
        "Feel free to ask about my background in AI, my projects, or my technical skills!",
        "I'm happy to discuss my work in AI and Data Science. What interests you?"
      ]
    }
  };

  const topics = {
    education: {
      keywords: ['education', 'study', 'college', 'university', 'degree', 'course', 'major', 'academic', 'school'],
      response: () => {
        const current = personalData.education.current;
        const previous = personalData.education.previous[0];
        return {
          text: `I'm currently pursuing ${current.degree} with specialization in ${current.specialization} at ${current.college}, ${current.university}. Previously, I completed my ${previous.level} from ${previous.school} in ${previous.year}.`,
          button: {
            text: "View Education Details",
            link: "/education"
          }
        };
      }
    },
    skills: {
      keywords: ['skills', 'technologies', 'programming', 'technical', 'tools', 'expertise', 'know'],
      response: () => {
        const techSkills = personalData.skills.technical.filter(skill => !skill.includes('SKILL_'));
        const tools = personalData.skills.tools.filter(tool => !tool.includes('TOOL_'));
        return {
          text: `I specialize in ${techSkills.join(', ')}. I'm proficient with tools like ${tools.join(', ')}. My soft skills include ${personalData.skills.soft.join(', ')}.`,
          button: {
            text: "View Skills",
            link: "/skills"
          }
        };
      }
    },
    projects: {
      keywords: ['project', 'portfolio', 'work', 'built', 'created', 'developed', 'make'],
      response: () => {
        const project = personalData.projects[0];
        return {
          text: `One of my notable projects is ${project.name} - ${project.description}. It uses technologies like ${project.technologies.join(', ')}.`,
          button: {
            text: "View Projects",
            link: "/projects"
          }
        };
      }
    },
    background: {
      keywords: ['background', 'about', 'yourself', 'who are you', 'tell me about'],
      response: () => ({
        text: `I'm ${personalData.basic.name}, ${personalData.basic.age} years old, from ${personalData.basic.location.hometown}. Currently based in ${personalData.basic.location.current}. I'm passionate about ${personalData.basic.interests.join(', ')}.`,
        button: {
          text: "About Me",
          link: "/about"
        }
      })
    },
    contact: {
      keywords: ['contact', 'email', 'reach', 'connect', 'social', 'linkedin', 'github'],
      response: () => ({
        text: `You can connect with me on LinkedIn (${personalData.contact.linkedin}) or GitHub (${personalData.contact.github}). For direct communication, please use the contact form on my website.`,
        button: {
          text: "Contact Me",
          link: "/contact"
        }
      })
    }
  };

  // Auto-scroll effect with smooth behavior
  const scrollToBottom = () => {
    if (isAutoScrollEnabled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  // Handle scroll events to detect manual scrolling
  useEffect(() => {
    const container = messageContainerRef.current;
    let timeoutId;

    const handleScroll = () => {
      if (!container) return;
      
      clearTimeout(timeoutId);
      
      // Check if user has scrolled up
      const isScrolledUp = container.scrollHeight - container.scrollTop - container.clientHeight > 50;
      setIsAutoScrollEnabled(!isScrolledUp);

      // Re-enable auto-scroll after 2 seconds of no scrolling
      timeoutId = setTimeout(() => {
        setIsAutoScrollEnabled(true);
      }, 2000);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  // Trigger scroll when messages change or typing completes
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, displayedText]);

  // Enhanced typing effect
  useEffect(() => {
    if (currentTypingIndex >= 0 && currentTypingIndex < messages.length) {
      const message = messages[currentTypingIndex];
      if (message.sender === 'bot') {
        let index = 0;
        const text = message.text;
        const typeInterval = setInterval(() => {
          if (index <= text.length) {
            setDisplayedText(prev => text.substring(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
            setCurrentTypingIndex(-1);
            setDisplayedText('');
          }
        }, 25); // Slightly faster typing speed

        return () => clearInterval(typeInterval);
      }
    }
  }, [currentTypingIndex, messages]);

  useEffect(() => {
    if (personalData && personalData.basic) {
      setIsDataLoaded(true);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getRandomResponse = (responseArray) => {
    if (!Array.isArray(responseArray) || responseArray.length === 0) {
      return "I apologize, but I don't have enough information to provide a relevant response.";
    }
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const generateResponse = (message) => {
    const lowerMessage = message.toLowerCase().trim();
    
    // First check for typos
    if (countTypos(lowerMessage) > 1) {
      return {
        text: "I'm not sure what you're trying to say. Could you please rephrase that more clearly?",
        type: 'clarification'
      };
    }

    // Check for personal vs identity questions
    const questionType = isPersonalQuestion(lowerMessage);
    
    if (questionType.isPersonal) {
      return {
        text: "I prefer to keep personal matters private. I'd be happy to discuss my professional background and skills instead.",
        type: 'privacy'
      };
    }

    if (questionType.isIdentity) {
      return {
        text: `Hi! I'm ${personalData.basic.name}, ${personalData.basic.headline}. I'm ${personalData.basic.age} years old, currently based in ${personalData.basic.location.current}. I'm passionate about ${personalData.basic.interests.join(', ')}.`,
        type: 'introduction',
        button: {
          text: "Learn More About Me",
          link: "/about"
        }
      };
    }

    // Map the type names to match personalData.conversational keys
    const typeMapping = {
      greeting: 'greetings',
      goodbye: 'goodbye',
      thanks: 'thanks'
    };

    // Check for conversational patterns first
    const words = lowerMessage.split(' ');
    
    if (conversationalResponses.greetings.triggers.some(trigger => words.includes(trigger))) {
      return {
        text: getRandomResponse(personalData.conversational.greetings),
        type: 'greeting'
      };
    }

    if (conversationalResponses.goodbye.triggers.some(trigger => words.includes(trigger))) {
      return {
        text: getRandomResponse(personalData.conversational.goodbye),
        type: 'goodbye'
      };
    }

    if (conversationalResponses.thanks.triggers.some(trigger => words.includes(trigger))) {
      return {
        text: getRandomResponse(personalData.conversational.thanks),
        type: 'thanks'
      };
    }

    // Check for exact topic matches
    for (const [topicName, topicData] of Object.entries(topics)) {
      const hasKeyword = topicData.keywords.some(keyword => {
        const words = lowerMessage.split(' ');
        return words.includes(keyword) || 
               words.includes(keyword + 's') || 
               words.includes(keyword + 'ing');
      });

      if (hasKeyword) {
        try {
          const response = topicData.response();
          return {
            ...response,
            type: topicName
          };
        } catch (error) {
          console.error(`Error generating response for topic ${topicName}:`, error);
          return {
            text: getRandomResponse(personalData.conversational.unknown),
            type: 'unknown'
          };
        }
      }
    }

    // If no match is found, return unknown response
    return {
      text: getRandomResponse(personalData.conversational.unknown),
      type: 'unknown'
    };
  };

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInputMessage('');

    const response = generateResponse(message);

    setTimeout(() => {
      setMessages(prev => {
        const newMessages = [...prev, {
          text: response.text,
          sender: 'bot',
          button: response.button,
          type: response.type
        }];
        setCurrentTypingIndex(newMessages.length - 1);
        return newMessages;
      });
    }, 1000);
  };

  const examplePrompts = [
    "What's your educational background?",
    "What are your technical skills?",
    "Tell me about your recent projects",
    "How can I contact you?",
    "Tell me about yourself"
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onTouchStart={() => isMobile && setShowTooltip(true)}
        onTouchEnd={() => setTimeout(() => setShowTooltip(false), 2000)}
        className={`fixed bottom-8 ${isMobile ? 'right-2 w-12 h-12' : 'right-8'} 
          flex items-center space-x-2 bg-blue-900 text-white rounded-full shadow-lg 
          hover:bg-blue-900 transition-all duration-300 z-50 ${isMobile ? 'justify-center' : 'px-4 py-2'}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        {isMobile && showTooltip && (
          <span className="absolute bottom-14 left-0 text-xs bg-gray-700 text-white p-1 rounded-md z-50">
            Chat with me
          </span>
        )}
        {!isMobile && <span className="text-sm">Ask me anything</span>}
      </button>

      {isOpen && (
        <div className={`fixed bottom-24 ${isMobile ? 'right-2 w-72' : 'right-8 w-80'} 
          h-[400px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200`}>
          <div className="flex items-center justify-between p-3 border-b bg-blue-900 text-white rounded-t-lg">
            <h3 className="font-semibold text-sm">Chat with me</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-900 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium mb-2">
                    👋 Hi! I'm {personalData.basic.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {personalData.basic.headline}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">How can I help you? Try asking about:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Tell me about your education",
                      "What are your technical skills?",
                      "What projects have you worked on?",
                      "What is your background?",
                      "How can I contact you?"
                    ].map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-left p-2 bg-gray-100 rounded-lg hover:bg-gray-200 
                                 transition-colors text-xs text-gray-700"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col space-y-2 max-w-[80%]">
                    <div
                      className={`p-2 rounded-lg text-sm min-h-[2.5rem] ${
                        message.sender === 'user'
                          ? 'bg-blue-900 text-white rounded-br-none'
                          : 'bg-gray-100 rounded-bl-none text-gray-700'
                      }`}
                      style={{ minHeight: '2.5rem' }} // Force consistent height
                    >
                      {currentTypingIndex === index ? (
                        <span className="inline-block">{displayedText || ' '}</span>
                      ) : (
                        message.text
                      )}
                    </div>
                    {message.button && (
                      <Link 
                        href={message.button.link}
                        className="inline-flex items-center space-x-1 bg-blue-900 text-white px-3 py-1.5 rounded-lg hover:bg-blue-900 transition-colors text-xs"
                      >
                        <span>{message.button.text}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }} className="flex w-full space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm text-black placeholder:text-black"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2 bg-blue-900 text-white rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Send message</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}