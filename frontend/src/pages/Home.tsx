// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
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

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getThemeClasses = () => {
    const base = highContrast
      ? 'bg-black text-black'
      : darkMode
        ? 'bg-gray-900 text-black'
        : 'bg-black text-gray-900';
    const fontClass =
      fontSize === 'large'
        ? 'text-xl'
        : fontSize === 'small'
          ? 'text-sm'
          : 'text-base';
    return `${base} ${fontClass}`;
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()} transition-all duration-500`}>
      <div className={`fixed top-2 left-2 z-50 ${accessibilityMode ? 'block' : 'sr-only'} bg-white dark:bg-gray-300 p-2 rounded-lg border shadow-lg`}>
        <div className="flex flex-col gap-2 text-sm">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-white transition-colors"
          >
            <FaAccessibleIcon /> High Contrast
          </button>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-2 py-1 rounded bg-transparent border transition-colors"
          >
            <option value="small">Small Text</option>
            <option value="normal">Normal Text</option>
            <option value="large">Large Text</option>
          </select>
        </div>
      </div>

      <section className="relative h-screen overflow-hidden ">
        <div className="absolute inset-0 transition-opacity duration-1000">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-20 z-10' : 'opacity-0 z-0'}`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          ))}
        </div>

        <div
          className={`absolute inset-0 ${
            highContrast
              ? 'bg-black/90'
              : darkMode
                ? 'bg-gradient-to-br from-black/90 via-black/90 to-black/40'
                : 'bg-gradient-to-br from-black/90 via-black/90 to-black/30'
          }`}
        />

        <div className="absolute top-5 right-5 flex gap-2 z-30">
          <button
            onClick={() => setAccessibilityMode(!accessibilityMode)}
            className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
            title="Accessibility Options"
          >
            <FaAccessibleIcon size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <GiSunflower size={20} /> : <GiMoonOrbit size={20} />}
          </button>
        </div>

        <div className="absolute top-5 left-5 flex gap-2 z-30">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300"
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300"
          >
            {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#952301]/20 text-[#fdefeb] border border-[#e75629] mb-4 backdrop-blur-md">
              <GiLightBulb />
              <span className="text-sm font-medium">Innovation • Growth • Excellence</span>
            </span>
            <h1 className="font-extrabold mb-6 leading-tight text-white text-4xl md:text-7xl">
              <span>{slides[currentSlide].title}</span>
              <span className="block text-2xl md:text-4xl text-[#fc4b15] mt-2">
                {slides[currentSlide].subtitle}
              </span>
            </h1>
            <p className="mb-8 max-w-3xl mx-auto text-gray-100 text-lg md:text-2xl">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/career"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#952301] to-[#611701] text-white font-semibold hover:shadow-lg transition-all duration-300 group"
              >
                Training Hub <FaArrowRight />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/50 text-white font-semibold hover:bg-white/10 backdrop-blur-md transition-all duration-300"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
