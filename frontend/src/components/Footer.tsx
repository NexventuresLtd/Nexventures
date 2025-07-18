// src/components/Footer.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Clock, Twitter, Linkedin, 
  ArrowUp, Instagram, Youtube, Send, Award, Users, Star, ChevronUp, Shield 
} from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import logo from '../assets/Icon.png';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const [newsletter, setNewsletter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [highContrast] = useState(false);
  const [fontSize] = useState('normal');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  // Scroll to top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Animation trigger
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Newsletter submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletter.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubscribed(true);
    setNewsletter('');
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100
      }
    }
  };

  const socialHoverVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    <footer 
      ref={ref}
      className={`relative bg-gradient-to-br from-[#6d1a01] via-[#791d02] to-[#581601] text-white overflow-hidden ${
        highContrast ? 'contrast-125' : ''
      } ${
        fontSize === 'large' ? 'text-lg' : fontSize === 'extra-large' ? 'text-xl' : 'text-sm'
      } ${className}`}
      role="contentinfo"
      aria-label="Website footer"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-[#952301] rounded-full opacity-10"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#611701] rounded-full opacity-10"
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Footer Content */}
      <motion.div
        className="relative z-10 py-12 px-5"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-full md:max-w-[91.666667%] mx-auto">
          {/* Newsletter Section */}
          <motion.div
            className="mb-12 text-center"
            variants={itemVariants}
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Stay Updated with Our Latest News
              </h2>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for exclusive updates, industry insights, and special offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#952301] focus:border-transparent backdrop-blur-sm"
                  required
                  aria-label="Email address for newsletter"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#952301] hover:bg-[#611701] rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#952301] focus:ring-offset-2 focus:ring-offset-[#611701] disabled:opacity-50"
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Send size={16} />
                      Subscribe
                    </>
                  )}
                </motion.button>
              </form>
              {isSubscribed && (
                <motion.p
                  className="mt-3 text-green-400 font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  ✓ Successfully subscribed to our newsletter!
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-12 h-12 bg-white rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={logo} className='w-3/4' alt="Nexventures Logo" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Nexventures Ltd</h3>
                  <p className="text-[#faa389] text-sm font-medium">Innovation • Growth • Excellence</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Empowering businesses with scalable digital solutions for the future. 100% remote,
                cloud-native, and built for impact. We transform ideas into powerful digital experiences.
              </p>
              
              {/* Company Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Users, label: 'Clients', value: '40+' },
                  { icon: Award, label: 'Projects', value: '135+' },
                  { icon: Star, label: 'Rating', value: '4.9' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(149, 35, 1, 0.1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <stat.icon size={20} className="text-[#ffd8cc] mx-auto mb-1" />
                    <div className="text-white font-bold">{stat.value}</div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} className="text-[#f3683d]" />
                <span>Kigali, Rwanda</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.nav
              aria-label="Footer Navigation"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#b9aaa5] rounded-full"></div>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", path: "" },
                  { label: "About Us", path: "about" },
                  { label: "Services", path: "services" },
                  { label: "Portfolio", path: "portfolio" },
                  { label: "Contact", path: "contact" },
                  { label: "Blog", path: "blog" }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <Link
                      to={link.path === "" ? "/" : `/${link.path}`}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#952301] rounded px-1 py-1"
                    >
                      <ChevronUp size={12} className="rotate-90 text-[#e6d3cd] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#952301] rounded-full"></div>
                Contact Us
              </h4>
              <ul className="space-y-4 text-gray-300">
                {[
                  { 
                    icon: Mail, 
                    content: 'info@nexventures.net', 
                    href: 'mailto:info@nexventures.net',
                    label: 'Email us'
                  },
                  { 
                    icon: Phone, 
                    content: '+250 795 022 500', 
                    href: 'tel:+250795022500',
                    label: 'Call us'
                  },
                  { 
                    icon: Clock, 
                    content: 'Mon – Fri, 9AM – 5PM CAT',
                    label: 'Business hours'
                  }
                ].map((contact, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-8 h-8 bg-[#ddb4a7] rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon size={16} className="text-[#752007]" />
                    </div>
                    {contact.href ? (
                      <a 
                        href={contact.href} 
                        className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#952301] rounded px-1"
                        aria-label={contact.label}
                      >
                        {contact.content}
                      </a>
                    ) : (
                      <span>{contact.content}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#952301] rounded-full"></div>
                Follow Us
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Twitter, label: 'Twitter', href: 'https://x.com/Nexventuresltd' },
                    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/nexventures-ltd/?viewAsMember=true' },
                    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/nexventuresltd/' },
                    { icon: Youtube, label: 'Youtube', href: 'https://www.youtube.com/@nexventuresltd' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="flex items-center gap-2 p-3 bg-white/5 rounded-lg hover:bg-[#952301]/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#952301] group"
                      variants={socialHoverVariants}
                      whileHover="hover"
                    >
                      <social.icon size={18} className="text-gray-300 group-hover:text-white transition-colors" />
                      <span className="text-xs text-gray-400 group-hover:text-gray-300">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
                
                {/* Additional Links */}
                <div className="pt-4 border-t border-white/10">
                  <h5 className="text-sm font-medium text-gray-300 mb-2">Legal</h5>
                  <div className="space-y-1">
                    {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map((link, index) => (
                      <Link
                        key={index}
                        to={`/${link.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                        className="block text-xs text-gray-400 hover:text-gray-300 transition-colors focus:outline-none focus:ring-1 focus:ring-[#952301] rounded px-1"
                      >
                        {link}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        className="relative z-10 border-t border-white/10 py-6 px-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="max-w-full md:max-w-[91.666667%] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p>&copy; {new Date().getFullYear()} Nexventures Ltd. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Shield size={12} className="text-[#f09276]" />
                  SSL Secured
                </span>
                <span className="flex items-center gap-1">
                  <Shield size={12} className="text-[#f3a188]" />
                  WCAG 2.1 AA Compliant
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-5 right-24 z-50 w-12 h-12 bg-gradient-to-r from-[#952301] to-[#d87f63] text-white rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#952301] focus:ring-offset-2 shadow-lg"
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: showBackToTop ? 1 : 0,
          y: showBackToTop ? 0 : 100,
          pointerEvents: showBackToTop ? 'auto' : 'none'
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20
        }}
        whileHover={{ scale: 1.1, boxShadow: '0 8px 25px rgba(149, 35, 1, 0.3)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}