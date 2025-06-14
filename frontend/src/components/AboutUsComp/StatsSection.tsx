import React from 'react';
import { CheckCircle, Calendar, Star, Globe } from 'lucide-react';

interface StatsSectionProps {
    darkMode: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({ darkMode }) => {
    // Primary color palette based on #952301
    const colors = {
        primary: '#952301',
        primaryLight: '#B8330A',
        primaryDark: '#6B1A01',
        accent: '#FF6B35',
        accentDark: '#E5571F'
    };

    const stats = [
        { number: '10+', label: 'Projects Delivered', icon: CheckCircle },
        { number: '5+', label: 'Years Experience', icon: Calendar },
        { number: '98%', label: 'Client Satisfaction', icon: Star },
        { number: '24/7', label: 'Global Support', icon: Globe }
    ];

    return (
        <section className={`relative py-20 lg:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden ${
            darkMode 
                ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
        }`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
                     style={{ background: `radial-gradient(circle, ${colors.primary}40, transparent)` }}></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
                     style={{ background: `radial-gradient(circle, ${colors.accent}30, transparent)` }}></div>
            </div>

            <div className="relative max-w-full md:max-w-11/12 mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Proven Excellence
                    </h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-6"
                         style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }}></div>
                    <p className={`text-lg max-w-2xl mx-auto ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Delivering exceptional results through innovative solutions and unwavering commitment to quality
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-2xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1 ${
                                darkMode
                                    ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/30 hover:border-gray-600/50'
                                    : 'bg-white/70 hover:bg-white/90 border border-gray-200/50 hover:border-gray-300/70'
                            } backdrop-blur-md  hover:shadow-2xl`}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                 style={{ 
                                     background: `linear-gradient(135deg, ${colors.primary}08, ${colors.accent}05)` 
                                 }}></div>
                            
                            {/* Border Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                 style={{ 
                                     boxShadow: `inset 0 1px 0 0 ${colors.primary}20, 0 0 20px ${colors.primary}10` 
                                 }}></div>

                            <div className="relative p-8">
                                {/* Icon */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-xl transition-all duration-500 group-hover:scale-110 ${
                                        darkMode ? 'bg-gray-700/50' : 'bg-gray-100/80'
                                    }`}
                                         style={{ 
                                             background: darkMode 
                                                 ? `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}15)` 
                                                 : `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}08)` 
                                         }}>
                                        <stat.icon 
                                            className="w-6 h-6 transition-colors duration-300"
                                            style={{ color: colors.primary }}
                                        />
                                    </div>
                                    <div className="w-2 h-2 rounded-full opacity-40 group-hover:opacity-100 transition-all duration-300"
                                         style={{ backgroundColor: colors.accent }}></div>
                                </div>

                                {/* Stats Content */}
                                <div className="space-y-3">
                                    <div className="text-4xl lg:text-5xl font-black tracking-tight"
                                         style={{ 
                                             background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                                             WebkitBackgroundClip: 'text',
                                             WebkitTextFillColor: 'transparent',
                                             backgroundClip: 'text'
                                         }}>
                                        {stat.number}
                                    </div>
                                    <div className={`text-sm font-semibold uppercase tracking-wider ${
                                        darkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        {stat.label}
                                    </div>
                                </div>

                                {/* Progress Bar Animation */}
                                <div className="mt-6 h-1 bg-gray-200/20 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                                         style={{ 
                                             background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` 
                                         }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <button className={`group relative inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        darkMode ? 'shadow-lg' : 'shadow-md'
                    }`}
                        onClick={() => window.location.href = '/portfolio'}
                            style={{ 
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                                boxShadow: `0 8px 32px ${colors.primary}30`
                            }}>
                        <span className="relative z-10">Start Your Project</span>
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                             style={{ 
                                 background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.accentDark})` 
                             }}></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;