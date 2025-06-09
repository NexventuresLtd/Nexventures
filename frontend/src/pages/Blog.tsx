// src/pages/Blog.tsx
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaSearch, 
  FaFilter,
  FaCalendarAlt,
  FaTag,
  FaClock,
  FaUser,
  FaHeart,
  FaShare,
  FaBookmark,
  FaEye,
  FaComment,
  FaTimes,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress
} from "react-icons/fa";

const blogPosts = [
  {
    id: 1,
    title: "Why Your Business Needs a Website in 2025",
    date: "June 1, 2025",
    summary: "Explore the importance of having a strong digital presence and how a modern website impacts customer engagement in today's competitive market.",
    image: "/images/blog1.jpg",
    category: "Digital Strategy",
    author: "Sarah Johnson",
    readTime: "5 min read",
    views: 1250,
    likes: 89,
    comments: 23,
    featured: true,
    videoUrl: "/videos/website-importance.mp4",
    tags: ["Web Development", "Business", "Digital Marketing"]
  },
  {
    id: 2,
    title: "The Rise of Remote Digital Agencies in Africa",
    date: "May 25, 2025",
    summary: "How remote teams like NexVentures are reshaping the tech landscape with cost-effective innovation and global collaboration.",
    image: "/images/blog2.jpg",
    category: "Industry Insight",
    author: "Michael Chen",
    readTime: "8 min read",
    views: 980,
    likes: 67,
    comments: 15,
    featured: false,
    tags: ["Remote Work", "Africa Tech", "Innovation"]
  },
  {
    id: 3,
    title: "Top 5 Tools for Agile Product Development",
    date: "May 18, 2025",
    summary: "A comprehensive breakdown of essential tools for developers and project managers in agile startups and established companies.",
    image: "/images/blog3.jpg",
    category: "Productivity",
    author: "Emily Rodriguez",
    readTime: "6 min read",
    views: 1580,
    likes: 124,
    comments: 31,
    featured: true,
    tags: ["Development Tools", "Agile", "Productivity"]
  },
  {
    id: 4,
    title: "AI Integration in Modern Web Applications",
    date: "May 10, 2025",
    summary: "Discover how artificial intelligence is transforming user experiences and backend processes in contemporary web development.",
    image: "/images/blog4.jpg",
    category: "Technology",
    author: "David Kim",
    readTime: "10 min read",
    views: 2100,
    likes: 156,
    comments: 42,
    featured: true,
    tags: ["AI", "Web Development", "Machine Learning"]
  },
  {
    id: 5,
    title: "Sustainable Tech Practices for Startups",
    date: "May 3, 2025",
    summary: "Learn how emerging companies can implement eco-friendly technology solutions while maintaining growth and innovation.",
    image: "/images/blog5.jpg",
    category: "Sustainability",
    author: "Lisa Zhang",
    readTime: "7 min read",
    views: 890,
    likes: 78,
    comments: 19,
    featured: false,
    tags: ["Sustainability", "Green Tech", "Startups"]
  },
  {
    id: 6,
    title: "The Future of Mobile-First Design",
    date: "April 28, 2025",
    summary: "Exploring next-generation mobile design patterns and their impact on user engagement and conversion rates.",
    image: "/images/blog6.jpg",
    category: "Design",
    author: "Alex Thompson",
    readTime: "9 min read",
    views: 1340,
    likes: 102,
    comments: 28,
    featured: false,
    tags: ["Mobile Design", "UX/UI", "Design Trends"]
  }
];

const categories = ["All", ...new Set(blogPosts.map((post) => post.category))];

