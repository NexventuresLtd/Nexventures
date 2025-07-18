// src/pages/Home.tsx
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
  FaArrowRight,
  FaArrowUp,
} from 'react-icons/fa';

type Slide = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
};

const slides: Slide[] = [
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
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);

  // Preload images and handle loading state
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = slides.map((slide) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => prev + 1);
            resolve();
          };
          img.onerror = () => {
            setImagesLoaded(prev => prev + 1);
            resolve();
          };
          img.src = slide.image;
        });
      });

      await Promise.all(imagePromises);
      
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Loader Component
  const Loader = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-[#310c01] via-[#250901] to-black z-10 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <div className="mb-8">
          <GiLightBulb 
            className="text-6xl text-[#fc4b15] animate-pulse mx-auto mb-4" 
          />
          <div className="text-white text-2xl font-bold mb-2">Welcome to Nexventures</div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-[#fc4b15] to-[#e75629] transition-all duration-300 ease-out"
            style={{ width: `${(imagesLoaded / slides.length) * 100}%` }}
          />
        </div>
        
        {/* Loading Text */}
        <div className="text-gray-300 text-sm">
          Loading images ({imagesLoaded}/{slides.length})
        </div>
        
        {/* Spinning Loader */}
        <div className="mt-6">
          <div className="w-8 h-8 border-2 border-[#fc4b15] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-500`}>
      {/* Loader */}
      {isLoading && <Loader />}
      
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative h-screen overflow-hidden transition-opacity duration-700 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Slides */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
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
        <div className="absolute inset-0 bg-black/50" />

        {/* Theme Toggle */}
        <div className="absolute top-5 right-5 flex gap-2 z-30">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <GiSunflower size={20} /> : <GiMoonOrbit size={20} />}
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-5xl mx-auto">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#952301]/0 text-[#fdefeb] border border-[#e75629] mb-4">
                <GiLightBulb className="animate-pulse" />
                <span className="text-sm font-medium">Innovation • Growth • Excellence</span>
              </span>
            </div>

            <h1 className="font-extrabold mb-6 leading-tight text-white text-4xl md:text-7xl">
              {slides[currentSlide].title}
              <span className="block text-2xl md:text-4xl text-[#fc4b15] mt-2">
                {slides[currentSlide].subtitle}
              </span>
            </h1>

            <p className="mb-8 max-w-3xl mx-auto text-gray-100 text-lg md:text-2xl">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
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