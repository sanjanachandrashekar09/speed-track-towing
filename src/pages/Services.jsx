import { motion } from 'framer-motion';
import {
  Phone, AlertTriangle, MessageSquare,
  Wrench, Lock, Truck, Zap, ChevronRight, ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import TowTruckLogo from '../components/TowTruckLogo';

const PHONE = '+917899916161';
const ALT_PHONE_DISPLAY = '+91 98801 66968';

export default function Services() {
  const servicesList = [
    {
      title: "Towing",
      icon: <TowTruckLogo className="w-10 h-5 text-white" />,
      image: "/hero_tow_truck.png",
      description: "24 Hour and Holiday towing across the greater metropolitan area",
      accentColor: "#DC2626",
      items: [
        { name: "Emergency Towing" },
        { name: "Car towing" },
        { name: "Motorcycle towing" },
        { name: "Special vehicle towing" },
        { name: "Flatbed towing" },
        { name: "Local haulage" },
        { name: "Long distance haulage" },
        { name: "24/7 Towing Service" }
      ]
    },
    {
      title: "Roadside Assistance",
      icon: <Wrench className="w-8 h-8" />,
      image: "/bike_towing.png",
      description: "24 Hour and Holiday assistance throughout the greater metropolitan area",
      accentColor: "#F59E0B",
      items: [
        { name: "Car lockouts" },
        { name: "Tyre change" },
        { name: "Fuel delivery" },
        { name: "Jump Start Service" },
        { name: "Car battery service 24hrs" },
        { name: "Battery service" },
        { name: "24/7 Roadside Assistance" },
        { name: "24/7 Emergency Assistance" }
      ]
    },
    {
      title: "Accident Recovery",
      icon: <AlertTriangle className="w-8 h-8" />,
      image: "/accident_recovery.png",
      description: "24 Hour and Holiday Accident Recovery",
      accentColor: "#EF4444",
      items: [
        { name: "Accident car towing" },
        { name: "Car Breakdown" }
      ]
    },
    {
      title: "Light On-site Mechanics",
      icon: <Zap className="w-8 h-8" />,
      image: "/light_mechanic.png",
      description: "24 Hour and Holiday light mechanical work at site",
      accentColor: "#3B82F6",
      items: [
        { name: "Car repair and service" },
        { name: "Minor Repairs" },
        { name: "Body Work" },
        { name: "Mechanical" }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Our Services"
        description="Comprehensive 24/7 towing, roadside assistance, accident recovery, and on-site mechanics services in Shivamogga."
      />

      {/* ── Hero ── */}
      <section className="relative bg-dark text-white pt-40 pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/hero_tow_truck.png')`, filter: 'brightness(0.2) saturate(0.6)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-eyebrow block mb-4">Professional Solutions</span>
            <h1 className="font-barlow font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tight uppercase mb-5">
              Towing &amp; <span className="text-primary">Assistance</span>
            </h1>
            <hr className="divider-fire w-24 mb-6" />
            <p className="text-gray-300 max-w-2xl text-lg font-light leading-relaxed">
              We operate an advanced fleet of flatbeds, wheel lifts, and recovery equipment ready to assist you in any breakdown scenario — day or night.
            </p>
          </motion.div>
        </div>

        {/* Diagonal bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {servicesList.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-400 group"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? '' : ''}`}>

                  {/* Image */}
                  <div className={`relative aspect-[16/9] lg:aspect-auto lg:min-h-[360px] overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Icon badge — consistent red throughout */}
                    <div className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl animate-pulse-glow">
                      {service.icon}
                    </div>
                    {/* 24/7 chip */}
                    <div className="absolute bottom-5 left-6 bg-dark/85 backdrop-blur-sm text-white text-xs font-barlow font-bold tracking-widest uppercase px-4 py-2 rounded-full border border-white/10">
                      24/7 Available
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-10 lg:p-14 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {/* Accent bar */}
                    <div className="w-10 h-1 rounded-full mb-5" style={{ background: service.accentColor }} />
                    <h2 className="font-barlow font-extrabold text-4xl text-dark uppercase tracking-tight mb-3">
                      {service.title}
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed font-light mb-8">
                      {service.description}
                    </p>

                    {/* Services */}
                    <div className="mb-8">
                      <h3 className="font-barlow font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Included Services</h3>
                      <div className="space-y-3">
                        {service.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:border-primary/30 hover:bg-primary/3 transition-all duration-200"
                          >
                            <span className="font-poppins font-semibold text-dark text-sm">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`tel:${PHONE}`}
                        className="btn-primary flex-1 justify-center"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Dispatch</span>
                      </a>
                      <a
                        href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Hello Speed Track, I need assistance with ${service.title}. Please help.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp flex-1 justify-center"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp Us</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-3xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-dark" />
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative z-10 p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="font-barlow font-extrabold text-4xl text-white uppercase tracking-tight">Need Immediate Help?</h3>
                <p className="text-white/70 mt-2 font-light">Don't wait — our dispatch is active 24 hours, every day.</p>
              </div>
              <a
                href={`tel:${PHONE}`}
                className="flex flex-col items-center justify-center gap-1 bg-white text-primary font-poppins font-extrabold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:bg-accent hover:text-dark transition-all duration-300 animate-pulse-glow whitespace-nowrap"
              >
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 animate-phone-ring" />
                  <span>+91 78999 16161</span>
                </div>
                <span className="text-sm font-semibold opacity-90 text-dark/70">{ALT_PHONE_DISPLAY}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
