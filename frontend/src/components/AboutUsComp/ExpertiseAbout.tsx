import React, { useState } from 'react';
import { Code, Smartphone, Palette, Globe, TrendingUp, Image, Database, Layers, Star, ArrowRight } from 'lucide-react';

interface ExpertiseSectionProps {
    darkMode: boolean;
}

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ darkMode }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

    return (
        <section className={`relative py-10 lg:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden ${
            darkMode 
                ? 'bg-gradient-to-br from-slate-800 via-gray-800 to-slate-800' 
                : 'bg-gradient-to-br from-gray-100 via-white to-slate-50'
        }`}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse"
                     style={{ background: `radial-gradient(circle, ${colors.primary}, transparent)` }}></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full blur-3xl animate-pulse delay-700"
                     style={{ background: `radial-gradient(circle, ${colors.accent}, transparent)` }}></div>
                <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000"
                     style={{ background: `radial-gradient(circle, ${colors.primaryLight}, transparent)` }}></div>
            </div>

            <div className="relative max-w-full md:max-w-11/12 mx-auto">
                {/* Enhanced Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full border"
                         style={{ 
                             background: darkMode 
                                 ? `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}08)` 
                                 : `linear-gradient(135deg, ${colors.primary}08, ${colors.accent}05)`,
                             borderColor: darkMode ? `${colors.primary}25` : `${colors.primary}20`
                         }}>
                        <Star className="w-5 h-5" style={{ color: colors.primary }} />
                        <span className={`text-sm font-bold uppercase tracking-wider ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            Technical Excellence
                        </span>
                    </div>
                    
                    <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Our Expertise
                    </h2>
                    
                    <div className="w-32 h-1.5 mx-auto rounded-full mb-8"
                         style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }}></div>
                    
                    <p className={`text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed font-light ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Comprehensive digital solutions engineered to accelerate your business growth and market dominance
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 border ${
                                darkMode
                                    ? 'bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/30 hover:border-gray-600/50'
                                    : 'bg-white/60 hover:bg-white/80 border-gray-200/40 hover:border-gray-300/60'
                            } backdrop-blur-xl cursor-pointer hover:shadow-2xl`}
                            style={{
                                boxShadow: hoveredIndex === index 
                                    ? `0 20px 60px ${colors.primary}20, 0 0 0 1px ${colors.primary}10` 
                                    : undefined
                            }}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                 style={{ 
                                     background: `linear-gradient(135deg, ${colors.primary}05, ${colors.accent}03)` 
                                 }}></div>

                            {/* Category Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                    darkMode ? 'bg-gray-700/60 text-gray-300' : 'bg-gray-100/80 text-gray-600'
                                } backdrop-blur-sm`}>
                                    {service.category}
                                </span>
                            </div>

                            <div className="relative p-6 lg:p-8">
                                {/* Icon Section */}
                                <div className="mb-6">
                                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 overflow-hidden"
                                         style={{ 
                                             background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                                             boxShadow: `0 8px 32px ${colors.primary}30`
                                         }}>
                                        {/* Icon shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        <service.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white relative z-10" />
                                    </div>

                                    {/* Rating and Projects */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-current" style={{ color: colors.accent }} />
                                            <span className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {service.rating}
                                            </span>
                                        </div>
                                        <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {service.projects}
                                        </span>
                                    </div>

                                    <h3 className={`text-xl lg:text-2xl font-black mb-4 transition-colors duration-300 ${
                                        darkMode ? 'text-white group-hover:text-gray-100' : 'text-gray-900 group-hover:text-gray-800'
                                    }`}>
                                        {service.title}
                                    </h3>
                                    
                                    <p className={`text-sm leading-relaxed font-medium mb-6 ${
                                        darkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        {service.description}
                                    </p>
                                </div>

                                {/* Technologies */}
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {service.technologies.slice(0, 4).map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ${
                                                    darkMode
                                                        ? 'bg-gray-700/50 text-gray-300 border-gray-600/30 hover:bg-gray-600/50 hover:border-gray-500/50'
                                                        : 'bg-gray-100/80 text-gray-600 border-gray-200/50 hover:bg-gray-200/80 hover:border-gray-300/60'
                                                }`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {service.technologies.length > 4 && (
                                            <span className={`inline-block px-3 py-1.5 text-xs font-bold rounded-full ${
                                                darkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                +{service.technologies.length - 4} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-4 border-t"
                                         style={{ borderColor: darkMode ? `${colors.primary}20` : `${colors.primary}15` }}>
                                        <button className={`group/btn flex items-center gap-2 text-sm font-bold transition-all duration-300 ${
                                            darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                        }`}>
                                            <span>Learn More</span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" 
                                                       style={{ color: colors.accent }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Call to Action */}
                <div className="text-center mt-16 lg:mt-20">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                        <button className={`group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-white transition-all duration-500 hover:scale-105 transform ${
                            darkMode ? 'shadow-2xl' : 'shadow-xl'
                        }`}
                                style={{ 
                                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                                    boxShadow: `0 10px 40px ${colors.primary}30`
                                }}>
                            <span className="relative z-10">Start Your Project</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                 style={{ 
                                     background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.accentDark})` 
                                 }}></div>
                        </button>
                        
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span className="font-semibold">Free consultation</span> • <span>No commitment required</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpertiseSection;