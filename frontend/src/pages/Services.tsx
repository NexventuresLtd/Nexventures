import { useState, useRef, useContext } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/AboutUsComp/CTASection';
import { 
  ServicesGrid, 
  services, 
  colors 
} from '../components/servicesComps/ServicesOffered';
import { 
  TestimonialsBenefitsStats 
} from '../components/servicesComps/TestimonialsBenefitsStats';

export default function ModernServicesPage() {
  const { darkMode } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const categories = ['All', ...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative py-20 px-4 overflow-hidden bg-blur-b bg-cover bg-center bg-no-repeat"
      >
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-md"
          style={{
            backgroundImage:
              "url('https://www.computersciencedegreehub.com/wp-content/uploads/2023/02/shutterstock_2108122673-1-scaled.jpg')",
            zIndex: 1,
          }}
        />

        {/* Optional dark overlay on top of the image (optional, improves contrast) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/65 to-slate-900/95 z-1" />
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
          />
          <div
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` }}
          />
        </div>

        <div className="max-w-full md:max-w-11/12 mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white mb-6"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
            >
              Professional Tech Services
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
              >
                Our Services
              </span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-200'
              }`}>
              Transforming businesses through innovative technology solutions, expert development,
              and strategic digital transformation services.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <ServicesGrid
        darkMode={darkMode}
        filteredServices={filteredServices}
        categories={categories}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        setSelectedCategory={setSelectedCategory}
        setSearchTerm={setSearchTerm}
      />

      {/* Testimonials, Benefits, and Stats Sections */}
      <TestimonialsBenefitsStats darkMode={darkMode} />

      {/* CTA Section */}
      <CTASection darkMode={darkMode} />

      {/* Footer */}
      <Footer />
    </div>
  );
}