import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Award, Users, Clock, Zap, Shield, Target } from 'lucide-react';
import { colors } from './ServicesOffered';

export const stats = [
    { number: 135, label: 'Projects Completed', icon: Award },
    { number: 98, label: 'Client Satisfaction', icon: Star },
    { number: 90, label: 'Happy Clients', icon: Users },
    { number: 24, label: 'Hour Support', icon: Clock }
];

export const testimonials = [
    {
        name: 'Alpha Credo Christelle',
        company: 'AlphaTech Solutions',
        role: 'CTO',
        rating: 5,
        text: 'Exceptional backend development that scaled our platform to handle millions of users. The team delivered beyond expectations with enterprise-grade security.',
        avatar: 'AC'
    },
    {
        name: 'Chancelline Niyotugendana',
        company: 'Chance for All Foundation',
        role: 'Founder',
        rating: 5,
        text: 'Professional mobile app development with stunning UI/UX design. Our app achieved 4.8+ store ratings thanks to their user-centered approach.',
        avatar: 'CN'
    },
    {
        name: 'Prof. Eugene Nsanzabiga',
        company: 'Envibrant visions',
        role: 'Creative Director',
        rating: 5,
        text: 'Outstanding graphic design and branding services. They transformed our visual identity and increased our client engagement by 200%.',
        avatar: 'EN'
    }
];

export const benefits = [
    { icon: Zap, title: 'Lightning Fast', description: 'Rapid development cycles with agile methodology' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level security implementation and compliance' },
    { icon: Target, title: 'Goal Oriented', description: 'Results-driven approach focused on your objectives' },
    { icon: Users, title: 'Expert Team', description: 'Senior developers with 5+ years of experience' }
];


export const AnimatedCounter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2000 }) => {
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

export const TestimonialCarousel: React.FC = () => {
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

interface TestimonialsBenefitsStatsProps {
    darkMode: boolean;
}

export const TestimonialsBenefitsStats: React.FC<TestimonialsBenefitsStatsProps> = ({ darkMode }) => {
    const statsRef = useRef(null);
    const isStatsInView = useInView(statsRef, { once: true });

    return (
        <>
            {/* Stats Section */}
            <section
                ref={statsRef}
                className="py-20 px-4 text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
            >
                <div className="absolute inset-0 bg-black/10" />
                <div className="max-w-full md:max-w-11/12 mx-auto relative z-10">
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
                <div className="max-w-full md:max-w-11/12 mx-auto">
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
                            Why Choose Nexventures?
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
        </>
    );
};