export default function Blog() {
  const [posts, setPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "views" | "likes">("date");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [emailSubscription, setEmailSubscription] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const postsPerPage = viewMode === "grid" ? 6 : 4;
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  useEffect(() => {
    let filtered = [...blogPosts];

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "views":
          return b.views - a.views;
        case "likes":
          return b.likes - a.likes;
        case "date":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    setPosts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy, selectedTags]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const featuredPosts = blogPosts.filter(post => post.featured);

  const paginate = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleLike = (postId: number) => {
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSubscription.trim()) {
      setIsSubscribed(true);
      setEmailSubscription("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleVideoToggle = (postId: number) => {
    const video = videoRefs.current[postId];
    if (video) {
      if (isVideoPlaying === postId) {
        video.pause();
        setIsVideoPlaying(null);
      } else {
        video.play();
        setIsVideoPlaying(postId);
      }
    }
  };

  const toggleMute = (postId: number) => {
    const video = videoRefs.current[postId];
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const toggleFullscreen = (postId: number) => {
    const video = videoRefs.current[postId];
    if (video) {
      if (!isFullscreen) {
        video.requestFullscreen?.();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen?.();
        setIsFullscreen(false);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        paginate("prev");
      }
      if (e.key === 'ArrowRight' && currentPage < totalPages) {
        paginate("next");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 min-h-screen"
    >
      <Navbar />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-orange-900 via-orange-800 to-orange-700 text-white py-20 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent"
          >
            Insights & Innovation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-orange-100"
          >
            Discover the latest trends in technology, business, and digital innovation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.slice(1, 4).map((category, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-orange-700 bg-opacity-20 rounded-full text-sm font-medium backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-500 rounded-full opacity-10 animate-ping"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Featured Posts Carousel */}
        {featuredPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-orange-900 dark:text-orange-100">
              Featured Articles
            </h2>
            <div className="relative overflow-hidden rounded-2xl">
              <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4">
                {featuredPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex-shrink-0 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      {post.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleVideoToggle(post.id)}
                            className="w-16 h-16 bg-orange-600 bg-opacity-80 rounded-full flex items-center justify-center text-white hover:bg-opacity-100 transition-all"
                            aria-label={`Play video for ${post.title}`}
                          >
                            <FaPlay className="ml-1" />
                          </motion.button>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-orange-900 dark:text-white">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaUser /> {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock /> {post.readTime}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search articles... (Ctrl+K)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-all bg-white dark:bg-gray-800 dark:border-gray-600 dark:focus:border-orange-400"
                aria-label="Search blog posts"
              />
            </div>

            {/* View Mode and Sort Controls */}
            <div className="flex items-center gap-4">
              <div className="flex bg-white dark:bg-gray-800 rounded-full p-1 border-2 border-orange-200 dark:border-gray-600">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700"
                  }`}
                  aria-label="Grid view"
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700"
                  }`}
                  aria-label="List view"
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "views" | "likes")}
                className="px-4 py-3 rounded-full border-2 border-orange-200 focus:border-orange-500 focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-600 dark:focus:border-orange-400"
                aria-label="Sort posts by"
              >
                <option value="date">Latest</option>
                <option value="views">Most Viewed</option>
                <option value="likes">Most Liked</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all"
                aria-label="Open filters"
              >
                <FaFilter />
                Filters
              </motion.button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-orange-200 dark:border-gray-600 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-orange-900 dark:text-white">
                    Filter Options
                  </h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label="Close filters"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category
                              ? "bg-orange-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {allTags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedTags.includes(tag)
                              ? "bg-orange-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedTags([]);
                      setSearchTerm("");
                    }}
                    className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Blog Posts Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`mb-12 ${
            viewMode === "grid"
              ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              : "space-y-8"
          }`}
        >
          <AnimatePresence mode="wait">
            {currentPosts.length > 0 ? (
              currentPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  layout
                  className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${
                    viewMode === "list" ? "flex flex-col md:flex-row" : ""
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <div className={`relative ${viewMode === "list" ? "md:w-1/3" : ""}`}>
                    {post.videoUrl ? (
                      <div className="relative">
                        <video
                          ref={(el) => (videoRefs.current[post.id] = el)}
                          className="w-full h-64 object-cover"
                          poster={post.image}
                          muted={isMuted}
                          onPlay={() => setIsVideoPlaying(post.id)}
                          onPause={() => setIsVideoPlaying(null)}
                        >
                          <source src={post.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Video Controls */}
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleVideoToggle(post.id)}
                              className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-orange-600 hover:bg-opacity-100 transition-all"
                              aria-label={`${isVideoPlaying === post.id ? 'Pause' : 'Play'} video`}
                            >
                              {isVideoPlaying === post.id ? <FaPause /> : <FaPlay className="ml-1" />}
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleMute(post.id)}
                              className="w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-orange-600 hover:bg-opacity-100 transition-all"
                              aria-label={`${isMuted ? 'Unmute' : 'Mute'} video`}
                            >
                              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleFullscreen(post.id)}
                              className="w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-orange-600 hover:bg-opacity-100 transition-all"
                              aria-label="Toggle fullscreen"
                            >
                              {isFullscreen ? <FaCompress /> : <FaExpand />}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleBookmark(post.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          bookmarkedPosts.includes(post.id)
                            ? "bg-orange-600 text-white"
                            : "bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100"
                        }`}
                        aria-label={`${bookmarkedPosts.includes(post.id) ? 'Remove from' : 'Add to'} bookmarks`}
                      >
                        <FaBookmark className="text-xs" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all"
                        aria-label="Share post"
                      >
                        <FaShare className="text-xs" />
                      </motion.button>
                    </div>
                  </div>

                  <div className={`p-6 flex-1 ${viewMode === "list" ? "md:w-2/3" : ""}`}>
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUser />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-orange-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {post.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs rounded-full"
                        >
                          <FaTag className="inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Stats and Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaEye />
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment />
                          {post.comments}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                            likedPosts.includes(post.id)
                              ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400"
                          }`}
                          aria-label={`${likedPosts.includes(post.id) ? 'Unlike' : 'Like'} post`}
                        >
                          <FaHeart />
                          {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-full text-sm font-medium transition-all"
                        >
                          Read More
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <div className="text-6xl text-gray-300 dark:text-gray-600 mb-4">📝</div>
                <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedTags([]);
                  }}
                  className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16"
          >
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate("prev")}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-gray-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-500 dark:hover:border-orange-400 transition-all"
                aria-label="Previous page"
              >
                <FaChevronLeft />
                Previous
              </motion.button>

              {/* Page Numbers */}
              <div className="hidden sm:flex items-center gap-2 mx-4">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <motion.button
                      key={pageNum}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-full font-medium transition-all ${
                        currentPage === pageNum
                          ? "bg-orange-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700 border-2 border-orange-200 dark:border-gray-600"
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                    >
                      {pageNum}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate("next")}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-gray-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-500 dark:hover:border-orange-400 transition-all"
                aria-label="Next page"
              >
                Next
                <FaChevronRight />
              </motion.button>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, posts.length)} of {posts.length} posts
            </div>
          </motion.div>
        )}

        {/* Newsletter Subscription */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-orange-900 via-orange-800 to-orange-700 text-white rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent">
                Stay in the Loop
              </h3>
              <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Get the latest insights on technology, business strategy, and digital innovation delivered directly to your inbox. Join over 10,000 professionals who trust our content.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                  <div className="flex-1">
                    <label htmlFor="email-subscription" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-subscription"
                      type="email"
                      placeholder="Enter your email address"
                      value={emailSubscription}
                      onChange={(e) => setEmailSubscription(e.target.value)}
                      className="w-full px-6 py-4 rounded-full text-gray-800 border-2 border-transparent focus:border-orange-300 focus:outline-none text-center sm:text-left"
                      required
                      aria-describedby="email-description"
                    />
                    <p id="email-description" className="sr-only">
                      We'll send you our latest blog posts and insights
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-8 py-4 bg-white text-orange-700 rounded-full font-semibold hover:bg-orange-50 transition-all"
                  >
                    Subscribe
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">✅</div>
                  <h4 className="text-2xl font-bold mb-2">Welcome aboard!</h4>
                  <p className="text-orange-100">
                    Thank you for subscribing. You'll receive our next newsletter soon!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-orange-200">
              <span className="flex items-center gap-2">
                ✨ Weekly insights
              </span>
              <span className="flex items-center gap-2">
                🚀 Industry trends
              </span>
              <span className="flex items-center gap-2">
                🔒 Unsubscribe anytime
              </span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-300 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-orange-500 rounded-full opacity-10 animate-ping"></div>
        </motion.section>

        {/* Related Topics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-orange-900 dark:text-orange-100">
            Explore Topics
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {allTags.map((tag, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-orange-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-orange-200 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-400 "
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: "Total Articles", value: blogPosts.length, icon: "📚" },
            { label: "Total Views", value: blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString(), icon: "👀" },
            { label: "Categories", value: categories.length - 1, icon: "🏷️" },
            { label: "Authors", value: new Set(blogPosts.map(post => post.author)).size, icon: "✍️" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border-2 border-orange-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-all"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.section>
      </div>

      <Footer />

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all z-50 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        ↑
      </motion.button>

      {/* Accessibility: Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {currentPosts.length > 0 
          ? `Showing ${currentPosts.length} blog posts out of ${posts.length} total posts`
          : "No blog posts match your current filters"
        }
      </div>
    </motion.section>
  );
}