import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from './pages/About';

import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import FAQs from './pages/FAQs';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Careers from './pages/Careers';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/career" element={<Careers />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
// This is the main App component that sets up the router and renders the Navbar, Footer, and main content based on the current route.
// It uses React Router for navigation between different pages of the application.
// Each page component (Home, About, Services, etc.) is imported and rendered based on the route defined in the <Routes> component.
// The Navbar and Footer components are included to provide consistent navigation and footer content across all pages.
// The main content area is set to grow and fill the available space, ensuring the footer stays at the bottom of the page.
// The application is structured to be responsive and user-friendly, with a focus on providing information about the company, its services, and how to get in touch.
// The code is written in TypeScript and uses React functional components, making it easy to maintain and extend in the future.
// The application is styled using Tailwind CSS, providing a modern and clean design.
// The use of Framer Motion for animations can be added to enhance user experience, such as fading in sections or animating elements on scroll.
// The application is designed to be easily extendable, allowing for future features like user authentication, admin dashboard, or additional service pages.
// The code is modular, with each page and component separated into its own file, promoting reusability and maintainability.  