import  { useState, useContext } from 'react';
import { Star, Eye, MessageCircle, Calendar, User, X, ExternalLink, Github, TrendingUp, Sparkles } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

interface Project {
    id: number;
    title: string;
    description: string;
    rating: number;
    reviewCount: number;
    views: number;
    author: string;
    date: string;
    tags: string[];
    thumbnail: string;
    image: string;
    fullDescription: string;
    features: string[];
    techStack: string[];
    demoUrl?: string;
    githubUrl?: string;
    trending?: boolean;
}

const mockProjects: Project[] = [
    {
        id: 1,
        title: "PrognoSys",
        description: "healthcare management system with AI-driven insights",
        rating: 4.9,
        reviewCount: 1147,
        views: 1450,
        author: "Nexventures Ltd",
        date: "2024-06-10",
        tags: ["AI", "Neural Networks", "Collaboration", "Healthcare"],
        thumbnail: "bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500",
        image: "image/prognosys (1).png",
        fullDescription: "PrognoSys is a cutting-edge healthcare management system that leverages AI-driven insights to optimize patient care and streamline operations. With real-time neural network visualization and collaborative AI model training, it sets a new standard in healthcare technology.",
        features: [
            "AI-driven patient insights",
            "Real-time neural network visualization",
            "Collaborative AI model training",
            "Secure data management",
            "Customizable dashboards",
            "Advanced analytics and reporting"
        ],
        techStack: ["React", "Javascript", "Python", "TensorFlow", "git", "PostgreSQL","Django"],
        demoUrl: "https://prognosys.vercel.app/",
        githubUrl: "https://prognosys.vercel.app/",
        trending: true
    },
    {
        id: 2,
        title: "Afriton",
        description: "Cross Border Payment system uses fingerprint authentication also fingerprint to pay for goods",
        rating: 4.8,
        reviewCount: 1892,
        views: 2250,
        author: "Nexventures Ltd",
        date: "2024-06-08",
        tags: ["Analytics", "Quantum UI", "Visualization"],
        thumbnail: "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600",
        image: "image/afriton (2).png",
        fullDescription: "Afriton is a revolutionary cross-border payment system that integrates advanced fingerprint authentication for secure transactions. It allows users to pay for goods and services seamlessly using their biometric data, ensuring both security and convenience.",
        features: [
            "Fingerprint authentication for secure payments",
            "Cross-border transaction capabilities",
            "Real-time transaction tracking",
            "Multi-currency support",
            "User-friendly interface",
            "Advanced fraud detection algorithms"
        ],
        techStack: ["React Js", "Javascript", "Google Auth", "Fastapi", "Git Version", "PostgreSQL","Tailwind CSS"],
        demoUrl: "https://afriton.netlify.app/",
        githubUrl: "https://afriton.netlify.app/",
        trending: true
    },
    {
        id: 3,
        title: "Iga Thrive",
        description: "Online learning platform with AI-driven personalized learning paths",
        rating: 4.7,
        reviewCount: 1154,
        views: 1230,
        author: "Nexventures Ltd",
        date: "2024-06-05",
        tags: ["AR/VR", "Social", "Metaverse", "AI", "Education"],
        thumbnail: "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
        image: "image/igathrive (2).png",
        fullDescription: "Iga Thrive is an innovative online learning platform that utilizes AI-driven personalized learning paths to enhance the educational experience. It offers a wide range of courses and interactive content, making learning engaging and effective.",
        features: [
            "AI-driven personalized learning paths",
            "Interactive course content",
            "Real-time progress tracking",
            "Community forums and collaboration tools",
            "Gamified learning experiences",
            "Mobile-friendly design"
        ],
        techStack: ["React js", "Javascript", "Node.js", "Fastapi", "Git Version", "PostgreSQL","Tailwind CSS"],
        demoUrl: "https://igathrive.netlify.app/"
    }
];

