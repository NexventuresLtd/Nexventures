import { motion, AnimatePresence } from "framer-motion";
import React, { useContext } from "react";

import { 
  FaCalendarAlt,
  FaTag,
  FaClock,
  FaUser,
  FaHeart,
  FaShare,
  FaBookmark,
  FaEye,
  FaComment,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaTimes,
//   FaFacebook,
//   FaTwitter,
//   FaLinkedin,
//   FaCopy
} from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

export const colors = {
  primary: '#952301',
  primaryLight: '#B8330A',
  primaryDark: '#6B1A01',
  accent: '#FF6B35',
  accentDark: '#E5571F'
};

export const blogPosts = [
  {
    id: 1,
    title: "Why Your Business Needs a Website in 2025",
    date: "June 1, 2025",
    summary: "Explore the importance of having a strong digital presence and how a modern website impacts customer engagement in today's competitive market.",
    image: "https://bragdeal.com/wp-content/uploads/2020/03/a-modern-sleek-laptop-or-computer-screen_xxh_rg1ftmkbongn1hbx-a_flnyb5yzrzqr9l6c-izrug-1024x574.jpeg",
    category: "Digital Strategy",
    author: "Sarah Johnson",
    readTime: "5 min read",
    views: 1250,
    likes: 89,
    comments: 23,
    featured: true,
    videoUrl: "/videos/website-importance.mp4",
    tags: ["Web Development", "Business", "Digital Marketing"],
    content: `
      <p>In today's digital-first world, having a professional website isn't just an option—it's a necessity. As we advance through 2025, businesses without a strong online presence are finding themselves increasingly left behind in the competitive marketplace.</p>
      
      <h3>The Digital Revolution Continues</h3>
      <p>With over 5 billion internet users worldwide, your potential customers are actively searching for products and services online. A well-designed website serves as your digital storefront, available 24/7 to showcase your brand, products, and expertise.</p>
      
      <h3>Key Benefits of Having a Modern Website</h3>
      <ul>
        <li><strong>Enhanced Credibility:</strong> A professional website builds trust with potential customers</li>
        <li><strong>Improved Customer Engagement:</strong> Interactive features keep visitors engaged longer</li>
        <li><strong>Better Search Visibility:</strong> SEO-optimized websites rank higher in search results</li>
        <li><strong>Cost-Effective Marketing:</strong> Digital marketing provides better ROI than traditional methods</li>
      </ul>
      
      <p>Don't let your business fall behind. Invest in a modern, responsive website that reflects your brand's values and drives meaningful customer engagement.</p>
    `
  },
  {
    id: 2,
    title: "The Rise of Remote Digital Agencies in Africa",
    date: "May 25, 2025",
    summary: "How remote teams like NexVentures are reshaping the tech landscape with cost-effective innovation and global collaboration.",
    image: "https://media.licdn.com/dms/image/v2/C4E12AQFnBW8_rcEThQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1615197443702?e=2147483647&v=beta&t=bGBxWQDjXyxbzQARUOW6-zMNe0w-6sCN5x3rJnru75I",
    category: "Industry Insight",
    author: "Michael Chen",
    readTime: "8 min read",
    views: 980,
    likes: 67,
    comments: 15,
    featured: true,
    tags: ["Remote Work", "Africa Tech", "Innovation"],
    content: `
      <p>Africa's tech ecosystem is experiencing unprecedented growth, with remote digital agencies leading the charge in innovation and cost-effective solutions for global clients.</p>
      
      <h3>The African Advantage</h3>
      <p>Remote agencies across Africa are leveraging their unique position to offer world-class services at competitive rates while fostering local talent development.</p>
    `
  },
  {
    id: 3,
    title: "Top 5 Tools for Agile Product Development",
    date: "May 18, 2025",
    summary: "A comprehensive breakdown of essential tools for developers and project managers in agile startups and established companies.",
    image: "https://agilefirst.io/content/images/2023/09/top-agile-project-tools.png",
    category: "Productivity",
    author: "Emily Rodriguez",
    readTime: "6 min read",
    views: 1580,
    likes: 124,
    comments: 31,
    featured: true,
    tags: ["Development Tools", "Agile", "Productivity"],
    content: `
      <p>Agile development requires the right tools to maintain velocity and quality. Here are the top 5 tools that every agile team should consider implementing.</p>
      
      <h3>Essential Agile Tools</h3>
      <p>From project management to code collaboration, these tools streamline the development process and improve team productivity.</p>
    `
  },
  {
    id: 4,
    title: "AI Integration in Modern Web Applications",
    date: "May 10, 2025",
    summary: "Discover how artificial intelligence is transforming user experiences and backend processes in contemporary web development.",
    image: "https://syndelltech.com/wp-content/uploads/2023/04/AI-in-Web-Development.jpg",
    category: "Technology",
    author: "David Kim",
    readTime: "10 min read",
    views: 2100,
    likes: 156,
    comments: 42,
    featured: true,
    tags: ["AI", "Web Development", "Machine Learning"],
    content: `
      <p>Artificial Intelligence is no longer a futuristic concept—it's actively transforming how we build and interact with web applications today.</p>
      
      <h3>AI-Powered Features</h3>
      <p>From chatbots to personalized recommendations, AI integration is becoming essential for modern web applications.</p>
    `
  },
  {
    id: 5,
    title: "Sustainable Tech Practices for Startups",
    date: "May 3, 2025",
    summary: "Learn how emerging companies can implement eco-friendly technology solutions while maintaining growth and innovation.",
    image: "https://profiletree.com/wp-content/uploads/2025/02/Sustainable-Tech-Startups-Transforming-SDG-Challenges-Into-Opportunities-scaled.webp",
    category: "Sustainability",
    author: "Lisa Zhang",
    readTime: "7 min read",
    views: 890,
    likes: 78,
    comments: 19,
    featured: false,
    tags: ["Sustainability", "Green Tech", "Startups"],
    content: `
      <p>Startups have a unique opportunity to build sustainability into their core operations from day one, creating both environmental and business value.</p>
      
      <h3>Green Tech Practices</h3>
      <p>Implementing sustainable technology practices doesn't just benefit the environment—it can also reduce costs and attract conscious consumers.</p>
    `
  },
  {
    id: 6,
    title: "The Future of Mobile-First Design",
    date: "April 28, 2025",
    summary: "Exploring next-generation mobile design patterns and their impact on user engagement and conversion rates.",
    image: "https://www.nebulainfotech.com/insights/wp-content/uploads/2022/03/is-Mobile-First-approach-the-future-in-website-designing.jpg",
    category: "Design",
    author: "Alex Thompson",
    readTime: "9 min read",
    views: 1340,
    likes: 102,
    comments: 28,
    featured: false,
    tags: ["Mobile Design", "UX/UI", "Design Trends"],
    content: `
      <p>Mobile-first design isn't just a trend—it's the foundation of modern web development. As mobile usage continues to dominate, designers must prioritize mobile experiences.</p>
      
      <h3>Mobile Design Principles</h3>
      <p>Creating intuitive mobile interfaces requires understanding user behavior patterns and optimizing for touch interactions.</p>
    `
  }
];


