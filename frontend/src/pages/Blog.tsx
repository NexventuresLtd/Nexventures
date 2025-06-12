import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { 
  FaSearch, 
  FaFilter,
  FaTimes,
  FaWindows,
  FaList,

} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { 
  blogPosts, 
  categories,
  BlogPostsGrid,
} from "../components/BlogComp/BlogPosts";
import { 
  NewsletterSection,
  QuickStatsSection,
  PaginationControls,
  FeaturedPostsCarousel,
} from "../components/BlogComp/BlogSections";
import CTASection from "../components/AboutUsComp/CTASection";

export default function Blog() {
  const { darkMode } = useContext(ThemeContext);
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

  const handleVideoToggle = (postId: number | null) => {
    if (postId === null) {
      setIsVideoPlaying(null);
      return;
    }
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

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-slate-200 via-white to-slate-300 text-gray-800'} min-h-screen`}
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
            {/** space */}
      <div className="h-16 bg-transparent"></div>
      {/* Quick Stats Section */}
      <QuickStatsSection />

      {/* Featured Posts Carousel */}
      {featuredPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-16 px-6"
        >
          <div className="max-w-full md:max-w-11/12 mx-auto">
            <FeaturedPostsCarousel 
              featuredPosts={featuredPosts}
              handleVideoToggle={handleVideoToggle}
            />
          </div>
        </motion.section>
      )}

      {/* Search and Filter Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`py-8 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="max-w-full md:max-w-11/12 mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search articles... (Ctrl+K)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:ring-2 focus:ring-orange-500`}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "views" | "likes")}
                className={`px-4 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-lg focus:ring-2 focus:ring-orange-500`}
              >
                <option value="date">Latest</option>
                <option value="views">Most Viewed</option>
                <option value="likes">Most Liked</option>
              </select>

              {/* View Mode Toggle */}
              <div className={`flex ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1`}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-orange-500 text-white"
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-200'}`
                  }`}
                >
                  <FaWindows />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-orange-500 text-white"
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-200'}`
                  }`}
                >
                  <FaList />
                </button>
              </div>

              {/* Advanced Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <FaFilter />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-6 p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}
            >
              <h3 className="text-lg font-semibold mb-4">Filter by Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-orange-500 text-white"
                        : `${darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="mt-4 text-orange-500 hover:text-orange-600 text-sm"
                >
                  Clear all tags
                </button>
              )}
            </motion.div>
          )}

          {/* Results Summary */}
          <div className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, posts.length)} of {posts.length} articles
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedTags.length > 0 && ` tagged with ${selectedTags.join(", ")}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>
      </motion.section>

      {/* Blog Posts Grid/List */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="py-16 px-6"
      >
        <div className="max-w-full md:max-w-11/12 mx-auto">
          {currentPosts.length > 0 ? (
            <BlogPostsGrid
              viewMode={viewMode}
              currentPosts={currentPosts}
              bookmarkedPosts={bookmarkedPosts}
              likedPosts={likedPosts}
              isVideoPlaying={isVideoPlaying}
              isMuted={isMuted}
              isFullscreen={isFullscreen}
              toggleBookmark={toggleBookmark}
              toggleLike={toggleLike}
              handleVideoToggle={handleVideoToggle}
              toggleMute={toggleMute}
              toggleFullscreen={toggleFullscreen}
              videoRefs={videoRefs}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedTags([]);
                }}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="py-8 px-6"
        >
          <div className="max-w-full md:max-w-11/12 mx-auto">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              setCurrentPage={setCurrentPage}
              posts={posts}
              indexOfFirstPost={indexOfFirstPost}
              indexOfLastPost={indexOfLastPost}
            />
          </div>
        </motion.section>
      )}

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <NewsletterSection
          emailSubscription={emailSubscription}
          setEmailSubscription={setEmailSubscription}
          isSubscribed={isSubscribed}
          handleSubscribe={handleSubscribe}
        />
      </motion.section>
      <CTASection darkMode={darkMode} />

      <Footer />
    </motion.section>
  );
}