// src/pages/Services.tsx
import { motion, useInView } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaServer, FaRocket, FaShieldAlt, FaClock, FaUsers, FaStar, FaQuoteLeft } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CheckCircle, ArrowRight, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Award } from "lucide-react";
import serviceVideo from '../assets/services-overview.mp4';
import serviceImage from '../assets/services-graphic.png';

const services = [
  { 
    icon: <FaLaptopCode />, 
    title: "Web Development", 
    description: "Responsive websites with modern tech.",
    features: ["React/Next.js", "TypeScript", "Tailwind CSS", "SEO Optimized"],
    color: "from-orange-600 to-red-800"
  },
  { 
    icon: <FaMobileAlt />, 
    title: "Mobile Apps", 
    description: "Cross-platform apps using Flutter and React Native.",
    features: ["iOS & Android", "Push Notifications", "Offline Support", "App Store Ready"],
    color: "from-red-600 to-orange-800"
  },
  { 
    icon: <FaPaintBrush />, 
    title: "Graphic Design", 
    description: "Logos, branding, social kits and UI/UX designs.",
    features: ["Brand Identity", "UI/UX Design", "Print Design", "Digital Assets"],
    color: "from-orange-700 to-red-700"
  },
  { 
    icon: <FaServer />, 
    title: "Backend/API Dev", 
    description: "Custom RESTful APIs and backend systems.",
    features: ["Node.js/Python", "Database Design", "Cloud Deployment", "API Security"],
    color: "from-red-700 to-orange-700"
  },
];

const benefits = [
  { icon: <FaRocket />, title: "Fast Delivery", description: "Quick turnaround times without compromising quality" },
  { icon: <FaShieldAlt />, title: "Secure Solutions", description: "Built with security best practices from the ground up" },
  { icon: <FaClock />, title: "24/7 Support", description: "Round-the-clock assistance for all your needs" },
  { icon: <FaUsers />, title: "Expert Team", description: "Skilled professionals with years of experience" },
];

const testimonials = [
  { name: "Sarah Johnson", company: "TechCorp", rating: 5, text: "Exceptional service and outstanding results. The team delivered beyond our expectations." },
  { name: "Michael Chen", company: "StartupXYZ", rating: 5, text: "Professional, responsive, and innovative. Our project was completed on time and within budget." },
  { name: "Emily Davis", company: "DesignStudio", rating: 5, text: "Amazing attention to detail and user experience. Highly recommend their services." },
];

const stats = [
  { number: "500+", label: "Projects Completed", icon: <Award /> },
  { number: "98%", label: "Client Satisfaction", icon: <FaStar /> },
  { number: "50+", label: "Happy Clients", icon: <FaUsers /> },
  { number: "24/7", label: "Support Available", icon: <FaClock /> },
];

const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
};

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Video play error:', error);
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoaded(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current && duration > 0) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time) || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative group bg-black rounded-xl overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        src={serviceVideo}
        className="w-full max-w-4xl mx-auto block"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPause={handlePause}
        onPlay={handlePlay}
        preload="metadata"
        playsInline
        aria-label="NexVentures service overview video"
      />
      
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#952301]"></div>
        </div>
      )}
      
      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            disabled={!isLoaded}
            className="text-white hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-1 disabled:opacity-50"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={duration && isFinite(duration) ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              disabled={!isLoaded || !duration}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb disabled:opacity-50"
              aria-label="Video progress"
            />
          </div>
          
          <span className="text-white text-sm font-mono min-w-[80px]">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          
          <button
            onClick={toggleMute}
            disabled={!isLoaded}
            className="text-white hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-1 disabled:opacity-50"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>

      {/* Click to play overlay */}
      {!isPlaying && isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={togglePlay}
        >
          <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
            <Play size={48} className="text-white ml-1" />
          </div>
        </div>
      )}
    </div>
  );
};

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-[#952301] to-[#611701] rounded-2xl p-8 text-white">
      <FaQuoteLeft className="text-4xl opacity-30 mb-4" />
      
      <div className="min-h-[120px] flex items-center">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg mb-4 italic">"{testimonials[currentIndex].text}"</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{testimonials[currentIndex].name}</p>
              <p className="text-orange-200">{testimonials[currentIndex].company}</p>
            </div>
            <div className="flex">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default function Services() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const benefitsRef = useRef(null);
  const statsRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true });
  const isBenefitsInView = useInView(benefitsRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#952301]/10 to-[#611701]/10 -z-10" />
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Transforming ideas into digital excellence with cutting-edge technology and innovative solutions
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="p-8 relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#952301] dark:group-hover:text-orange-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className="flex items-center text-[#952301] dark:text-orange-400 font-semibold group-hover:translate-x-2 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#952301] rounded"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 px-4 bg-gradient-to-r from-[#952301] to-[#611701] text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number.includes('+') ? (
                    <>
                      <AnimatedCounter end={parseInt(stat.number)} />+
                    </>
                  ) : stat.number.includes('%') ? (
                    <>
                      <AnimatedCounter end={parseInt(stat.number)} />%
                    </>
                  ) : (
                    stat.number
                  )}
                </div>
                <div className="text-orange-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We deliver exceptional results through innovation, expertise, and unwavering commitment to your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isBenefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isBenefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#952301] to-[#611701] text-white group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#952301] dark:group-hover:text-orange-400 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isBenefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#952301]/20 to-[#611701]/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <img 
                src={serviceImage} 
                alt="Professional team collaboration and innovative solutions" 
                className="relative rounded-2xl shadow-2xl w-full transform group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real feedback from real clients who trust us with their projects
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TestimonialCarousel />
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent">
              Service Overview
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Watch our comprehensive overview to see how we transform your ideas into reality
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <VideoPlayer />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#952301] to-[#611701] text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Let's discuss how we can bring your vision to life with our expert services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-[#952301] rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center">
              Get Started <ArrowRight className="ml-2" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#952301] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white">
              View Portfolio
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #952301;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #952301;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}