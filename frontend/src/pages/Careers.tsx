// src/pages/Careers.tsx
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  FaEnvelopeOpenText, 
  FaUsers, 
  FaLaptopCode, 
  FaRocket, 
  FaGlobe,
  FaClock,
  FaHeart,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaAccessibleIcon,
  FaVolumeMute,
  FaVolumeUp,
  FaPause,
  FaPlay,
  FaExpand,
  FaCompress,
  FaClosedCaptioning,
  FaEye,
  FaStar,
  FaQuoteLeft,
  FaMapMarkerAlt,
  FaBriefcase,
  FaFileUpload,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaUniversalAccess
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

interface JobOpening {
  title: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  icon: React.ComponentType;
  color: string;
}

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  image: string;
  rating: number;
  department: string;
}

interface CompanyValue {
  icon: React.ComponentType;
  title: string;
  description: string;
}

interface PerkCategory {
  category: string;
  items: {
    icon: React.ComponentType;
    text: string;
    description: string;
  }[];
}

const openings: JobOpening[] = [
  {
    title: "Senior Frontend Developer",
    type: "Full-Time",
    location: "Remote",
    salary: "$65,000 - $85,000",
    description: "Build stunning, accessible UIs using React, Tailwind, and TypeScript with focus on performance and user experience.",
    requirements: ["3+ years React experience", "TypeScript proficiency", "Accessibility knowledge", "Performance optimization"],
    benefits: ["Health insurance", "Remote work", "Professional development", "Flexible hours"],
    icon: FaLaptopCode,
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "UI/UX Designer",
    type: "Full-Time",
    location: "Hybrid - Kigali",
    salary: "$45,000 - $65,000",
    description: "Craft delightful, inclusive user experiences with Figma, Adobe XD, and user research methodologies.",
    requirements: ["Portfolio required", "Figma expertise", "User research skills", "Accessibility design"],
    benefits: ["Design tools budget", "Conference attendance", "Mentorship program", "Creative freedom"],
    icon: FaUsers,
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "DevOps Engineer Internship",
    type: "Internship",
    location: "Remote",
    salary: "$2,000/month",
    description: "Learn cloud infrastructure, CI/CD pipelines, and modern deployment strategies with mentorship.",
    requirements: ["Computer Science student", "Basic Linux knowledge", "Git proficiency", "Eagerness to learn"],
    benefits: ["Mentorship", "Real projects", "Learning budget", "Full-time opportunity"],
    icon: FaRocket,
    color: "from-green-500 to-teal-600"
  },
  {
    title: "Innovation Hackathon 2025",
    type: "Competition",
    location: "Virtual + Kigali",
    salary: "Up to $10,000 prize",
    description: "48-hour challenge to solve real-world problems with technology. Winner gets seed funding and internship offers.",
    requirements: ["Team of 2-4", "Original solution", "Technical feasibility", "Social impact focus"],
    benefits: ["Prize money", "Seed funding opportunity", "Networking", "Mentorship"],
    icon: FaGraduationCap,
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Digital Marketing Specialist",
    type: "Contract",
    location: "Kigali, Rwanda",
    salary: "$35,000 - $45,000",
    description: "Drive growth through SEO, social media, content strategy, and data-driven marketing campaigns.",
    requirements: ["2+ years marketing experience", "SEO/SEM knowledge", "Analytics skills", "Content creation"],
    benefits: ["Performance bonuses", "Creative freedom", "Growth opportunities", "Team collaboration"],
    icon: FaGlobe,
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Accessibility Consultant",
    type: "Part-Time",
    location: "Remote",
    salary: "$40/hour",
    description: "Ensure our products are inclusive and accessible to users with disabilities. Conduct audits and provide guidance.",
    requirements: ["WCAG 2.1 expertise", "Screen reader testing", "Disability advocacy", "Technical writing"],
    benefits: ["Flexible schedule", "Impact-driven work", "Professional development", "Community building"],
    icon: FaAccessibleIcon,
    color: "from-teal-500 to-cyan-600"
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Clare Uwimana",
    role: "Senior Product Designer",
    feedback: "Nexventures transformed my career. The mentorship, creative freedom, and inclusive culture helped me grow beyond my expectations. Working here feels like being part of a family that truly cares.",
    image: "/images/team1.jpg",
    rating: 5,
    department: "Design Team"
  },
  {
    name: "James Nkurunziza",
    role: "Full-stack Developer",
    feedback: "The remote-first culture and challenging projects accelerated my growth. The accessibility focus taught me to build better, more inclusive products that truly matter.",
    image: "/images/team2.jpg",
    rating: 5,
    department: "Engineering Team"
  },
  {
    name: "Sarah Mukamana",
    role: "DevOps Engineer",
    feedback: "Starting as an intern, I've grown into a full-time role. The learning opportunities, mentorship, and supportive environment made all the difference in my tech journey.",
    image: "/images/team3.jpg",
    rating: 5,
    department: "Infrastructure Team"
  },
  {
    name: "David Habimana",
    role: "Marketing Specialist",
    feedback: "The impact-driven mission and collaborative culture inspire me daily. Working on projects that make a real difference in people's lives is incredibly fulfilling.",
    image: "/images/team4.jpg",
    rating: 5,
    department: "Growth Team"
  }
];

