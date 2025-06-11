import React from 'react';
import { MapPin, Play } from 'lucide-react';

interface HeroSectionProps {
    darkMode: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ }) => {
    return (
        <section className="relative py-24 flex items-center justify-center overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-slate-900/95 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 transition-all duration-300 hover:bg-white/20">
                    <MapPin className="w-4 h-4" />
                    Based in Kigali, Rwanda
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
                    About{' '}
                    <span className="bg-gradient-to-r from-orange-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                        NexVentures
                    </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-4xl mx-auto mb-12 text-slate-200 font-light">
                    We're not just another tech agency. We're your digital transformation partners,
                    committed to turning your vision into reality.
                </p>

                <button className="group inline-flex items-center gap-3 bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Watch Our Story
                </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;