export const categories = ["All", ...new Set(blogPosts.map((post) => post.category))];

interface BlogPostModalProps {
  post: typeof blogPosts[number] | null;
  onClose: () => void;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  const { darkMode } = useContext(ThemeContext);
  
  if (!post) return null;

//   const handleShare = (platform: string) => {
//     const url = encodeURIComponent(window.location.href);
//     const title = encodeURIComponent(post.title);
    
//     const shareUrls = {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
//       twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
//     };
    
//     if (platform === 'copy') {
//       navigator.clipboard.writeText(window.location.href);
//       return;
//     }
    
//     window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
//   };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`rounded-2xl w-full max-w-4xl my-8 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 sm:h-80 object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <FaTimes />
            </button>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span 
                className="px-4 py-2 text-white text-sm font-semibold rounded-full backdrop-blur-sm"
                style={{ backgroundColor: `${colors.primary}CC` }}
              >
                {post.category}
              </span>
            </div>
            
            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-2">
                  <FaUser className="text-xs" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-xs" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock className="text-xs" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Stats */}
            <div className={`flex items-center justify-between mb-8 pb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`flex items-center gap-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="flex items-center gap-2">
                  <FaEye />
                  {post.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-2">
                  <FaHeart />
                  {post.likes} likes
                </span>
                <span className="flex items-center gap-2">
                  <FaComment />
                  {post.comments} comments
                </span>
              </div>
              
              {/* Share Buttons */}
              {/* <div className="flex items-center gap-2">
                <span className={`text-sm mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Share:</span>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <FaFacebook className="text-xs" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <FaTwitter className="text-xs" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <FaLinkedin className="text-xs" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaCopy className="text-xs" />
                </button>
              </div> */}
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className={`px-3 py-1 text-sm rounded-full flex items-center gap-1 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  <FaTag className="text-xs" />
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Article Content */}
            <div 
              className={`prose prose-lg max-w-none ${darkMode ? 'prose-invert' : ''}`}
              dangerouslySetInnerHTML={{ __html: post.content || post.summary }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

interface BlogPostCardProps {
  post: typeof blogPosts[number];
  viewMode: "grid" | "list";
  bookmarkedPosts: number[];
  likedPosts: number[];
  isVideoPlaying: number | null;
  isMuted: boolean;
  isFullscreen: boolean;
  toggleBookmark: (id: number) => void;
  toggleLike: (id: number) => void;
  handleVideoToggle: (id: number | null) => void;
  toggleMute: (id: number) => void;
  toggleFullscreen: (id: number) => void;
  videoRefs: React.MutableRefObject<{ [key: number]: HTMLVideoElement | null }>;
  onReadMore: (post: typeof blogPosts[number]) => void;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  viewMode,
  bookmarkedPosts,
  likedPosts,
  isVideoPlaying,
  isMuted,
  isFullscreen,
  toggleBookmark,
  toggleLike,
  handleVideoToggle,
  toggleMute,
  toggleFullscreen,
  videoRefs,
  onReadMore
}) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <motion.article
      layout
      className={`group rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      } ${viewMode === "list" ? "flex flex-col lg:flex-row" : ""}`}
      whileHover={{ y: -8 }}
    >
      <div className={`relative ${viewMode === "list" ? "lg:w-2/5" : ""}`}>
        {post.videoUrl ? (
          <div className="relative">
            <video
              ref={(el: HTMLVideoElement | null) => {
                videoRefs.current[post.id] = el;
              }}
              className="w-full h-64 object-cover"
              poster={post.image}
              muted={isMuted}
              onPlay={() => handleVideoToggle(post.id)}
              onPause={() => handleVideoToggle(null)}
            >
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleVideoToggle(post.id)}
                  className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  style={{ color: colors.primary }}
                  aria-label={`${isVideoPlaying === post.id ? 'Pause' : 'Play'} video`}
                >
                  {isVideoPlaying === post.id ? <FaPause /> : <FaPlay className="ml-1" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleMute(post.id)}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  style={{ color: colors.primary }}
                  aria-label={`${isMuted ? 'Unmute' : 'Mute'} video`}
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFullscreen(post.id)}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  style={{ color: colors.primary }}
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
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span 
            className="px-3 py-1 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg"
            style={{ backgroundColor: `${colors.primary}DD` }}
          >
            {post.category}
          </span>
        </div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 mt-8">
            <span 
              className="px-3 py-1 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg"
              style={{ backgroundColor: `${colors.accent}DD` }}
            >
              Featured
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleBookmark(post.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-lg ${
              bookmarkedPosts.includes(post.id)
                ? "text-white shadow-lg"
                : "bg-white/90 text-gray-700 hover:bg-white"
            }`}
            style={bookmarkedPosts.includes(post.id) ? { backgroundColor: colors.primary } : {}}
            aria-label={`${bookmarkedPosts.includes(post.id) ? 'Remove from' : 'Add to'} bookmarks`}
          >
            <FaBookmark className="text-sm" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-lg"
            aria-label="Share post"
          >
            <FaShare className="text-sm" />
          </motion.button>
        </div>
      </div>

      <div className={`p-6 flex-1 ${viewMode === "list" ? "lg:w-3/5" : ""}`}>
        <div className={`flex items-center gap-4 mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="text-xs" />
            {post.date}
          </span>
          <span className="flex items-center gap-2 clip-text line-clamp-1">
            <FaUser className="text-xs" />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <FaClock className="text-xs" />
            {post.readTime}
          </span>
        </div>

        <h3 className={`text-xl clip-text line-clamp-1 font-bold mb-4 group-hover:text-gray-700 transition-colors line-clamp-2 ${darkMode ? 'text-white group-hover:text-gray-200' : 'text-gray-900'}`}>
          {post.title}
        </h3>

        <p className={`text-gray-600 clip-text line-clamp-2 dark:text-gray-400 mb-6 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {post.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.slice(0, 3).map((tag, tagIdx) => (
            <span
              key={tagIdx}
              className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
            >
              <FaTag className="text-xs" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className={`px-3 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Post Stats and Actions */}
        <div className={`flex items-center justify-between pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="flex items-center gap-2">
              <FaEye className="text-xs" />
              {post.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-2">
              <FaComment className="text-xs" />
              {post.comments}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                likedPosts.includes(post.id)
                  ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                  : `bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 ${darkMode ? 'dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400' : ''}`
              }`}
              aria-label={`${likedPosts.includes(post.id) ? 'Unlike' : 'Like'} post`}
            >
              <FaHeart className="text-xs" />
              {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onReadMore(post)}
              className="px-6 py-2 text-white rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
              }}
            >
              Read More
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

interface BlogPostsGridProps {
  viewMode: "grid" | "list";
  currentPosts: typeof blogPosts;
  bookmarkedPosts: number[];
  likedPosts: number[];
  isVideoPlaying: number | null;
  isMuted: boolean;
  isFullscreen: boolean;
  toggleBookmark: (id: number) => void;
  toggleLike: (id: number) => void;
  handleVideoToggle: (id: number | null) => void;
  toggleMute: (id: number) => void;
  toggleFullscreen: (id: number) => void;
  videoRefs: React.MutableRefObject<{ [key: number]: HTMLVideoElement | null }>;
}

export const BlogPostsGrid: React.FC<BlogPostsGridProps> = ({
  viewMode,
  currentPosts,
  bookmarkedPosts,
  likedPosts,
  isVideoPlaying,
  isMuted,
  isFullscreen,
  toggleBookmark,
  toggleLike,
  handleVideoToggle,
  toggleMute,
  toggleFullscreen,
  videoRefs
}) => {
  const { darkMode } = useContext(ThemeContext);
  const [selectedPost, setSelectedPost] = React.useState<typeof blogPosts[number] | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`mb-12 ${
          viewMode === "grid"
            ? "grid gap-8 md:grid-cols-2 xl:grid-cols-3"
            : "space-y-8"
        }`}
      >
        <AnimatePresence mode="wait">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <BlogPostCard
                  post={post}
                  viewMode={viewMode}
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
                  onReadMore={setSelectedPost}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full text-center py-20"
            >
              <div className="text-8xl mb-6">📝</div>
              <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No posts found
              </h3>
              <p className={`text-lg mb-8 max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Try adjusting your search criteria or explore different categories
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                }}
              >
                Browse All Posts
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <BlogPostModal 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)} 
      />
    </>
  );
};