const companyValues: CompanyValue[] = [
  {
    icon: FaAccessibleIcon,
    title: "Inclusive by Design",
    description: "We build for everyone, ensuring accessibility is core to everything we create."
  },
  {
    icon: FaHeart,
    title: "People First",
    description: "Our team's wellbeing and growth are our top priorities."
  },
  {
    icon: FaRocket,
    title: "Innovation Driven",
    description: "We push boundaries and embrace new technologies to solve real problems."
  },
  {
    icon: FaGlobe,
    title: "Global Impact",
    description: "Our work creates positive change in communities worldwide."
  }
];

const perks: PerkCategory[] = [
  {
    category: "Work-Life Balance",
    items: [
      { icon: FaClock, text: "Flexible working hours", description: "Work when you're most productive" },
      { icon: FaGlobe, text: "Remote-first culture", description: "Work from anywhere in the world" },
      { icon: FaHeart, text: "Mental health support", description: "Counseling and wellness programs" },
      { icon: FaGraduationCap, text: "Learning & development", description: "$2,000 annual learning budget" }
    ]
  },
  {
    category: "Career Growth",
    items: [
      { icon: FaRocket, text: "Career advancement", description: "Clear promotion pathways" },
      { icon: FaUsers, text: "Mentorship program", description: "Paired with senior professionals" },
      { icon: FaBriefcase, text: "Conference attendance", description: "Attend industry events and conferences" },
      { icon: FaGraduationCap, text: "Certification support", description: "Company-funded certifications" }
    ]
  },
  {
    category: "Impact & Purpose",
    items: [
      { icon: FaHandHoldingHeart, text: "Social impact projects", description: "20% time for community projects" },
      { icon: FaAccessibleIcon, text: "Accessibility advocacy", description: "Leading inclusive design practices" },
      { icon: FaGlobe, text: "Open source contributions", description: "Contribute to meaningful projects" },
      { icon: FaHeart, text: "Diversity & inclusion", description: "Building an equitable workplace" }
    ]
  }
];

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
type TextSize = 'small' | 'normal' | 'large';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState<string>('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>('normal');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedJob(null);
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploadStatus('uploading');

    // Simulate upload process
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }, 2000);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Video playback failed:", error);
        });
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleFullscreen = async () => {
    if (!videoRef.current) return;

    try {
      if (!isFullscreen) {
        await videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      highContrast 
        ? 'bg-black text-white' 
        : 'bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
    } ${textSize === 'large' ? 'text-lg' : textSize === 'small' ? 'text-sm' : 'text-base'}`}>
      <Navbar />
      
      {/* Accessibility Controls */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg p-4 space-y-2"
        role="region"
        aria-label="Accessibility Controls"
      >
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <FaUniversalAccess className="text-[#952301]" />
          Accessibility
        </h3>
        <div className="flex flex-col gap-2 text-xs">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`p-2 rounded flex items-center gap-2 ${highContrast ? 'bg-[#952301] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            aria-pressed={highContrast}
            aria-label="Toggle high contrast mode"
          >
            <FaEye /> High Contrast
          </button>
          <select
            value={textSize}
            onChange={(e) => setTextSize(e.target.value as TextSize)}
            className="p-1 rounded border"
            aria-label="Change text size"
          >
            <option value="small">Small Text</option>
            <option value="normal">Normal Text</option>
            <option value="large">Large Text</option>
          </select>
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`p-2 rounded ${reducedMotion ? 'bg-[#952301] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            aria-pressed={reducedMotion}
            aria-label="Toggle reduced motion"
          >
            Reduce Motion
          </button>
        </div>
      </motion.div>

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-[#952301]/20 to-[#611701]/20"
        />
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: textY }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent">
              Build Your Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join our mission to create inclusive, innovative technology that empowers communities worldwide. 
              Your next chapter starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="#openings"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1"
                aria-label="View open positions"
              >
                <FaBriefcase className="inline mr-2" />
                View Open Positions
              </motion.a>
              
              <motion.a
                href="#culture"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[#952301] text-[#952301] rounded-full font-semibold hover:bg-[#952301] hover:text-white transition-all duration-300"
                aria-label="Learn about our culture"
              >
                <FaUsers className="inline mr-2" />
                Our Culture
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-[#952301]/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
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
      </section>

      <div className="max-w-full md:max-w-11/12 mx-auto px-6">
        {/* Company Values */}
        <motion.section 
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent"
          >
            Our Values Drive Everything
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#952301] to-[#611701] rounded-full flex items-center justify-center">
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Culture Video Section */}
        <motion.section 
          id="culture"
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent">
            Life at Nexventures
          </h2>
          
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-auto"
              poster="/images/culture-poster.jpg"
              muted={isMuted}
              loop
              aria-label="Company culture video showcasing our inclusive workplace"
            >
              <source src="/videos/company-culture.mp4" type="video/mp4" />
              <track 
                kind="captions" 
                src="/captions/culture-en.vtt" 
                srcLang="en" 
                label="English" 
                default={showCaptions}
              />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/70 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleVideo}
                  className="text-white hover:text-[#952301] transition-colors"
                  aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                >
                  {isVideoPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-[#952301] transition-colors"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                </button>
                
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`transition-colors ${showCaptions ? 'text-[#952301]' : 'text-white hover:text-[#952301]'}`}
                  aria-label="Toggle captions"
                >
                  <FaClosedCaptioning size={20} />
                </button>
              </div>
              
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-[#952301] transition-colors"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
              </button>
            </div>
          </div>
        </motion.section>

        {/* Job Openings */}
        <motion.section 
          id="openings"
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent"
          >
            Open Opportunities
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {openings.map((job, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-gray-700/50"
                onClick={() => setSelectedJob(idx)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${job.title} position`}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedJob(idx)}
              >
                <div className={`w-16 h-16 mb-6 bg-gradient-to-r ${job.color} rounded-xl flex items-center justify-center`}>
                </div>
                
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaBriefcase />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-[#952301]">{job.salary}</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.requirements.slice(0, 2).map((req, i) => (
                    <span key={i} className="px-3 py-1 bg-[#952301]/10 text-[#952301] rounded-full text-xs font-medium">
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 2 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                      +{job.requirements.length - 2} more
                    </span>
                  )}
                </div>
                
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1">
                  View Details & Apply
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Job Details Modal */}
        <AnimatePresence>
          {selectedJob !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-labelledby="job-title"
                aria-modal="true"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 id="job-title" className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
                      {openings[selectedJob].title}
                    </h2>
                    <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-2">
                        <FaBriefcase />
                        {openings[selectedJob].type}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt />
                        {openings[selectedJob].location}
                      </span>
                      <span className="text-xl font-bold text-[#952301]">
                        {openings[selectedJob].salary}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                    aria-label="Close job details"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Description</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {openings[selectedJob].description}
                    </p>
                    
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Requirements</h3>
                    <ul className="space-y-2 mb-6">
                      {openings[selectedJob].requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <FaCheckCircle className="text-green-500 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Benefits</h3>
                    <ul className="space-y-2 mb-8">
                      {openings[selectedJob].benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <FaHeart className="text-[#952301] flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    
                    <a
                      href={`mailto:careers@Nexventures.rw?subject=Application for ${encodeURIComponent(openings[selectedJob].title)}`}
                      className="block w-full text-center px-8 py-4 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Work Perks */}
        <motion.section 
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent"
          >
            Why You'll Love Working Here
          </motion.h2>
          
          <div className="space-y-16">
            {perks.map((category, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="text-center"
              >
                <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">{category.category}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((perk, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 transition-all duration-300"
                    >
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#952301] to-[#611701] rounded-lg flex items-center justify-center">
                      </div>
                      <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">{perk.text}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{perk.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Testimonials */}
        <motion.section 
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent"
          >
            Voices from Our Team
          </motion.h2>
          
          <div className="relative max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={`${testimonials[currentTestimonial].name} - ${testimonials[currentTestimonial].role}`}
                      className="w-32 h-32 rounded-full object-cover ring-4 ring-[#952301]/20"
                      width={128}
                      height={128}
                    />
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#952301] rounded-full flex items-center justify-center">
                      <FaQuoteLeft className="text-white text-sm" />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-xl" />
                      ))}
                    </div>
                    
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                      &ldquo;{testimonials[currentTestimonial].feedback}&rdquo;
                    </p>
                    
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-[#952301] font-semibold">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonials[currentTestimonial].department}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial 
                      ? 'bg-[#952301] w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Enhanced CV Upload Section */}
        <motion.section 
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-[#952301]/10 via-orange-50 to-[#611701]/10 dark:from-[#952301]/20 dark:via-gray-800 dark:to-[#611701]/20 rounded-3xl p-8 md:p-12 text-center">
            <motion.div variants={itemVariants}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#952301] to-[#611701] rounded-2xl flex items-center justify-center">
                <FaRocket className="text-3xl text-white" />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                Don't See Your Perfect Role?
              </h3>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                We're always looking for exceptional talent. Upload your CV and we'll reach out when opportunities match your skills.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="cv-upload"
                    aria-label="Upload your CV"
                  />
                  
                  <label
                    htmlFor="cv-upload"
                    className={`block w-full px-8 py-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                      uploadStatus === 'success' 
                        ? 'bg-green-500 text-white' 
                        : uploadStatus === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-gradient-to-r from-[#952301] to-[#611701] text-white'
                    }`}
                  >
                    {uploadStatus === 'uploading' && (
                      <FaSpinner className="inline mr-2 animate-spin" />
                    )}
                    {uploadStatus === 'success' && (
                      <FaCheckCircle className="inline mr-2" />
                    )}
                    {uploadStatus === 'error' && (
                      <FaExclamationTriangle className="inline mr-2" />
                    )}
                    {uploadStatus === 'idle' && (
                      <FaFileUpload className="inline mr-2" />
                    )}
                    
                    {uploadStatus === 'uploading' && 'Uploading...'}
                    {uploadStatus === 'success' && 'CV Uploaded Successfully!'}
                    {uploadStatus === 'error' && 'Upload Failed - Try Again'}
                    {uploadStatus === 'idle' && 'Upload Your CV'}
                  </label>
                </div>
                
                {fileName && uploadStatus !== 'idle' && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    File: {fileName}
                  </p>
                )}
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            variants={itemVariants}
            className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Have questions about our roles, culture, or application process? 
              We'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:careers@Nexventures.rw"
                className="px-8 py-4 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaEnvelopeOpenText className="inline mr-2" />
                Get in Touch
              </a>
              
              <a
                href="tel:+250788123456"
                className="px-8 py-4 border-2 border-[#952301] text-[#952301] rounded-xl font-semibold hover:bg-[#952301] hover:text-white transition-all duration-300"
              >
                Call Us: +250 788 123 456
              </a>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nexventures is an equal opportunity employer committed to diversity and inclusion.
                We welcome applications from all qualified candidates regardless of race, gender, age, religion, sexual orientation, or disability status.
              </p>
            </div>
          </motion.div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}