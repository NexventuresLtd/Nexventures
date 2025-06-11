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

  useEffect(() => {
    const toggleVisibility = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    if (!isPlaying || reducedMotion) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, reducedMotion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  const slideVariants = {
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
  };

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()} transition-all duration-500`}>
      {/* Accessibility Controls */}
      <div className={`fixed top-2 left-2 z-50 ${accessibilityMode ? 'block' : 'sr-only'} bg-white dark:bg-gray-800 p-2 rounded-lg border`}>
        <div className="flex flex-col gap-2 text-sm">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaAccessibleIcon /> High Contrast
          </button>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-2 py-1 rounded bg-transparent border"
          >
            <option value="small">Small Text</option>
            <option value="normal">Normal Text</option>
            <option value="large">Large Text</option>
          </select>
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Reduce Motion
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
      >
        {/* Slides */}
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

        {/* Overlay */}
        <div
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
          <button
            onClick={() => setAccessibilityMode(!accessibilityMode)}
            className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            title="Accessibility Options"
          >
            <FaAccessibleIcon size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <GiSunflower size={20} /> : <GiMoonOrbit size={20} />}
          </button>
        </div>

        {/* Slide Controls */}
        <div className="absolute top-5 left-5 flex gap-2 z-30">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
          </button>
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#952301]/0 text-[#fdefeb] border border-[#e75629] mb-4">
                <GiLightBulb className="animate-pulse" />
                <span className="text-sm font-medium">Innovation • Growth • Excellence</span>
              </span>
            </motion.div>

            <motion.h1
              variants={!reducedMotion ? itemVariants : {}}
              className="font-extrabold mb-6 leading-tight text-white text-4xl md:text-7xl"
            >
              {slides[currentSlide].title}
              <span className="block text-2xl md:text-4xl text-[#fc4b15] mt-2">
                {slides[currentSlide].subtitle}
              </span>
            </motion.h1>

            <motion.p
              variants={!reducedMotion ? itemVariants : {}}
              className="mb-8 max-w-3xl mx-auto text-gray-100 text-lg md:text-2xl"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              variants={!reducedMotion ? itemVariants : {}}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#952301] to-[#611701] text-white font-semibold hover:scale-105 transition-transform"
              >
                Connect with us <FaArrowRight />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/50 text-white font-semibold hover:bg-white/10 backdrop-blur-md"
              >
                View Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white shadow-md"
          aria-label="Scroll back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
