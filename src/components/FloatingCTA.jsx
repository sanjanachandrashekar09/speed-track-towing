import { useState, useEffect } from 'react';
import { Phone, ChevronUp, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Floating Call & WhatsApp bar - bottom sticky for mobile */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-dark/90 backdrop-blur-md border-t border-white/10 p-3 flex gap-3 md:hidden">
        <a
          href="https://wa.me/917899916161?text=Hello%2C%20I%20need%20emergency%20towing%20assistance.%20Please%20help."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-poppins font-bold text-sm tracking-wide shadow-lg"
        >
          {/* Custom WhatsApp SVG Icon */}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.852.002-2.632-1.02-5.107-2.879-6.968-1.859-1.86-4.336-2.88-6.97-2.881-5.439 0-9.865 4.418-9.867 9.856-.001 1.704.449 3.371 1.305 4.868l-.979 3.57 3.666-.961zm11.233-6.937c-.302-.15-1.786-.881-2.062-.981-.277-.1-.478-.15-.679.15-.201.3-.778.981-.954 1.181-.176.2-.352.225-.654.075-.302-.15-1.275-.47-2.428-1.498-.897-.8-1.503-1.787-1.679-2.088-.176-.301-.019-.464.132-.613.136-.134.302-.351.453-.526.15-.175.201-.3.302-.5.101-.2.05-.376-.025-.526-.075-.15-.679-1.638-.93-2.244-.244-.588-.493-.508-.679-.518-.176-.01-.377-.01-.578-.01-.201 0-.527.075-.804.376-.277.301-1.055 1.027-1.055 2.505s1.08 2.906 1.231 3.107c.151.2 2.126 3.245 5.15 4.554.719.311 1.28.497 1.717.637.722.23 1.38.197 1.901.12.58-.087 1.787-.73 2.038-1.432.252-.703.252-1.305.176-1.432-.076-.127-.277-.202-.579-.352z" />
          </svg>
          <span>WHATSAPP</span>
        </a>
        <a
          href="tel:+917899916161"
          className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-poppins font-bold text-sm tracking-wide shadow-lg animate-pulse-glow"
        >
          <Phone className="w-5 h-5 animate-phone-ring" />
          <span>CALL NOW</span>
        </a>
      </div>

      {/* Floating CTA & Scroll to Top - for Tablet & Desktop */}
      <div className="hidden md:flex flex-col gap-3 fixed bottom-6 right-6 z-55">
        {/* Floating WhatsApp */}
        <motion.a
          href="https://wa.me/917899916161?text=Hello%2C%20I%20need%20emergency%20towing%20assistance.%20Please%20help."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-colors duration-300"
          title="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.852.002-2.632-1.02-5.107-2.879-6.968-1.859-1.86-4.336-2.88-6.97-2.881-5.439 0-9.865 4.418-9.867 9.856-.001 1.704.449 3.371 1.305 4.868l-.979 3.57 3.666-.961zm11.233-6.937c-.302-.15-1.786-.881-2.062-.981-.277-.1-.478-.15-.679.15-.201.3-.778.981-.954 1.181-.176.2-.352.225-.654.075-.302-.15-1.275-.47-2.428-1.498-.897-.8-1.503-1.787-1.679-2.088-.176-.301-.019-.464.132-.613.136-.134.302-.351.453-.526.15-.175.201-.3.302-.5.101-.2.05-.376-.025-.526-.075-.15-.679-1.638-.93-2.244-.244-.588-.493-.508-.679-.518-.176-.01-.377-.01-.578-.01-.201 0-.527.075-.804.376-.277.301-1.055 1.027-1.055 2.505s1.08 2.906 1.231 3.107c.151.2 2.126 3.245 5.15 4.554.719.311 1.28.497 1.717.637.722.23 1.38.197 1.901.12.58-.087 1.787-.73 2.038-1.432.252-.703.252-1.305.176-1.432-.076-.127-.277-.202-.579-.352z" />
          </svg>
        </motion.a>

        {/* Floating Call */}
        <motion.a
          href="tel:+917899916161"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-primary hover:bg-primary/95 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer animate-pulse-glow"
          title="Call Emergency Support"
        >
          <Phone className="w-6 h-6 animate-phone-ring" />
        </motion.a>

        {/* Scroll to Top */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-dark/80 backdrop-blur-sm border border-white/20 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-dark transition-colors duration-300"
              title="Scroll to Top"
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
