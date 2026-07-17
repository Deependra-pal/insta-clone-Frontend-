import React, { useState } from 'react';

const EditProfileModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [profilePicture, setProfilePicture] = useState(initialData?.profilePicture || '');
  const [bio, setBio] = useState(initialData?.bio || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ profilePicture, bio });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 w-full max-w-[480px] rounded-2xl shadow-2xl p-6 sm:p-8 relative transition-all duration-300 transform scale-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 dark:text-zinc-500 hover:text-slate-650 dark:hover:text-zinc-300 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edit Profile</h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Update your profile parameters.</p>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Profile Picture URL Input */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="profilePicture" className="text-sm font-semibold text-slate-700 dark:text-zinc-350">
              Profile Picture URL
            </label>
            <input
              type="url"
              id="profilePicture"
              placeholder="https://example.com/avatar.jpg"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="w-full h-11 px-4 text-sm border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 outline-none focus:ring-4 focus:ring-instagram-light focus:border-instagram dark:focus:border-instagram dark:focus:ring-instagram/10 transition-all placeholder:text-slate-400 text-slate-800 dark:text-zinc-100"
            />
          </div>

          {/* Bio Input */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="bio" className="text-sm font-semibold text-slate-700 dark:text-zinc-350">
              Bio (Max 150 characters)
            </label>
            <textarea
              id="bio"
              rows={4}
              maxLength={150}
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 outline-none focus:ring-4 focus:ring-instagram-light focus:border-instagram dark:focus:border-instagram dark:focus:ring-instagram/10 transition-all placeholder:text-slate-400 text-slate-800 dark:text-zinc-100 resize-none"
            />
            <div className="text-right text-xs text-slate-400 dark:text-zinc-500 font-medium">
              {bio.length}/150
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 border-t border-slate-100 dark:border-zinc-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-sm font-semibold text-slate-600 dark:text-zinc-350 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-instagram hover:bg-instagram-dark text-white text-sm font-semibold shadow-md shadow-blue-500/10 active:scale-[0.99] transition-all cursor-pointer"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
