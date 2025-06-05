// src/pages/Home.tsx
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import { ThemeContext } from '../context/ThemeContext';
import { 
  GiMoonOrbit, 
  GiSunflower,
  GiRocket,
  GiLightBulb,
  GiTargeted,
  GiGears,
  GiTrophyCup,
  GiHand
} from 'react-icons/gi';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute,
  FaChevronDown,
  FaAccessibleIcon,
  FaKeyboard,
  FaEye,
  FaArrowRight,
  FaChartLine,
  FaUsers,
  FaCode
} from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdDesignServices } from 'react-icons/md';

const slides = [
  {
    image: bg1,
    title: "Innovative Solutions",
    subtitle: "Transforming ideas into digital reality",
    description: "We craft cutting-edge applications that drive business growth"
  },
  {
    image: bg2,
    title: "Expert Development",
    subtitle: "Full-stack excellence delivered",
    description: "From concept to deployment, we build scalable solutions"
  },
  {
    image: bg3,
    title: "Strategic Growth",
    subtitle: "Your success is our mission",
    description: "Empowering businesses through technology and innovation"
  }
];

const features = [
  { icon: FaCode, title: "Full-Stack Development", desc: "Complete web & mobile solutions" },
  { icon: MdDesignServices, title: "UI/UX Design", desc: "User-centered design approach" },
  { icon: FaChartLine, title: "Growth Analytics", desc: "Data-driven insights & optimization" },
  { icon: MdSecurity, title: "Secure Solutions", desc: "Enterprise-grade security standards" },
  { icon: MdSpeed, title: "Performance", desc: "Lightning-fast, optimized applications" },
  { icon: FaUsers, title: "Consulting", desc: "Strategic technology consulting" }
];

