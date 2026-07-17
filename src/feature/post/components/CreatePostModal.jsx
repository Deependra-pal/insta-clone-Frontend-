import React, { useState, useRef } from 'react';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setLoading(true);

    onPostCreated({
      file: selectedFile,
      caption,
    });
    // Modal closure and reset are handled by the parent reload/state sync
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 w-full max-w-[550px] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900 sticky top-0">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create New Post</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 dark:text-zinc-500 hover:text-slate-650 dark:hover:text-zinc-300 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto flex flex-col p-6 space-y-6">
          
          {/* Image Upload Area */}
          {!imagePreview ? (
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 min-h-[220px] border-2 border-dashed border-slate-250 dark:border-zinc-700 rounded-xl hover:border-instagram dark:hover:border-instagram flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-zinc-950 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 dark:text-zinc-550 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-semibold text-slate-700 dark:text-zinc-350">
                Drag and drop photos here
              </p>
              <p className="text-xs text-slate-450 dark:text-zinc-500 mt-1">
                Supports JPEG, PNG, WEBP (Max 5MB)
              </p>
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative aspect-square w-full bg-slate-100 dark:bg-zinc-950 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800">
              <img 
                src={imagePreview} 
                alt="Upload preview" 
                className="w-full h-full object-cover"
              />
              <button 
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full shadow transition-colors cursor-pointer"
                title="Remove image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}

          {/* Caption Area */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="caption" className="text-sm font-semibold text-slate-700 dark:text-zinc-350">
              Caption
            </label>
            <textarea
              id="caption"
              rows={3}
              maxLength={500}
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 outline-none focus:ring-4 focus:ring-instagram-light focus:border-instagram dark:focus:border-instagram dark:focus:ring-instagram/10 transition-all placeholder:text-slate-400 text-slate-800 dark:text-zinc-100 resize-none"
            />
            <div className="text-right text-xs text-slate-400 dark:text-zinc-500 font-medium">
              {caption.length}/500
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 border-t border-slate-100 dark:border-zinc-800 pt-4 bg-white dark:bg-zinc-900 sticky bottom-0">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-sm font-semibold text-slate-650 dark:text-zinc-350 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!imagePreview || loading}
              className="px-5 py-2.5 rounded-xl bg-instagram hover:bg-instagram-dark text-white text-sm font-semibold shadow-md shadow-blue-500/10 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : 'Share'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
