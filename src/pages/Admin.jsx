import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Lock, CheckCircle, Trash2, Loader2, Image, LogOut, Eye, EyeOff, AlertTriangle, X, RefreshCw } from 'lucide-react';

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'SpeedTrack@2024';
const CLOUD_NAME = 'bxua4hmb';
const UPLOAD_PRESET = 'gallery_unsigned';
const TAG = 'gallery';
const HIDDEN_KEY = 'gallery_hidden_ids';
// ────────────────────────────────────────────────────────────────────────────

function getHidden() {
  try { return JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]'); } 
  catch { return []; }
}
function setHidden(ids) {
  localStorage.setItem(HIDDEN_KEY, JSON.stringify(ids));
}

function getUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_400/${publicId}`;
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
      if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
      else reject(new Error('Upload failed'));
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send(formData);
  });
}

function UploadCard({ file, status, progress }) {
  const url = URL.createObjectURL(file);
  return (
    <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl p-3">
      <img src={url} alt={file.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-poppins font-medium text-dark text-sm truncate">{file.name}</p>
        <p className="text-gray-400 text-xs">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
        {status === 'uploading' && (
          <div className="mt-2">
            <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{progress}%</p>
          </div>
        )}
        {status === 'done' && <p className="text-[#16a34a] text-xs font-semibold mt-1">✓ Uploaded</p>}
        {status === 'error' && <p className="text-primary text-xs font-semibold mt-1">✗ Upload failed</p>}
      </div>
      <div className="shrink-0">
        {status === 'uploading' && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
        {status === 'done' && <CheckCircle className="w-5 h-5 text-[#16a34a]" />}
        {status === 'error' && <AlertTriangle className="w-5 h-5 text-primary" />}
      </div>
    </div>
  );
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [hiddenIds, setHiddenIdsState] = useState(getHidden());
  const fileInputRef = useRef();

  const fetchGallery = useCallback(() => {
    setLoadingGallery(true);
    fetch(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG}.json`)
      .then(r => {
        if (!r.ok) return { resources: [] };
        return r.json();
      })
      .then(data => {
        const sorted = (data.resources || []).sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setGalleryImages(sorted);
        setLoadingGallery(false);
      })
      .catch(() => setLoadingGallery(false));
  }, []);

  useEffect(() => {
    if (loggedIn) fetchGallery();
  }, [loggedIn, fetchGallery]);

  // Re-fetch when an upload finishes
  useEffect(() => {
    if (uploads.some(u => u.status === 'done')) {
      const timer = setTimeout(fetchGallery, 1500);
      return () => clearTimeout(timer);
    }
  }, [uploads, fetchGallery]);

  const toggleHide = (publicId) => {
    const current = getHidden();
    const updated = current.includes(publicId)
      ? current.filter(id => id !== publicId)
      : [...current, publicId];
    setHidden(updated);
    setHiddenIdsState(updated);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setWrongPass(false);
    } else {
      setWrongPass(true);
      setPassword('');
    }
  };

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

  // ── Login Screen ────────────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-dark-2 border border-gray-800 rounded-3xl p-10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-barlow font-extrabold text-3xl text-white uppercase tracking-tight mb-2">Admin Access</h1>
            <p className="text-gray-500 text-sm font-poppins">Enter your admin password to manage gallery photos.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Admin password"
                className={`w-full bg-dark border rounded-xl px-4 py-4 text-white font-poppins text-sm focus:outline-none focus:border-primary transition-colors pr-12 ${wrongPass ? 'border-primary' : 'border-gray-700'}`}
                autoFocus
              />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <AnimatePresence>
              {wrongPass && (
                <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-primary text-sm font-poppins text-center">
                  Incorrect password. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
            <button type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-poppins font-bold text-base py-4 rounded-xl transition-all shadow-lg shadow-primary/25">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Admin Dashboard ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-barlow font-extrabold text-4xl text-dark uppercase tracking-tight">
              Gallery <span className="text-primary">Admin</span>
            </h1>
            <p className="text-gray-500 font-poppins text-sm mt-1">Upload and manage your gallery photos</p>
          </div>
          <button onClick={() => { setLoggedIn(false); setUploads([]); }}
            className="flex items-center gap-2 text-gray-500 hover:text-dark font-poppins text-sm transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 mb-8 ${
            dragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-gray-300 hover:border-primary hover:bg-primary/3 bg-white'
          }`}
        >
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
            onChange={e => processFiles(e.target.files)} />
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${dragging ? 'bg-primary/15' : 'bg-gray-100'}`}>
            {dragging ? <Upload className="w-8 h-8 text-primary" /> : <Image className="w-8 h-8 text-gray-400" />}
          </div>
          <p className="font-barlow font-bold text-xl text-dark uppercase tracking-wide mb-2">
            {dragging ? 'Drop to Upload' : 'Drag & Drop Photos Here'}
          </p>
          <p className="text-gray-500 font-poppins text-sm">or <span className="text-primary font-semibold">click to browse</span></p>
          <p className="text-gray-400 text-xs mt-3">JPG, PNG, WEBP · Max 10 MB each</p>
        </div>

        {/* Upload Progress */}
        {uploads.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-barlow font-bold text-lg text-dark uppercase tracking-wide">Recent Uploads</h2>
              {uploads.every(u => u.status !== 'uploading') && (
                <button onClick={() => setUploads([])}
                  className="text-gray-400 hover:text-dark text-sm font-poppins flex items-center gap-1.5 transition-colors">
                  <X className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>
            <div className="space-y-3">
              {uploads.map((u, i) => <UploadCard key={i} {...u} />)}
            </div>
            {uploads.some(u => u.status === 'done') && (
              <div className="mt-4 p-4 bg-[#16a34a]/8 border border-[#16a34a]/20 rounded-xl">
                <p className="text-[#16a34a] font-poppins text-sm font-semibold">
                  ✓ Photos uploaded! Now live on your Gallery page for all visitors.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Manage Gallery Photos */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-barlow font-bold text-lg text-dark uppercase tracking-wide">
              Manage Photos ({galleryImages.filter(img => !hiddenIds.includes(img.public_id)).length} visible)
            </h2>
            <button onClick={fetchGallery}
              className="flex items-center gap-2 text-gray-500 hover:text-dark font-poppins text-sm transition-colors">
              <RefreshCw className={`w-4 h-4 ${loadingGallery ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {loadingGallery && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          )}

          {!loadingGallery && galleryImages.length === 0 && (
            <div className="text-center py-12">
              <Image className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-barlow font-bold text-dark uppercase text-lg">No Photos Yet</p>
              <p className="text-gray-400 text-sm font-poppins mt-1">Upload photos above to get started.</p>
            </div>
          )}

          {!loadingGallery && galleryImages.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galleryImages.map((img) => {
                  const isHidden = hiddenIds.includes(img.public_id);
                  return (
                    <div key={img.public_id} className={`relative group rounded-xl overflow-hidden border-2 transition-all ${isHidden ? 'border-primary/40 opacity-50' : 'border-transparent'}`}>
                      <div className="aspect-square">
                        <img
                          src={getUrl(img.public_id)}
                          alt="Gallery"
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => toggleHide(img.public_id)}
                          className={`opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-poppins font-bold ${
                            isHidden
                              ? 'bg-[#16a34a] text-white hover:bg-[#15803d]'
                              : 'bg-primary text-white hover:bg-primary-hover'
                          }`}
                        >
                          {isHidden ? (
                            <><Eye className="w-3.5 h-3.5" /> Show</>
                          ) : (
                            <><Trash2 className="w-3.5 h-3.5" /> Hide</>
                          )}
                        </button>
                      </div>
                      {isHidden && (
                        <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded font-poppins uppercase tracking-wider">
                          Hidden
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-700 font-poppins text-xs leading-relaxed">
                  <strong>ℹ️ How hiding works:</strong> Hiding a photo removes it from the public gallery on your device. To permanently delete a photo from Cloudinary storage, visit your{' '}
                  <a href="https://console.cloudinary.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Cloudinary Dashboard</a>.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
