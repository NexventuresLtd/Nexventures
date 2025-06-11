// src/pages/About.tsx

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import HeroSection from '../components/AboutUsComp/HeroSection';
import StatsSection from '../components/AboutUsComp/StatsSection';
import FoundationSection from '../components/AboutUsComp/FounderSection';
import ExpertiseSection from '../components/AboutUsComp/ExpertiseAbout';
import ValuesSection from '../components/AboutUsComp/ValuesAbout';
import CTASection from '../components/AboutUsComp/CTASection';
import TeamSection from '../components/AboutUsComp/OurTeams';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

export default function About() {
  // Get dark mode state and toggle function from context
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`min-h-screen transition-all duration-300 bg-gradient-to-br from-gray-50 via-white to-[#611701]/10 dark:from-gray-900 dark:via-gray-800 dark:to-[#952301]/20 `}>


      <Navbar />
      <HeroSection darkMode={darkMode} />
      <StatsSection darkMode={darkMode} />
      <FoundationSection darkMode={darkMode} />
      <ExpertiseSection darkMode={darkMode} />
      <ValuesSection darkMode={darkMode} />
      <CTASection darkMode={darkMode} />
      <TeamSection darkMode={darkMode} />
      <Footer />
    </div>
  );
}