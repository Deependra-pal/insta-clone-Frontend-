import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import EditProfileModal from '../components/EditProfileModal';
import FollowersModal from '../components/FollowersModal';
import FollowingModal from '../components/FollowingModal';
import FollowButton from '../components/FollowButton';
import PostDetailModal from '../../post/components/PostDetailModal';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, fetchCurrentUser, loading: authLoading } = useAuth();
  const { 
    profile, 
    loading: profileLoading, 
    error, 
    fetchProfile, 
    updateProfile, 
    followUser, 
    setProfile,
    fetchFollowers,
    fetchFollowing
  } = useProfile();

  // Modals Visibility State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Redirection to login if not logged in
  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    const targetUserId = userId || currentUser?._id;
    if (targetUserId) {
      fetchProfile(targetUserId);
    }
  }, [userId, currentUser?._id, fetchProfile]);

  const handleProfileSave = async (updatedData) => {
    try {
      await updateProfile(updatedData);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleFollowToggle = async () => {
    if (!profile) return;
    try {
      await followUser(profile._id);
    } catch (err) {
      console.error("Failed to toggle follow status:", err);
    }
  };

  const handlePostDeleted = (postId) => {
    setProfile((prev) => ({
      ...prev,
      posts: prev.posts.filter((p) => p._id !== postId),
    }));
  };

  const handlePostUpdated = (postId, newCaption) => {
    setProfile((prev) => ({
      ...prev,
      posts: prev.posts.map((p) => (p._id === postId ? { ...p, caption: newCaption } : p)),
    }));
  };

  if (profileLoading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-[#262626] dark:text-[#f5f5f5]">
        <div className="text-red-500 font-semibold text-lg">Error loading profile</div>
        <p className="text-slate-500 mt-2">{error.message || "User profile not found."}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-slate-500 font-semibold">
        No profile session loaded. Please log in.
      </div>
    );
  }

  const getAvatarUrl = (url) => {
    if (!url || url.includes('imagekit.io/dashboard') || url.trim() === '') {
      return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";
    }
    return url;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
      
      {/* Profile Header */}
      <header className="flex items-center space-x-6 sm:space-x-12 md:space-x-20 pb-10 border-b border-[#dbdbdb] dark:border-[#262626] mb-8">
        
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="p-1 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
            <img 
              src={getAvatarUrl(profile.profilePicture)} 
              alt={profile.username}
              className="h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36 rounded-full object-cover border-4 border-white dark:border-black bg-white dark:bg-black"
            />
          </div>
        </div>

        {/* Profile Info Details */}
        <div className="flex-1 flex flex-col space-y-4">
          
          {/* Row 1: Username & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <h2 className="text-xl font-normal text-[#262626] dark:text-[#f5f5f5]">
              {profile.username}
            </h2>
            
            {profile.isMe ? (
              <button 
                onClick={() => setIsEditOpen(true)}
                className="px-4 py-1.5 bg-[#efefef] hover:bg-[#dbdbdb] dark:bg-[#363636] dark:hover:bg-[#262626] rounded-lg text-sm font-semibold text-[#262626] dark:text-[#f5f5f5] transition-colors cursor-pointer text-center select-none"
              >
                Edit profile
              </button>
            ) : (
              <FollowButton 
                isFollowing={profile.isFollowing} 
                onClick={handleFollowToggle} 
              />
            )}
          </div>

          {/* Row 2: Counts (Inline Stats) */}
          <div className="hidden sm:flex items-center space-x-10 text-sm">
            <div>
              <span className="font-bold text-[#262626] dark:text-[#f5f5f5]">{(profile.posts || []).length}</span>{' '}
              <span>posts</span>
            </div>
            
            <button 
              onClick={() => setIsFollowersOpen(true)}
              className="hover:opacity-85 cursor-pointer text-[#262626] dark:text-[#f5f5f5]"
            >
              <span className="font-bold text-[#262626] dark:text-[#f5f5f5]">{profile.followersCount}</span>{' '}
              <span>followers</span>
            </button>

            <button 
              onClick={() => setIsFollowingOpen(true)}
              className="hover:opacity-85 cursor-pointer text-[#262626] dark:text-[#f5f5f5]"
            >
              <span className="font-bold text-[#262626] dark:text-[#f5f5f5]">{profile.followingCount}</span>{' '}
              <span>following</span>
            </button>
          </div>

          {/* Row 3: Bio */}
          <div className="text-sm">
            <p className="text-[#262626] dark:text-[#f5f5f5] leading-normal whitespace-pre-wrap">
              {profile.bio || "No biography details yet."}
            </p>
          </div>
        </div>
      </header>

      {/* Mobile Counts Bar (Only visible on small viewports) */}
      <div className="sm:hidden grid grid-cols-3 border-b border-[#dbdbdb] dark:border-[#262626] pb-4 mb-4 text-center text-sm">
        <div>
          <div className="font-bold text-[#262626] dark:text-[#f5f5f5]">{(profile.posts || []).length}</div>
          <div className="text-slate-400 text-xs">posts</div>
        </div>
        <button onClick={() => setIsFollowersOpen(true)} className="cursor-pointer">
          <div className="font-bold text-[#262626] dark:text-[#f5f5f5]">{profile.followersCount}</div>
          <div className="text-slate-400 text-xs">followers</div>
        </button>
        <button onClick={() => setIsFollowingOpen(true)} className="cursor-pointer">
          <div className="font-bold text-[#262626] dark:text-[#f5f5f5]">{profile.followingCount}</div>
          <div className="text-slate-400 text-xs">following</div>
        </button>
      </div>

      {/* Posts Grid */}
      <div>
        {(!profile.posts || profile.posts.length === 0) ? (
          <div className="text-center py-20 bg-white dark:bg-black rounded-lg">
            <div className="p-3 border-2 border-black dark:border-white rounded-full inline-block mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#262626] dark:text-[#f5f5f5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#262626] dark:text-[#f5f5f5]">No Posts Yet</h3>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {profile.posts.map((post) => (
              <div 
                key={post._id} 
                onClick={() => setSelectedPost(post)}
                className="aspect-square bg-slate-100 dark:bg-zinc-950 overflow-hidden relative group cursor-pointer border border-[#dbdbdb] dark:border-[#262626]"
              >
                <img 
                  src={post.image} 
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-6 text-white font-semibold text-sm">
                  <span className="flex items-center space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>{post.likesCount || 0}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/>
                    </svg>
                    <span>{(post.comments || []).length}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)}
        initialData={profile}
        onSave={handleProfileSave}
      />

      {/* Followers Overlay List */}
      <FollowersModal 
        isOpen={isFollowersOpen} 
        onClose={() => setIsFollowersOpen(false)} 
        userId={profile._id}
        fetchFollowers={fetchFollowers}
      />

      {/* Following Overlay List */}
      <FollowingModal 
        isOpen={isFollowingOpen} 
        onClose={() => setIsFollowingOpen(false)} 
        userId={profile._id}
        fetchFollowing={fetchFollowing}
      />

      {/* Post Detail Modal Overlay */}
      {selectedPost && (
        <PostDetailModal 
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
          onPostDeleted={handlePostDeleted}
          onPostUpdated={handlePostUpdated}
        />
      )}

    </div>
  );
};

export default ProfilePage;
