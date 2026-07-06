import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, HelpCircle, Phone } from 'lucide-react';
import SEO from '../components/SEO';

const faqs = [
  {
    q: "How quickly can you reach me in Shivamogga?",
    a: "Our dispatch team operates 24/7. Depending on traffic and your exact location in or around Shivamogga, our typical arrival time is between 15 to 30 minutes. When you share your live location via WhatsApp, we can give you a precise ETA."
  },
  {
    q: "Do you offer services on public holidays and late at night?",
    a: "Yes. Breakdowns don't wait for business hours, and neither do we. We operate 24 hours a day, 7 days a week, 365 days a year, including all major holidays and late-night hours."
  },
  {
    q: "What types of vehicles can you tow?",
    a: "Our versatile fleet includes flatbeds and wheel-lift trucks, allowing us to safely transport motorcycles, sedans, SUVs, and light commercial vehicles without causing any damage."
  },
  {
    q: "How much do your towing services cost?",
    a: "Pricing depends on the service required, vehicle type, and towing distance. We guarantee transparent, upfront pricing before we dispatch a truck — no hidden fees. Contact us for a direct quote."
  },
  {
    q: "I've had an accident. Can you recover my vehicle?",
    a: "Absolutely. We specialize in accident recovery. We will safely retrieve your vehicle and can transport it to a secure storage facility, a repair shop, or any destination of your choice."
  },

];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <SEO 
        title="Frequently Asked Questions | Speed Track Towing" 
        description="Find answers to common questions about our 24/7 towing and roadside assistance services in Shivamogga."
      />
      
      {/* ── Hero ── */}
      <section className="relative bg-dark text-white pt-40 pb-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('/hero_tow_truck.png')`, filter: 'brightness(0.2) saturate(0.6)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl border border-primary/20 text-primary flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse-glow">
              <HelpCircle className="w-8 h-8" />
            </div>
            <span className="section-eyebrow block mb-4">Knowledge Base</span>
            <h1 className="font-barlow font-extrabold text-5xl sm:text-7xl tracking-tight uppercase mb-5">
              Frequently <span className="text-primary">Asked</span>
            </h1>
            <hr className="divider-fire w-24 mx-auto mb-6" />
            <p className="text-gray-300 text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about our towing, pricing, and emergency recovery operations.
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-gray-200 shadow-sm hover:border-primary/30 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-barlow font-bold text-xl text-dark tracking-wide pr-8 uppercase">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180 shadow-md' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="h-px w-full bg-gradient-to-r from-gray-100 via-gray-200 to-transparent mb-4" />
                          <p className="text-gray-600 font-light leading-relaxed font-poppins text-sm">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Need More Help CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 p-8 sm:p-12 card-dark rounded-3xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="font-barlow font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight mb-3">Still have questions?</h3>
              <p className="text-gray-400 font-light mb-8 font-poppins text-sm">Our dispatch team is available 24/7 to answer your calls and messages.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+917899916161"
                  className="flex flex-col items-center justify-center gap-1 bg-primary hover:bg-primary-dark text-white font-poppins font-extrabold text-base px-8 py-3 rounded-xl shadow-xl animate-pulse-glow transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 animate-phone-ring" />
                    <span>Call Now</span>
                  </div>
                  <span className="text-[11px] font-semibold opacity-90 tracking-wider">+91 98801 66968</span>
                </a>
                <a
                  href="https://wa.me/917899916161?text=Hello%2C%20I%20have%20a%20question%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#16a34a] hover:bg-[#15803d] text-white font-poppins font-bold text-base px-8 py-4 rounded-xl transition-all shadow-xl"
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
