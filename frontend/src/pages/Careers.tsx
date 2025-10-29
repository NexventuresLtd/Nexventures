// src/pages/Careers.tsx
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
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
  FaEye,
  FaStar,
  FaQuoteLeft,
  FaMapMarkerAlt,
  FaBriefcase,
  FaFileUpload,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaUniversalAccess,
  FaBrain,
  FaMobile,
  FaCode,
  FaChartLine,
  FaShieldAlt,
  FaWhatsapp
} from "react-icons/fa";
import React, { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

interface JobOpening {
  title: string;
  type: string;
  location: string;
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

interface TrainingProgram {
  title: string;
  description: string;
  duration: string;
  level: string;
  icon: React.ComponentType;
  color: string;
  skills: string[];
}

interface Trainer {
  name: string;
  role: string;
  specialization: string;
  image: string;
  achievements: string[];
}

interface Intern {
  name: string;
  role: string;
  program: string;
  image: string;
  skills: string[];
}

interface TrainingApplication {
  name: string;
  email: string;
  program: string;
}

const openings: JobOpening[] = [
  {
    title: "Senior Full-Stack Developer",
    type: "Full-Time",
    location: "Kigali, Rwanda",
    description: "Lead development of innovative web applications using modern technologies while mentoring junior developers in our training programs.",
    requirements: ["5+ years full-stack experience", "React/Node.js proficiency", "Team leadership skills", "Mentorship experience"],
    benefits: ["Health insurance", "Professional development", "Flexible hours", "Stock options"],
    icon: FaLaptopCode,
    color: "from-orange-500 to-red-600"
  },
  {
    title: "AI/ML Engineering Trainer",
    type: "Full-Time",
    location: "Hybrid - Kigali",
    description: "Develop and deliver cutting-edge AI/ML curriculum while working on real-world AI projects with our trainees.",
    requirements: ["3+ years AI/ML experience", "Python & TensorFlow expertise", "Teaching experience", "Research background"],
    benefits: ["Research opportunities", "Conference attendance", "Mentorship program", "Creative freedom"],
    icon: FaBrain,
    color: "from-red-500 to-orange-600"
  },
  {
    title: "Mobile Development Intern",
    type: "Internship",
    location: "Kigali, Rwanda",
    description: "Learn mobile app development using React Native/Flutter while contributing to real client projects under expert guidance.",
    requirements: ["Computer Science student", "JavaScript/Dart basics", "Git proficiency", "Eagerness to learn"],
    benefits: ["Mentorship", "Real projects", "Learning budget", "Full-time opportunity"],
    icon: FaMobile,
    color: "from-green-500 to-teal-600"
  },
  {
    title: "Digital Marketing Specialist",
    type: "Full-Time",
    location: "Remote",
    description: "Drive growth through SEO, social media, content strategy, and data-driven marketing campaigns for our training programs.",
    requirements: ["3+ years marketing experience", "SEO/SEM expertise", "Analytics skills", "Content creation"],
    benefits: ["Performance bonuses", "Creative freedom", "Growth opportunities", "Team collaboration"],
    icon: FaChartLine,
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Cybersecurity Instructor",
    type: "Part-Time",
    location: "Hybrid - Kigali",
    description: "Teach cybersecurity fundamentals and advanced techniques while helping secure our digital infrastructure.",
    requirements: ["4+ years security experience", "Ethical hacking certification", "Teaching ability", "Network security knowledge"],
    benefits: ["Flexible schedule", "Certification support", "Research opportunities", "Industry networking"],
    icon: FaShieldAlt,
    color: "from-red-500 to-orange-600"
  },
  {
    title: "Innovation Program Manager",
    type: "Full-Time",
    location: "Kigali, Rwanda",
    description: "Lead our startup incubation program, guiding entrepreneurs from concept to launch with mentorship and resources.",
    requirements: ["Startup experience", "Project management", "Mentorship skills", "Business development"],
    benefits: ["Equity opportunities", "Network building", "Leadership development", "Impact-driven work"],
    icon: FaRocket,
    color: "from-teal-500 to-cyan-600"
  }
];

const trainingPrograms: TrainingProgram[] = [
  {
    title: "Full-Stack Development",
    description: "Comprehensive training in modern web development including React, Node.js, databases, and deployment strategies.",
    duration: "6 Months",
    level: "Beginner to Advanced",
    icon: FaCode,
    color: "from-orange-500 to-red-600",
    skills: ["React.js", "Node.js", "MongoDB", "Express.js", "TypeScript", "AWS"]
  },
  {
    title: "AI & Machine Learning",
    description: "Hands-on AI/ML training covering Python, TensorFlow, neural networks, and real-world AI applications.",
    duration: "8 Months",
    level: "Intermediate to Advanced",
    icon: FaBrain,
    color: "from-red-500 to-orange-600",
    skills: ["Python", "TensorFlow", "Neural Networks", "Data Science", "Computer Vision", "NLP"]
  },
  {
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications using React Native and Flutter with focus on performance and UX.",
    duration: "5 Months",
    level: "Beginner to Intermediate",
    icon: FaMobile,
    color: "from-green-500 to-teal-600",
    skills: ["React Native", "Flutter", "Firebase", "Mobile UI/UX", "App Store Deployment"]
  },
  {
    title: "Digital Marketing & Growth",
    description: "Master digital marketing strategies including SEO, SEM, social media, analytics, and growth hacking.",
    duration: "4 Months",
    level: "Beginner to Advanced",
    icon: FaChartLine,
    color: "from-orange-500 to-red-600",
    skills: ["SEO/SEM", "Social Media", "Google Analytics", "Content Strategy", "Growth Hacking"]
  }
];

const trainers: Trainer[] = [
  {
    name: "Daniel Iryivuze",
    role: "CEO & Entrepreneurship Trainer",
    specialization: "Business Strategy & Leadership",
    image: "/team/daniel.jpeg",
    achievements: ["Communication expert", "Business strategy expert", "Leadership development", "Startup mentor", "Public speaker", "Entrepreneurship advocate"]
  },
  {
    name: "David Niyonshuti",
    role: "Operations Lead & Business Trainer",
    specialization: "Entrepreneurship & Project Management",
    image: "/team/david.jpeg",
    achievements: ["Business development expert", "Project management certified", "Startup mentor", "Operational excellence", "Process optimization specialist", "Agile methodology advocate"]
  },
  {
    name: "Alain Muhirwa",
    role: "CTO & Technical Lead",
    specialization: "Mobile Development & Cloud & AI",
    image: "/team/alain.jpeg",
    achievements: ["Mobile app expert", "4+ years industry experience", "Cloud architecture specialist", "Startup technical advisor", "AI enthusiast", "Open source contributor"]
  },
  {
    name: "Wengelawit Solomon",
    role: "Marketing Lead & Growth Trainer",
    specialization: "Digital Marketing & Brand Strategy",
    image: "/team/wengels.jpeg",
    achievements: ["Growth marketing expert", "Brand strategy consultant", "Social media innovator", "Content marketing specialist", "SEO/SEM strategist", "Data-driven marketer"]
  },
  {
    name: "Sonia Hirwa",
    role: "Finance Lead & Analytics Trainer",
    specialization: "Financial Technology & Data Analysis",
    image: "/team/sonia.jpeg",
    achievements: ["Financial modeling expert", "Data analytics specialist", "Fintech innovation", "Certified public accountant", "Business intelligence advisor", "Risk management professional"]
  },
  {
    name: "Christian Loue Sauveur",
    role: "Senior Software Engineer & Trainer",
    specialization: "Full-Stack Development & AI & BlockChain",
    image: "/team/loue.jpeg",
    achievements: ["Trained 50+ developers", "5+ years industry experience", "Full-stack & AI specialist", "Blockchain enthusiast", "Open source contributor", "Tech community leader"]
  },
];

const interns: Intern[] = [
  {
    name: "Pendo Vestine",
    role: "Full-Stack Intern",
    program: "Full-Stack Development",
    image: "/team/pendo.jpg",
    skills: ["React", "Node.js", "tailwindcss", "TypeScript"]
  },
  {
    name: "Fred NIYONSHUTI",
    role: "Frontend Intern",
    program: "Full-Stack Development",
    image: "/team/fred.jpg",
    skills: ["React", "JavaScript", "CSS", "UI/UX"]
  },
  {
    name: "Shakira  MUNGANYINKA",
    role: "Backend Intern",
    program: "Full-Stack Development",
    image: "/team/shakira.jpg",
    skills: ["Node.js", "Python", "SQL", "APIs"]
  },
  {
    name: "Poli Ndiramiye  NINSHUTI",
    role: "Mobile Dev Intern",
    program: "Full-Stack Development",
    image: "/team/poli.jpg",
    skills: ["React Native", "Flutter", "Firebase", "Mobile UI"]
  },
  {
    name: "Isaro Crista",
    role: "Marketing Intern",
    program: "Digital Marketing",
    image: "/team/crista.jpg",
    skills: ["SEO", "Social Media", "Content Creation", "Analytics"]
  },
  {
    name: "Sandra Ngonga",
    role: "Marketing Intern",
    program: "Digital Marketing",
    image: "/team/sanda.jpg",
    skills: ["SEM", "Email Marketing", "Campaign Management", "Data Analysis"]
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Albertine Umuhoza",
    role: "Full-Stack Developer",
    feedback: "The Full-Stack program transformed my career. The hands-on projects and expert mentorship helped me land a job before I even graduated!",
    image: "/images/team1.jpg",
    rating: 5,
    department: "Graduate - Full Stack Program"
  },
  {
    name: "Stella Habiyambere",
    role: "AI Engineer",
    feedback: "Nexventures' AI program gave me practical skills that I use daily. Building real ML models during training prepared me perfectly for industry work.",
    image: "/images/team2.jpg",
    rating: 5,
    department: "Graduate - AI/ML Program"
  },
  // {
  //   name: "Sarah Mukamana",
  //   role: "Mobile Developer",
  //   feedback: "From zero coding experience to building production-ready apps in 5 months. The project-based approach made all the difference!",
  //   image: "/images/team3.jpg",
  //   rating: 5,
  //   department: "Graduate - Mobile Development"
  // },
  // {
  //   name: "David Habimana",
  //   role: "Digital Marketing Specialist",
  //   feedback: "The marketing program combined theory with real campaigns. I now manage digital strategy for major brands thanks to Nexventures.",
  //   image: "/images/team4.jpg",
  //   rating: 5,
  //   department: "Graduate - Digital Marketing"
  // }
];

const companyValues: CompanyValue[] = [
  {
    icon: FaAccessibleIcon,
    title: "Inclusive by Design",
    description: "We build for everyone, ensuring accessibility is core to everything we create and teach."
  },
  {
    icon: FaHeart,
    title: "People First",
    description: "Our team's and students' wellbeing and growth are our top priorities."
  },
  {
    icon: FaRocket,
    title: "Innovation Driven",
    description: "We push boundaries and embrace new technologies to solve real African problems."
  },
  {
    icon: FaGlobe,
    title: "African Impact",
    description: "Our work creates positive change in communities across Rwanda and Africa."
  }
];

const perks: PerkCategory[] = [
  {
    category: "Work-Life Balance",
    items: [
      { icon: FaClock, text: "Flexible working hours", description: "Work when you're most productive" },
      { icon: FaGlobe, text: "Hybrid work options", description: "Balance remote and in-person collaboration" },
      { icon: FaHeart, text: "Mental health support", description: "Counseling and wellness programs" },
      { icon: FaGraduationCap, text: "Learning & development", description: "Continuous skill enhancement" }
    ]
  },
  {
    category: "Career Growth",
    items: [
      { icon: FaRocket, text: "Career advancement", description: "Clear promotion pathways and leadership opportunities" },
      { icon: FaUsers, text: "Mentorship program", description: "Paired with senior industry experts" },
      { icon: FaBriefcase, text: "Conference attendance", description: "Attend local and international tech events" },
      { icon: FaGraduationCap, text: "Certification support", description: "Company-funded professional certifications" }
    ]
  },
  {
    category: "Impact & Purpose",
    items: [
      { icon: FaHandHoldingHeart, text: "Social impact projects", description: "Work on projects that solve real community problems" },
      { icon: FaAccessibleIcon, text: "Accessibility advocacy", description: "Leading inclusive design practices in Africa" },
      { icon: FaGlobe, text: "Open source contributions", description: "Contribute to meaningful open source projects" },
      { icon: FaHeart, text: "Diversity & inclusion", description: "Building an equitable workplace and tech ecosystem" }
    ]
  }
];

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
type TextSize = 'small' | 'normal' | 'large';
type TrainingModalStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Careers() {
  const { darkMode } = useContext(ThemeContext);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState<string>('');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>('normal');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTrainingTab, setActiveTrainingTab] = useState(0);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [trainingModalStatus, setTrainingModalStatus] = useState<TrainingModalStatus>('idle');
  const [trainingApplication, setTrainingApplication] = useState<TrainingApplication>({
    name: '',
    email: '',
    program: trainingPrograms[0].title
  });


  const fileInputRef = useRef<HTMLInputElement>(null);


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
        setShowTrainingModal(false);
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





  const handleTrainingApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrainingModalStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setTrainingModalStatus('success');
      setTimeout(() => {
        setShowTrainingModal(false);
        setTrainingModalStatus('idle');
        setTrainingApplication({
          name: '',
          email: '',
          program: trainingPrograms[0].title
        });
      }, 2000);
    }, 1500);
  };

  const openTrainingModal = () => {
    setTrainingApplication(prev => ({
      ...prev,
      program: trainingPrograms[activeTrainingTab].title
    }));
    setShowTrainingModal(true);
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

  // Get background and text colors based on theme and contrast
  const getBackgroundColor = () => {
    if (highContrast) return 'bg-black text-white';
    if (darkMode) return 'bg-gray-900 text-white';
    return 'bg-gradient-to-br from-amber-50 via-white to-orange-50';
  };

  const getCardBackground = () => {
    if (highContrast) return 'bg-gray-900 text-white';
    if (darkMode) return 'bg-gray-800 text-white';
    return 'bg-white/80 text-gray-800';
  };

  const getTextColor = () => {
    if (highContrast) return 'text-white';
    if (darkMode) return 'text-gray-300';
    return 'text-gray-600';
  };

  const getBorderColor = () => {
    if (highContrast) return 'border-gray-700';
    if (darkMode) return 'border-gray-700';
    return 'border-gray-200/50';
  };

  // Filter interns by program
  const fullStackInterns = interns.filter(intern => intern.program === "Full-Stack Development");
  const marketingInterns = interns.filter(intern => intern.program === "Digital Marketing");

  return (
    <div className={`min-h-screen transition-all duration-300 ${getBackgroundColor()} ${textSize === 'large' ? 'text-lg' : textSize === 'small' ? 'text-sm' : 'text-base'
      }`}>
      <Navbar />

      {/* Accessibility Controls */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed hidden top-20 right-4 z-50 rounded-lg p-4 space-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
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
            className={`p-2 rounded flex items-center gap-2 transition-colors ${highContrast
              ? 'bg-[#952301] text-white'
              : darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            aria-pressed={highContrast}
            aria-label="Toggle high contrast mode"
          >
            <FaEye /> High Contrast
          </button>
          <select
            value={textSize}
            onChange={(e) => setTextSize(e.target.value as TextSize)}
            className={`p-1 rounded border ${darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-800'
              }`}
            aria-label="Change text size"
          >
            <option value="small">Small Text</option>
            <option value="normal">Normal Text</option>
            <option value="large">Large Text</option>
          </select>
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`p-2 rounded transition-colors ${reducedMotion
              ? 'bg-[#952301] text-white'
              : darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            aria-pressed={reducedMotion}
            aria-label="Toggle reduced motion"
          >
            Reduce Motion
          </button>
        </div>
      </motion.div>

      {/* Enhanced Professional Hero Section with Theme-Aware Overlay */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Theme-Aware Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/team/all.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center 25%',
            }}
          />

          {/* Dynamic Overlay Based on Theme */}
          <div className={`absolute inset-0 transition-all duration-500 ${darkMode
              ? 'bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-transparent'
              : 'bg-gradient-to-br from-white/70 via-white/50 to-transparent'
            }`} />

          {/* Secondary Overlay for Depth */}
          <div className={`absolute inset-0 transition-all duration-500 ${darkMode
              ? 'bg-gradient-to-t from-gray-900/70 via-transparent to-gray-900/40'
              : 'bg-gradient-to-t from-white/60 via-transparent to-white/30'
            }`} />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Theme-Aware Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute inset-0 transition-all duration-500 ${darkMode
                ? 'bg-[linear-gradient(rgba(149,35,1,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(149,35,1,0.15)_1px,transparent_1px)]'
                : 'bg-[linear-gradient(rgba(149,35,1,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(149,35,1,0.08)_1px,transparent_1px)]'
              } bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]`} />
          </div>

          {/* Floating Tech Elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            >
              <div className={`w-2 h-2 rounded-full blur-[1px] transition-colors duration-500 ${darkMode ? 'bg-[#952301]' : 'bg-[#c2410c]'
                }`} />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-sm border rounded-full transition-all duration-500 ${darkMode
                  ? 'bg-white/10 border-white/20'
                  : 'bg-black/10 border-black/20'
                }`}
            >
              <div className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ${darkMode ? 'bg-[#952301]' : 'bg-[#c2410c]'
                }`} />
              <span className={`text-sm font-semibold tracking-wide transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                NOW HIRING & TRAINING
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                <span className={`bg-clip-text text-transparent transition-all duration-500 ${darkMode
                    ? 'bg-gradient-to-r from-white via-orange-50 to-amber-100'
                    : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700'
                  }`}>
                  Shape Africa's
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#952301] via-[#c2410c] to-[#fdba74] bg-clip-text text-transparent">
                  Tech Future
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <p className={`text-xl md:text-2xl lg:text-3xl font-light leading-relaxed transition-colors duration-500 ${darkMode ? 'text-white/90' : 'text-gray-800'
                }`}>
                Join <span className={`font-semibold transition-colors duration-500 ${darkMode ? 'text-orange-200' : 'text-orange-600'
                  }`}>Nexventures</span> in empowering the next generation of African tech leaders through{" "}
                <span className={`font-semibold transition-colors duration-500 ${darkMode ? 'text-orange-200' : 'text-orange-600'
                  }`}>innovative training</span> and{" "}
                <span className={`font-semibold transition-colors duration-500 ${darkMode ? 'text-orange-200' : 'text-orange-600'
                  }`}>real-world projects</span>
              </p>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-8 py-6"
            >
              {[
                { number: "50+", label: "Trained Developers" },
                { number: "95%", label: "Employment Rate" },
                { number: "4.9/5", label: "Student Rating" },
                { number: "6", label: "Expert Trainers" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm md:text-base font-medium transition-colors duration-500 ${darkMode ? 'text-orange-200/80' : 'text-orange-600/80'
                    }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              {/* Primary Button */}
              <motion.a
                href="#openings"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 20px 40px rgba(149, 35, 1, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-[#952301] to-[#c2410c] text-white rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <FaBriefcase className="text-xl" />
                  <span>Join Our Team</span>
                  <motion.div
                    initial={{ x: -5, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="text-lg"
                  >
                    →
                  </motion.div>
                </div>
              </motion.a>

              {/* Secondary Button */}
              <motion.a
                href="#training"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                className={`group px-10 py-5 border-2 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm ${darkMode
                    ? 'border-white/30 text-white hover:border-white/60 hover:bg-white/10'
                    : 'border-gray-800/30 text-gray-800 hover:border-gray-800/60 hover:bg-gray-800/10'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaGraduationCap className="text-xl" />
                  <span>Explore Training</span>
                  <motion.div
                    initial={{ x: -5, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="text-lg"
                  >
                    →
                  </motion.div>
                </div>
              </motion.a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="pt-16"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`flex flex-col items-center gap-2 transition-colors duration-500 ${darkMode ? 'text-white/60' : 'text-gray-600'
                  }`}
              >
                <span className="text-sm font-medium">Scroll to explore</span>
                <div className={`w-6 h-10 border-2 rounded-full flex justify-center transition-colors duration-500 ${darkMode ? 'border-white/30' : 'border-gray-600/30'
                  }`}>
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-1 h-3 rounded-full mt-2 transition-colors duration-500 ${darkMode ? 'bg-white/60' : 'bg-gray-600/60'
                      }`}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Gradient - Theme Aware */}
        <div className={`absolute bottom-0 left-0 right-0 h-32 transition-all duration-500 ${darkMode
            ? 'bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent'
            : 'bg-gradient-to-t from-white via-white/50 to-transparent'
          }`} />
      </section>

      <div className="max-w-full md:max-w-11/12 mx-auto px-6">
        {/* Training Programs Section */}
        <motion.section
          id="training"
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
            Our Training Programs
          </motion.h2>

          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {trainingPrograms.map((program, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTrainingTab(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTrainingTab === index
                    ? 'bg-gradient-to-r from-[#952301] to-[#611701] text-white'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {program.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrainingTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-8 ${getCardBackground()} ${getBorderColor()} border`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className={`w-20 h-20 mb-6 bg-gradient-to-r ${trainingPrograms[activeTrainingTab].color} rounded-2xl flex items-center justify-center`}>
                      {React.createElement(trainingPrograms[activeTrainingTab].icon, {})}
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{trainingPrograms[activeTrainingTab].title}</h3>
                    <p className={`text-lg mb-6 ${getTextColor()}`}>{trainingPrograms[activeTrainingTab].description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold mb-2">Duration</h4>
                        <p className={getTextColor()}>{trainingPrograms[activeTrainingTab].duration}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Level</h4>
                        <p className={getTextColor()}>{trainingPrograms[activeTrainingTab].level}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Skills You'll Learn</h4>
                      <div className="flex flex-wrap gap-2">
                        {trainingPrograms[activeTrainingTab].skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-[#952301]/10 text-[#952301] rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={openTrainingModal}
                      className="px-6 py-3 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Apply for Program
                    </button>
                  </div>

                  {/* Interns Grid Section */}
                  <div>
                    <h4 className="font-semibold mb-4 text-center text-lg">Our Current Interns</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {trainingPrograms[activeTrainingTab].title === "Full-Stack Development" && fullStackInterns.map((intern, index) => (
                        <div key={index} className={`rounded-xl p-3 text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <img
                            src={intern.image}
                            alt={intern.name}
                            className="w-16 h-16 mx-auto mb-2 rounded-full object-cover ring-2 ring-[#952301]/30"
                          />
                          <div className="font-medium text-sm">{intern.name}</div>
                          <div className="text-xs text-[#952301]">{intern.role}</div>
                          <div className="flex flex-wrap gap-1 justify-center mt-1">
                            {intern.skills.slice(0, 2).map((skill, idx) => (
                              <span key={idx} className="px-1 py-0.5 bg-[#952301]/10 text-[#952301] rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                      {trainingPrograms[activeTrainingTab].title === "Digital Marketing & Growth" && marketingInterns.map((intern, index) => (
                        <div key={index} className={`rounded-xl p-3 text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <img
                            src={intern.image}
                            alt={intern.name}
                            className="w-16 h-16 mx-auto mb-2 rounded-full object-cover ring-2 ring-[#952301]/30"
                          />
                          <div className="font-medium text-sm">{intern.name}</div>
                          <div className="text-xs text-[#952301]">{intern.role}</div>
                          <div className="flex flex-wrap gap-1 justify-center mt-1">
                            {intern.skills.slice(0, 2).map((skill, idx) => (
                              <span key={idx} className="px-1 py-0.5 bg-[#952301]/10 text-[#952301] rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                      {(trainingPrograms[activeTrainingTab].title !== "Full-Stack Development" && trainingPrograms[activeTrainingTab].title !== "Digital Marketing & Growth") && (
                        <div className="col-span-2 text-center py-8">
                          <FaUsers className="text-4xl text-gray-400 mx-auto mb-2" />
                          <p className={getTextColor()}>Meet our future interns - applications open!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Trainers Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-center mb-12">Meet Our Expert Trainers</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainers.map((trainer, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`rounded-2xl p-6 text-center transition-all duration-300 ${getCardBackground()} ${getBorderColor()} border`}
                >
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-32 h-32 mx-auto mb-4 rounded-full object-cover object-top ring-4 ring-[#952301]/20"
                  />
                  <h4 className="text-xl font-bold mb-2">{trainer.name}</h4>
                  <p className="text-[#952301] font-semibold mb-2">{trainer.role}</p>
                  <p className={`text-sm mb-4 ${getTextColor()}`}>{trainer.specialization}</p>

                  <div className="space-y-2">
                    {trainer.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                        <span className={getTextColor()}>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Rest of the component remains the same... */}
        {/* Company Values Section */}
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
                className={`text-center p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 ${getCardBackground()} ${getBorderColor()} border`}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#952301] to-[#611701] rounded-full flex items-center justify-center">
                  <value.icon />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className={`leading-relaxed ${getTextColor()}`}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Culture Video Section */}
        <motion.section
          id="culture"
          className="py-20 rounded-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#952301] to-[#611701] bg-clip-text text-transparent">
            Life at Nexventures
          </h2>

          <div className="relative max-w-7xl mx-auto rounded-2xl overflow-hidden">
            <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/l1HZtZ0kKbw?autoplay=0&mute=1&loop=1&playlist=l1HZtZ0kKbw"
                title="Company culture video showcasing our inclusive workplace"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>



          </div>
        </motion.section>

        {/* Job Openings Section */}
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
            Join Our Mission
          </motion.h2>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {openings.map((job, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 cursor-pointer border ${getCardBackground()} ${getBorderColor()}`}
                onClick={() => setSelectedJob(idx)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${job.title} position`}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedJob(idx)}
              >
                <div className={`w-16 h-16 mb-6 bg-gradient-to-r ${job.color} rounded-xl flex items-center justify-center`}>
                  <job.icon />
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`flex items-center gap-1 ${getTextColor()}`}>
                        <FaBriefcase />
                        {job.type}
                      </span>
                      <span className={`flex items-center gap-1 ${getTextColor()}`}>
                        <FaMapMarkerAlt />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className={`mb-6 line-clamp-3 ${getTextColor()}`}>{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.requirements.slice(0, 2).map((req, i) => (
                    <span key={i} className="px-3 py-1 bg-[#952301]/10 text-[#952301] rounded-full text-xs font-medium">
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 2 && (
                    <span className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                      }`}>
                      +{job.requirements.length - 2} more
                    </span>
                  )}
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1">
                  Apply Now
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
                className={`rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                  }`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-labelledby="job-title"
                aria-modal="true"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 id="job-title" className="text-3xl font-bold mb-2">
                      {openings[selectedJob].title}
                    </h2>
                    <div className={`flex items-center gap-6 ${getTextColor()}`}>
                      <span className="flex items-center gap-2">
                        <FaBriefcase />
                        {openings[selectedJob].type}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt />
                        {openings[selectedJob].location}
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
                    <h3 className="text-xl font-bold mb-4">Description</h3>
                    <p className={`mb-6 leading-relaxed ${getTextColor()}`}>
                      {openings[selectedJob].description}
                    </p>

                    <h3 className="text-xl font-bold mb-4">Requirements</h3>
                    <ul className="space-y-2 mb-6">
                      {openings[selectedJob].requirements.map((req, i) => (
                        <li key={i} className={`flex items-center gap-2 ${getTextColor()}`}>
                          <FaCheckCircle className="text-green-500 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Benefits</h3>
                    <ul className="space-y-2 mb-8">
                      {openings[selectedJob].benefits.map((benefit, i) => (
                        <li key={i} className={`flex items-center gap-2 ${getTextColor()}`}>
                          <FaHeart className="text-[#952301] flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`mailto:careers@nexventures.net?subject=Application for ${encodeURIComponent(openings[selectedJob].title)}`}
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

        {/* Training Application Modal */}
        <AnimatePresence>
          {showTrainingModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowTrainingModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`rounded-2xl p-8 max-w-md w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                  }`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-labelledby="training-modal-title"
                aria-modal="true"
              >
                {trainingModalStatus === 'success' ? (
                  <div className="text-center">
                    <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Application Submitted!</h3>
                    <p className={`mb-6 ${getTextColor()}`}>
                      Thank you for your interest! We'll get back to you within 24 hours to discuss next steps.
                    </p>
                    <button
                      onClick={() => setShowTrainingModal(false)}
                      className="px-6 py-3 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-xl font-semibold transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 id="training-modal-title" className="text-2xl font-bold mb-2">
                          Apply for {trainingApplication.program}
                        </h2>
                        <p className={getTextColor()}>We'll contact you to discuss the program details</p>
                      </div>
                      <button
                        onClick={() => setShowTrainingModal(false)}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                        aria-label="Close application form"
                      >
                        ×
                      </button>
                    </div>

                    <form onSubmit={handleTrainingApplication} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={trainingApplication.name}
                          onChange={(e) => setTrainingApplication(prev => ({ ...prev, name: e.target.value }))}
                          className={`w-full px-4 py-2 rounded-lg border ${darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-800'
                            }`}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={trainingApplication.email}
                          onChange={(e) => setTrainingApplication(prev => ({ ...prev, email: e.target.value }))}
                          className={`w-full px-4 py-2 rounded-lg border ${darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-800'
                            }`}
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label htmlFor="program" className="block text-sm font-medium mb-2">
                          Program
                        </label>
                        <select
                          id="program"
                          value={trainingApplication.program}
                          onChange={(e) => setTrainingApplication(prev => ({ ...prev, program: e.target.value }))}
                          className={`w-full px-4 py-2 rounded-lg border ${darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-800'
                            }`}
                        >
                          {trainingPrograms.map((program, index) => (
                            <option key={index} value={program.title}>
                              {program.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={trainingModalStatus === 'submitting'}
                        className="w-full px-6 py-3 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {trainingModalStatus === 'submitting' ? (
                          <>
                            <FaSpinner className="inline mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Work Perks Section */}
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
                <h3 className="text-2xl font-bold mb-8">{category.category}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((perk, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={`backdrop-blur-sm rounded-xl p-6 transition-all duration-300 ${getCardBackground()}`}
                    >
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#952301] to-[#611701] rounded-lg flex items-center justify-center">
                        <perk.icon />
                      </div>
                      <h4 className="font-semibold mb-2">{perk.text}</h4>
                      <p className={`text-sm ${getTextColor()}`}>{perk.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Testimonials Section */}
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
            Success Stories
          </motion.h2>

          <div className="relative max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`backdrop-blur-sm rounded-2xl p-8 md:p-12 ${getCardBackground()}`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={`${testimonials[currentTestimonial].name} - ${testimonials[currentTestimonial].role}`}
                      className="w-32 h-32 hidden rounded-full object-cover ring-4 ring-[#952301]/20"
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

                    <p className={`text-lg md:text-xl mb-6 leading-relaxed italic ${getTextColor()}`}>
                      &ldquo;{testimonials[currentTestimonial].feedback}&rdquo;
                    </p>

                    <div>
                      <h4 className="text-xl font-bold">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-[#952301] font-semibold">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className={`text-sm ${getTextColor()}`}>
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentTestimonial
                    ? 'bg-[#952301] w-8'
                    : darkMode
                      ? 'bg-gray-600 hover:bg-gray-500'
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
          <div className={`rounded-3xl p-8 md:p-12 text-center ${darkMode
            ? 'bg-gradient-to-br from-[#952301]/20 via-gray-800 to-[#611701]/20'
            : 'bg-gradient-to-br from-[#952301]/10 via-orange-50 to-[#611701]/10'
            }`}>
            <motion.div variants={itemVariants}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#952301] to-[#611701] rounded-2xl flex items-center justify-center">
                <FaRocket className="text-3xl text-white" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Make Impact?
              </h3>
              <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${getTextColor()}`}>
                Join our mission to shape Africa's tech future. Whether you're looking for a career opportunity or want to enhance your skills through our training programs, we'd love to hear from you.
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
                    className={`block w-full px-8 py-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${uploadStatus === 'success'
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
                    {uploadStatus === 'success' && 'CV Uploaded - Well Get Back to You!'}
                    {uploadStatus === 'error' && 'Upload Failed - Try Again'}
                    {uploadStatus === 'idle' && 'Upload Your CV'}
                  </label>
                </div>

                {fileName && uploadStatus !== 'idle' && (
                  <p className={`mt-2 text-sm ${getTextColor()}`}>
                    File: {fileName}
                  </p>
                )}

                <p className={`text-xs mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
            className={`text-center backdrop-blur-sm rounded-2xl p-8 md:p-12 ${getCardBackground()}`}
          >
            <h3 className="text-3xl font-bold mb-6">
              Start Your Journey With Us
            </h3>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${getTextColor()}`}>
              Have questions about career opportunities, training programs, or our incubation process?
              We're here to help you take the next step.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:info@nexventures.net"
                className="px-8 py-4 bg-gradient-to-r from-[#952301] to-[#611701] text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaEnvelopeOpenText className="inline mr-2" />
                Get in Touch
              </a>

              <a
                href="https://wa.me/250795022500"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp Us
              </a>

              <a
                href="tel:+250795022500"
                className={`px-8 py-4 border-2 border-[#952301] rounded-xl font-semibold transition-all duration-300 ${darkMode
                  ? 'text-white hover:bg-[#952301]'
                  : 'text-[#952301] hover:bg-[#952301] hover:text-white'
                  }`}
              >
                Call Us: +250 795 022 500
              </a>
            </div>

            <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
              <p className={`text-sm ${getTextColor()}`}>
                Nexventures is an equal opportunity employer and training provider committed to diversity and inclusion.
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