import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Loader2, CheckCircle } from 'lucide-react';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', review: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a star rating");
      return;
    }
    
    setStatus('loading');
    
    // Simulate network request (to be replaced with actual EmailJS or backend integration)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', review: '' });
      setRating(0);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-16"
    >
      <div className="p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="section-eyebrow block mb-3">Share Your Experience</span>
          <h3 className="font-barlow font-bold text-3xl sm:text-4xl text-dark uppercase tracking-tight mb-4">
            Drop a <span className="text-primary">Review</span>
          </h3>
          <p className="text-gray-500 font-poppins text-sm leading-relaxed">
            Your feedback helps us improve our services and helps other drivers in Shivamogga know who to trust during an emergency.
          </p>
        </div>

        {status === 'success' ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-2xl border border-gray-100"
          >
            <div className="w-16 h-16 bg-[#16a34a]/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-[#16a34a]" />
            </div>
            <h4 className="font-barlow font-bold text-2xl text-dark mb-2 uppercase">Thank You!</h4>
            <p className="text-gray-500 font-poppins text-sm max-w-sm">
              We appreciate you taking the time to share your experience with Speed Track Towing.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 text-primary font-poppins font-semibold text-sm hover:underline"
            >
              Submit another review
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col items-center mb-8">
              <label className="font-barlow font-bold text-dark uppercase tracking-wider text-sm mb-3">
                Rate Our Service <span className="text-primary">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-10 h-10 transition-colors duration-200 ${
                        star <= (hoveredRating || rating) 
                          ? 'fill-accent text-accent' 
                          : 'fill-transparent text-gray-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-poppins font-medium text-dark mb-2">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-poppins font-medium text-dark mb-2">
                  Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-poppins font-medium text-dark mb-2">
                Your Review <span className="text-primary">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.review}
                onChange={(e) => setFormData({...formData, review: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                placeholder="Tell us about how we helped you..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary hover:bg-primary-hover text-white font-poppins font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Review...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Review</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 font-poppins mt-3">
              By submitting, you agree to let us use your feedback on our website.
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}
