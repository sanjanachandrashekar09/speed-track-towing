import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone, ArrowRight, Clock, MapPin, Navigation2,
  Truck, Wrench, Lock, AlertTriangle, Zap, MessageSquare, PhoneCall,
  Shield, Star, CheckCircle, ChevronRight
} from 'lucide-react';
import SEO from '../components/SEO';
import LatestVideos from '../components/LatestVideos';

const PHONE = '+917899916161';
const PHONE_DISPLAY = '+91 78999 16161';
const ALT_PHONE = '+919880166968';
const ALT_PHONE_DISPLAY = '+91 98801 66968';
const WA_BASE = `https://wa.me/${PHONE}`;

export default function Home() {
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [detectedAddress, setDetectedAddress] = useState('');

  const handleDetectLocation = () => {
    if (!navigator.geolocation) { alert("Geolocation not supported."); return; }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          setDetectedAddress(data?.display_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        } catch {
          setDetectedAddress(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        } finally { setDetectingLocation(false); }
      },
      () => { alert("Unable to retrieve location."); setDetectingLocation(false); }
    );
  };

  const waMsg = detectedAddress
    ? `Hello Speed Track, I need emergency towing. My location: ${detectedAddress}. Please help!`
    : `Hello Speed Track, I need emergency towing assistance. Please call me back immediately.`;

  const services = [
    { title: "Towing", icon: <Truck className="w-6 h-6" />, desc: "24 Hour and Holiday towing across the greater metropolitan area", color: "from-red-600/20 to-red-900/10" },
    { title: "Roadside Assistance", icon: <Wrench className="w-6 h-6" />, desc: "24 Hour and Holiday assistance throughout the greater metropolitan area", color: "from-orange-600/20 to-orange-900/10" },
    { title: "Accident Recovery", icon: <AlertTriangle className="w-6 h-6" />, desc: "24 Hour and Holiday Accident Recovery", color: "from-yellow-600/20 to-yellow-900/10" },
    { title: "Light On-site Mechanics", icon: <Zap className="w-6 h-6" />, desc: "24 Hour and Holiday light mechanical work at site", color: "from-blue-600/20 to-blue-900/10" },

  ];

  const trustPoints = [
    { icon: <Shield className="w-5 h-5" />, title: "Licensed & Insured", desc: "Fully certified for your peace of mind" },
    { icon: <Clock className="w-5 h-5" />, title: "Open 24/7/365", desc: "No holidays. Always ready to respond" },
    { icon: <Star className="w-5 h-5" />, title: "5-Star Rated", desc: "Verified reviews on Google Business" },
    { icon: <CheckCircle className="w-5 h-5" />, title: "Fast Response", desc: "Rapid dispatch across Shivamogga" },
  ];

  return (
    <>
      <SEO />

      {/* ═══════════════════════════════════════════
          HERO — Full viewport, dark cinematic
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center text-white overflow-hidden bg-dark">
        {/* Background layers */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('/hero_tow_truck.png')`,
            filter: 'brightness(0.3) saturate(0.8)',
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-dark/90 via-transparent to-dark/30" />
        {/* Red accent glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0 animate-float" />
        {/* Grid overlay */}
        <div className="absolute inset-0 z-0 bg-grid opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16">
          <div className="max-w-3xl">

            {/* Emergency badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 mb-8"
            >
              <div className="flex items-center gap-2 bg-primary/15 border border-primary/40 text-primary px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-primary relative" />
                <span className="text-xs font-barlow font-bold tracking-widest uppercase text-primary">
                  Emergency Service Available Now
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-barlow font-extrabold text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-none mb-6 uppercase"
            >
              <span className="text-white">We Tow.</span>
              <br />
              <span className="text-primary">You Go.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed mb-4 max-w-2xl"
            >
              Speed Track Towing Service — Shivamogga's most trusted 24/7 emergency towing and roadside assistance. Day or night, we reach you fast.
            </motion.p>

            {/* Location pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 text-accent/80 text-sm font-poppins font-medium mb-10"
            >
              <MapPin className="w-4 h-4 text-accent" />
              <span>Mallari Complex, Sagar Road, Shivamogga, Karnataka — 577201</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href={`tel:${PHONE}`} className="btn-primary text-base animate-pulse-glow">
                <Phone className="h-5 w-5 animate-phone-ring" />
                <span>Call {PHONE_DISPLAY}</span>
              </a>
              <a href={`${WA_BASE}?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base">
                <MessageSquare className="h-5 w-5" />
                <span>WhatsApp Now</span>
              </a>
              <Link to="/services" className="btn-outline text-sm">
                <span>Our Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom stat bar */}
        <div className="relative z-10 border-t border-white/8 bg-white/3 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
              {[
                { value: '24/7', label: 'Always Available' },
                { value: '5★', label: 'Google Rating' },
                { value: '5+', label: 'Years Experience' },
                { value: 'Fast', label: 'Response Dispatch' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-6 py-5 text-center"
                >
                  <p className="font-barlow font-extrabold text-3xl text-white tracking-tight">{stat.value}</p>
                  <p className="text-gray-400 text-xs font-poppins font-medium mt-1 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════════ */}
      <section className="bg-primary py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustPoints.map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  {t.icon}
                </div>
                <div>
                  <p className="font-poppins font-bold text-sm">{t.title}</p>
                  <p className="text-white/70 text-xs">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY CHOOSE US
      ═══════════════════════════════════════════ */}
      <section className="py-28 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-primary/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="section-eyebrow">Our Promise</span>
            <h2 className="font-barlow font-extrabold text-5xl sm:text-6xl text-white tracking-tight mt-3 mb-6 uppercase">
              Why Choose <span className="text-primary">Speed Track</span>
            </h2>
            <hr className="divider-fire w-24 mx-auto mb-6" />
            <p className="text-gray-400 font-light text-lg leading-relaxed">
              We combine speed, expertise, and care to get you back on the road with minimum stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8 text-primary" />,
                num: "01",
                title: "24/7 Roadside Assistance",
                desc: "No matter the time, day or night, we're here for you. Whether you've run out of gas, had an accident, or your car won't start — our team deploys immediately."
              },
              {
                icon: <Shield className="w-8 h-8 text-primary" />,
                num: "02",
                title: "Skilled Technicians",
                desc: "All our technicians have 5+ years in the field. With speed, knowledge and great customer service, we handle every breakdown with professionalism and care."
              },
              {
                icon: <Truck className="w-8 h-8 text-primary" />,
                num: "03",
                title: "Premium Fleet & Quality",
                desc: "With the latest trucks and equipment, we tow everything from motorcycles to heavy vehicles. Vehicle safety is our priority — we offer warranties on minor repairs."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="service-card p-8 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="font-barlow font-extrabold text-5xl text-white/5 select-none">{item.num}</span>
                </div>
                <h3 className="font-barlow font-bold text-2xl text-white mb-3 uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES GRID
      ═══════════════════════════════════════════ */}
      <section className="py-28 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <span className="section-eyebrow">What We Do</span>
              <h2 className="font-barlow font-extrabold text-5xl sm:text-6xl text-dark tracking-tight mt-3 uppercase">
                Our <span className="text-primary">Services</span>
              </h2>
              <hr className="divider-fire w-24 mt-5" />
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-poppins font-bold text-primary text-sm border border-primary/30 px-5 py-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 self-start lg:self-auto"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Red accent bar on hover */}
                <div className="h-1 w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {svc.icon}
                  </div>
                  <h3 className="font-barlow font-bold text-xl text-dark mb-2 uppercase tracking-wide">{svc.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light mb-5">{svc.desc}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-poppins font-semibold group-hover:gap-3 transition-all duration-300"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Videos ── */}
      <LatestVideos />

      {/* ═══════════════════════════════════════════
          EMERGENCY CTA BAND
      ═══════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-dark" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10"
          style={{ backgroundImage: "url('/hero_tow_truck.png')", backgroundSize: 'cover', backgroundPosition: 'center left' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left">
            <span className="text-white/60 text-xs font-barlow font-bold tracking-widest uppercase block mb-3">Stranded? Don't Wait.</span>
            <h2 className="font-barlow font-extrabold text-5xl sm:text-6xl text-white tracking-tight uppercase">
              We're On Our<br />Way to <span className="text-accent">You.</span>
            </h2>
            <p className="text-white/70 font-light mt-4 max-w-lg text-base">
              One call is all it takes. Our dispatch team picks up immediately — 24 hours, 7 days, 365 days a year.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto lg:min-w-[280px]">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center justify-center gap-3 bg-white text-primary font-poppins font-extrabold text-lg px-8 py-5 rounded-2xl shadow-2xl hover:shadow-white/20 hover:bg-accent hover:text-dark transition-all duration-300 hover:-translate-y-1 animate-pulse-glow"
            >
              <Phone className="h-6 w-6 animate-phone-ring" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a
              href={`${WA_BASE}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#16a34a] hover:bg-[#15803d] text-white font-poppins font-bold text-base px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Send WhatsApp Message</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          REVIEWS TEASER
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="section-eyebrow">Customer Feedback</span>
          <h2 className="font-barlow font-extrabold text-5xl sm:text-6xl text-white tracking-tight mt-3 mb-5 uppercase">
            Read Our <span className="text-primary">Reviews</span>
          </h2>
          <hr className="divider-fire w-24 mx-auto mb-8" />
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-accent fill-current" />)}
          </div>
          <p className="text-gray-400 max-w-xl mx-auto text-base font-light mb-10 leading-relaxed">
            Customers trust us for fast, safe, and damage-free vehicle recovery across Shivamogga's road network.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/testimonials" className="btn-primary">
              <Star className="w-4 h-4 fill-current" />
              <span>View Testimonials</span>
            </Link>
            <a
              href="https://www.google.com/maps/place/Mallari+Complex,+Sagar+Rd,+Sharavathi+Nagar,+Hosamane,+Shivamogga,+Karnataka+577201"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <MapPin className="w-4 h-4" />
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT — CALL & WHATSAPP ONLY
      ═══════════════════════════════════════════ */}
      <section id="contact-section" className="py-28 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-eyebrow">Get Help Right Now</span>
            <h2 className="font-barlow font-extrabold text-5xl sm:text-6xl text-dark tracking-tight mt-3 mb-4 uppercase">
              Contact <span className="text-primary">Us</span>
            </h2>
            <hr className="divider-fire w-24 mx-auto mb-6" />
            <p className="text-gray-500 text-base font-light max-w-lg mx-auto">
              The fastest way to reach us — call or WhatsApp with your current location.
            </p>
          </div>

          {/* Two big CTA cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <a href={`tel:${PHONE}`} className="cta-card-red rounded-3xl p-10 flex flex-col items-center text-center gap-5 text-white cursor-pointer group">
              <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <PhoneCall className="w-10 h-10 animate-phone-ring" />
              </div>
              <div>
                <p className="text-white/60 text-xs font-barlow font-bold tracking-widest uppercase mb-2">Tap to Call Now</p>
                <p className="font-barlow font-extrabold text-4xl tracking-tight">{PHONE_DISPLAY}</p>
                <p className="font-barlow font-extrabold text-2xl tracking-tight text-white/80 mt-1">{ALT_PHONE_DISPLAY}</p>
                <p className="text-white/60 text-sm font-light mt-2">24 hours · 7 days a week</p>
              </div>
            </a>

            <a
              href={`${WA_BASE}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-card-green rounded-3xl p-10 flex flex-col items-center text-center gap-5 text-white cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-10 h-10" />
              </div>
              <div>
                <p className="text-white/60 text-xs font-barlow font-bold tracking-widest uppercase mb-2">WhatsApp Message</p>
                <p className="font-barlow font-extrabold text-4xl tracking-tight">WhatsApp Us</p>
                <p className="text-white/60 text-sm font-light mt-2">Send your location for faster dispatch</p>
              </div>
            </a>
          </div>

          {/* Smart GPS Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 mb-8">
            <div className="text-center mb-6">
              <h3 className="font-barlow font-bold text-2xl text-dark uppercase tracking-wide mb-2">
                📍 Share Your Location via WhatsApp
              </h3>
              <p className="text-gray-500 text-sm font-light">
                Tap <strong>Detect My Location</strong> — we'll auto-fill your address into the WhatsApp message for faster dispatch.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm min-h-[50px] flex items-center">
                {detectedAddress
                  ? <span className="text-dark font-medium">{detectedAddress}</span>
                  : <span className="text-gray-400 font-light">Your location will appear here...</span>
                }
              </div>
              <button
                onClick={handleDetectLocation}
                disabled={detectingLocation}
                className="bg-primary/8 hover:bg-primary/15 text-primary border border-primary/25 px-5 py-3 rounded-xl font-poppins font-bold text-sm tracking-wide transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Navigation2 className={`w-4 h-4 ${detectingLocation ? 'animate-spin' : 'animate-pulse'}`} />
                <span>{detectingLocation ? 'Detecting...' : 'Detect My Location'}</span>
              </button>
            </div>
            {detectedAddress && (
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                href={`${WA_BASE}?text=${encodeURIComponent(waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center mt-5 py-4 rounded-xl text-sm"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Open WhatsApp with My Location</span>
              </motion.a>
            )}
          </div>

          {/* Business Info strip */}
          <div className="card-dark p-7 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            {[
              { icon: <Phone className="w-5 h-5 text-primary" />, label: "Emergency Call", value: `${PHONE_DISPLAY} / ${ALT_PHONE_DISPLAY}`, href: `tel:${PHONE}` },
              { icon: <MapPin className="w-5 h-5 text-primary" />, label: "Address", value: "Mallari Complex, Sagar Road, Sharavathi Nagar, Hosamane, Shivamogga — 577201" },
              { icon: <Clock className="w-5 h-5 text-primary" />, label: "Working Hours", value: "Open 24 Hours · 7 Days" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-gray-500 text-xs font-barlow font-bold uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-white font-semibold hover:text-primary transition-colors">{item.value}</a>
                    : <p className="text-gray-300 font-light leading-relaxed">{item.value}</p>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
