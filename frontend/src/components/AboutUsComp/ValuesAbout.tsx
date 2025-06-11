import React from 'react';
import { Lightbulb, Shield, Heart, Zap, Users, Globe, CheckCircle, TrendingUp } from 'lucide-react';

interface ValuesSectionProps {
    darkMode: boolean;
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ darkMode }) => {
    const colors = {
        primary: '#952301',
        primaryLight: '#B8330A',
        primaryDark: '#6B1A01',
        accent: '#FF6B35',
        accentDark: '#E5571F'
    };

    const coreValues = [
        {
            icon: Lightbulb,
            title: 'Innovation First',
            description: 'We stay ahead of technology trends to deliver cutting-edge solutions that give our clients a competitive advantage in the digital landscape.',
            gradient: 'from-amber-500 to-orange-600'
        },
        {
            icon: Shield,
            title: 'Quality Focused',
            description: 'Every line of code, every design element, and every user interaction is crafted with meticulous attention to detail and industry standards.',
            gradient: 'from-emerald-500 to-teal-600'
        },
        {
            icon: Heart,
            title: 'Client Partnership',
            description: 'We believe in building long-term relationships, working as an extension of your team rather than just a service provider.',
            gradient: 'from-pink-500 to-rose-600'
        },
        {
            icon: Zap,
            title: 'Continuous Learning',
            description: 'Our team constantly evolves, embracing new technologies and methodologies to better serve our clients and stay innovative.',
            gradient: 'from-violet-500 to-purple-600'
        },
        {
            icon: Users,
            title: 'Team Empowerment',
            description: 'We foster a collaborative environment where every team member is empowered to take ownership, share ideas, and grow personally and professionally.',
            gradient: 'from-blue-500 to-indigo-600'
        },
        {
            icon: Globe,
            title: 'Global Impact',
            description: 'We build solutions that transcend borders, aiming to make meaningful contributions to regional development and global progress.',
            gradient: 'from-cyan-500 to-blue-600'
        },
        {
            icon: CheckCircle,
            title: 'Integrity & Transparency',
            description: 'We communicate openly, act ethically, and deliver what we promise — earning trust through every interaction.',
            gradient: 'from-green-500 to-emerald-600'
        },
        {
            icon: TrendingUp,
            title: 'Results-Driven',
            description: 'We focus on delivering measurable outcomes, aligning our work with our clients\' goals for growth, efficiency, and sustainability.',
            gradient: 'from-orange-500 to-red-600'
        }
    ];

    return (
        <div className={` transition-all duration-700 ${
            darkMode 
                ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
                : 'bg-gradient-to-br from-slate-200 via-white to-slate-100'
        }`}>
            <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute -top-4 -right-4 w-72 h-72 rounded-full blur-3xl opacity-20 ${
                        darkMode ? 'bg-orange-500' : 'bg-orange-300'
                    }`}></div>
                    <div className={`absolute -bottom-4 -left-4 w-72 h-72 rounded-full blur-3xl opacity-20 ${
                        darkMode ? 'bg-red-500' : 'bg-red-300'
                    }`}></div>
                </div>

                <div className="max-w-full md:max-w-11/12 mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16 lg:mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" 
                             style={{ 
                                 borderColor: darkMode ? colors.primaryLight + '40' : colors.primary + '30',
                                 backgroundColor: darkMode ? colors.primary + '10' : colors.primary + '05'
                             }}>
                            <Heart className="w-4 h-4" style={{ color: colors.accent }} />
                            <span className={`text-sm font-medium ${
                                darkMode ? 'text-orange-300' : 'text-orange-800'
                            }`}>Our Core Values</span>
                        </div>
                        
                        <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
                            darkMode 
                                ? 'bg-gradient-to-r from-white via-slate-200 to-orange-200 bg-clip-text text-transparent'
                                : 'bg-gradient-to-r from-slate-900 via-slate-700 to-orange-800 bg-clip-text text-transparent'
                        }`}>
                            What Drives Us
                        </h2>
                        
                        <p className={`text-xl sm:text-2xl max-w-3xl mx-auto font-light leading-relaxed ${
                            darkMode 
                                ? 'text-slate-300' 
                                : 'text-slate-600'
                        }`}>
                            Core principles that shape our culture and guide every decision we make in our journey toward excellence.
                        </p>
                    </div>

                    {/* Values Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className={`group relative p-8 rounded-2xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-3 border ${
                                    darkMode
                                        ? 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-700/50 backdrop-blur-xl  hover:shadow-2xl'
                                        : 'bg-white/80 hover:bg-white border-slate-200/60 backdrop-blur-xl cursor-pointer hover:shadow-xl'
                                } overflow-hidden`}
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-2xl`}></div>
                                
                                {/* Icon container */}
                                <div className="relative z-10 mb-6">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 bg-gradient-to-br ${value.gradient} shadow-lg group-hover:shadow-xl`}>
                                        <value.icon className="w-8 h-8 text-white drop-shadow-sm" />
                                    </div>
                                    
                                    <h3 className={`text-xl lg:text-2xl font-bold mb-4 transition-all duration-500 ${
                                        darkMode 
                                            ? 'text-white group-hover:text-orange-200' 
                                            : 'text-slate-800 group-hover:text-orange-700'
                                    }`}>
                                        {value.title}
                                    </h3>
                                </div>
                                
                                {/* Description */}
                                <p className={`relative z-10 text-base leading-relaxed font-normal transition-all duration-500 ${
                                    darkMode 
                                        ? 'text-slate-300 group-hover:text-slate-200' 
                                        : 'text-slate-600 group-hover:text-slate-700'
                                }`}>
                                    {value.description}
                                </p>

                                {/* Bottom accent line */}
                                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${value.gradient} w-0 group-hover:w-full transition-all duration-700 ease-out`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-16 lg:mt-20">
                        <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 transition-all duration-500 hover:scale-105 cursor-pointer ${
                            darkMode
                                ? 'border-orange-400/50 bg-slate-800/50 hover:bg-slate-700/70 backdrop-blur-xl'
                                : 'border-orange-600/30 bg-white/70 hover:bg-white/90 backdrop-blur-xl'
                        }`}
                        style={{
                            borderColor: darkMode ? colors.accent + '80' : colors.primary + '50'
                        }}>
                            <TrendingUp className="w-5 h-5" style={{ color: colors.accent }} />
                            <span className={`font-semibold ${
                                darkMode ? 'text-white' : 'text-slate-800'
                            }`}>
                                Ready to work with us?
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ValuesSection;