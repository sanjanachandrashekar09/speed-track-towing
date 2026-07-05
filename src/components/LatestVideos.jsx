import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

export default function LatestVideos() {
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-2 to-dark pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-dark-2 rounded-3xl p-10 md:p-14 text-center border border-gray-800 shadow-2xl relative overflow-hidden group"
        >
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
              <Play className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="font-barlow font-extrabold text-4xl sm:text-5xl uppercase tracking-tight mb-4">
              Watch Us In <span className="text-primary">Action</span>
            </h2>
            
            <p className="text-gray-400 font-poppins text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Check out our YouTube channel to see our professional team handling complex accident recoveries, specialized towing, and behind-the-scenes insights into our day-to-day operations.
            </p>

            <a
              href="https://www.youtube.com/@speedtracktowingserviceshi5375"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-poppins font-bold text-white text-base bg-primary px-8 py-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <Play className="w-5 h-5" />
              <span>Visit Our YouTube Channel</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
