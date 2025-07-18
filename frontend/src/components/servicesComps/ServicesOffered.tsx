import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
    Filter,
    Search,
    X,
    CheckCircle,
    Clock,
    Users,
    Award,
    DollarSign
} from 'lucide-react';

// Primary color palette based on #952301
export const colors = {
    primary: '#952301',
    primaryLight: '#B8330A',
    primaryDark: '#6B1A01',
    accent: '#FF6B35',
    accentDark: '#E5571F'
};

export const services = [
    {
        icon: Code,
        title: 'Backend Development',
        category: 'Development',
        description: 'Robust and scalable backend systems that power your applications with enterprise-grade reliability, security, and performance optimization.',
        plainEnglish: 'Think of this as building the engine of your website or app - the part users don\'t see but makes everything work smoothly and securely.',
        whatYouGet: [
            'A powerful server system that handles all your data',
            'Secure user login and authentication systems',
            'Fast data processing and storage',
            'Integration with third-party services (payment systems, social media, etc.)',
            'Automated backup and security measures'
        ],
        perfectFor: [
            'E-commerce websites that need to handle orders and payments',
            'Social platforms that manage user profiles and content',
            'Business applications that process large amounts of data',
            'Any website that needs user accounts and secure data storage'
        ],
        technologies: ['Node.js', 'Python', 'Django', 'Flask', 'FastAPI', 'Express.js', 'PHP'],
        projects: '10+ Projects',
        rating: 4.9,
        duration: '2-8 weeks',
        pricing: 'From $150',
        teamSize: '2-4 developers'
    },
    {
        icon: Layers,
        title: 'Frontend Development',
        category: 'Development',
        description: 'Dynamic and responsive web applications that provide seamless user experiences with modern frameworks and cutting-edge technologies.',
        plainEnglish: 'This is everything your visitors see and interact with on your website - the design, buttons, forms, and visual elements that make your site beautiful and easy to use.',
        whatYouGet: [
            'Beautiful, modern website design that works on all devices',
            'Interactive features like forms, buttons, and animations',
            'Fast-loading pages that keep visitors engaged',
            'Mobile-friendly design that looks great on phones and tablets',
            'Easy-to-navigate user interface'
        ],
        perfectFor: [
            'Businesses wanting a professional online presence',
            'Companies needing customer-facing websites',
            'Organizations requiring interactive web applications',
            'Anyone who wants their website to stand out from competitors'
        ],
        technologies: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'Bootstrap'],
        projects: '20+ Projects',
        rating: 4.8,
        duration: '1-6 weeks',
        pricing: 'From $120',
        teamSize: '1-3 developers'
    },
    {
        icon: Database,
        title: 'Database Management',
        category: 'Infrastructure',
        description: 'Efficient data storage and retrieval solutions using modern databases for optimal performance, scalability, and data integrity.',
        plainEnglish: 'We organize and store all your business information (customer details, products, orders) in a secure digital filing system that\'s fast, reliable, and easy to access.',
        whatYouGet: [
            'Organized storage for all your business data',
            'Fast search and retrieval of information',
            'Automatic backups to prevent data loss',
            'Secure access controls to protect sensitive information',
            'Scalable system that grows with your business'
        ],
        perfectFor: [
            'Businesses with customer databases',
            'E-commerce sites with product catalogs',
            'Companies tracking inventory or sales data',
            'Organizations needing to analyze business trends'
        ],
        technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis', 'SQLite', 'Supabase'],
        projects: '10+ Projects',
        rating: 4.9,
        duration: '1-4 weeks',
        pricing: 'From $100',
        teamSize: '1-2 specialists'
    },
    {
        icon: Smartphone,
        title: 'Mobile Development',
        category: 'Development',
        description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android platforms.',
        plainEnglish: 'We create mobile apps for your business that customers can download from the App Store or Google Play, giving them easy access to your services on their phones.',
        whatYouGet: [
            'Custom mobile app for iPhone and Android devices',
            'User-friendly interface designed for touch screens',
            'Push notifications to engage your customers',
            'Offline functionality when internet is unavailable',
            'Integration with device features (camera, GPS, contacts)'
        ],
        perfectFor: [
            'Businesses wanting to reach customers on mobile',
            'Service providers needing appointment booking apps',
            'Retailers wanting mobile shopping experiences',
            'Companies offering location-based services'
        ],
        technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
        projects: '5+ Apps',
        rating: 4.7,
        duration: '3-12 weeks',
        pricing: 'From $130',
        teamSize: '2-5 developers'
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        category: 'Design',
        description: 'User-centered design that combines aesthetics with functionality, accessibility, and conversion optimization for maximum engagement.',
        plainEnglish: 'We design how your website or app looks and feels, making sure it\'s not only beautiful but also easy and enjoyable for your customers to use.',
        whatYouGet: [
            'Professional visual design that reflects your brand',
            'User-friendly layout that guides visitors naturally',
            'Color schemes and typography that appeal to your audience',
            'Interactive prototypes to test before development',
            'Design optimized to increase sales and conversions'
        ],
        perfectFor: [
            'Businesses launching new websites or apps',
            'Companies with outdated or confusing interfaces',
            'Organizations wanting to improve customer satisfaction',
            'Anyone needing to make a strong first impression online'
        ],
        technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        projects: '10+ Designs',
        rating: 4.8,
        duration: '1-4 weeks',
        pricing: 'From $50',
        teamSize: '1-2 designers'
    },
    {
        icon: Globe,
        title: 'USSD Development',
        category: 'Specialized',
        description: 'Interactive USSD applications for seamless communication and service delivery in low-bandwidth environments across Africa.',
        plainEnglish: 'We create simple menu systems that work on any mobile phone (even basic ones) by dialing special codes, perfect for areas with limited internet access.',
        whatYouGet: [
            'Simple dial-code system that works on any phone',
            'Interactive menus for customer services',
            'Mobile money integration for payments',
            'Real-time information delivery',
            'Works without internet connection'
        ],
        perfectFor: [
            'Financial services offering mobile banking',
            'Utility companies for bill payments and meter readings',
            'Agricultural services providing market prices',
            'Government services for citizen information'
        ],
        technologies: ['USSD Gateway', 'Interactive Menus', 'Data Collection', 'Payment Integration'],
        projects: '5+ Solutions',
        rating: 4.9,
        duration: '2-6 weeks',
        pricing: 'From $130',
        teamSize: '1-3 specialists'
    },
    {
        icon: TrendingUp,
        title: 'Digital Strategy',
        category: 'Consulting',
        description: 'Strategic consulting and digital transformation services to help businesses grow through data-driven insights and modern technologies.',
        plainEnglish: 'We help you plan and execute your online business strategy, showing you the best ways to use technology to grow your business and reach more customers.',
        whatYouGet: [
            'Comprehensive analysis of your current digital presence',
            'Custom strategy to improve your online visibility',
            'Recommendations for technology investments',
            'Marketing plan to reach your target audience',
            'Performance tracking and optimization guidance'
        ],
        perfectFor: [
            'Businesses new to digital marketing',
            'Companies wanting to modernize their operations',
            'Organizations struggling with online competition',
            'Anyone needing guidance on technology decisions'
        ],
        technologies: ['Analytics', 'SEO', 'Marketing', 'Consulting'],
        projects: '5+ Strategies',
        rating: 4.8,
        duration: '1-3 weeks',
        pricing: 'From $100',
        teamSize: '1-2 consultants'
    },
    {
        icon: Image,
        title: 'Graphic Design',
        category: 'Design',
        description: 'Creative visual solutions including branding, marketing materials, and digital graphics to enhance your brand identity and market presence.',
        plainEnglish: 'We create all the visual materials your business needs - logos, business cards, flyers, social media graphics, and more to make your brand look professional and memorable.',
        whatYouGet: [
            'Professional logo and brand identity design',
            'Marketing materials (flyers, brochures, banners)',
            'Social media graphics and templates',
            'Business cards and stationery design',
            'Digital graphics for websites and apps'
        ],
        perfectFor: [
            'New businesses needing brand identity',
            'Companies launching marketing campaigns',
            'Organizations updating their visual materials',
            'Anyone wanting to improve their professional image'
        ],
        technologies: ['Photoshop', 'Illustrator', 'Branding', 'Print Design', 'Social Media', 'Infographics', 'Video Editing', 'Flyer Design'],
        projects: '50+ Designs',
        rating: 4.7,
        duration: '3-10 days',
        pricing: 'From $4.99',
        teamSize: '1-2 designers'
    },
    {
        icon: Globe,
        title: 'Full Stack Development',
        category: 'Development',
        description: 'End-to-end development services covering both frontend and backend technologies for complete web solutions.',
        plainEnglish: 'We build complete websites and applications from start to finish, handling everything from the design and user interface to the backend systems that make it all work.',
        whatYouGet: [
            'Complete web solutions from design to deployment',
            'Responsive and interactive user interfaces',
            'Robust backend systems for data management',
            'Integration with third-party APIs and services',
            'Ongoing support and maintenance'
        ],
        perfectFor: [
            'Businesses needing a full website or app',
            'Startups looking for end-to-end development',
            'Companies wanting to modernize existing systems',
            'Anyone needing a comprehensive digital solution'
        ],
        technologies: ['JavaScript', 'TypeScript', 'Node.js', 'React', 'CSS', 'HTML', 'SQL', 'NoSQL', 'Python', 'Django', 'Flask', 'FastAPI', 'Express.js', 'PHP', 'tailwind CSS', 'Bootstrap'],
        projects: '20+ Projects',
        rating: 4.9,
        duration: '4-12 weeks',
        pricing: 'From $199.99',
        teamSize: '2-4 developers'
    }
];

