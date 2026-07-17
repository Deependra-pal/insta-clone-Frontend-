import React, { useState } from 'react';
import AddCommentBox from '../../comment/components/AddCommentBox';
import { toggleLikePost } from '../services/post.api';
import { createComment } from '../../comment/services/comment.api';

const PostCard = ({ post, onPostClick }) => {
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [comments, setComments] = useState(post.comments || []);

  const handleLikeToggle = async () => {
    try {
      const response = await toggleLikePost(post._id);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likesCount);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const handleAddComment = async (text) => {
    try {
      const response = await createComment(post._id, text);
      setComments(prev => [...prev, response.data.comment]);
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert(err.message || "Failed to post comment.");
    }
  };

  const getAvatarUrl = (url) => {
    if (!url || url.includes('imagekit.io/dashboard') || url.trim() === '') {
      return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
    }
    return url;
  };

  return (
    <article className="bg-white dark:bg-black border border-[#dbdbdb] dark:border-[#262626] rounded-lg overflow-hidden transition-colors max-w-[470px] w-full mx-auto font-sans">
      
      {/* Header */}
      <div className="px-3 py-3.5 flex items-center justify-between border-b border-[#fafafa]/50 dark:border-[#262626]/20">
        <div className="flex items-center space-x-3.5">
          <img 
            src={getAvatarUrl(post.owner?.profilePicture)} 
            alt={post.owner?.username} 
            className="h-8 w-8 rounded-full object-cover border border-[#dbdbdb] dark:border-[#262626]"
          />
          <div>
            <h4 className="text-sm font-bold text-[#262626] dark:text-[#f5f5f5] hover:opacity-85 cursor-pointer">
              {post.owner?.username}
            </h4>
            <p className="text-[10px] text-[#8e8e8e] font-normal uppercase tracking-wider mt-0.5">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '1 day ago'}
            </p>
          </div>
        </div>
        
        {/* Actions Button */}
        <button className="text-[#262626] dark:text-[#f5f5f5] hover:opacity-70 p-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>

      {/* Post Image Container */}
      <div 
        onClick={onPostClick}
        className="aspect-square w-full bg-[#121212] flex items-center justify-center cursor-pointer relative overflow-hidden"
      >
        <img 
          src={post.image} 
          alt={post.caption} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Engagement Actions */}
      <div className="px-4 py-3 pb-2.5 flex flex-col space-y-2.5">
        
        {/* Row 1: Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            
            {/* Like */}
            <button 
              onClick={handleLikeToggle}
              className="text-[#262626] dark:text-[#f5f5f5] hover:opacity-75 active:scale-90 transition-all cursor-pointer"
            >
              {isLiked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>

            {/* Comment */}
            <button 
              onClick={onPostClick}
              className="text-[#262626] dark:text-[#f5f5f5] hover:opacity-75 transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

          </div>
        </div>

        {/* Likes Count */}
        <div className="text-sm font-bold text-[#262626] dark:text-[#f5f5f5]">
          {likesCount} likes
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="text-sm text-[#262626] dark:text-[#f5f5f5] leading-snug">
            <span className="font-bold mr-2">{post.owner?.username}</span>
            <span className="break-words font-normal">{post.caption}</span>
          </div>
        )}

        {/* Comments Preview Container */}
        {comments.length > 0 && (
          <div className="space-y-1 pt-0.5">
            <button 
              onClick={onPostClick}
              className="text-xs text-[#8e8e8e] font-normal hover:underline block"
            >
              View all {comments.length} comments
            </button>
            {comments.slice(-2).map((comment, index) => (
              <div key={comment._id || index} className="text-xs text-[#262626] dark:text-[#f5f5f5]">
                <span className="font-bold mr-2">{comment.userId?.username || 'user'}</span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment input */}
        <AddCommentBox onAddComment={handleAddComment} placeholder="Add a comment..." />

      </div>

    </article>
  );
};

export default PostCard;
