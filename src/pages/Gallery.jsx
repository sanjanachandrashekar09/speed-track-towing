import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera, Loader2, ChevronLeft, ChevronRight, Upload, CheckCircle, Image, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';

const CLOUD_NAME = 'bxua4hmb';
const UPLOAD_PRESET = 'gallery_unsigned';
const TAG = 'gallery';
const LOCAL_KEY = 'gallery_local_photos';

function getLocalPhotos() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); }
  catch { return []; }
}
function saveLocalPhoto(photo) {
  const existing = getLocalPhotos();
  const already = existing.find(p => p.public_id === photo.public_id);
  if (!already) {
    existing.unshift(photo);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(existing.slice(0, 200)));
  }
}

function getUrl(publicId, opts = '') {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${opts}${publicId}`;
}

async function uploadToCloudinary(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('tags', TAG);
  formData.append('folder', 'gallery');

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        // Save to localStorage so it appears immediately in gallery
        saveLocalPhoto({
          public_id: data.public_id,
          secure_url: data.secure_url,
          created_at: data.created_at || new Date().toISOString(),
        });
        resolve(data);
      } else reject(new Error('Upload failed'));
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send(formData);
  });
}

const SkeletonCard = () => (
  <div className="rounded-2xl bg-dark-2 border border-gray-800 overflow-hidden animate-pulse">
    <div className="aspect-[4/3] bg-gray-800" />
  </div>
);

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState([]); // {file, status, progress}
  const fileInputRef = useRef();

  const fetchImages = useCallback(() => {
    setLoading(true);
    // Always load local photos first for instant display
    const local = getLocalPhotos();

    fetch(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG}.json`)
      .then(r => {
        if (!r.ok) return { resources: [] };
        return r.json();
      })
      .then(data => {
        const cloudPhotos = data.resources || [];
        // Save any cloud photos to local too
        cloudPhotos.forEach(img => saveLocalPhoto({
          public_id: img.public_id,
          secure_url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${img.public_id}`,
          created_at: img.created_at,
        }));
        // Merge: cloud takes priority, fill rest from local
        const cloudIds = new Set(cloudPhotos.map(i => i.public_id));
        const localOnly = getLocalPhotos().filter(i => !cloudIds.has(i.public_id));
        const merged = [
          ...cloudPhotos.map(img => ({ public_id: img.public_id, created_at: img.created_at })),
          ...localOnly,
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setImages(merged);
        setLoading(false);
      })
      .catch(() => {
        // Cloudinary list failed - fall back to local only
        setImages(local.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        setLoading(false);
      });
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  // Auto-refresh after uploads complete
  useEffect(() => {
    if (uploads.some(u => u.status === 'done')) {
      const timer = setTimeout(() => {
        fetchImages();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [uploads, fetchImages]);

  const processFiles = useCallback(async (files) => {
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!validFiles.length) return;

    const newUploads = validFiles.map(file => ({ file, status: 'uploading', progress: 0 }));
    setUploads(prev => [...newUploads, ...prev]);

    for (const file of validFiles) {
      try {
        await uploadToCloudinary(file, (progress) => {
          setUploads(prev => prev.map(u => u.file === file ? { ...u, progress } : u));
        });
        setUploads(prev => prev.map(u => u.file === file ? { ...u, status: 'done', progress: 100 } : u));
      } catch {
        setUploads(prev => prev.map(u => u.file === file ? { ...u, status: 'error' } : u));
      }
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const closeLightbox = () => setLightbox(null);
  const prevImage = useCallback(() => setLightbox(i => (i > 0 ? i - 1 : images.length - 1)), [images.length]);
  const nextImage = useCallback(() => setLightbox(i => (i < images.length - 1 ? i + 1 : 0)), [images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, prevImage, nextImage]);

  return (
    <>
      <SEO
        title="Gallery | Speed Track Towing Service"
        description="View photos of our professional towing, roadside assistance, and accident recovery work in Shivamogga, Karnataka."
      />

      {/* ── Hero ── */}
      <section className="relative bg-dark text-white pt-40 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/hero_tow_truck.png')`, filter: 'brightness(0.18) saturate(0.5)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/8 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Camera className="w-10 h-10 text-primary mx-auto mb-4" />
            <span className="section-eyebrow block mb-4">Our Work</span>
            <h1 className="font-barlow font-extrabold text-5xl sm:text-6xl text-white tracking-tight mt-3 mb-5 uppercase">
              Photo <span className="text-primary">Gallery</span>
            </h1>
            <hr className="divider-fire w-24 mx-auto mb-6" />
            <p className="text-gray-300 max-w-xl mx-auto text-lg font-light leading-relaxed">
              A glimpse into our professional operations — from complex accident recoveries to everyday roadside assistance across Karnataka.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ── Upload Section ── */}
      <section className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <span className="section-eyebrow">Share Your Experience</span>
              <h2 className="font-barlow font-extrabold text-3xl text-dark uppercase tracking-tight mt-2">
                Upload a <span className="text-primary">Photo</span>
              </h2>
              <p className="text-gray-500 font-poppins text-sm mt-2">Share photos of our service to help others in the community!</p>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
                dragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-gray-300 hover:border-primary hover:bg-primary/3 bg-white'
              }`}
            >
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
                onChange={e => processFiles(e.target.files)} />
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${dragging ? 'bg-primary/15' : 'bg-gray-100'}`}>
                {dragging ? <Upload className="w-7 h-7 text-primary" /> : <Image className="w-7 h-7 text-gray-400" />}
              </div>
              <p className="font-barlow font-bold text-lg text-dark uppercase tracking-wide mb-1">
                {dragging ? 'Drop to Upload' : 'Drag & Drop or Click to Upload'}
              </p>
              <p className="text-gray-400 font-poppins text-xs">JPG, PNG, WEBP · Max 10 MB</p>
            </div>

            {/* Upload Progress */}
            {uploads.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploads.slice(0, 5).map((u, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
                    <div className="shrink-0">
                      {u.status === 'uploading' && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                      {u.status === 'done' && <CheckCircle className="w-4 h-4 text-[#16a34a]" />}
                      {u.status === 'error' && <X className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-poppins text-sm text-dark truncate">{u.file.name}</p>
                      {u.status === 'uploading' && (
                        <div className="bg-gray-100 rounded-full h-1 mt-1 overflow-hidden">
                          <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${u.progress}%` }} />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-poppins text-gray-400 shrink-0">
                      {u.status === 'done' && '✓ Done'}
                      {u.status === 'error' && '✗ Failed'}
                      {u.status === 'uploading' && `${u.progress}%`}
                    </span>
                  </div>
                ))}
                {uploads.some(u => u.status === 'done') && (
                  <div className="p-3 bg-[#16a34a]/8 border border-[#16a34a]/20 rounded-xl text-center">
                    <p className="text-[#16a34a] font-poppins text-sm font-semibold">
                      ✓ Photo uploaded! Refreshing gallery...
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-barlow font-bold text-2xl text-dark uppercase tracking-tight">
              All Photos <span className="text-primary">({images.length})</span>
            </h2>
            <button onClick={fetchImages}
              className="flex items-center gap-2 text-gray-500 hover:text-dark font-poppins text-sm transition-colors">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && images.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-barlow font-bold text-2xl text-dark uppercase mb-2">No Photos Yet</h3>
              <p className="text-gray-500 font-poppins text-sm">Be the first to upload a photo above!</p>
            </div>
          )}

          {!loading && images.length > 0 && (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
              {images.map((img, idx) => (
                <motion.div key={img.public_id}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5 }}
                  className="group relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-dark-2 cursor-pointer"
                  onClick={() => setLightbox(idx)}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={getUrl(img.public_id, 'q_auto,f_auto,w_600/')}
                      alt={`Gallery photo ${idx + 1}`} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}>
            <button onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
              <X className="w-5 h-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.img key={lightbox} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              src={getUrl(images[lightbox]?.public_id, 'q_auto,f_auto,w_1200/')}
              alt="Gallery full view"
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} />
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-5 text-white/60 font-poppins text-sm">
              {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