type ServiceCardProps = {
    service: typeof services[number];
    index: number;
    darkMode: boolean;
    onLearnMore: (service: typeof services[number]) => void;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, darkMode, onLearnMore }) => {
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
                        {service.technologies.slice(0, 4).map((tech, i) => (
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
                        onClick={() => onLearnMore(service)}
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

type ServiceModalProps = {
    service: typeof services[number] | null;
    isOpen: boolean;
    onClose: () => void;
    darkMode: boolean;
};

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose, darkMode }) => {
    if (!service) return null;

    const Icon = service.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className={`relative w-full md:max-w-4xl max-md:text-xs max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                            }`}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 p-6 border-b border-gray-200 dark:border-gray-700"
                            style={{ background: darkMode ? '#1f2937' : '#ffffff' }}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="p-3 rounded-xl text-white"
                                        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold max-md:text-sm">{service.title}</h2>
                                        <span className={`text-sm px-3 py-1 rounded-full max-md:text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {service.category}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-8">
                            {/* Stats Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                                <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                    <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                                    <div className="font-bold text-lg max-md:text-sm">{service.rating}</div>
                                    <div className="text-sm opacity-70 max-md:text-xs">Rating</div>
                                </div>
                                <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                    <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                    <div className="font-bold text-lg max-md:text-sm">{service.duration}</div>
                                    <div className="text-sm opacity-70 max-md:text-xs">Timeline</div>
                                </div>
                                <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-500" />
                                    <div className="font-bold text-lg max-md:text-sm">{service.pricing}</div>
                                    <div className="text-sm opacity-70 max-md:text-xs">Starting Price</div>
                                </div>
                                <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                    <Users className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                                    <div className="font-bold text-lg max-md:text-sm">{service.teamSize}</div>
                                    <div className="text-sm opacity-70 max-md:text-xs">Team Size</div>
                                </div>
                            </div>

                            {/* What is this in plain English */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center max-md:text-sm">
                                    <Award className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                                    What is this in simple terms?
                                </h3>
                                <p className={`text-lg max-md:text-xs leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    {service.plainEnglish}
                                </p>
                            </div>

                            {/* What You Get */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center max-md:text-sm">
                                    <CheckCircle className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                                    What you get with this service:
                                </h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {service.whatYouGet.map((item, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Perfect For */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center max-md:text-sm">
                                    <Users className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                                    This is perfect for:
                                </h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {service.perfectFor.map((item, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <div
                                                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                                style={{ backgroundColor: colors.accent }}
                                            />
                                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 max-md:text-sm">Technologies & Tools We Use:</h3>
                                <div className="flex flex-wrap gap-3">
                                    {service.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className={`px-4 py-2 rounded-full max-md:text-xs font-medium ${darkMode
                                                    ? 'bg-gray-700 text-orange-300 border border-gray-600'
                                                    : 'bg-orange-50 text-orange-600 border border-orange-200'
                                                }`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className={`p-6 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                }`}>
                                <h3 className="text-xl font-bold mb-2">Ready to get started?</h3>
                                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Let's discuss your project and see how we can help you achieve your goals.
                                </p>
                                <button
                                
                                    className="px-6 py-3 rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                                >
                                    <a href="/contact">
                                    Contact Us Now
                                    </a>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

interface ServicesGridProps {
    darkMode: boolean;
    filteredServices: typeof services;
    categories: string[];
    selectedCategory: string;
    searchTerm: string;
    setSelectedCategory: (category: string) => void;
    setSearchTerm: (term: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
    darkMode,
    filteredServices,
    categories,
    selectedCategory,
    searchTerm,
    setSelectedCategory,
    setSearchTerm
}) => {
    const servicesRef = useRef(null);
    const isServicesInView = useInView(servicesRef, { once: true });
    const [selectedService, setSelectedService] = useState<typeof services[number] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLearnMore = (service: typeof services[number]) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    return (
        <>
            <section ref={servicesRef} className="py-20 px-4">
                <div className="max-w-full md:max-w-11/12 mx-auto overflow-x-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
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
                        <div className="flex w-full overflow-x-auto items-center space-x-2">
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
                                    onLearnMore={handleLearnMore}
                                />
                            ))}
                        </AnimatePresence>

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
                    </motion.div>
                </div>
            </section>

            <ServiceModal
                service={selectedService}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                darkMode={darkMode}
            />
        </>
    );
};