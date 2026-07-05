import { Link } from 'react-router-dom';
import { Truck, Phone, MessageSquare, MapPin, Clock, ArrowRight } from 'lucide-react';

const PHONE = '+917899916161';
const PHONE_DISPLAY = '+91 78999 16161';
const WA_BASE = `https://wa.me/${PHONE}`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-gray-300 relative z-10 overflow-hidden">
      {/* Fire divider top */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      {/* Emergency CTA Band */}
      <div className="relative z-10 bg-primary/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-barlow font-extrabold text-2xl text-white uppercase tracking-tight">
                Stranded? Call Us Immediately.
              </p>
              <p className="text-gray-400 text-sm font-light mt-1">We dispatch 24/7 — no holidays, no delays.</p>
            </div>
            <div className="flex gap-3">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-xl font-poppins font-bold text-sm tracking-wide shadow-lg animate-pulse-glow transition-all"
              >
                <Phone className="h-4 w-4 animate-phone-ring" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a
                href={`${WA_BASE}?text=Hello%20Speed%20Track%2C%20I%20need%20towing%20assistance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white px-5 py-3.5 rounded-xl font-poppins font-semibold text-sm tracking-wide transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-primary p-2.5 rounded-xl text-white shadow-lg animate-pulse-glow group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-6 w-6" />
              </div>
              <div className="leading-tight">
                <span className="font-barlow font-extrabold text-xl tracking-wider text-white block uppercase">Speed Track</span>
                <span className="text-[9px] text-accent tracking-[0.3em] block uppercase font-poppins font-semibold">Towing Service</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Shivamogga's premier 24/7 vehicle recovery and roadside assistance partner. Safe, swift, and professional service — every time.
            </p>
            <div className="flex gap-3 pt-2">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 border border-white/5"
                aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 border border-white/5"
                aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 border border-white/5"
                aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-barlow font-bold text-white text-base mb-6 tracking-widest uppercase border-l-2 border-primary pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Services', path: '/services' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Contact Us', path: '/contact-us' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-white hover:gap-3 transition-all duration-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-barlow font-bold text-white text-base mb-6 tracking-widest uppercase border-l-2 border-primary pl-3">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Towing Services', 'Roadside Assistance', 'Accident Recovery', 'Light On-site Mechanics'].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <Link to="/services" className="hover:text-white transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="font-barlow font-bold text-white text-base mb-6 tracking-widest uppercase border-l-2 border-primary pl-3">
              Contact Info
            </h3>
            <div className="space-y-4 text-sm">
              <a
                href={`tel:${PHONE}`}
                className="flex items-start gap-3 group hover:text-white transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Phone className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="block font-poppins font-semibold text-white">Emergency Line</span>
                  <span className="text-gray-400 group-hover:text-primary transition-colors font-light">{PHONE_DISPLAY}</span>
                </div>
              </a>
              <a
                href={`${WA_BASE}?text=Hello%20Speed%20Track%2C%20I%20need%20towing%20assistance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group hover:text-white transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#16a34a]/15 flex items-center justify-center shrink-0 group-hover:bg-[#16a34a] transition-colors">
                  <MessageSquare className="h-4 w-4 text-[#16a34a] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="block font-poppins font-semibold text-white">WhatsApp Us</span>
                  <span className="text-gray-400 font-light">Send your location</span>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="block font-poppins font-semibold text-white">Main Station</span>
                  <span className="text-gray-400 font-light text-xs leading-relaxed">Mallari Complex, Sagar Road, Sharavathi Nagar, Hosamane, Shivamogga — 577201</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="block font-poppins font-semibold text-white">Always Open</span>
                  <span className="text-gray-400 font-light">24 Hours · 7 Days a Week</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/8 mb-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3880.6762831099407!2d75.5676!3d13.9299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba079b3b73989%3A0x60e76eef143d5ab!2sShivamogga%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Speed Track Towing Service Shivamogga Location Map"
          />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left font-poppins">
            &copy; {currentYear} Speed Track Towing Service. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
            <span className="text-xs text-gray-500 font-poppins">Open 24/7 · Shivamogga, Karnataka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
