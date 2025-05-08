'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Github, Linkedin, Twitter, Mail, Instagram, Facebook } from 'lucide-react';
import emailjs from 'emailjs-com';
import Layout from '@/components/Layout';
import ReactConfetti from 'react-confetti';

export default function Component() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus({ type: '', message: '' }); // Clear any error messages on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        throw new Error('Email configuration missing');
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setStatus({ 
        type: 'success', 
        message: 'Message sent successfully! 🎉' 
      });
      setFormData({ name: '', email: '', message: '' });
      
      // Show confetti for 3 seconds
      setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 3000);
      
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/sayeesx' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/muhammed-sayees-152390284/' },
    { name: 'X', icon: Twitter, url: 'https://x.com/sayeesck' },
    { name: 'Email', icon: Mail, url: 'mailto:sayeesck@yahoo.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/sayees__/' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/sayees' },
  ];

  return (
    <Layout>
      {status.type === 'success' && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Let's Connect</h1>
          <p className="text-gray-400">Reach out through social media or send me a message directly</p>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 hover:bg-blue-500/10 rounded-full transition-all duration-300"
            >
              <link.icon className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full md:w-auto mx-auto block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {showForm ? '× Close Form' : '✉ Send Message'}
        </button>

        {showForm && (
          <div className="mt-8">
            {status.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                status.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
