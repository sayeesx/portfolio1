'use client';

import { useState } from 'react';
import { CheckCircle, Github, Linkedin, Twitter, Mail, Instagram, Facebook } from 'lucide-react';
import emailjs from 'emailjs-com';
import Layout from '@/components/Layout'; // Import the layout

export default function Component() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    setErrorMessage('');
    setIsSubmitted(false);

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setErrorMessage('Failed to send the message. Please try again.');
      });

    setFormData({
      name: '',
      email: '',
      message: ''
    });
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
      <div className="text-center">
        <h1 className="mt-6 text-3xl font-extrabold text-white">Connect with me</h1>
        <p className="mt-2 text-sm text-gray-400">Get in touch with me:</p>
      </div>

      {/* Render social links initially */}
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
            <div className="mb-4 p-3 bg-white text-blue-900 rounded-md flex items-center text-sm">
              <CheckCircle className="mr-2 h-5 w-5" />
              Your message has been sent successfully!
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-900 rounded-md flex items-center text-sm">
              {errorMessage}
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
              className="w-full bg-white text-blue-900 font-semibold py-2 px-4 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
}
