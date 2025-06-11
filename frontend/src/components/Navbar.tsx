// src/components/Navbar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, ShieldCheck, FileText, Briefcase, HelpCircle, 
  BookOpenCheck, Moon, Sun, Search, ChevronDown, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Handle scroll effects
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const toggleContrast = () => setHighContrast(!highContrast);
  
  const changeFontSize = () => {
    toggleSound()
    toggleContrast();
    const sizes = ['normal', 'large', 'extra-large'];
    const currentIndex = sizes.indexOf(fontSize);
    setFontSize(sizes[(currentIndex + 1) % sizes.length]);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation items with enhanced structure
  const navItems = [
    { 
      to: '/about', 
      label: 'About', 
      icon: <FileText size={16} />,
      description: 'Our story and mission',
      hasDropdown: false
    },
    { 
      to: '/services', 
      label: 'Services', 
      icon: <Briefcase size={16} />,
      description: 'What we offer',
      hasDropdown: false
    },
    { 
      to: '/portfolio', 
      label: 'Portfolio', 
      icon: <BookOpenCheck size={16} />,
      description: 'Our work showcase',
      hasDropdown: false
    },
    { 
      to: '/blog', 
      label: 'Blog', 
      icon: <FileText size={16} />,
      description: 'Latest insights',
      hasDropdown: false
    },
    { 
      to: '/faqs', 
      label: 'FAQs', 
      icon: <HelpCircle size={16} />,
      description: 'Common questions',
      hasDropdown: false
    },
    { 
      to: '/career', 
      label: 'Careers', 
      icon: <ShieldCheck size={16} />,
      description: 'Join our team',
      hasDropdown: false
    }
  ];

  const isActive = (path: string) => location.pathname === path || 
    (path !== '/' && location.pathname.startsWith(path));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: {
        opacity: { duration: 0.1 },
        height: { duration: 0.2, delay: 0.1 }
      }
    }
  };

  return (
    <motion.header
      ref={navbarRef}
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-lg ${
        isScrolled 
          ? `bg-white/80 ${darkMode ? 'dark:bg-[#611701]/90' : ''}  border-b border-[#952301]/10`
          : `bg-white ${darkMode ? 'dark:bg-[#611701]' : ''} `
      } ${
        highContrast ? 'contrast-125' : ''
      } ${
        fontSize === 'large' ? 'text-lg' : fontSize === 'extra-large' ? 'text-xl' : 'text-base'
      } ${className}`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Navigation */}
      <div className="max-w-full md:max-w-11/12 mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="flex items-center gap-3 text-2xl font-bold text-[#952301] tracking-tight focus:outline-none focus:ring-2 focus:ring-[#952301] rounded-lg px-2 py-1"
            >
              <div>
                <div className="text-[#952301]">NexVentures</div>
                <div className="text-xs text-gray-500 font-normal -mt-1">Innovation • Growth • Excellence</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.to} className="relative">
                <motion.div
                  onHoverStart={() => item.hasDropdown && setActiveDropdown(item.to)}
                  onHoverEnd={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#952301] group ${
                      isActive(item.to)
                        ? 'text-[#952301] bg-[#952301]/10'
                        : 'text-gray-700 hover:text-[#952301] hover:bg-[#952301]/5'
                    }`}
                  >
                    <span className="transition-transform group-hover:scale-110">
                      {item.icon}
                    </span>
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform ${
                          activeDropdown === item.to ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.to && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-gray-200 overflow-hidden z-50"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="p-3 bg-gradient-to-r from-[#952301]/5 to-[#611701]/5 border-b border-gray-100">
                          <h3 className="font-semibold text-[#952301] flex items-center gap-2">
                            {item.icon}
                            {item.label}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                        </div>
                        <div className="py-2">
                          {/* Add dropdown items here if needed */}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="px-6 py-2 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#952301] flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-[#952301] hover:bg-[#952301]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#952301]"
            onClick={toggleMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-6">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#952301]"
                />
              </form>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.to}
                      className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
                        isActive(item.to)
                          ? 'text-[#952301] bg-[#952301]/10'
                          : 'text-gray-700 hover:text-[#952301] hover:bg-[#952301]/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <div>
                        <div>{item.label}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                      <ArrowRight size={16} className="ml-auto" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-3 w-full p-3 text-gray-600 hover:text-[#952301] transition-colors"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-lg font-medium"
                  onClick={() => {setIsOpen(false);changeFontSize()}}
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}