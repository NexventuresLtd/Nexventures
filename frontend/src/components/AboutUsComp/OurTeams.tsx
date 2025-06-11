import React, { useState, useEffect } from 'react';
import { Users, Code, Palette, Target, Globe, Award, Coffee, Heart, Zap } from 'lucide-react';

interface TeamSectionProps {
    darkMode: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ darkMode }) => {
    const [animationPhase, setAnimationPhase] = useState(0);
    const [activeRole, setActiveRole] = useState('developers');

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
            setAnimationPhase(prev => (prev + 1) % 8);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const teamRoles = {
        developers: {
            title: 'Developers',
            icon: Code,
            count: '12+',
            description: 'Full-stack developers, mobile specialists, and backend architects who turn complex ideas into elegant solutions.',
            skills: ['React/Next.js', 'Node.js', 'Mobile Development', 'Cloud Architecture', 'API Integration', 'DevOps', 'AI/ML','data engineering','python','javascript', 'typescript','database administration'],
            color: colors.primary
        },
        designers: {
            title: 'Designers',
            icon: Palette,
            count: '8+',
            description: 'Creative minds who craft beautiful, intuitive user experiences that engage and convert.',
            skills: ['UI/UX Design', 'Brand Identity', 'Motion Graphics', 'User Research','Prototyping', 'Accessibility Design'],
            color: colors.accent
        },
        strategists: {
            title: 'Strategists',
            icon: Target,
            count: '6+',
            description: 'Strategic thinkers who align technology solutions with business objectives for maximum impact.',
            skills: ['Digital Strategy', 'Market Analysis', 'Growth Planning', 'Consulting'],
            color: colors.primaryLight
        }
    };

    const teamStats = [
        { number: '26+', label: 'Team Members', icon: Users },
        { number: '2+', label: 'Countries Served', icon: Globe },
        { number: '5+', label: 'Years Experience', icon: Award },
        { number: '∞', label: 'Coffee Consumed', icon: Coffee }
    ];

    // Team collaboration visual
    const CollaborationVisual = () => (
        <div className="relative w-full h-96 flex items-center justify-center">
            {/* Central hub representing team unity */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div 
                    className="w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-1000"
                    style={{ 
                        borderColor: colors.primary,
                        backgroundColor: `${colors.primary}10`,
                        transform: `scale(${1 + Math.sin(animationPhase * 0.5) * 0.1})`
                    }}
                >
                    <Heart className="w-10 h-10" style={{ color: colors.primary }} />
                </div>
                
                {/* Team member nodes */}
                {Object.entries(teamRoles).map(([role, data], i) => {
                    const angle = (i * 120) + (animationPhase * 5);
                    const radius = 120;
                    const x = 50 + (radius * Math.cos(angle * Math.PI / 180)) / 4;
                    const y = 50 + (radius * Math.sin(angle * Math.PI / 180)) / 4;
                    
                    return (
                        <div
                            key={role}
                            className="absolute transition-all duration-1000 cursor-pointer"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: `translate(-50%, -50%) scale(${activeRole === role ? 1.2 : 1})`,
                            }}
                            onClick={() => setActiveRole(role)}
                        >
                            <div 
                                className="w-16 h-16 rounded-full border-3 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                style={{ 
                                    borderColor: data.color,
                                    backgroundColor: activeRole === role ? data.color : `${data.color}15`
                                }}
                            >
                                <data.icon 
                                    className="w-8 h-8" 
                                    style={{ color: activeRole === role ? 'white' : data.color }} 
                                />
                            </div>
                            
                            {/* Role label */}
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <div 
                                    className="text-xs font-bold uppercase tracking-wider"
                                    style={{ color: data.color }}
                                >
                                    {data.count}
                                </div>
                            </div>
                        </div>
                    );
                })}
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: colors.primary, stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: colors.accent, stopOpacity: 0.1 }} />
                        </linearGradient>
                    </defs>
                    {Object.entries(teamRoles).map((_, i) => {
                        const angle = (i * 120) + (animationPhase * 5);
                        const radius = 120;
                        const x = 50 + (radius * Math.cos(angle * Math.PI / 180)) / 4;
                        const y = 50 + (radius * Math.sin(angle * Math.PI / 180)) / 4;
                        
                        return (
                            <line
                                key={i}
                                x1="50%"
                                y1="50%"
                                x2={`${x}%`}
                                y2={`${y}%`}
                                stroke="url(#connectionGradient)"
                                strokeWidth="2"
                                className="transition-all duration-1000"
                            />
                        );
                    })}
                </svg>

                {/* Floating skill bubbles */}
                {['React', 'Design', 'Strategy', 'Mobile', 'Cloud', 'UX'].map((skill, i) => (
                    <div
                        key={skill}
                        className="absolute text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-2000"
                        style={{
                            left: `${20 + (i * 12)}%`,
                            top: `${20 + Math.sin(i + animationPhase * 0.3) * 15}%`,
                            borderColor: `${colors.accent}30`,
                            backgroundColor: `${colors.accent}08`,
                            color: colors.accent,
                            opacity: 0.6 + Math.sin(i + animationPhase * 0.2) * 0.4
                        }}
                    >
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className={`relative py-12 px-4 sm:px-6 lg:px-8 ${
            darkMode 
                ? 'bg-gradient-to-br from-slate-800 to-slate-900' 
                : 'bg-gradient-to-br from-slate-100 to-gray-50'
        }`}>
            
            <div className="relative max-w-full md:max-w-10/12 mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full border"
                         style={{ 
                             borderColor: colors.primary,
                             backgroundColor: `${colors.primary}08`
                         }}>
                        <Users className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className="text-sm font-semibold uppercase tracking-wider"
                              style={{ color: colors.primary }}>
                            Our Team
                        </span>
                    </div>
                    
                    <h2 className={`text-5xl md:text-7xl font-black mb-8 tracking-tight ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Meet the
                        <span className="max-md:block md:ml-2" style={{ color: colors.primary }}>
                            Visionaries
                        </span>
                    </h2>
                    
                    <div className="w-24 h-1 mx-auto rounded-full mb-8"
                         style={{ backgroundColor: colors.accent }}></div>
                    
                    <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        A diverse collective of passionate professionals united by our mission to create 
                        exceptional digital experiences that transform businesses across Africa
                    </p>
                </div>

                {/* Team Visual and Info Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Interactive Team Visual */}
                    <div className="order-2 lg:order-1">
                        <div className={`relative rounded-3xl border p-8 ${
                            darkMode 
                                ? 'bg-gray-800/20 border-gray-700/30' 
                                : 'bg-white/60 border-gray-200/40'
                        }`}>
                            <CollaborationVisual />
                        </div>
                    </div>

                    {/* Team Role Details */}
                    <div className="order-1 lg:order-2">
                        <div className="space-y-8">
                            {Object.entries(teamRoles).map(([role, data]) => (
                                <div
                                    key={role}
                                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                        activeRole === role 
                                            ? 'border-opacity-50' 
                                            : 'border-opacity-20 hover:border-opacity-30'
                                    } ${darkMode ? 'bg-gray-800/30' : 'bg-white/40'}`}
                                    style={{ 
                                        borderColor: data.color,
                                        backgroundColor: activeRole === role 
                                            ? `${data.color}10` 
                                            : darkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(255, 255, 255, 0.4)'
                                    }}
                                    onClick={() => setActiveRole(role)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl border"
                                             style={{ 
                                                 borderColor: `${data.color}30`,
                                                 backgroundColor: `${data.color}15`
                                             }}>
                                            <data.icon className="w-6 h-6" style={{ color: data.color }} />
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <h3 className={`text-2xl font-bold ${
                                                    darkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                    {data.title}
                                                </h3>
                                                <span className="text-lg font-bold"
                                                      style={{ color: data.color }}>
                                                    {data.count}
                                                </span>
                                            </div>
                                            
                                            <p className={`text-base leading-relaxed mb-4 ${
                                                darkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>
                                                {data.description}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {data.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="text-xs font-semibold px-3 py-1 rounded-full border"
                                                        style={{
                                                            borderColor: `${data.color}30`,
                                                            backgroundColor: `${data.color}10`,
                                                            color: data.color
                                                        }}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {teamStats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 rounded-full border"
                                     style={{ 
                                         borderColor: `${colors.primary}30`,
                                         backgroundColor: `${colors.primary}10`
                                     }}>
                                    <stat.icon className="w-8 h-8" style={{ color: colors.primary }} />
                                </div>
                            </div>
                            <div className="text-4xl font-black mb-2" style={{ color: colors.accent }}>
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

                {/* Team Values */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="flex-1 h-px"
                             style={{ backgroundColor: `${colors.primary}20` }}></div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5" style={{ color: colors.accent }} />
                            <span className={`text-sm font-semibold uppercase tracking-wider ${
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                United by Purpose
                            </span>
                        </div>
                        <div className="flex-1 h-px"
                             style={{ backgroundColor: `${colors.accent}20` }}></div>
                    </div>
                    
                    <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Every team member brings unique expertise and perspective, but we're all driven 
                        by the same mission: creating digital solutions that make a meaningful impact.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;