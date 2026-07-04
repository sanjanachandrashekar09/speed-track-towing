import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Truck, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <>
      {/* Top info strip */}
      <div className="hidden lg:flex bg-primary/90 text-white text-xs font-medium items-center justify-between px-8 py-1.5 font-poppins tracking-wide">
        <span className="flex items-center gap-2 opacity-90">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse inline-block" />
          Shivamogga's Premier 24/7 Towing & Emergency Recovery
        </span>
        <a href="tel:+917899916161" className="flex items-center gap-2 font-bold hover:text-accent transition-colors">
          <Phone className="h-3 w-3" />
          <span>+91 78999 16161</span>
        </a>
      </div>

      <nav
        className={`fixed left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'top-0 bg-dark/97 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/5 py-3'
            : 'top-0 lg:top-7 bg-dark/80 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="bg-primary p-2.5 rounded-xl text-white shadow-lg animate-pulse-glow group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-6 w-6" />
                </div>
              </div>
              <div className="leading-tight">
                <span className="font-barlow font-extrabold text-xl sm:text-2xl tracking-wider text-white block uppercase">
                  Speed Track
                </span>
                <span className="text-[9px] sm:text-[10px] text-accent tracking-[0.3em] block uppercase font-poppins font-semibold">
                  Towing Service
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative font-poppins text-sm font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-white/8'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}
                        {isActive && (
                          <motion.span
                            layoutId="nav-indicator"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/917899916161?text=Hello%20Speed%20Track%2C%20I%20need%20towing%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#16a34a] hover:bg-[#15803d] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-poppins text-sm font-semibold tracking-wide shadow-lg shadow-green-900/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+917899916161"
                  className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-poppins text-sm font-bold tracking-wide shadow-lg shadow-red-900/40 animate-pulse-glow transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4 animate-phone-ring" />
                  <span>CALL NOW</span>
                </a>
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="https://wa.me/917899916161?text=Hello%20Speed%20Track%2C%20I%20need%20towing%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#16a34a] text-white p-2.5 rounded-xl shadow-lg flex items-center justify-center"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href="tel:+917899916161"
                className="bg-primary text-white p-2.5 rounded-xl shadow-lg animate-pulse-glow flex items-center justify-center"
              >
                <Phone className="h-4 w-4" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-lg transition-colors border border-white/10"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-dark border-t border-white/5 shadow-2xl overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3.5 rounded-xl font-poppins text-sm font-semibold tracking-wide transition-all ${
                        isActive
                          ? 'bg-primary/12 text-white border-l-2 border-primary pl-3'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="pt-3 space-y-2">
                  <a
                    href="tel:+917899916161"
                    className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl flex items-center justify-center gap-3 font-poppins font-bold tracking-wide shadow-lg animate-pulse-glow transition-all"
                  >
                    <Phone className="h-5 w-5 animate-phone-ring" />
                    <span>24/7 EMERGENCY CALL</span>
                  </a>
                  <a
                    href="https://wa.me/917899916161?text=Hello%20Speed%20Track%2C%20I%20need%20towing%20assistance."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#16a34a] text-white py-3.5 rounded-xl flex items-center justify-center gap-3 font-poppins font-semibold tracking-wide transition-all"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>WHATSAPP US</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
