import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, MapPin, Clock, MessageSquare, PhoneCall, Navigation2,
  Shield, Star, CheckCircle, Award
} from 'lucide-react';
import SEO from '../components/SEO';

const PHONE = '+917899916161';
const PHONE_DISPLAY = '+91 78999 16161';
const WA_BASE = `https://wa.me/${PHONE}`;

export default function Contact() {
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

  return (
    <>
      <SEO
        title="Contact Us | 24/7 Dispatch Hotline"
        description="Contact Speed Track Towing Service in Shivamogga. Call or WhatsApp us 24/7 for immediate towing and roadside assistance."
      />

      {/* ── Hero ── */}
      <section className="relative bg-dark text-white pt-40 pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/hero_tow_truck.png')`, filter: 'brightness(0.18) saturate(0.6)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        {/* Red radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-eyebrow block mb-4">We're Here for You</span>
            <h1 className="font-barlow font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tight uppercase mb-5">
              Get <span className="text-primary">Help Now</span>
            </h1>
            <hr className="divider-fire w-24 mx-auto mb-6" />
            <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Our 24/7 dispatch team is standing by. Whether you need a tow or emergency roadside help — one call is all it takes.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ── Main CTA Cards ── */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Two Big Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.a
              href={`tel:${PHONE}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="cta-card-red rounded-3xl p-12 flex flex-col items-center text-center gap-6 text-white cursor-pointer group"
            >
              <div className="w-24 h-24 rounded-3xl bg-white/15 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-inner">
                <PhoneCall className="w-12 h-12 animate-phone-ring" />
              </div>
              <div>
                <p className="text-white/60 text-xs font-barlow font-bold tracking-widest uppercase mb-3">Tap to Call Now</p>
                <p className="font-barlow font-extrabold text-4xl sm:text-5xl tracking-tight">{PHONE_DISPLAY}</p>
                <p className="text-white/60 text-sm font-light mt-3">24 hours · 7 days a week</p>
              </div>
              <span className="mt-2 text-xs font-barlow font-bold tracking-widest uppercase text-white/40 border border-white/15 px-4 py-1.5 rounded-full">
                Fastest Response
              </span>
            </motion.a>

            <motion.a
              href={`${WA_BASE}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="cta-card-green rounded-3xl p-12 flex flex-col items-center text-center gap-6 text-white cursor-pointer group"
            >
              <div className="w-24 h-24 rounded-3xl bg-white/15 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-inner">
                <MessageSquare className="w-12 h-12" />
              </div>
              <div>
                <p className="text-white/60 text-xs font-barlow font-bold tracking-widest uppercase mb-3">WhatsApp Message</p>
                <p className="font-barlow font-extrabold text-4xl sm:text-5xl tracking-tight">WhatsApp Us</p>
                <p className="text-white/60 text-sm font-light mt-3">Send location for faster dispatch</p>
              </div>
              <span className="mt-2 text-xs font-barlow font-bold tracking-widest uppercase text-white/40 border border-white/15 px-4 py-1.5 rounded-full">
                Share Your Location
              </span>
            </motion.a>
          </div>

          {/* GPS Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 mb-8"
          >
            <div className="flex items-start gap-5 mb-7">
              <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/15 text-primary flex items-center justify-center shrink-0">
                <Navigation2 className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-barlow font-extrabold text-2xl text-dark uppercase tracking-wide mb-1">
                  Share Location via WhatsApp
                </h2>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  Tap <strong className="text-dark font-semibold">Detect My Location</strong> — your address is auto-filled into the WhatsApp message so our driver reaches you faster.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm min-h-[52px] flex items-center">
                {detectedAddress
                  ? <span className="text-dark font-medium">{detectedAddress}</span>
                  : <span className="text-gray-400 font-light">Your location will appear here...</span>
                }
              </div>
              <button
                onClick={handleDetectLocation}
                disabled={detectingLocation}
                className="bg-dark hover:bg-dark-2 text-white px-6 py-4 rounded-xl font-poppins font-bold text-sm tracking-wide transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-lg"
              >
                <Navigation2 className={`w-4 h-4 ${detectingLocation ? 'animate-spin' : ''}`} />
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
          </motion.div>

          {/* Business Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card-dark rounded-3xl p-8 sm:p-10 mb-8"
          >
            <h3 className="font-barlow font-extrabold text-xl text-white uppercase tracking-wide mb-7 border-b border-white/8 pb-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-white" />
              </div>
              Speed Track Towing Service
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { icon: <Phone className="w-5 h-5 text-primary" />, label: "Emergency Call", content: <a href={`tel:${PHONE}`} className="text-white font-semibold hover:text-primary transition-colors font-poppins">{PHONE_DISPLAY}</a> },
                { icon: <MapPin className="w-5 h-5 text-primary" />, label: "Address", content: <p className="text-gray-300 font-light text-sm leading-relaxed">Mallari Complex, Sagar Road, Sharavathi Nagar, Hosamane, Shivamogga, Karnataka — 577201</p> },
                { icon: <Clock className="w-5 h-5 text-primary" />, label: "Business Hours", content: <><p className="text-white font-semibold font-poppins">Open 24 Hours</p><p className="text-gray-400 font-light text-xs mt-0.5">7 Days a Week · No Holidays</p></> },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-barlow font-bold uppercase tracking-widest mb-1.5">{item.label}</p>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: <Clock className="w-5 h-5" />, label: "Open 24/7", sub: "No holidays" },
              { icon: <CheckCircle className="w-5 h-5" />, label: "Fast Dispatch", sub: "Swift response" },
              { icon: <Star className="w-5 h-5" />, label: "5-Star Rated", sub: "On Google" },
              { icon: <Award className="w-5 h-5" />, label: "5+ Years", sub: "Field expertise" },
            ].map((f, i) => (
              <div key={i} className="card-premium p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/8 text-primary flex items-center justify-center mx-auto mb-3">
                  {f.icon}
                </div>
                <p className="font-barlow font-bold text-sm text-dark uppercase tracking-wide">{f.label}</p>
                <p className="text-gray-400 text-xs mt-1">{f.sub}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Map */}
      <div className="w-full h-96 border-t border-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3880.6762831099407!2d75.5676!3d13.9299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba079b3b73989%3A0x60e76eef143d5ab!2sShivamogga%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Speed Track Towing Service - Shivamogga Station Map"
        />
      </div>


    </>
  );
}
