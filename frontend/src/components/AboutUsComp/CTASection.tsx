import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Target, Code, Rocket, Users } from 'lucide-react';

interface CTASectionProps {
    darkMode: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ darkMode }) => {
    const [animationPhase, setAnimationPhase] = useState(0);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    // Primary color palette based on #952301
    const colors = {
        primary: '#952301',
        primaryLight: '#B8330A',
        primaryDark: '#6B1A01',
        accent: '#FF6B35',
        accentDark: '#E5571F'
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationPhase(prev => (prev + 1) % 6);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const FloatingIcon = ({ icon: Icon, delay, position }: { icon: React.ElementType, delay: number, position: { x: number, y: number }}) => (
        <div
            className="absolute transition-all duration-2000 ease-in-out"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `translate(-50%, -50%) translateY(${Math.sin((animationPhase + delay) * 0.5) * 10}px)`,
                opacity: 0.1 + (Math.sin((animationPhase + delay) * 0.3) * 0.1)
            }}
        >
            <Icon className="w-8 h-8" style={{ color: colors.accent }} />
        </div>
    );

    const TransformationVisual = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating tech icons */}
            <FloatingIcon icon={Code} delay={0} position={{ x: 15, y: 20 }} />
            <FloatingIcon icon={Rocket} delay={1} position={{ x: 85, y: 25 }} />
            <FloatingIcon icon={Target} delay={2} position={{ x: 10, y: 70 }} />
            <FloatingIcon icon={Users} delay={3} position={{ x: 90, y: 75 }} />
            <FloatingIcon icon={Zap} delay={4} position={{ x: 20, y: 45 }} />
            <FloatingIcon icon={Sparkles} delay={5} position={{ x: 80, y: 50 }} />

            {/* Animated connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05 }}>
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: colors.primary }} />
                        <stop offset="100%" style={{ stopColor: colors.accent }} />
                    </linearGradient>
                </defs>
                {[0, 1, 2, 3].map((i) => (
                    <path
                        key={i}
                        d={`M ${i * 25} 0 Q ${50 + i * 10} ${50 + animationPhase * 5} ${100 - i * 20} 100`}
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        fill="none"
                        className="transition-all duration-1000"
                        style={{
                            strokeDasharray: '5,5',
                            strokeDashoffset: animationPhase * -10
                        }}
                    />
                ))}
            </svg>

            {/* Pulsing dots */}
            {[0, 1, 2, 3, 4].map((i) => (
                <div
                    key={`dot-${i}`}
                    className="absolute w-3 h-3 rounded-full animate-pulse"
                    style={{
                        backgroundColor: i % 2 === 0 ? colors.primary : colors.accent,
                        left: `${20 + i * 15}%`,
                        top: `${30 + Math.sin(i) * 20}%`,
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0.3
                    }}
                />
            ))}
        </div>
    );

    return (
        <section className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
            darkMode 
                ? 'bg-gradient-to-br from-gray-900 to-slate-900' 
                : 'bg-gradient-to-br from-gray-50 to-white'
        }`}>
            
            {/* Animated Background */}
            <TransformationVisual />
            
            <div className="relative max-w-6xl mx-auto text-center">
                <div className="space-y-12">
                    {/* Header Badge */}
                    <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full border"
                         style={{ 
                             borderColor: colors.accent,
                             backgroundColor: `${colors.accent}08`
                         }}>
                        <Sparkles className="w-4 h-4" style={{ color: colors.accent }} />
                        <span className="text-sm font-semibold uppercase tracking-wider"
                              style={{ color: colors.accent }}>
                            Let's Create Together
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Ready to{' '}
                        <span className="relative inline-block">
                            <span style={{ color: colors.primary }}>
                                Transform
                            </span>
                            {/* Animated underline */}
                            <div 
                                className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-1000"
                                style={{ 
                                    width: `${20 + animationPhase * 13}%`,
                                    backgroundColor: colors.accent
                                }}
                            />
                        </span>
                        <br />
                        Your Vision?
                    </h2>

                    {/* Subtitle */}
                    <p className={`text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Let's collaborate to transform your ideas into powerful digital solutions 
                        that drive measurable results and accelerate your business growth.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12 max-w-md sm:max-w-none mx-auto">
                        <button 
                            className="group relative px-12 py-6 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
                            style={{ backgroundColor: colors.primary }}
                            onMouseEnter={() => setHoveredButton('primary')}
                            onMouseLeave={() => setHoveredButton(null)}
                            onClick={() => window.location.href = '/contact'}
                        >
                            {/* Hover effect */}
                            <div 
                                className="absolute inset-0 transition-opacity duration-300"
                                style={{ 
                                    backgroundColor: colors.primaryLight,
                                    opacity: hoveredButton === 'primary' ? 1 : 0
                                }}
                            />
                            
                            <span className="relative z-10">Start Your Project</span>
                            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>

                        <button 
                            className={`relative px-12 py-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 border-2 overflow-hidden ${
                                hoveredButton === 'secondary' 
                                    ? 'text-white' 
                                    : darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                            style={{ 
                                borderColor: colors.accent,
                                color: hoveredButton === 'secondary' ? 'white' : (darkMode ? '#d1d5db' : '#374151')
                            }}
                            onMouseEnter={() => setHoveredButton('secondary')}
                            onMouseLeave={() => setHoveredButton(null)}
                            onClick={() => window.location.href = '/portfolio'}
                        >
                            {/* Hover background */}
                            <div 
                                className="absolute inset-0 transition-all duration-300"
                                style={{ 
                                    backgroundColor: colors.accent,
                                    transform: `translateX(${hoveredButton === 'secondary' ? '0' : '-100'}%)`,
                                }}
                            />
                            
                            <span className="relative z-10">View Our Work</span>
                        </button>
                    </div>

                    {/* Stats or Benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
                        {[
                            { number: '500+', label: 'Projects Delivered', icon: Target },
                            { number: '98%', label: 'Client Satisfaction', icon: Users },
                            { number: '24/7', label: 'Support Available', icon: Zap }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 rounded-full border"
                                         style={{ 
                                             borderColor: `${colors.primary}30`,
                                             backgroundColor: `${colors.primary}10`
                                         }}>
                                        <stat.icon className="w-6 h-6" style={{ color: colors.primary }} />
                                    </div>
                                </div>
                                <div className="text-3xl font-black mb-2" style={{ color: colors.accent }}>
                                    {stat.number}
                                </div>
                                <div className={`text-sm font-semibold uppercase tracking-wider ${
                                    darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Indicator */}
                    <div className="pt-12">
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex-1 h-px"
                                 style={{ backgroundColor: `${colors.primary}20` }}></div>
                            <div className={`text-sm font-semibold uppercase tracking-wider ${
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                Trusted by Industry Leaders
                            </div>
                            <div className="flex-1 h-px"
                                 style={{ backgroundColor: `${colors.accent}20` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;