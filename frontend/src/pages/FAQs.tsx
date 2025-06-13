import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaLanguage,
  FaAccessibleIcon,
  FaVolumeUp,
  FaEye,
  FaFilter,
  FaBookmark,
  FaShare,
  FaPrint,
  FaDownload,
  FaRobot,
  FaCheck,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaLightbulb,
  FaGlobe,
  FaRocket
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CTASection from "../components/AboutUsComp/CTASection";

const faqSections = [
  {
    category: "General",
    icon: <FaQuestionCircle />,
    color: "from-orange-800 to-amber-700",
    faqs: [
      {
        id: 1,
        q: "Where are you located? / Muri he?",
        a: "We are based in Kigali, Rwanda. / Dukorera i Kigali, mu Rwanda.",
        tags: ["location", "office", "kigali", "rwanda"],
        helpful: 45,
        views: 120
      },
      {
        id: 2,
        q: "Do you work with startups? / Mukorana n'ibigo bito bitangiye?",
        a: "Absolutely! We love working with early-stage teams and provide specialized support for startups including mentorship, funding guidance, and technical assistance. / Yego rwose, dukunda gukorana n'amatsinda atangiye kandi dutanga ubufasha bwihariye.",
        tags: ["startups", "collaboration", "mentorship"],
        helpful: 38,
        views: 95
      },
      {
        id: 3,
        q: "How do I request a quote? / Nakora nte ngo mbone igiciro?",
        a: "Just fill out our contact form or email hello@nexventures.rw. We typically respond within 24 hours. / Wuzuza ifishi yo ku rubuga cyangwa utwandikire kuri email. Dusubiza mu masaha 24.",
        tags: ["quote", "contact", "pricing"],
        helpful: 52,
        views: 140
      },
      {
        id: 4,
        q: "What industries do you serve? / Ni ibihe bigo mukorana nabyo?",
        a: "We work across various sectors including technology, healthcare, education, agriculture, and financial services. / Dukorera mu nzego zitandukanye harimo ikoranabuhanga, ubuvuzi, uburezi, ubuhinzi, n'imirimo y'imari.",
        tags: ["industries", "sectors", "services"],
        helpful: 29,
        views: 78
      }
    ],
  },
  {
    category: "Opportunities",
    icon: <FaRocket />,
    color: "from-red-900 to-orange-800",
    faqs: [
      {
        id: 5,
        q: "Do you offer training or workshops? / Mugitanga amahugurwa?",
        a: <>Yes! We offer comprehensive training programs. Visit our <Link to="/trainings" className="text-orange-400 hover:text-orange-300 underline font-semibold transition-colors duration-200">Trainings</Link> page for details. / Yego, dutanga gahunda zo kwihugura. Musure urupapuro rwa <Link to="/trainings" className="text-orange-400 hover:text-orange-300 underline font-semibold transition-colors duration-200">Amahugurwa</Link>.</>,
        tags: ["training", "workshops", "education"],
        helpful: 41,
        views: 103
      },
      {
        id: 6,
        q: "Can I apply for internships or jobs? / Nshobora kubona akazi cyangwa kwimenyereza?",
        a: <>Check our <Link to="/careers" className="text-orange-400 hover:text-orange-300 underline font-semibold transition-colors duration-200">Careers</Link> page or email careers@nexventures.rw for current openings. / Reba urupapuro rwa <Link to="/careers" className="text-orange-400 hover:text-orange-300 underline font-semibold transition-colors duration-200">Imirimo</Link>.</>,
        tags: ["careers", "internships", "jobs"],
        helpful: 33,
        views: 87
      },
      {
        id: 7,
        q: "Do you provide mentorship programs? / Mugitanga gahunda zo kugisha?",
        a: "Yes, we have structured mentorship programs for entrepreneurs and professionals. Applications are reviewed quarterly. / Yego, dufite gahunda zitunganye zo kugisha abacuruzi n'abanyabuziranenge.",
        tags: ["mentorship", "guidance", "programs"],
        helpful: 27,
        views: 65
      }
    ],
  },
  {
    category: "Features & Services",
    icon: <FaLightbulb />,
    color: "from-amber-900 to-red-800",
    faqs: [
      {
        id: 8,
        q: "Can I subscribe to a newsletter? / Nshobora kwiyandikisha kuri newsletter?",
        a: "Yes! Our newsletter features industry insights, company updates, and exclusive content. Subscribe at the bottom of any page. / Yego, newsletter yacu ikubiyemo amakuru y'inganda, amakuru ya sosiyete, n'ibinyamakuru byihariye.",
        tags: ["newsletter", "updates", "subscription"],
        helpful: 19,
        views: 54
      },
      {
        id: 9,
        q: "Where can I follow you on social media? / Munkurikira he kuri social media?",
        a: "We're active on LinkedIn, Instagram, X (Twitter), and YouTube. Find our handles in the footer. / Dukorera kuri LinkedIn, Instagram, X (Twitter), na YouTube.",
        tags: ["social media", "follow", "updates"],
        helpful: 22,
        views: 67
      },
      {
        id: 10,
        q: "Do you offer 24/7 support? / Mugitanga ubufasha mu gihe cyose?",
        a: "We provide support during business hours (8 AM - 6 PM EAT) Monday to Friday, with emergency support available for critical issues. / Dutanga ubufasha mu gihe cy'akazi (8:00 - 18:00) kuva ku wa mbere kugeza ku wa gatanu.",
        tags: ["support", "hours", "emergency"],
        helpful: 31,
        views: 89
      }
    ],
  },
  {
    category: "Technical & Security",
    icon: <FaGlobe />,
    color: "from-red-800 to-amber-800",
    faqs: [
      {
        id: 11,
        q: "How do you ensure data privacy? / Mukora nte kugira ngo amakuru ajye neza?",
        a: "We follow strict data protection protocols including GDPR compliance, encrypted data transmission, and regular security audits. / Dukurikiza amahame akomeye yo kurinda amakuru harimo kwubahiriza GDPR.",
        tags: ["privacy", "security", "data protection"],
        helpful: 25,
        views: 72
      },
      {
        id: 12,
        q: "What technologies do you use? / Ni ibihe bikoresho mukoresha?",
        a: "We work with modern technologies including React, Node.js, Python, cloud platforms (AWS, Azure), and various databases. Our tech stack evolves with industry standards. / Dukoresha ikoranabuhanga rigezweho.",
        tags: ["technology", "development", "tools"],
        helpful: 18,
        views: 43
      }
    ]
  }
];

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function FAQs() {
  const { darkMode } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState<{ section: number; item: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [bookmarkedFAQs, setBookmarkedFAQs] = useState<number[]>([]);
  const [helpfulVotes, setHelpfulVotes] = useState<{ [key: number]: 'up' | 'down' | null }>({});
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && activeIndex) {
        setActiveIndex(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  // Text-to-speech function
  const speakText = (text: string) => {
    if (isVoiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleFAQ = (sectionIdx: number, itemIdx: number) => {
    const newIndex = activeIndex?.section === sectionIdx && activeIndex?.item === itemIdx
      ? null
      : { section: sectionIdx, item: itemIdx };

    setActiveIndex(newIndex);

    // Announce change for screen readers
    if (newIndex) {
      const faq = filteredSections[sectionIdx]?.faqs[itemIdx];
      if (faq && isVoiceEnabled) {
        speakText(typeof faq.q === 'string' ? faq.q : '');
      }
    }
  };

  const toggleBookmark = (faqId: number) => {
    setBookmarkedFAQs(prev =>
      prev.includes(faqId)
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  const voteHelpful = (faqId: number, vote: 'up' | 'down') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [faqId]: prev[faqId] === vote ? null : vote
    }));
  };

  const exportFAQs = () => {
    const faqText = filteredSections.map(section =>
      `${section.category}\n${section.faqs.map(faq =>
        `Q: ${typeof faq.q === 'string' ? faq.q : ''}\nA: ${typeof faq.a === 'string' ? faq.a : ''}`
      ).join('\n\n')}`
    ).join('\n\n---\n\n');

    const blob = new Blob([faqText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexventures-faqs.txt';
    a.click();
  };

  const filteredSections = faqSections.map((section) => ({
    ...section,
    faqs: section.faqs.filter((faq) => {
      const question = typeof faq.q === "string" ? faq.q : "";
      const matchesSearch = question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || section.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.helpful - a.helpful;
      if (sortBy === 'views') return b.views - a.views;
      return 0;
    })
  })).filter(section => section.faqs.length > 0);

  const categories = ["All", ...faqSections.map(section => section.category)];

  const fontSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg"
  };

  const bgClass = highContrast
    ? 'bg-black text-white'
    : darkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
      : 'bg-gradient-to-br from-slate-50 via-white to-gray-50 text-gray-800';

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen transition-all duration-300 ${bgClass} ${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]}`}
    >
      <Navbar />

      {/* Accessibility Panel */}
      <AnimatePresence>
        {showAccessibilityPanel && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className={`fixed top-16 right-4 z-50 p-4 rounded-lg border-2 border-orange-800 ${darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
          >
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <FaAccessibleIcon className="text-orange-800" />
              Accessibility Options
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Font Size</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700' : 'bg-white'
                    }`}
                  aria-label="Select font size"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="voice-enabled"
                  checked={isVoiceEnabled}
                  onChange={(e) => setIsVoiceEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="voice-enabled" className="text-sm">
                  <FaVolumeUp className="inline mr-1" />
                  Voice Reading
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="high-contrast"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="high-contrast" className="text-sm">
                  <FaEye className="inline mr-1" />
                  High Contrast
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 sm:p-6 lg:p-10 max-w-full md:max-w-11/12 mx-auto">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-800 to-red-900 rounded-full mb-6"
          >
            <FaQuestionCircle className="text-4xl text-white" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-2xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-800 via-red-800 to-amber-800 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className={`text-xl max-md:text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            Ibibazo Bikunze Kubazwa
          </motion.p>
          <motion.p
            variants={itemVariants}
            className={`text-lg max-w-3xl max-md:text-xs mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
          >
            Find answers to common questions about our services, opportunities, and more.
            Get the information you need quickly and easily.
          </motion.p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 space-y-4"
        >
          {/* Search and Accessibility */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-4 items-center w-full overflow-x-auto">
            <div className={`flex-1 flex items-center gap-2 border-2 rounded-full px-4 py-3 focus-within:border-orange-500 transition-colors duration-300 ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-orange-100 bg-white'
              }`}>
              <FaSearch className="text-orange-600 text-lg" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search FAQs... / Shakisha ibibazo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-lg"
                aria-label="Search frequently asked questions"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-gray-400 hover:text-orange-600 transition-colors"
                  aria-label="Clear search"
                >
                  <FaCheck />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 ">
              <button
                onClick={() => setShowAccessibilityPanel(!showAccessibilityPanel)}
                className="p-3 bg-orange-800 text-white rounded-full hover:bg-orange-700 transition-colors"
                aria-label="Toggle accessibility options"
              >
                <FaAccessibleIcon className="text-xl" />
              </button>

              <button
                onClick={exportFAQs}
                className="p-3 bg-gradient-to-r from-orange-800 to-red-800 text-white rounded-full hover:from-orange-700 hover:to-red-700 transition-colors"
                aria-label="Export FAQs"
              >
                <FaDownload className="text-xl" />
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 items-center justify-between ">
            <div className="flex items-center gap-2 w-full overflow-x-auto">
              <FaFilter className="text-orange-600 text-lg mt-2 w-full" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 font-medium whitespace-nowrap ${selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-800 to-red-800 text-white transform scale-105'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-orange-200'
                    }`}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 border-2 rounded-full focus:border-orange-500 transition-colors ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-orange-200 bg-white'
                }`}
              aria-label="Sort FAQs by"
            >
              <option value="popular">Most Helpful</option>
              <option value="views">Most Viewed</option>
            </select>
          </motion.div>
        </motion.div>

        {/* FAQ Content */}
        {filteredSections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full mb-6">
              <FaSearch className="text-4xl text-orange-800" />
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              No matching questions found
            </h3>
            <p className={`text-gray-500 dark:text-gray-400 mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
              Nta bibazo bihuye byabonetse. Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-800 to-red-800 text-white rounded-full hover:from-orange-700 hover:to-red-700 transition-colors font-medium"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {filteredSections.map((section, sectionIdx) => (
              <motion.div
                key={section.category}
                variants={itemVariants}
                className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  }`}
              >
                <div className={`bg-gradient-to-r ${section.color} p-6 text-white `}>
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <span className="text-4xl">{section.icon}</span>
                    {section.category}
                  </h2>
                  <p className="mt-2 opacity-90">
                    {section.faqs.length} question{section.faqs.length !== 1 ? 's' : ''} available
                  </p>
                </div>

                <div className="p-6 space-y-4 w-full overflow-x-auto">
                  {section.faqs.map((item, itemIdx) => (
                    <motion.div
                      key={item.id}
                      layout
                      className={`border-2  rounded-xl overflow-x-auto transition-all duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-200'
                        }`}
                    >
                      <button
                        onClick={() => toggleFAQ(sectionIdx, itemIdx)}
                        className={`flex justify-between items-center w-full p-6  cursor-pointer transition-all duration-300 group ${darkMode
                            ? 'bg-gradient-to-r from-gray-700 to-gray-600'
                            : ''
                          }`}
                        aria-expanded={activeIndex?.section === sectionIdx && activeIndex?.item === itemIdx}
                        aria-controls={`faq-${sectionIdx}-${itemIdx}`}
                      >
                        <div className="flex-1 text-left">
                          <div className={`font-semibold line-clamp-1 w-full max-sm:text-sm overflow-clip text-lg group-hover:text-orange-800 transition-colors duration-300 ${darkMode
                              ? 'text-gray-100 dark:group-hover:text-orange-400'
                              : 'text-gray-800'
                            }`}>
                            {typeof item.q === 'string' ? item.q : ''}
                          </div>
                          <div className={`flex items-center gap-4 mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                            <span className="flex items-center gap-1 max-sm:text-xs">
                              <FaEye /> {item.views} views
                            </span>
                            <span className="flex items-center gap-1 max-sm:text-xs">
                              <FaThumbsUp /> {item.helpful} helpful
                            </span>
                            <div className="flex gap-1">
                              {item.tags.slice(0, 3).map(tag => (
                                <span key={tag} className={`px-2 py-1 rounded-full text-xs ${darkMode
                                    ? 'bg-orange-800 text-orange-200'
                                    : 'bg-orange-200 text-orange-800'
                                  }`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(item.id);
                            }}
                            className={`p-2 rounded-full transition-colors ${bookmarkedFAQs.includes(item.id)
                                ? 'text-orange-600 bg-orange-100'
                                : 'text-gray-400 hover:text-orange-600 hover:bg-orange-100'
                              }`}
                            aria-label={bookmarkedFAQs.includes(item.id) ? 'Remove bookmark' : 'Add bookmark'}
                          >
                            <FaBookmark />
                          </button>

                          {isVoiceEnabled && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakText(typeof item.q === 'string' ? item.q : '');
                              }}
                              className="p-2 text-gray-400 hover:text-orange-600 rounded-full hover:bg-orange-100 transition-colors"
                              aria-label="Read question aloud"
                            >
                              <FaVolumeUp />
                            </button>
                          )}

                          <div className="text-orange-600 text-2xl">
                            {activeIndex?.section === sectionIdx && activeIndex?.item === itemIdx ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {activeIndex?.section === sectionIdx && activeIndex?.item === itemIdx && (
                          <motion.div
                            key={`faq-${sectionIdx}-${itemIdx}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={`border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'
                              }`}
                            id={`faq-${sectionIdx}-${itemIdx}`}
                          >
                            <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'
                              }`}>
                              <div className={`prose prose-lg max-w-none mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                {typeof item.a === 'string' ? (
                                  <p className="leading-relaxed">{item.a}</p>
                                ) : (
                                  <div className="leading-relaxed">{item.a}</div>
                                )}
                              </div>

                              {/* Interaction buttons */}
                              <div className={`flex items-center justify-between pt-4 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'
                                }`}>
                                <div className="flex items-center gap-4">
                                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    Was this helpful?
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => voteHelpful(item.id, 'up')}
                                      className={`p-2 rounded-full transition-colors ${helpfulVotes[item.id] === 'up'
                                          ? 'bg-green-100 text-green-600'
                                          : 'text-gray-400 hover:text-green-600 hover:bg-green-100'
                                        }`}
                                      aria-label="Mark as helpful"
                                    >
                                      <FaThumbsUp />
                                    </button>
                                    <button
                                      onClick={() => voteHelpful(item.id, 'down')}
                                      className={`p-2 rounded-full transition-colors ${helpfulVotes[item.id] === 'down'
                                          ? 'bg-red-100 text-red-600'
                                          : 'text-gray-400 hover:text-red-600 hover:bg-red-100'
                                        }`}
                                      aria-label="Mark as not helpful"
                                    >
                                      <FaThumbsDown />
                                    </button>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      navigator.share?.({
                                        title: typeof item.q === 'string' ? item.q : '',
                                        text: typeof item.a === 'string' ? item.a : '',
                                        url: window.location.href
                                      });
                                    }}
                                    className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                                    aria-label="Share this FAQ"
                                  >
                                    <FaShare />
                                  </button>

                                  <button
                                    onClick={() => window.print()}
                                    className="p-2 text-gray-400 hover:text-purple-600 rounded-full hover:bg-purple-100 transition-colors"
                                    aria-label="Print this FAQ"
                                  >
                                    <FaPrint />
                                  </button>

                                  {isVoiceEnabled && (
                                    <button
                                      onClick={() => speakText(typeof item.a === 'string' ? item.a : '')}
                                      className="p-2 text-gray-400 hover:text-orange-600 rounded-full hover:bg-orange-100 transition-colors"
                                      aria-label="Read answer aloud"
                                    >
                                      <FaVolumeUp />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 bg-gradient-to-r from-orange-800 via-red-800 to-amber-800 text-white rounded-2xl px-4 py-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl max-sm:text-md font-bold mb-4  flex items-center justify-center gap-3">
              <FaRobot className="text-4xl" />
              Still Have Questions?
            </h2>
            <p className="text-xl opacity-90 mb-6 max-sm:text-sm">
              Ufite ibibazo bikindi? Get in touch with our team!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
            >
              <FaPhone className="text-3xl mb-3 mx-auto max-sm:text-xs" />
              <h3 className="font-semibold mb-2 max-sm:text-xs">Call Us</h3>
              <p className="text-sm opacity-90 max-sm:text-xs">+250 795 022 500</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-white/10 backdrop-blur-sm max-sm:text-xs rounded-xl p-6 text-center border border-white/20"
            >
              <FaEnvelope className="text-3xl mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm opacity-90">hello@nexventures.rw</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white/10 backdrop-blur-sm max-sm:text-xs rounded-xl p-6 text-center border border-white/20"
            >
              <FaMapMarkerAlt className="text-3xl mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-sm opacity-90">Kigali, Rwanda</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-white/10 backdrop-blur-sm max-sm:text-xs rounded-xl p-6 text-center border border-white/20"
            >
              <FaClock className="text-3xl mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Office Hours</h3>
              <p className="text-sm opacity-90">8 AM - 6 PM EAT</p>
            </motion.div>
          </div>

          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center max-sm:text-xs gap-2 bg-white text-orange-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              <FaComment />
              Contact Us Now
            </Link>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className={`text-center p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <div className="text-3xl max-sm:text-sm font-bold text-orange-800 mb-2">
              {faqSections.reduce((acc, section) => acc + section.faqs.length, 0)}
            </div>
            <div className={`font-medium max-sm:text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Total FAQs</div>
          </div>
          <div className={`text-center p-6 max-sm:text-xs ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border`}>
            <div className="text-3xl max-sm:text-sm font-bold text-red-800 mb-2">
              {faqSections.reduce((acc, section) =>
                acc + section.faqs.reduce((sectionAcc, faq) => sectionAcc + faq.views, 0), 0
              )}
            </div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>Total Views</div>
          </div>

          <div className={`text-center p-6 max-sm:text-xs ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border`}>
            <div className="text-3xl max-sm:text-sm font-bold text-amber-800 mb-2">
              {categories.length - 1}
            </div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>Categories</div>
          </div>

          <div className={`text-center p-6 max-sm:text-xs ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border`}>
            <div className="text-3xl max-sm:text-sm font-bold text-orange-600 mb-2">24/7</div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>Available</div>
          </div>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <div className={`inline-flex items-center gap-3 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 rounded-full border`}>
            <FaLanguage className="text-orange-600 text-xl max-sm:text-xs" />
            <span className={`font-medium max-sm:text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Available in: English & Kinyarwanda
            </span>
            <span className="text-gray-500">|</span>
            <span className={`font-medium max-sm:text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Biraboneka mu: Icyongereza & Ikinyarwanda
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-orange-800 to-red-800 text-white rounded-full hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <FaChevronUp className="text-xl" />
      </motion.button>
      <CTASection darkMode={darkMode} />
      <Footer />
    </motion.section>
  );
}