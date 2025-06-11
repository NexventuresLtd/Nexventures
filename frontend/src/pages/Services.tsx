import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Code,
  Layers,
  Database,
  Smartphone,
  Palette,
  Globe,
  TrendingUp,
  Image,
  Star,
  ArrowRight,
  Award,
  Users,
  Clock,
  Shield,
  Zap,
  Target,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CTASection from '../components/AboutUsComp/CTASection';

// Primary color palette based on #952301
const colors = {
  primary: '#952301',
  primaryLight: '#B8330A',
  primaryDark: '#6B1A01',
  accent: '#FF6B35',
  accentDark: '#E5571F'
};

const services = [
  {
    icon: Code,
    title: 'Backend Development',
    category: 'Development',
    description: 'Robust and scalable backend systems that power your applications with enterprise-grade reliability, security, and performance optimization.',
    technologies: ['Node.js', 'Python', 'PHP', 'Django', 'Flask', 'FastAPI', 'Express.js'],
    projects: '50+ Projects',
    rating: 4.9
  },
  {
    icon: Layers,
    title: 'Frontend Development',
    category: 'Development',
    description: 'Dynamic and responsive web applications that provide seamless user experiences with modern frameworks and cutting-edge technologies.',
    technologies: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'Bootstrap'],
    projects: '55+ Projects',
    rating: 4.8
  },
  {
    icon: Database,
    title: 'Database Management',
    category: 'Infrastructure',
    description: 'Efficient data storage and retrieval solutions using modern databases for optimal performance, scalability, and data integrity.',
    technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis', 'SQLite', 'Supabase'],
    projects: '40+ Projects',
    rating: 4.9
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    category: 'Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android platforms.',
    technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    projects: '30+ Apps',
    rating: 4.7
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    category: 'Design',
    description: 'User-centered design that combines aesthetics with functionality, accessibility, and conversion optimization for maximum engagement.',
    technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    projects: '60+ Designs',
    rating: 4.8
  },
  {
    icon: Globe,
    title: 'USSD Development',
    category: 'Specialized',
    description: 'Interactive USSD applications for seamless communication and service delivery in low-bandwidth environments across Africa.',
    technologies: ['USSD Gateway', 'Interactive Menus', 'Data Collection', 'Payment Integration'],
    projects: '25+ Solutions',
    rating: 4.9
  },
  {
    icon: TrendingUp,
    title: 'Digital Strategy',
    category: 'Consulting',
    description: 'Strategic consulting and digital transformation services to help businesses grow through data-driven insights and modern technologies.',
    technologies: ['Analytics', 'SEO', 'Marketing', 'Consulting'],
    projects: '35+ Strategies',
    rating: 4.8
  },
  {
    icon: Image,
    title: 'Graphic Design',
    category: 'Design',
    description: 'Creative visual solutions including branding, marketing materials, and digital graphics to enhance your brand identity and market presence.',
    technologies: ['Photoshop', 'Illustrator', 'Branding', 'Print Design', 'Social Media', 'Infographics', 'Video Editing', 'Flyer Design'],
    projects: '200+ Designs',
    rating: 4.7
  }
];

const stats = [
  { number: 450, label: 'Projects Completed', icon: Award },
  { number: 98, label: 'Client Satisfaction', icon: Star },
  { number: 120, label: 'Happy Clients', icon: Users },
  { number: 24, label: 'Hour Support', icon: Clock }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    company: 'TechCorp Solutions',
    role: 'CTO',
    rating: 5,
    text: 'Exceptional backend development that scaled our platform to handle millions of users. The team delivered beyond expectations with enterprise-grade security.',
    avatar: 'SJ'
  },
  {
    name: 'Michael Chen',
    company: 'StartupXYZ',
    role: 'Founder',
    rating: 5,
    text: 'Professional mobile app development with stunning UI/UX design. Our app achieved 4.8+ store ratings thanks to their user-centered approach.',
    avatar: 'MC'
  },
  {
    name: 'Emily Davis',
    company: 'DigitalFlow Agency',
    role: 'Creative Director',
    rating: 5,
    text: 'Outstanding graphic design and branding services. They transformed our visual identity and increased our client engagement by 200%.',
    avatar: 'ED'
  }
];

