// src/pages/Portfolio.tsx
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";

const allProjects = [
  { 
    title: "E-commerce Web App", 
    desc: "Custom online store with MoMo & Stripe checkout, featuring real-time inventory management and advanced analytics.", 
    img: "/images/project1.jpg", 
    category: "Web",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    duration: "3 months",
    client: "Retail Startup",
    challenge: "Integrating multiple payment gateways while maintaining security standards",
    solution: "Implemented microservices architecture with automated testing",
    results: "40% increase in conversion rate"
  },
  { 
    title: "NGO Branding", 
    desc: "Complete brand identity for a youth-focused NGO, including logo design, brand guidelines, and marketing materials.", 
    img: "/images/project2.jpg", 
    category: "Design",
    tech: ["Adobe Creative Suite", "Figma", "Brand Strategy"],
    duration: "2 months",
    client: "Youth NGO Rwanda",
    challenge: "Creating a brand that resonates with young people while maintaining professional credibility",
    solution: "Developed a vibrant yet professional visual identity with cultural elements",
    results: "300% increase in social media engagement"
  },
  { 
    title: "Startup MVP App", 
    desc: "Flutter-based mobile application with Firebase backend, featuring real-time chat and geolocation services.", 
    img: "/images/project3.jpg", 
    category: "Mobile",
    tech: ["Flutter", "Firebase", "Google Maps API", "WebRTC"],
    duration: "4 months",
    client: "Tech Startup",
    challenge: "Building a scalable real-time communication platform",
    solution: "Implemented WebRTC for peer-to-peer communication and Firebase for backend",
    results: "10K+ downloads in first month"
  },
  { 
    title: "Cloud Dashboard", 
    desc: "Comprehensive admin dashboard with advanced analytics, CI/CD integration, and multi-tenant architecture.", 
    img: "/images/project4.jpg", 
    category: "Web",
    tech: ["Vue.js", "AWS", "Docker", "Jenkins", "D3.js"],
    duration: "6 months",
    client: "Enterprise Client",
    challenge: "Managing complex data visualization with real-time updates",
    solution: "Built with micro-frontend architecture and optimized data streaming",
    results: "50% reduction in operational overhead"
  },
  { 
    title: "UX Research Project", 
    desc: "Comprehensive usability testing and UX reporting for a fintech application, including user journey mapping.", 
    img: "/images/project5.jpg", 
    category: "Design",
    tech: ["User Research", "Figma", "Analytics", "A/B Testing"],
    duration: "3 months",
    client: "Fintech Company",
    challenge: "Improving user onboarding flow and reducing drop-off rates",
    solution: "Conducted extensive user research and implemented data-driven design changes",
    results: "60% improvement in user onboarding completion"
  },
  { 
    title: "Delivery App UI", 
    desc: "Modern React Native UI prototype for a food delivery startup with intuitive user experience and accessibility features.", 
    img: "/images/project6.jpg", 
    category: "Mobile",
    tech: ["React Native", "Expo", "Redux", "Maps API"],
    duration: "2 months",
    client: "Food Delivery Startup",
    challenge: "Creating an intuitive interface for diverse user demographics",
    solution: "Implemented voice navigation and high-contrast mode for accessibility",
    results: "95% user satisfaction rate in testing"
  },
];

const categories = ["All", "Web", "Mobile", "Design"];

// Animation variants
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
      damping: 15
    }
  }
};

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 50 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2
    }
  }
};

