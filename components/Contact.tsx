import emailjs from '@emailjs/browser';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaCheckCircle,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaSpinner,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';
import { TopmateIcon } from './icons/TopmateIcon';

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

import portfolioData from '../data/portfolio.json';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your actual EmailJS Service ID, Template ID, and Public Key
      // You can find these in your EmailJS dashboard: https://dashboard.emailjs.com/
      const SERVICE_ID = 'YOUR_SERVICE_ID';
      const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
      const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

      if (form.current) {
        await emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          form.current,
          PUBLIC_KEY,
        );
        console.log('Form submitted successfully');
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback for demo purposes if EmailJS is not configured
      if ((error as any).text?.includes('The user ID is required')) {
        console.warn('EmailJS not configured. Simulating success.');
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
        });
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <SiGmail />,
      label: 'Email',
      value: portfolioData.contact.email,
      href: `mailto:${portfolioData.contact.email}`,
      color: 'text-red-500',
    },
    {
      icon: <FaWhatsapp />,
      label: 'Phone',
      value: portfolioData.contact.phone,
      href: `https://wa.me/${portfolioData.contact.phone.replace(/[^0-9]/g, '')}`,
      color: 'text-green-500',
    },

    {
      icon: <TopmateIcon />,
      label: 'Mentorship',
      value: 'Book a session on Topmate',
      href:
        portfolioData.contact.social.find((s) => s.platform === 'Topmate')
          ?.url || 'https://topmate.io/lalitmee',
      color: 'text-orange-500',
    },
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      href: portfolioData.contact.social.find((s) => s.platform === 'LinkedIn')
        ?.url!,
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      href: portfolioData.contact.social.find((s) => s.platform === 'GitHub')
        ?.url!,
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
      bgColor: 'hover:bg-gray-50 dark:hover:bg-gray-800',
    },
    {
      icon: <FaTwitter />,
      label: 'Twitter',
      href: portfolioData.contact.social.find((s) => s.platform === 'Twitter')
        ?.url!,
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    {
      icon: <TopmateIcon />,
      label: 'Topmate',
      href: portfolioData.contact.social.find((s) => s.platform === 'Topmate')
        ?.url!,
      color: 'hover:text-orange-500',
      bgColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/20',
    },
  ];

  if (isSubmitted) {
    return (
      <section
        id="contact"
        className="py-20 bg-white/80 dark:bg-gray-900 transition-colors duration-500"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-12 border border-green-200 dark:border-green-800">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Thank You!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {portfolioData.sections.contact.successMessage}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-20 bg-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {portfolioData.sections.contact.title.split(' ')[0]}{' '}
            {portfolioData.sections.contact.title.split(' ')[1]}{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {portfolioData.sections.contact.title.split(' ')[2]}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {portfolioData.sections.contact.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            className={twMerge(
              'space-y-8 transition-all duration-500',
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4',
            )}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {portfolioData.sections.contact.getInTouch}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {portfolioData.sections.contact.getInTouchDesc}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    info.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="flex items-center space-x-4 p-4 bg-white/80 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98] border border-gray-200 dark:border-gray-700"
                >
                  <div className={twMerge('text-2xl', info.color)}>
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {info.label}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {portfolioData.sections.contact.connectWithMe}
              </h4>
              <div className="flex justify-center lg:justify-start space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={twMerge(
                      'p-4 bg-white/80 dark:bg-gray-800 rounded-xl transition-all duration-300 text-gray-600 dark:text-gray-400 hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-700',
                      social.color,
                      social.bgColor,
                    )}
                    aria-label={social.label}
                  >
                    <div className="text-2xl">{social.icon}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {portfolioData.sections.contact.currentAvailability}
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                I'm currently{' '}
                <span className="text-green-600 font-semibold">available</span>{' '}
                for new projects and consulting opportunities. Typical response
                time: <span className="font-semibold">within 24 hours</span>.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={twMerge(
              'transition-all duration-500',
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-4',
            )}
          >
            <div className="bg-white/80 dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {portfolioData.sections.contact.sendMessage}
              </h3>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {portfolioData.sections.contact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={twMerge(
                        'w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500',
                        errors.name
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white',
                      )}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {portfolioData.sections.contact.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={twMerge(
                        'w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500',
                        errors.email
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white',
                      )}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {portfolioData.sections.contact.form.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
                    placeholder="Your company name (optional)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {portfolioData.sections.contact.form.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={twMerge(
                      'w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500',
                      errors.subject
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white',
                    )}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {portfolioData.sections.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={twMerge(
                      'w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-vertical',
                      errors.message
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white',
                    )}
                    placeholder="Tell me about your project, ideas, or just say hello..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={twMerge(
                    'w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98]',
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/25 text-white',
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
