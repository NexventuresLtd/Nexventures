// src/pages/Home.tsx
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext, useRef } from 'react';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import { ThemeContext } from '../context/ThemeContext';
import {
  GiMoonOrbit,
  GiSunflower,
  GiLightBulb,
} from 'react-icons/gi';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaAccessibleIcon,
  FaArrowRight,
  FaArrowUp,
} from 'react-icons/fa';

const slides = [
  {
    image: bg1,
    title: 'Innovative Solutions',
    subtitle: 'Transforming ideas into digital reality',
    description: 'We craft cutting-edge applications that drive business growth',
  },
  {
    image: bg2,
    title: 'Expert Development',
    subtitle: 'Full-stack excellence delivered',
    description: 'From concept to deployment, we build scalable solutions',
  },
  {
    image: bg3,
    title: 'Strategic Growth',
    subtitle: 'Your success is our mission',
    description: 'Empowering businesses through technology and innovation',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);

  // Handle scroll visibility for back to top button
  useEffect(() => {
    const toggleVisibility = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Auto-play slide carousel
  useEffect(() => {
    if (!isPlaying || reducedMotion) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, reducedMotion]);

  // Detect user motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  // Animation variants for slide transitions
  const slideVariants = {
    enter: {
      x: 1000,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      x: -1000,
      opacity: 0,
    },
  };

  // Staggered container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Individual item animations with spring physics
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Floating animation for accessibility button
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Button hover animation
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  // Back to top button animation
  const backToTopVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Get theme classes based on current settings
  const getThemeClasses = () => {
    const base = highContrast
      ? 'bg-black text-white'
      : darkMode
        ? 'bg-red-500 text-white'
        : 'bg-white text-gray-900';
    const fontClass =
      fontSize === 'large'
        ? 'text-xl'
        : fontSize === 'small'
          ? 'text-sm'
          : 'text-base';
    return `${base} ${fontClass}`;
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()} transition-all duration-500`}>
      {/* Accessibility Controls */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ 
          opacity: accessibilityMode ? 1 : 0,
          x: accessibilityMode ? 0 : -100,
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-2 left-2 z-50 ${accessibilityMode ? 'block' : 'sr-only'} bg-white dark:bg-gray-800 p-2 rounded-lg border shadow-lg`}
      >
        <div className="flex flex-col gap-2 text-sm">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaAccessibleIcon /> High Contrast
          </motion.button>
          <motion.select
            whileHover={{ scale: 1.02 }}
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-2 py-1 rounded bg-transparent border transition-colors"
          >
            <option value="small">Small Text</option>
            <option value="normal">Normal Text</option>
            <option value="large">Large Text</option>
          </motion.select>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
      >
        {/* Background Slides */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              variants={!reducedMotion ? slideVariants : {}}
              initial="enter"
              animate={currentSlide === index ? 'center' : 'exit'}
              transition={{ duration: reducedMotion ? 0 : 0.8, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                filter: 'blur(5px) brightness(0.4)',
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 ${
            highContrast
              ? 'bg-black/90'
              : darkMode
                ? 'bg-gradient-to-br from-black/80 via-[#611701]/60 to-[#952301]/40'
                : 'bg-gradient-to-br from-black/70 via-[#611701]/50 to-[#952301]/30'
          }`}
        />

        {/* Theme & Accessibility Toggle */}
        <div className="absolute top-5 right-5 flex gap-2 z-30">
          <motion.button
            variants={!reducedMotion ? floatingVariants : {}}
            animate={!reducedMotion ? 'animate' : ''}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setAccessibilityMode(!accessibilityMode)}
            className="p-3 rounded-full bg-white/90 text-white hover:bg-white/30 transition-all duration-300"
            title="Accessibility Options"
          >
            <FaAccessibleIcon size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <motion.div
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {darkMode ? <GiSunflower size={20} /> : <GiMoonOrbit size={20} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Slide Controls */}
        <div className="absolute top-5 left-5 flex gap-2 z-30">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isPlaying ? 0 : 90 }}
              transition={{ duration: 0.3 }}
            >
              {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </motion.div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300"
          >
            <motion.div
              animate={{ scale: isMuted ? 0.8 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div
            variants={!reducedMotion ? containerVariants : {}}
            initial="hidden"
            animate={isHeroInView ? 'visible' : 'hidden'}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={!reducedMotion ? itemVariants : {}}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#952301]/20 text-[#fdefeb] border border-[#e75629] mb-4 backdrop-blur-md">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <GiLightBulb />
                </motion.div>
                <span className="text-sm font-medium">Innovation • Growth • Excellence</span>
              </span>
            </motion.div>

            <motion.h1
              variants={!reducedMotion ? itemVariants : {}}
              className="font-extrabold mb-6 leading-tight text-white text-4xl md:text-7xl"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {slides[currentSlide].title}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="block text-2xl md:text-4xl text-[#fc4b15] mt-2"
              >
                {slides[currentSlide].subtitle}
              </motion.span>
            </motion.h1>

            <motion.p
              variants={!reducedMotion ? itemVariants : {}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mb-8 max-w-3xl mx-auto text-gray-100 text-lg md:text-2xl"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              variants={!reducedMotion ? itemVariants : {}}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                variants={!reducedMotion ? buttonVariants : {}}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#952301] to-[#611701] text-white font-semibold hover:shadow-lg transition-all duration-300 group"
                >
                  Connect with us
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div
                variants={!reducedMotion ? buttonVariants : {}}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/50 text-white font-semibold hover:bg-white/10 backdrop-blur-md transition-all duration-300"
                >
                  View Portfolio
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      <motion.button
        variants={!reducedMotion ? backToTopVariants : {}}
        initial="hidden"
        animate={showBackToTop ? 'visible' : 'hidden'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg hover:bg-white/30 transition-all duration-300"
        aria-label="Scroll back to top"
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaArrowUp />
        </motion.div>
      </motion.button>

      {/* Floating particles effect (optional) */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}