export default function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');
  const modalRef = useRef<HTMLDivElement>(null);

  const filteredProjects = filter === "All" ? allProjects : allProjects.filter(p => p.category === filter);

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selected !== null) {
        if (e.key === 'Escape') {
          setSelected(null);
        } else if (e.key === 'ArrowLeft' && selected > 0) {
          setSelected(selected - 1);
        } else if (e.key === 'ArrowRight' && selected < filteredProjects.length - 1) {
          setSelected(selected + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, filteredProjects.length]);

  // Focus management for accessibility
  useEffect(() => {
    if (selected !== null && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selected]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#923600] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400" aria-live="polite">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.6 }} 
      className="bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 text-gray-800 dark:text-gray-100 min-h-screen"
    >
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-r from-[#7c2f02] to-[#c43902] text-white py-20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Work
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Crafting digital experiences that inspire, engage, and drive results. 
            Explore our collection of innovative projects and success stories.
          </motion.p>
          
          {/* Floating elements for visual interest */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>
      </motion.div>

      <div className="px-6 py-16 max-w-7xl mx-auto">
        {/* Filter and View Controls */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Project categories">
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#af623e] focus:ring-offset-2 ${
                  filter === cat 
                    ? 'bg-gradient-to-r from-[#ad4e00] to-[#973e02] text-white border-transparent' 
                    : 'bg-white dark:bg-gray-800 border-[#a84309] text-[#7a2402] dark:text-[#da9a5e] hover:bg-[#b98d64] hover:text-white dark:hover:bg-[#dd9b7d]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                role="tab"
                aria-selected={filter === cat}
                aria-controls="projects-grid"
              >
                {cat}
                {filter === cat && (
                  <motion.div
                    className="ml-2 inline-block"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    ✨
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full p-2">
            <button
              onClick={() => setCurrentView('grid')}
              className={`p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ca764fe8] ${
                currentView === 'grid' 
                  ? 'bg-[#b44f0c] text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-label="Grid view"
              title="Grid view"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#cf8c4c] ${
                currentView === 'list' 
                  ? 'bg-[#c07c16] text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-label="List view"
              title="List view"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          id="projects-grid"
          role="tabpanel"
          aria-label={`${filter} projects`}
          className={`
            ${currentView === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
              : 'space-y-8'
            }
          `}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((proj, idx) => (
              <motion.div
                key={`${filter}-${idx}`}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                onClick={() => setSelected(idx)}
                className={`
                  group cursor-pointer transform transition-all duration-500 hover:scale-105 focus-within:scale-105
                  ${currentView === 'grid' 
                    ? 'bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700' 
                    : 'bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col lg:flex-row'
                  }
                `}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${proj.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(idx);
                  }
                }}
              >
                <div className={`relative overflow-hidden ${currentView === 'list' ? 'lg:w-1/3' : ''}`}>
                  <img 
                    src={proj.img} 
                    alt={`${proj.title} project screenshot`} 
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      currentView === 'grid' ? 'h-64' : 'h-48 lg:h-full'
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-[#c23c13] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {proj.category}
                  </div>
                </div>
                
                <div className={`p-6 ${currentView === 'list' ? 'lg:w-2/3 flex flex-col justify-center' : ''}`}>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-[#9c8767] transition-colors duration-300">
                    {proj.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm lg:text-base">
                    {proj.desc}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tech.slice(0, 3).map((tech, techIdx) => (
                      <span 
                        key={techIdx}
                        className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-[#be4c00] px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.tech.length > 3 && (
                      <span className="text-gray-500 text-xs">+{proj.tech.length - 3} more</span>
                    )}
                  </div>
                  
                  {/* Project Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {proj.duration}
                    </span>
                    <span className="font-medium text-[#be4906]">View Details →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try selecting a different category</p>
          </motion.div>
        )}
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <motion.div 
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSelected(null);
              }}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center z-10">
                <h2 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredProjects[selected].title}
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Close project details"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <img
                  src={filteredProjects[selected].img}
                  alt={`${filteredProjects[selected].title} project showcase`}
                  className="rounded-xl mb-6 w-full h-64 lg:h-80 object-cover"
                />
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Project Overview</h3>
                    <p id="modal-description" className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {filteredProjects[selected].desc}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Challenge</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {filteredProjects[selected].challenge}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solution</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {filteredProjects[selected].solution}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Results</h4>
                        <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">
                          {filteredProjects[selected].results}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Project Details</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Client</h4>
                        <p className="text-gray-600 dark:text-gray-400">{filteredProjects[selected].client}</p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Duration</h4>
                        <p className="text-gray-600 dark:text-gray-400">{filteredProjects[selected].duration}</p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {filteredProjects[selected].tech.map((tech, techIdx) => (
                            <span 
                              key={techIdx}
                              className="bg-gradient-to-r from-[#ad4000] to-[#a35700] text-white px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setSelected(selected > 0 ? selected - 1 : filteredProjects.length - 1)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#9563ff]"
                    aria-label="Previous project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                  
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {selected + 1} of {filteredProjects.length}
                  </span>
                  
                  <button
                    onClick={() => setSelected(selected < filteredProjects.length - 1 ? selected + 1 : 0)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#9563ff]"
                    aria-label="Next project"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.section>
  );
}