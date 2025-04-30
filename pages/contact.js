'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Github, Linkedin, Twitter, Mail, Instagram, Facebook } from 'lucide-react';
import emailjs, { init } from 'emailjs-com';
import Layout from '@/components/Layout';
import ReactConfetti from 'react-confetti';

export default function Component() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Form validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all fields');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Check if EmailJS configuration exists
      if (!serviceID || !templateID || !publicKey) {
        throw new Error('Email service configuration is missing');
      }

      const response = await emailjs.send(serviceID, templateID, formData, publicKey);
      
      if (response.status !== 200) {
        throw new Error('Failed to send email. Please try again later.');
      }

      setIsSubmitted(true);
      setShowConfetti(true);
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setTimeout(() => {
        setShowConfetti(false);
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error:', error);
      
      // Handle specific error cases
      if (error.text) {
        setErrorMessage(`Email sending failed: ${error.text}`);
      } else if (error.message === 'Network Error') {
        setErrorMessage('Network error. Please check your internet connection.');
      } else if (error.message.includes('configuration')) {
        setErrorMessage('Email service is not properly configured. Please contact the administrator.');
      } else {
        setErrorMessage(error.message || 'An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/sayeesx' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/muhammed-sayees-152390284/' },
    { name: 'X', icon: Twitter, url: 'https://x.com/sayeesck' },
    { name: 'Email', icon: Mail, url: 'mailto:sayeesck@yahoo.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/sayees__/profilecard/?igsh=cnYxMzdubWt6YWp6' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook/sayees.com' },
  ];

  return (
    <Layout>
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      <div className="text-center">
        <h1 className="mt-6 text-3xl font-extrabold text-white">Connect with me</h1>
        <p className="mt-2 text-sm text-gray-400">Get in touch with me:</p>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        {socialLinks.map((link) => (
          <div key={link.name} className="relative group">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
            >
              <link.icon className="h-6 w-6 text-gray-400 group-hover:text-blue-500" />
            </a>
            <span className="absolute left-1/2 transform -translate-x-1/2 translate-y-1 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Go to my {link.name} page
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-900 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition-colors duration-200 mt-8"
        >
          {showForm ? 'Hide contact form' : 'Send message directly'}
        </button>
      </div>

      {showForm && (
        <div className="mt-8 bg-blue-900 p-4 rounded-lg shadow-md">
          {isSubmitted && (
            <div className="mb-4 p-3 bg-green-100 text-green-900 rounded-md flex items-center text-sm">
              <CheckCircle className="mr-2 h-5 w-5" />
              Your message has been sent successfully! 🎉
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-900 rounded-md flex items-center text-sm">
              <svg 
                className="w-5 h-5 mr-2 text-red-500" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-10 py-2 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm h-24"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-blue-900 font-semibold py-2 px-4 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900 disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
}
