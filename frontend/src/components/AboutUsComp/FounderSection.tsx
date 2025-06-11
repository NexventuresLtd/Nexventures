import React, { useState, useEffect } from 'react';
import { Target, Eye, Heart, Zap, Globe, Users, Lightbulb, TrendingUp, Code, Rocket } from 'lucide-react';

interface FoundationSectionProps {
    darkMode: boolean;
}

const FoundationSection: React.FC<FoundationSectionProps> = ({ darkMode }) => {
    const [activeTab, setActiveTab] = useState('mission');
    const [animationPhase, setAnimationPhase] = useState(0);

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
            setAnimationPhase(prev => (prev + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const tabContent = {
        mission: {
            title: 'Our Mission',
            icon: Target,
            content: 'To democratize access to high-quality digital solutions by providing affordable, scalable, and innovative technology services to startups, NGOs, and SMEs across Africa and beyond. We believe that every organization, regardless of size, deserves world-class digital products that drive growth and impact.',
            stats: '500+ Organizations Empowered',
            visual: 'mission'
        },
        vision: {
            title: 'Our Vision',
            icon: Eye,
            content: 'To become the leading digital agency in Africa, known for transforming ideas into powerful digital experiences that create lasting value. We envision a future where technology barriers are eliminated, enabling businesses to focus on what they do best while we handle their digital needs.',
            stats: 'Shaping Digital Africa 2030',
            visual: 'vision'
        },
        values: {
            title: 'Our Values',
            icon: Heart,
            content: 'Integrity, Innovation, and Impact guide everything we do. We maintain the highest ethical standards, push the boundaries of what\'s possible with technology, and measure our success by the positive impact we create for our clients and their communities.',
            stats: '3 Core Principles',
            visual: 'values'
        }
    };

    const MissionVisual = () => (
        <div className="relative w-full h-92 flex items-center justify-center">
            {/* Central hub representing democratization */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div 
                    className="w-16 h-16 rounded-full border-4 flex items-center justify-center transform transition-transform duration-1000"
                    style={{ 
                        borderColor: colors.primary,
                        transform: `rotate(${animationPhase * 90}deg) scale(${1 + animationPhase * 0.1})`
                    }}
                >
                    <Globe className="w-8 h-8" style={{ color: colors.primary }} />
                </div>
                
                {/* Orbiting organizations */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="absolute w-8 h-8 rounded-full border-2 flex items-center justify-center animate-pulse"
                        style={{
                            borderColor: colors.accent,
                            left: `${50 + 35 * Math.cos((i * 60 + animationPhase * 15) * Math.PI / 180)}%`,
                            top: `${50 + 35 * Math.sin((i * 60 + animationPhase * 15) * Math.PI / 180)}%`,
                            transform: 'translate(-50%, -50%)',
                            animationDelay: `${i * 0.2}s`
                        }}
                    >
                        {i % 2 === 0 ? <Users className="w-4 h-4" style={{ color: colors.accent }} /> : 
                         <Code className="w-4 h-4" style={{ color: colors.accent }} />}
                    </div>
                ))}
                
                {/* Connecting lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={`line-${i}`}
                        className="absolute w-0.5 origin-center transition-all duration-1000"
                        style={{
                            height: '140px',
                            background: `linear-gradient(to bottom, ${colors.primary}60, transparent)`,
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) rotate(${i * 60 + animationPhase * 15}deg)`,
                            opacity: 0.3 + (animationPhase * 0.2)
                        }}
                    />
                ))}
            </div>
        </div>
    );

    const VisionVisual = () => (
        <div className="relative w-full h-64 flex items-center justify-center">
            {/* Africa continent shape */}
            <div className="relative">
                <div className="text-6xl font-black opacity-10" style={{ color: colors.primary }}>
                    🌍
                </div>
                
                {/* Digital transformation waves */}
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 animate-ping"
                        style={{
                            borderColor: i % 2 === 0 ? colors.primary : colors.accent,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '3s',
                            transform: `scale(${1 + i * 0.3})`
                        }}
                    />
                ))}
                
                {/* Rising trend indicators */}
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={`trend-${i}`}
                        className="absolute flex items-center justify-center transition-all duration-1000"
                        style={{
                            left: `${20 + i * 20}%`,
                            top: `${80 - i * 15 - animationPhase * 5}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <TrendingUp 
                            className="w-6 h-6" 
                            style={{ color: i % 2 === 0 ? colors.accent : colors.primary }} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    const ValuesVisual = () => (
        <div className="relative w-full h-64 flex items-center justify-center">
            {/* Three pillars of values */}
            <div className="flex items-end justify-center space-x-8">
                {['Integrity', 'Innovation', 'Impact'].map((value, i) => (
                    <div key={value} className="text-center">
                        <div 
                            className="w-12 border-4 rounded-t-lg transition-all duration-1000 mb-4"
                            style={{
                                height: `${80 + i * 20 + animationPhase * 10}px`,
                                borderColor: i === 1 ? colors.primary : colors.accent,
                                background: `linear-gradient(to top, ${i === 1 ? colors.primary : colors.accent}20, ${i === 1 ? colors.primary : colors.accent}05)`
                            }}
                        />
                        <div className="flex justify-center mb-2">
                            {i === 0 && <Heart className="w-6 h-6" style={{ color: colors.accent }} />}
                            {i === 1 && <Lightbulb className="w-6 h-6" style={{ color: colors.primary }} />}
                            {i === 2 && <Rocket className="w-6 h-6" style={{ color: colors.accent }} />}
                        </div>
                        <div 
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: i === 1 ? colors.primary : colors.accent }}
                        >
                            {value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderVisual = () => {
        switch (activeTab) {
            case 'mission': return <MissionVisual />;
            case 'vision': return <VisionVisual />;
            case 'values': return <ValuesVisual />;
            default: return <MissionVisual />;
        }
    };

    return (
        <section className={`relative py-12 px-4 sm:px-6 lg:px-8 ${
            darkMode 
                ? 'bg-gradient-to-br from-slate-900 to-gray-900' 
                : 'bg-gradient-to-br from-gray-100 to-white'
        }`}>
            
            <div className="relative max-w-full md:max-w-10/12 mx-auto">
                {/* Clean Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full border"
                         style={{ 
                             borderColor: colors.primary,
                             background: `${colors.primary}08`
                         }}>
                        <Zap className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className="text-sm font-semibold uppercase tracking-wider"
                              style={{ color: colors.primary }}>
                            Foundation
                        </span>
                    </div>
                    
                    <h2 className={`text-5xl md:text-7xl font-black mb-8 tracking-tight ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Built on
                        <span className="ml-2 max-md:block" style={{ color: colors.primary }}>
                            Purpose
                        </span>
                    </h2>
                    
                    <div className="w-24 h-1 mx-auto rounded-full mb-8"
                         style={{ backgroundColor: colors.accent }}></div>
                    
                    <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        The principles and vision driving our mission to transform Africa's digital landscape
                    </p>
                </div>

                {/* Modern Tab Navigation */}
                <div className="flex justify-center mb-16">
                    <div className="flex rounded-2xl border overflow-hidden"
                         style={{ borderColor: `${colors.primary}20` }}>
                        {Object.entries(tabContent).map(([tab, data]) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-3 px-8 py-6 font-semibold transition-all duration-300 capitalize ${
                                    activeTab === tab
                                        ? 'text-white'
                                        : darkMode
                                            ? 'text-gray-300 hover:text-white'
                                            : 'text-gray-600 hover:text-gray-900'
                                }`}
                                style={activeTab === tab ? {
                                    backgroundColor: colors.primary
                                } : {
                                    backgroundColor: darkMode ? 'transparent' : 'transparent'
                                }}
                            >
                                <data.icon className="w-5 h-5" />
                                <span>{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <div className="order-2 lg:order-1">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-2xl border"
                                 style={{ 
                                     borderColor: `${colors.primary}30`,
                                     backgroundColor: `${colors.primary}10`
                                 }}>
                                {React.createElement(tabContent[activeTab as keyof typeof tabContent].icon, {
                                    className: "w-8 h-8",
                                    style: { color: colors.primary }
                                })}
                            </div>
                            
                            <div>
                                <div className={`text-sm font-semibold uppercase tracking-wider mb-1 ${
                                    darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                    Achievement
                                </div>
                                <div className="text-lg font-bold"
                                     style={{ color: colors.accent }}>
                                    {tabContent[activeTab as keyof typeof tabContent].stats}
                                </div>
                            </div>
                        </div>

                        <h3 className={`text-4xl lg:text-5xl font-black mb-8 tracking-tight ${
                            darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            {tabContent[activeTab as keyof typeof tabContent].title}
                        </h3>

                        <p className={`text-lg leading-relaxed mb-8 ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            {tabContent[activeTab as keyof typeof tabContent].content}
                        </p>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px"
                                 style={{ backgroundColor: `${colors.primary}30` }}></div>
                            <div className={`text-sm font-semibold uppercase tracking-wider ${
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                Excellence Driven
                            </div>
                            <div className="flex-1 h-px"
                                 style={{ backgroundColor: `${colors.accent}30` }}></div>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="order-1 lg:order-2">
                        <div className={`relative rounded-3xl border p-8 ${
                            darkMode 
                                ? 'bg-gray-800/20 border-gray-700/30' 
                                : 'bg-white/60 border-gray-200/40'
                        }`}>
                            {renderVisual()}
                        </div>
                    </div>
                </div>

                {/* Clean CTA */}
                <div className="text-center mt-20">
                    <button 
                        className="inline-flex items-center gap-3 px-12 py-6 rounded-full font-bold text-lg text-white transition-all duration-300 hover:scale-105"
                        onClick={() => window.location.href = '/blog'}
                        style={{ 
                            backgroundColor: colors.primary,
                            boxShadow: `0 4px 20px ${darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryLight}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                    >
                        <span>Discover Our Journey</span>
                        <div className="w-2 h-2 rounded-full bg-white/80"></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FoundationSection;