export default function MostReviewedProjectsInner() {
    // Get dark mode state and toggle function from context
    const { darkMode } = useContext(ThemeContext);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : i < rating
                            ? 'fill-yellow-400/50 text-yellow-400'
                            : darkMode
                                ? 'text-gray-600'
                                : 'text-gray-400'
                    }`}
            />
        ));
    };

    return (
        <div className={`transition-all duration-500 ${darkMode
                ? 'bg-gradient-to-br from-gray-950 to-gray-900'
                : 'bg-gradient-to-br from-gray-200 to-gray-100'
            }`}>
            <div className="max-w-full md:max-w-11/12 mx-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-gradient-to-r from-[#952301] to-[#FF6B35] rounded-xl">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${darkMode
                                    ? 'from-white to-gray-300'
                                    : 'from-gray-900 to-gray-600'
                                }`}>
                                Most Reviewed Projects
                            </h1>
                        </div>
                        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            Discover cutting-edge projects that are shaping the future
                        </p>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {mockProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`group relative backdrop-blur-xl border rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ${darkMode
                                    ? 'bg-gray-800/60 border-gray-700/50 hover:shadow-purple-400/20'
                                    : 'bg-white/60 border-gray-200/50 hover:shadow-purple-500/10'
                                }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Trending Badge */}
                            {project.trending && (
                                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#952301] to-[#FF6B35] rounded-full text-white text-xs font-medium">
                                    <Sparkles className="w-3 h-3" />
                                    Trending
                                </div>
                            )}

                            {/* Thumbnail with overlay */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex">{renderStars(project.rating)}</div>
                                        <span className="text-sm font-semibold">{project.rating}</span>
                                    </div>
                                    <h3 className="font-bold text-xl mb-1">{project.title}</h3>
                                    <p className="text-white/90 text-sm">{project.description}</p>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#952301]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-medium hover:bg-white/30 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-[#952301] to-[#FF6B35] rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'
                                                }`}>{project.author}</p>
                                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>{formatDate(project.date)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            <Eye className="w-4 h-4" />
                                            <span>{(project.views / 1000).toFixed(1)}k</span>
                                        </div>
                                        <div className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            <MessageCircle className="w-4 h-4" />
                                            <span>{project.reviewCount}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className={`px-3 py-1 bg-gradient-to-r from-[#952301]/10 to-[#FF6B35]/10 text-xs rounded-full font-medium border ${darkMode
                                                    ? 'text-[#FF6B35] border-[#FF6B35]/20'
                                                    : 'text-[#952301] border-[#952301]/20'
                                                }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedProject && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
                        <div className={`backdrop-blur-xl border rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${darkMode
                                ? 'bg-gray-900/95 border-gray-700/50'
                                : 'bg-white/95 border-gray-200/50'
                            }`}>
                            {/* Modal Header */}
                            <div className={`relative p-8 border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                                }`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            {selectedProject.trending && (
                                                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#952301] to-[#FF6B35] rounded-full text-white text-sm font-medium">
                                                    <Sparkles className="w-4 h-4" />
                                                    Trending
                                                </div>
                                            )}
                                        </div>
                                        <h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {selectedProject.title}
                                        </h2>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex">{renderStars(selectedProject.rating)}</div>
                                            <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
                                                }`}>{selectedProject.rating}</span>
                                            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>({selectedProject.reviewCount} reviews)</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className={`p-3 rounded-xl transition-colors group ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        <X className={`w-6 h-6 ${darkMode
                                                ? 'text-gray-500 group-hover:text-gray-300'
                                                : 'text-gray-500 group-hover:text-gray-700'
                                            }`} />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Main Content */}
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Hero Image */}
                                        <div className="h-80 rounded-2xl relative overflow-hidden">
                                            <img
                                                src={selectedProject.image}
                                                alt={selectedProject.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                            <div className="absolute bottom-6 left-6 text-white">
                                                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                                                <p className="text-white/90">{selectedProject.description}</p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                <div className="w-2 h-2 bg-gradient-to-r from-[#952301] to-[#FF6B35] rounded-full"></div>
                                                About This Project
                                            </h3>
                                            <p className={`leading-relaxed text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                {selectedProject.fullDescription}
                                            </p>
                                        </div>

                                        {/* Features */}
                                        <div>
                                            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                <div className="w-2 h-2 bg-gradient-to-r from-[#952301] to-[#FF6B35] rounded-full"></div>
                                                Key Features
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {selectedProject.features.map((feature, index) => (
                                                    <div key={index} className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                                                        }`}>
                                                        <div className="w-2 h-2 bg-gradient-to-r from-[#952301] to-[#FF6B35] rounded-full flex-shrink-0"></div>
                                                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tech Stack */}
                                        <div>
                                            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                <div className="w-2 h-2 bg-gradient-to-r from-[#952301] to-[#FF6B35] rounded-full"></div>
                                                Technology Stack
                                            </h3>
                                            <div className="flex flex-wrap gap-3">
                                                {selectedProject.techStack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className={`px-4 py-2 bg-gradient-to-r from-[#952301]/10 to-[#FF6B35]/10 rounded-xl font-medium border hover:scale-105 transition-transform duration-200 ${darkMode
                                                                ? 'text-[#FF6B35] border-[#FF6B35]/20'
                                                                : 'text-[#952301] border-[#952301]/20'
                                                            }`}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar */}
                                    <div className="lg:col-span-1 space-y-6">
                                        {/* Stats Card */}
                                        <div className={`rounded-2xl p-6 border ${darkMode
                                                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50'
                                                : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200/50'
                                            }`}>
                                            <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'
                                                }`}>Project Statistics</h4>
                                            <div className="space-y-4">
                                                {[
                                                    { label: 'Total Views', value: selectedProject.views.toLocaleString(), icon: Eye },
                                                    { label: 'Reviews', value: selectedProject.reviewCount.toString(), icon: MessageCircle },
                                                    { label: 'Rating', value: `${selectedProject.rating}/5.0`, icon: Star },
                                                    { label: 'Created', value: formatDate(selectedProject.date), icon: Calendar }
                                                ].map((stat, index) => (
                                                    <div key={index} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                                                        }`}>
                                                        <div className="flex items-center gap-2">
                                                            <stat.icon className={`w-4 h-4 ${darkMode ? 'text-[#FF6B35]' : 'text-[#952301]'
                                                                }`} />
                                                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                                                }`}>{stat.label}</span>
                                                        </div>
                                                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
                                                            }`}>{stat.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Author Card */}
                                        <div className={`rounded-2xl p-6 border ${darkMode
                                                ? 'bg-gradient-to-br from-[#952301]/5 to-[#FF6B35]/5 border-[#FF6B35]/20'
                                                : 'bg-gradient-to-br from-[#952301]/5 to-[#FF6B35]/5 border-[#952301]/20'
                                            }`}>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 bg-gradient-to-r from-[#952301] to-[#FF6B35] rounded-full flex items-center justify-center">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'
                                                        }`}>{selectedProject.author}</h4>
                                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                                        }`}>Project Creator</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="space-y-3">
                                            {selectedProject.demoUrl && (
                                                <a
                                                    href={selectedProject.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full bg-gradient-to-r from-[#952301] to-[#FF6B35] hover:from-[#6B1A01] hover:to-[#E5571F] text-white py-4 px-6 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 group"
                                                >
                                                    <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                    View Live Demo
                                                </a>
                                            )}
                                            {selectedProject.githubUrl && (
                                                <a
                                                    href={selectedProject.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`w-full border-2 py-4 px-6 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 group ${darkMode
                                                            ? 'border-gray-600 hover:border-[#FF6B35] text-gray-300 hover:text-[#FF6B35]'
                                                            : 'border-gray-300 hover:border-[#952301] text-gray-700 hover:text-[#952301]'
                                                        }`}
                                                >
                                                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                    View Source Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}