const stats = [
  { number: "150+", label: "Projects Delivered", icon: GiTrophyCup },
  { number: "50+", label: "Happy Clients", icon: GiHand },
  { number: "5+", label: "Years Experience", icon: GiRocket },
  { number: "24/7", label: "Support", icon: GiGears }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  const isFeaturesInView = useInView(featuresRef);
  const isStatsInView = useInView(statsRef);
  const controls = useAnimation();

  // Keyboard navigation state
  const [focusedElement, setFocusedElement] = useState(-1);
  const slideButtons = useRef([]);

  // Auto-slide functionality with pause/play
  useEffect(() => {
    if (!isPlaying || reducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isPlaying, reducedMotion]);

  // Prefers reduced motion detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!accessibilityMode) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        break;
      case ' ':
        e.preventDefault();
        setIsPlaying(!isPlaying);
        break;
      case 'Tab':
        setFocusVisible(true);
        break;
      case 'Escape':
        setFocusVisible(false);
        break;
    }
  }, [accessibilityMode, isPlaying]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const getThemeClasses = () => {
    const base = highContrast 
      ? 'bg-black text-white' 
      : darkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-white text-gray-900';
    
    const fontClass = fontSize === 'large' ? 'text-xl' : fontSize === 'small' ? 'text-sm' : 'text-base';
    
    return `${base} ${fontClass}`;
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()} transition-all duration-500`}>
      {/* Accessibility Controls */}
      <div className={`fixed top-2 left-2 z-50 ${accessibilityMode ? 'block' : 'sr-only'} bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border`}>
        <div className="flex flex-col gap-2 text-sm">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle high contrast mode"
          >
            <FaEye /> High Contrast
          </button>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-2 py-1 rounded bg-transparent border"
            aria-label="Font size selector"
          >
            <option value="small">Small Text</option>
            <option value="normal">Normal Text</option>
            <option value="large">Large Text</option>
          </select>
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle reduced motion"
          >
            Reduce Motion
          </button>
        </div>
      </div>

      {/* Main Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
        role="banner"
        aria-label="Hero section with sliding background images"
      >
        {/* Background Slides */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              variants={!reducedMotion ? slideVariants : {}}
              initial="enter"
              animate={currentSlide === index ? "center" : "exit"}
              transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeInOut" }}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
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
            className={`p-3 rounded-full transition-all duration-300 ${
              focusVisible ? 'ring-4 ring-orange-500' : ''
            } ${
              highContrast 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700'
            }`}
            aria-label="Toggle accessibility controls"
            title="Accessibility Options"
          >
            <FaAccessibleIcon size={20} />
          </button>
          
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 ${
              focusVisible ? 'ring-4 ring-orange-500' : ''
            } ${
              highContrast 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700'
            }`}
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <GiSunflower size={20} /> : <GiMoonOrbit size={20} />}
          </button>
        </div>

        {/* Slide Controls */}
        <div className="absolute top-5 left-5 flex gap-2 z-30">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-3 rounded-full transition-all duration-300 ${
              highContrast 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700'
            }`}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
          
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full transition-all duration-300 ${
              highContrast 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700'
            }`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={!reducedMotion ? containerVariants : {}}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              variants={!reducedMotion ? itemVariants : {}}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#952301]/20 text-[#952301] dark:text-orange-300 border border-[#952301]/30 mb-6">
                <GiLightBulb className="animate-pulse" />
                <span className="text-sm font-medium">Innovation • Growth • Excellence</span>
              </span>
            </motion.div>

            <motion.h1
              variants={!reducedMotion ? itemVariants : {}}
              className={`font-extrabold mb-6 leading-tight ${
                fontSize === 'large' ? 'text-5xl md:text-8xl' : 
                fontSize === 'small' ? 'text-3xl md:text-5xl' : 
                'text-4xl md:text-7xl'
              } ${
                highContrast ? 'text-white' : 'text-white drop-shadow-2xl'
              }`}
            >
              {slides[currentSlide].title}
              <span className="block text-2xl md:text-4xl text-[#952301] dark:text-orange-300 mt-2">
                {slides[currentSlide].subtitle}
              </span>
            </motion.h1>

            <motion.p
              variants={!reducedMotion ? itemVariants : {}}
              className={`mb-8 max-w-3xl mx-auto leading-relaxed ${
                fontSize === 'large' ? 'text-2xl md:text-3xl' : 
                fontSize === 'small' ? 'text-base md:text-lg' : 
                'text-lg md:text-2xl'
              } ${
                highContrast ? 'text-gray-200' : 'text-gray-100 drop-shadow-lg'
              }`}
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              variants={!reducedMotion ? itemVariants : {}}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/about"
                className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  highContrast 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-gradient-to-r from-[#952301] to-[#611701] hover:from-[#611701] hover:to-[#952301] text-white shadow-2xl hover:shadow-[#952301]/50'
                } ${
                  focusVisible ? 'ring-4 ring-orange-500' : ''
                }`}
                aria-label="Learn more about NexVentures"
              >
                Connect with us
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/portfolio"
                className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                  highContrast 
                    ? 'border-2 border-white text-white hover:bg-white hover:text-black' 
                    : 'border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-md'
                } ${
                  focusVisible ? 'ring-4 ring-orange-500' : ''
                }`}
                aria-label="View our portfolio"
              >
                View Portfolio
                <GiTargeted className="group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex gap-3" role="tablist" aria-label="Slide navigation">
            {slides.map((slide, index) => (
              <button
                key={index}
                ref={(el) => slideButtons.current[index] = el}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? (highContrast ? 'bg-white scale-125' : 'bg-[#952301] scale-125 shadow-lg') 
                    : (highContrast ? 'bg-gray-500' : 'bg-white/50 hover:bg-white/70')
                } ${
                  focusVisible ? 'ring-2 ring-orange-500 ring-offset-2' : ''
                }`}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                role="tab"
                aria-selected={currentSlide === index}
                tabIndex={currentSlide === index ? 0 : -1}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-sm font-medium">Scroll to explore</span>
            <FaChevronDown size={20} />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          highContrast 
            ? 'bg-gray-900' 
            : darkMode 
              ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
              : 'bg-gradient-to-b from-gray-50 to-white'
        }`}
        aria-label="Our services and features"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={!reducedMotion ? containerVariants : {}}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2
              variants={!reducedMotion ? itemVariants : {}}
              className={`font-bold mb-6 ${
                fontSize === 'large' ? 'text-4xl md:text-6xl' : 
                fontSize === 'small' ? 'text-2xl md:text-4xl' : 
                'text-3xl md:text-5xl'
              } ${
                highContrast ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}
            >
              Our <span className="text-[#952301]">Services</span>
            </motion.h2>
            
            <motion.p
              variants={!reducedMotion ? itemVariants : {}}
              className={`max-w-2xl mx-auto ${
                fontSize === 'large' ? 'text-xl md:text-2xl' : 
                fontSize === 'small' ? 'text-sm md:text-base' : 
                'text-lg md:text-xl'
              } ${
                highContrast ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Comprehensive digital solutions tailored to your business needs
            </motion.p>
          </motion.div>

          <motion.div
            variants={!reducedMotion ? containerVariants : {}}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={!reducedMotion ? itemVariants : {}}
                whileHover={!reducedMotion ? { y: -5, scale: 1.02 } : {}}
                className={`group p-8 rounded-2xl transition-all duration-300 ${
                  highContrast 
                    ? 'bg-black border-2 border-white hover:border-gray-300' 
                    : 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-[#952301]/30'
                }`}
                role="article"
                aria-labelledby={`feature-${index}-title`}
              >
                <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 ${
                  highContrast 
                    ? 'bg-white text-black group-hover:bg-gray-200' 
                    : 'bg-gradient-to-br from-[#952301]/10 to-[#611701]/10 text-[#952301] group-hover:from-[#952301]/20 group-hover:to-[#611701]/20'
                }`}>
                  <feature.icon size={28} />
                </div>
                
                <h3 
                  id={`feature-${index}-title`}
                  className={`font-bold mb-3 ${
                    fontSize === 'large' ? 'text-2xl' : 
                    fontSize === 'small' ? 'text-lg' : 
                    'text-xl'
                  } ${
                    highContrast ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {feature.title}
                </h3>
                
                <p className={`${
                  fontSize === 'large' ? 'text-lg' : 
                  fontSize === 'small' ? 'text-sm' : 
                  'text-base'
                } ${
                  highContrast ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          highContrast 
            ? 'bg-black' 
            : 'bg-gradient-to-r from-[#952301] to-[#611701]'
        }`}
        aria-label="Company statistics and achievements"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={!reducedMotion ? containerVariants : {}}
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={!reducedMotion ? itemVariants : {}}
                className="text-center group"
                role="article"
                aria-labelledby={`stat-${index}-number`}
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                  highContrast 
                    ? 'bg-white text-black group-hover:bg-gray-200' 
                    : 'bg-white/20 text-white group-hover:bg-white/30 group-hover:scale-110'
                }`}>
                  <stat.icon size={32} />
                </div>
                
                <h3 
                  id={`stat-${index}-number`}
                  className={`font-bold mb-2 ${
                    fontSize === 'large' ? 'text-4xl md:text-6xl' : 
                    fontSize === 'small' ? 'text-2xl md:text-4xl' : 
                    'text-3xl md:text-5xl'
                  } ${
                    highContrast ? 'text-white' : 'text-white'
                  }`}
                >
                  {stat.number}
                </h3>
                
                <p className={`font-medium ${
                  fontSize === 'large' ? 'text-lg' : 
                  fontSize === 'small' ? 'text-sm' : 
                  'text-base'
                } ${
                  highContrast ? 'text-gray-300' : 'text-white/90'
                }`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#952301] text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Currently viewing slide ${currentSlide + 1} of ${slides.length}: ${slides[currentSlide].title}`}
      </div>
    </div>
  );
}