const benefits = [
  { icon: Zap, title: 'Lightning Fast', description: 'Rapid development cycles with agile methodology' },
  { icon: Shield, title: 'Enterprise Security', description: 'Bank-level security implementation and compliance' },
  { icon: Target, title: 'Goal Oriented', description: 'Results-driven approach focused on your objectives' },
  { icon: Users, title: 'Expert Team', description: 'Senior developers with 5+ years of experience' }
];

const AnimatedCounter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
};

type ServiceCardProps = {
  service: typeof services[number];
  index: number;
  darkMode: boolean;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
    >
      {/* Gradient Background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
      />

      <div className="p-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div
              className="p-4 rounded-2xl text-white transform group-hover:scale-110 transition-transform duration-300"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
            >
              <Icon size={28} />
            </div>
            <div>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                {service.category}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{service.rating}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${isHovered ? 'text-[#952301]' : darkMode ? 'text-white' : 'text-gray-900'
          }`}>
          {service.title}
        </h3>

        <p className={`mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
          {service.description}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
            Technologies:
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.technologies.slice(0, 4).map((tech: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => (
              <span
                key={i}
                className={`text-xs px-3 py-1 rounded-full font-medium ${darkMode
                  ? 'bg-gray-700 text-orange-300 border border-gray-600'
                  : 'bg-orange-50 text-orange-600 border border-orange-200'
                  }`}
              >
                {tech}
              </span>
            ))}
            {service.technologies.length > 4 && (
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                }`}>
                +{service.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
            {service.projects}
          </span>
          <button
            className="flex items-center space-x-2 text-[#952301] font-semibold group-hover:translate-x-2 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#952301] focus:ring-offset-2 rounded-lg px-2 py-1"
            style={{ color: colors.primary }}
          >
            <span>Learn More</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <div
      className="relative rounded-2xl p-8 text-white overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            ))}
          </div>
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-[160px]"
          >
            <p className="text-lg mb-6 italic leading-relaxed">"{current.text}"</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  {current.avatar}
                </div>
                <div>
                  <p className="font-semibold text-lg">{current.name}</p>
                  <p className="text-orange-200">{current.role} at {current.company}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ModernServicesPage() {
  const darkMode = localStorage.getItem('theme') === 'dark' ? true : false;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });

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

        <div className="max-w-full cursor-pointer md:max-w-11/12 mx-auto text-center relative z-10">
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

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-12"
          >
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-3 rounded-xl border transition-colors focus:ring-2 focus:ring-[#952301] focus:border-transparent ${darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${selectedCategory === category
                    ? 'text-white'
                    : darkMode
                      ? 'text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100'
                    }`}
                  style={selectedCategory === category ? {
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                  } : {}}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-20 px-4">
        <div className="max-w-full md:max-w-11/12 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  darkMode={darkMode}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No services found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 px-4 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-full cursor-pointer md:max-w-11/12 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Our track record speaks for itself with exceptional results across all service areas
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <Icon size={48} className="mx-auto text-orange-200" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    <AnimatedCounter end={stat.number} />
                    {stat.label.includes('Satisfaction') ? '%' : '+'}
                  </div>
                  <div className="text-orange-200 font-medium text-lg">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-full cursor-pointer md:max-w-11/12 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
            >
              Why Choose NexVentures?
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              We combine technical expertise with business acumen to deliver solutions that drive real results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`text-center p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-xl'
                    }`}
                >
                  <div
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white transform hover:scale-110 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
            >
              What Our Clients Say
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Don't just take our word for it - hear from the businesses we've helped transform
            </p>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection darkMode={darkMode} />

      {/* Footer */}
      <Footer />
    </div>
  );
}