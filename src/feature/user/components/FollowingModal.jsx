import React, { useState, useEffect } from 'react';

const FollowingModal = ({ isOpen, onClose, userId, fetchFollowing }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userId && fetchFollowing) {
      const load = async () => {
        setLoading(true);
        try {
          const res = await fetchFollowing(userId);
          setList(res);
        } catch (err) {
          console.error("Failed to load following list:", err);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [isOpen, userId, fetchFollowing]);

  if (!isOpen) return null;

  const getAvatarUrl = (url) => {
    if (!url || url.includes('imagekit.io/dashboard') || url.trim() === '') {
      return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
    }
    return url;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
      <div className="bg-white dark:bg-black border border-[#dbdbdb] dark:border-[#262626] w-full max-w-[400px] rounded-lg shadow-2xl p-6 relative transition-all duration-300 transform scale-100 flex flex-col max-h-[80vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 dark:text-zinc-555 hover:text-slate-650 dark:hover:text-zinc-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="mb-4 pb-3 border-b border-[#dbdbdb] dark:border-[#262626]">
          <h3 className="text-lg font-bold text-center text-[#262626] dark:text-[#f5f5f5]">Following</h3>
        </div>

        {/* Following List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-slate-500"></div>
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm font-normal">
              Not following anyone yet.
            </div>
          ) : (
            list.map((following) => (
              <div key={following._id} className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-3.5">
                  <img 
                    src={getAvatarUrl(following.profilePicture)} 
                    alt={following.username} 
                    className="h-10 w-10 rounded-full object-cover border border-[#dbdbdb] dark:border-[#262626]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#262626] dark:text-[#f5f5f5]">
                      {following.username}
                    </h4>
                    {following.bio && (
                      <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
                        {following.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingModal;
