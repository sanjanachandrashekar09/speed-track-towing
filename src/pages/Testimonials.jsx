import { motion } from 'framer-motion';
import { Star, CheckCircle, ExternalLink, PenTool, Clock, Shield, Award, Phone, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

const PHONE = '+917899916161';
const WA_BASE = `https://wa.me/${PHONE}`;
const GOOGLE_MAPS = 'https://www.google.com/maps/place/Mallari+Complex,+Sagar+Rd,+Sharavathi+Nagar,+Hosamane,+Shivamogga,+Karnataka+577201';

export default function Testimonials() {
  const ratingBars = [
    { stars: 5, pct: '96%' },
    { stars: 4, pct: '4%' },
    { stars: 3, pct: '0%' },
    { stars: 2, pct: '0%' },
    { stars: 1, pct: '0%' },
  ];

  const trustPoints = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Authentic Experiences Only",
      desc: "In compliance with fair business practices, we do not showcase mock, simulated, or invented reviews on this site. Every testimonial representing our brand comes from a real vehicle operator rescued on Karnataka's road network."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "5+ Years Field Expertise",
      desc: "Whether it's flatbed towing, lockout help, battery replacement, or complex accident recovery, our experienced highway field technicians guarantee damage-free assistance."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Fully Licensed & Insured",
      desc: "Speed Track Towing is fully certified and insured, giving you complete peace of mind when you hand us your vehicle in a stressful situation."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Transparent Pricing",
      desc: "We believe in honest, upfront rates. No hidden charges, no surprise bills. You are quoted before we begin, so you can focus on getting safe."
    },
  ];

  return (
    <>
      <SEO
        title="Client Reviews & Feedback"
        description="View verified reviews and ratings for Speed Track Towing Service. 24/7 professional vehicle recovery and towing in Shivamogga, Karnataka."
      />

      {/* ── Hero ── */}
      <section className="relative bg-dark text-white pt-40 pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/hero_tow_truck.png')`, filter: 'brightness(0.18) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-accent/8 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex justify-center gap-1.5 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 text-accent fill-current" />
              ))}
            </div>
            <span className="section-eyebrow block mb-4">Customer Feedback</span>
            <h2 className="font-barlow font-extrabold text-5xl sm:text-6xl text-white tracking-tight mt-3 mb-5 uppercase">
              Read Our <span className="text-primary">Reviews</span>
            </h2>
            <hr className="divider-fire w-24 mx-auto mb-6" />
            <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              We value honest feedback above all else. Verified customer ratings on Google Maps reflect our commitment to excellence.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ── Review Dashboard ── */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Rating block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8"
          >
            {/* Red accent top bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary to-accent" />

            <div className="p-10 sm:p-14">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12 pb-12 border-b border-gray-100">
                {/* Score */}
                <div className="text-center md:text-left">
                  <p className="section-eyebrow mb-4">Google Business Rating</p>
                  <div className="flex items-baseline justify-center md:justify-start gap-3 mb-4">
                    <span className="font-barlow font-extrabold text-8xl text-dark leading-none">4.9</span>
                    <div>
                      <span className="text-2xl text-gray-300 font-poppins">/ 5.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-1.5 text-accent mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-7 h-7 fill-current" />)}
                  </div>
                  <p className="text-xs text-gray-400 font-poppins">Based on verified customer submissions across Karnataka</p>
                </div>

                {/* Bars */}
                <div className="space-y-3">
                  {ratingBars.map((bar, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <span className="w-2 text-right font-barlow font-bold text-dark">{bar.stars}</span>
                      <Star className="w-4 h-4 text-accent fill-current shrink-0" />
                      <div className="flex-grow bg-gray-100 h-3 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: bar.pct }}
                          transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                          className="bg-gradient-to-r from-accent to-primary h-full rounded-full"
                        />
                      </div>
                      <span className="w-10 text-right font-barlow font-bold text-dark text-sm">{bar.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why we don't fake reviews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trustPoints.map((tp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:bg-primary/3 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {tp.icon}
                    </div>
                    <div>
                      <h3 className="font-barlow font-bold text-base text-dark uppercase tracking-wide mb-1">{tp.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed font-light">{tp.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-gray-100">
                <a
                  href={GOOGLE_MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 justify-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Google Business Profile</span>
                </a>
                <a
                  href={GOOGLE_MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 justify-center flex items-center gap-2 font-poppins font-semibold text-sm text-dark border border-gray-200 px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Write a Google Review</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Emergency CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark-2 to-steel" />
            <div className="absolute inset-0 bg-grid opacity-15" />
            <div className="relative z-10 p-10 sm:p-12 text-center">
              <h3 className="font-barlow font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight mb-3">
                Need a Tow Right Now?
              </h3>
              <p className="text-gray-400 font-light mb-8 max-w-md mx-auto">
                Don't wait. Our dispatch answers immediately — 24 hours a day, 7 days a week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-poppins font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl animate-pulse-glow transition-all"
                >
                  <Phone className="h-5 w-5 animate-phone-ring" />
                  <span>+91 78999 16161</span>
                </a>
                <a
                  href={`${WA_BASE}?text=Hello%20Speed%20Track%2C%20I%20need%20emergency%20towing%20assistance.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#16a34a] hover:bg-[#15803d] text-white font-poppins font-bold text-base px-8 py-4 rounded-2xl transition-all"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
