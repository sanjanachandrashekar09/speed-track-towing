import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist. Return to Speed Track Towing Service home page." 
      />

      <section className="min-h-screen bg-dark text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 border border-primary/20 text-primary rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
            <AlertCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl font-poppins font-extrabold text-white">404</h1>
            <h2 className="text-xl font-poppins font-bold text-gray-300">Off Track!</h2>
            <p className="text-gray-400 font-light text-sm">
              The page you are looking for has been moved or doesn't exist. Let's get your journey back on speed track.
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-poppins font-bold text-sm tracking-wide shadow-lg transition-colors mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
