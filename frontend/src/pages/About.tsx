// src/pages/About.tsx
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { 
  Briefcase, Globe, HeartHandshake, Rocket, Users, Star, 
  Play, Pause, Volume2, VolumeX, Award, Target, Zap, Shield, 
  CheckCircle, Calendar, Eye, MousePointer
} from 'lucide-react';
import teamImage from '../assets/team.jpg';
import workCulture from '../assets/work-culture.mp4';
import innovationGraphic from '../assets/innovation.png';
import growthChart from '../assets/growth-chart.png';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Video Player Component with Accessibility
const AccessibleVideoPlayer = ({ src, poster }: { src: string, poster?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="rounded-xl w-full max-w-4xl mx-auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label="NexVentures work culture video"
        tabIndex={0}
      />
      
      {/* Custom Accessible Controls */}
      <div className={`absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 rounded-lg p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="bg-[#952301] hover:bg-[#611701] text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#952301]"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button
              onClick={toggleMute}
              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
          
          <div className="text-white text-sm">
            Click to {isPlaying ? 'pause' : 'play'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Parallax Section Component
const ParallaxSection = ({ children, offset = 50 }: { children: React.ReactNode, offset?: number }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);
  
  return (
    <motion.div style={{ y }} className="relative z-10">
      {children}
    </motion.div>
  );
};

// Intersection Observer Hook for Animations
const useIntersectionObserver = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
};

export default function About() {
  const [heroRef, isHeroVisible] = useIntersectionObserver(0.3);
  const [statsRef, isStatsVisible] = useIntersectionObserver(0.5);
  const [teamRef, isTeamVisible] = useIntersectionObserver(0.3);
  
  // Accessibility state
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.3 : 0.8,
        staggerChildren: reducedMotion ? 0.1 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 10 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.3 : 0.6 }
    }
  };

  const stats = [
    { number: 150, suffix: "+", label: "Projects Completed", icon: CheckCircle },
    { number: 98, suffix: "%", label: "Client Satisfaction", icon: Star },
    { number: 45, suffix: "+", label: "Team Members", icon: Users },
    { number: 5, suffix: " Years", label: "Experience", icon: Calendar }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize data security and privacy in every solution we build.",
      color: "bg-gradient-to-br from-[#611701] to-[#952301]"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance and quick turnaround times for all projects.",
      color: "bg-gradient-to-br from-[#952301] to-[#611701]"
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Every solution is designed with your business objectives in mind.",
      color: "bg-gradient-to-br from-[#611701] to-[#952301]"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Rigorous testing and quality control processes ensure excellence.",
      color: "bg-gradient-to-br from-[#952301] to-[#611701]"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      highContrast ? 'bg-black text-white' : 'bg-gradient-to-br from-gray-50 via-white to-[#611701]/10 dark:from-gray-900 dark:via-gray-800 dark:to-[#952301]/20'
    } ${fontSize === 'large' ? 'text-lg' : fontSize === 'xl' ? 'text-xl' : ''}`}>
      
      {/* Accessibility Toolbar */}
      <div className="fixed top-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg p-2 space-y-2">
        <button
          onClick={() => setHighContrast(!highContrast)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle high contrast mode"
          title="High Contrast"
        >
          <Eye size={16} />
        </button>
        
        <button
          onClick={() => setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'xl' : 'normal')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Increase font size"
          title="Font Size"
        >
          <span className="text-xs font-bold">A+</span>
        </button>
        
        <button
          onClick={() => setReducedMotion(!reducedMotion)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle reduced motion"
          title="Reduce Motion"
        >
          <MousePointer size={16} />
        </button>
      </div>

      <Navbar />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={isHeroVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative px-6 py-20 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#952301] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#611701] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <motion.div variants={itemVariants} className="text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#611701] via-[#952301] to-[#611701] bg-clip-text text-transparent"
            whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
            transition={{ duration: 0.3 }}
          >
            About NexVentures
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12 text-gray-700 dark:text-gray-300"
            variants={itemVariants}
          >
            NexVentures Ltd is a Rwanda-based digital agency passionate about delivering web, mobile, and design
            solutions 100% remotely. We empower startups, NGOs, and SMEs through affordable and scalable tech.
            Our team uses cloud-native platforms and modern practices to ensure both speed and quality.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            variants={itemVariants}
          >
            <span className="px-4 py-2 bg-[#611701]/10 text-[#611701] dark:bg-[#952301]/20 dark:text-[#952301] rounded-full text-sm font-medium">
              🌍 Global Reach
            </span>
            <span className="px-4 py-2 bg-[#952301]/10 text-[#952301] dark:bg-[#611701]/20 dark:text-[#611701] rounded-full text-sm font-medium">
              🚀 Innovation Focused
            </span>
            <span className="px-4 py-2 bg-[#611701]/10 text-[#611701] dark:bg-[#952301]/20 dark:text-[#952301] rounded-full text-sm font-medium">
              ♿ Accessibility First
            </span>
          </motion.div>
        </motion.div>

        {/* Core Values Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
          variants={containerVariants}
        >
          {[
            { icon: Globe, title: "Global Reach, Local Roots", desc: "We serve clients worldwide while staying committed to our African tech roots.", color: "[#611701]" },
            { icon: HeartHandshake, title: "Client-Centered Collaboration", desc: "We work closely with you to transform your ideas into meaningful digital products.", color: "[#952301]" },
            { icon: Rocket, title: "Rapid, Scalable Solutions", desc: "We build flexible platforms using modern frameworks for long-term growth.", color: "[#611701]" },
            { icon: Briefcase, title: "Full-Stack Services", desc: "From branding to backends, NexVentures delivers end-to-end solutions under one roof.", color: "[#952301]" }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: reducedMotion ? 1 : 1.05, 
                rotateY: reducedMotion ? 0 : 5 
              }}
              className={`relative group p-8 rounded-2xl bg-white dark:bg-gray-800 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}/10 to-transparent dark:from-${item.color}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br from-${item.color} to-${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-[#952301] dark:group-hover:text-[#611701] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <ParallaxSection>
        <motion.section
          ref={statsRef}
          initial="hidden"
          animate={isStatsVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="py-20 bg-gradient-to-r from-[#611701] to-[#952301] text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              variants={itemVariants}
            >
              Our Impact in Numbers
            </motion.h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center group"
                  whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                    <stat.icon className="w-12 h-12 mx-auto mb-4 text-white/80" aria-hidden="true" />
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <p className="text-white/80 font-medium">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </ParallaxSection>

      {/* Values Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white"
            variants={itemVariants}
          >
            Our Core Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: reducedMotion ? 1 : 1.02,
                  rotateX: reducedMotion ? 0 : 5
                }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 transition-all duration-500 overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#611701]/10 to-[#952301]/10 dark:from-[#611701]/20 dark:to-[#952301]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-[#952301] dark:group-hover:text-[#611701] transition-colors">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <ParallaxSection>
        <motion.section
          ref={teamRef}
          initial="hidden"
          animate={isTeamVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="py-20 px-6 max-w-7xl mx-auto"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white"
            variants={itemVariants}
          >
            Meet Our Amazing Team
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            <div className="overflow-hidden rounded-2xl">
              <motion.img 
                src={teamImage} 
                alt="NexVentures diverse team of developers, designers, and project managers working collaboratively in a modern office space"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
              />
            </div>
            
            {/* Team Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#952301]">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#611701]">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#952301]">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Remote</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </ParallaxSection>

      {/* Work Culture Video Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white"
            variants={itemVariants}
          >
            Our Work Culture
          </motion.h2>
          
          <motion.p 
            className="text-xl text-center mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-400"
            variants={itemVariants}
          >
            Experience the collaborative spirit and innovative mindset that drives our team forward every day.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex justify-center">
            <AccessibleVideoPlayer src={workCulture} />
          </motion.div>
        </motion.div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-[#611701]/10 dark:from-gray-800 dark:to-[#952301]/20">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white"
            variants={itemVariants}
          >
            Innovation at the Core
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#611701] to-[#952301] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <img 
                  src={innovationGraphic} 
                  alt="Innovation workflow diagram showing our design thinking process from ideation to implementation"
                  className="relative rounded-2xl w-full h-auto transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                  NexVentures constantly embraces emerging technologies, invests in research and learning, and innovates
                  creative tech solutions that adapt to the evolving needs of our clients.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: Zap, title: "Cutting-Edge Technology", desc: "We leverage the latest frameworks and tools" },
                  { icon: Target, title: "Strategic Innovation", desc: "Every solution is purpose-built for your goals" },
                  { icon: Users, title: "Collaborative Approach", desc: "We work with you throughout the entire process" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl  duration-300"
                    whileHover={{ x: reducedMotion ? 0 : 10 }}
                  >
                    <div className="bg-gradient-to-br from-[#611701] to-[#952301] p-3 rounded-lg">
                      <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Growth Chart Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white"
            variants={itemVariants}
          >
            Our Growth Journey
          </motion.h2>
          
          <motion.p 
            className="text-xl text-center mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-400"
            variants={itemVariants}
          >
            From a small startup to a leading digital agency, our growth reflects our commitment to excellence.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#952301] to-[#611701] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8">
              <img 
                src={growthChart} 
                alt="Growth chart showing NexVentures' progress over 5 years including client growth, revenue increase, and team expansion"
                className="rounded-xl w-full h-auto" 
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}