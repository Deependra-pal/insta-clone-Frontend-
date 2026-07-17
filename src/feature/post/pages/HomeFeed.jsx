import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';
import PostDetailModal from '../components/PostDetailModal';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../../auth/hooks/useAuth';

const HomeFeed = () => {
  const navigate = useNavigate();
  const { 
    posts, 
    loading, 
    error, 
    fetchPosts, 
    editPostCaption, 
    removePost, 
    toggleLike 
  } = usePosts();
  
  const { user: currentUser, loading: authLoading } = useAuth();
  const [selectedPost, setSelectedPost] = useState(null);

  // Redirection to login if not logged in
  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser, fetchPosts]);

  // Suggestions for side panel (remains mock as suggestion API doesn't exist on backend)
  const [suggestions] = useState([
    { _id: 's1', username: 'dan_dev', profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', relation: 'Followed by coder_john' },
    { _id: 's2', username: 'alex_green', profilePicture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', relation: 'New to Instagram' },
    { _id: 's3', username: 'maria_ross', profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', relation: 'Followed by travel_emma' },
  ]);

  const handlePostDeleted = (postId) => {
    removePost(postId);
  };

  const handlePostUpdated = (postId, newCaption) => {
    editPostCaption(postId, newCaption);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 border border-red-200 bg-red-50 text-red-700 rounded-xl text-center font-sans">
        <h3 className="font-bold">Error Loading Feed</h3>
        <p className="text-sm mt-1">{error.message || "Failed to load posts from server."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-10 flex items-start md:space-x-12 justify-center lg:justify-start font-sans">
      
      {/* Posts Feed */}
      <div className="flex-1 flex flex-col space-y-6 max-w-[470px]">
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#dbdbdb] dark:border-[#262626] rounded-xl bg-white dark:bg-black/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-slate-400 dark:text-zinc-550 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-bold text-[#262626] dark:text-[#f5f5f5]">Your feed is empty</h3>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1 max-w-xs mx-auto">
              Create your first post by clicking "Create" in the sidebar!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard 
              key={post._id} 
              post={post} 
              onPostClick={() => setSelectedPost(post)} 
            />
          ))
        )}
      </div>

      {/* Suggestions Sidebar panel - Desktop Only */}
      <aside className="hidden lg:block w-72 sticky top-24 pt-4">
        {/* Active Logged-in User Profile preview */}
        {currentUser && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3.5">
              <img 
                src={currentUser.profilePicture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"} 
                alt={currentUser.username} 
                className="h-11 w-11 rounded-full object-cover border border-[#dbdbdb] dark:border-[#262626]"
              />
              <div>
                <h4 className="text-sm font-bold text-[#262626] dark:text-[#f5f5f5] hover:opacity-85 cursor-pointer">{currentUser.username}</h4>
                <p className="text-xs text-slate-450 dark:text-zinc-500">{currentUser.email}</p>
              </div>
            </div>
            <button className="text-xs font-bold text-[#0095f6] hover:text-[#1877f2] cursor-pointer">
              Switch
            </button>
          </div>
        )}

        {/* Suggestions Title */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-slate-450 dark:text-zinc-550">Suggestions for you</h4>
          <button className="text-xs font-bold text-[#262626] dark:text-[#f5f5f5] hover:opacity-75 cursor-pointer">
            See All
          </button>
        </div>

        {/* Suggestions List */}
        <div className="space-y-3.5">
          {suggestions.map((suggestion) => (
            <div key={suggestion._id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <img 
                  src={suggestion.profilePicture} 
                  alt={suggestion.username} 
                  className="h-8 w-8 rounded-full object-cover border border-[#dbdbdb] dark:border-[#262626]"
                />
                <div className="max-w-[130px]">
                  <h5 className="text-xs font-bold text-[#262626] dark:text-[#f5f5f5] truncate hover:underline cursor-pointer">
                    {suggestion.username}
                  </h5>
                  <p className="text-[10px] text-slate-450 dark:text-zinc-500 truncate mt-0.5">
                    {suggestion.relation}
                  </p>
                </div>
              </div>
              <button className="text-xs font-bold text-[#0095f6] hover:text-[#1877f2] cursor-pointer">
                Follow
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Post Detail Modal */}
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

export default HomeFeed;
