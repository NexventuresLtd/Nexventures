import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaClock, FaPlay, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { blogPosts, categories } from "./BlogPosts";

export const NewsletterSection = ({
  emailSubscription,
  setEmailSubscription,
  isSubscribed,
  handleSubscribe
}: {
  emailSubscription: string;
  setEmailSubscription: (value: string) => void;
  isSubscribed: boolean;
  handleSubscribe: (e: React.FormEvent) => void;
}) => {

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-orange-950 via-orange-900 to-orange-700 text-white  p-8 md:p-12 mb-16 relative overflow-hidden"
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
                <label htmlFor="email-subscription" className="sr-only text-gray-200">
                  Email address
                </label>
                <input
                  id="email-subscription"
                  type="email"
                  placeholder="Enter your email address"
                  value={emailSubscription}
                  onChange={(e) => setEmailSubscription(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-100 rounded-full text-gray-800 border-2 border-transparent focus:border-orange-300 focus:outline-none text-center sm:text-left"
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
  );
};

export const FeaturedPostsCarousel = ({
  featuredPosts,
  handleVideoToggle
}: {
  featuredPosts: typeof blogPosts;
  handleVideoToggle: (id: number) => void;
}) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>
        Featured Articles
      </h2>
      <div className="relative overflow-hidden rounded-2xl">
        <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4">
          {featuredPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.02 }}
              className={`flex-shrink-0 w-80 md:w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden`}
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
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-orange-900'}`}>
                  {post.title}
                </h3>
                <p className={`text-sm mb-4 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {post.summary}
                </p>
                <div className={`flex items-center justify-between text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
  );
};

export const QuickStatsSection = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-full md:max-w-11/12 mx-auto"
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
          className={`${darkMode ? 'bg-gray-800 border-gray-800 hover:border-orange-600' : 'bg-white border-slate-100 hover:border-orange-300'} cursor-pointer rounded-xl p-6 text-center border-2 transition-all`}
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>
            {stat.value}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export const PaginationControls = ({
  currentPage,
  totalPages,
  paginate,
  setCurrentPage,
  posts,
  indexOfFirstPost,
  indexOfLastPost
}: {
  currentPage: number;
  totalPages: number;
  paginate: (direction: "next" | "prev") => void;
  setCurrentPage: (page: number) => void;
  posts: typeof blogPosts;
  indexOfFirstPost: number;
  indexOfLastPost: number;
}) => {
  const { darkMode } = useContext(ThemeContext);

  return (
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
          className={`flex items-center gap-2 px-4 py-3 ${darkMode ? 'bg-gray-800 border-gray-600 hover:border-orange-400' : 'bg-white border-orange-200 hover:border-orange-500'} border-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
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
                    : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600' : 'bg-white text-gray-600 hover:bg-orange-100 border-orange-200'} border-2`
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
          className={`flex items-center gap-2 px-4 py-3 ${darkMode ? 'bg-gray-800 border-gray-600 hover:border-orange-400' : 'bg-white border-orange-200 hover:border-orange-500'} border-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
          aria-label="Next page"
        >
          Next
          <FaChevronRight />
        </motion.button>
      </div>

      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, posts.length)} of {posts.length} posts
      </div>
    </motion.div>
  );
};