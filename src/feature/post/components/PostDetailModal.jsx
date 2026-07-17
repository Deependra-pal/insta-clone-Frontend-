import React, { useState, useEffect } from 'react';
import CommentList from '../../comment/components/CommentList';
import AddCommentBox from '../../comment/components/AddCommentBox';
import { useAuth } from '../../auth/hooks/useAuth';
import { getPostComments, createComment, updateComment, deleteComment } from '../../comment/services/comment.api';
import { toggleLikePost, updatePostCaption, deletePost } from '../services/post.api';

const PostDetailModal = ({ isOpen, onClose, post, onPostDeleted, onPostUpdated }) => {
  const { user: currentUser } = useAuth();
  const [likesCount, setLikesCount] = useState(post?.likesCount || 0);
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [comments, setComments] = useState([]);
  const [caption, setCaption] = useState(post?.caption || '');
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editedCaptionText, setEditedCaptionText] = useState(post?.caption || '');

  // Load latest comments on mount
  useEffect(() => {
    if (isOpen && post?._id) {
      const loadComments = async () => {
        try {
          const response = await getPostComments(post._id);
          setComments(response.data.comments || []);
        } catch (err) {
          console.error("Failed to load comments:", err);
        }
      };
      loadComments();
    }
  }, [isOpen, post?._id]);

  const getAvatarUrl = (url) => {
    if (!url || url.includes('imagekit.io/dashboard') || url.trim() === '') {
      return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
    }
    return url;
  };

  if (!isOpen || !post) return null;

  const isOwner = currentUser && (post.owner === currentUser._id || post.owner?._id === currentUser._id);

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
      // Append comment with local currentUser details populated
      const commentWithUser = {
        ...response.data.comment,
        userId: {
          _id: currentUser?._id,
          username: currentUser?.username,
          profilePicture: currentUser?.profilePicture,
        }
      };
      setComments(prev => [...prev, commentWithUser]);
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert(err.message || "Failed to post comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleEditComment = async (commentId, oldText) => {
    const newText = prompt("Edit comment:", oldText);
    if (newText && newText.trim()) {
      try {
        const response = await updateComment(commentId, newText);
        setComments(prev => prev.map(c => c._id === commentId ? {
          ...c,
          text: response.data.comment.text
        } : c));
      } catch (err) {
        console.error("Failed to edit comment:", err);
      }
    }
  };

  const handleCaptionSave = async (e) => {
    e.preventDefault();
    try {
      await updatePostCaption(post._id, editedCaptionText);
      setCaption(editedCaptionText);
      setIsEditingCaption(false);
      if (onPostUpdated) {
        onPostUpdated(post._id, editedCaptionText);
      }
    } catch (err) {
      console.error("Failed to update caption:", err);
      alert(err.message || "Failed to edit caption.");
    }
  };

  const handleDeletePostClick = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post._id);
        if (onPostDeleted) {
          onPostDeleted(post._id);
        }
        onClose();
      } catch (err) {
        console.error("Failed to delete post:", err);
        alert(err.message || "Failed to delete post.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 z-50 animate-fade-in font-sans">
      
      {/* Modal Container */}
      <div className="bg-white dark:bg-black border border-[#dbdbdb] dark:border-[#262626] w-full max-w-[850px] h-[90vh] md:h-[75vh] rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 dark:text-zinc-550 hover:text-slate-650 dark:hover:text-zinc-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-850 z-10 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Post Image Container */}
        <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden md:h-full h-[40%]">
          <img 
            src={post.image} 
            alt={caption} 
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Right Side: Metadata / Comments panel */}
        <div className="w-full md:w-[350px] bg-white dark:bg-black flex flex-col h-[60%] md:h-full border-t md:border-t-0 md:border-l border-[#dbdbdb] dark:border-[#262626]">
          
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-[#dbdbdb] dark:border-[#262626] flex items-center justify-between bg-white dark:bg-black">
            <div className="flex items-center space-x-3">
              <img 
                src={getAvatarUrl(post.owner?.profilePicture)} 
                alt={post.owner?.username || "user"} 
                className="h-8.5 w-8.5 rounded-full object-cover border border-[#dbdbdb] dark:border-[#262626]"
              />
              <div>
                <h4 className="text-sm font-bold text-[#262626] dark:text-[#f5f5f5]">{post.owner?.username || "user"}</h4>
              </div>
            </div>

            {/* Post Owner Controls */}
            {isOwner && (
              <div className="flex items-center space-x-1 pr-6">
                <button 
                  onClick={() => setIsEditingCaption(prev => !prev)}
                  className="text-slate-400 dark:text-zinc-550 hover:text-instagram p-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Edit Caption"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={handleDeletePostClick}
                  className="text-slate-400 dark:text-zinc-550 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                  title="Delete Post"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Caption & Comments List */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white dark:bg-black">
            {/* Caption Block */}
            {isEditingCaption ? (
              <form onSubmit={handleCaptionSave} className="space-y-2 pb-3 border-b border-[#dbdbdb] dark:border-[#262626]">
                <textarea
                  value={editedCaptionText}
                  onChange={(e) => setEditedCaptionText(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#dbdbdb] dark:border-[#262626] rounded-lg bg-[#fafafa] dark:bg-[#121212] outline-none text-[#262626] dark:text-[#f5f5f5] resize-none"
                  rows={2}
                />
                <div className="flex items-center justify-end space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setIsEditingCaption(false)}
                    className="text-xs font-semibold px-3 py-1.5 border border-[#dbdbdb] dark:border-[#262626] rounded-md text-slate-500 dark:text-zinc-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="text-xs font-semibold px-3 py-1.5 bg-[#0095f6] hover:bg-[#1877f2] text-white rounded-md cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              caption && (
                <div className="flex items-start space-x-3 text-sm pb-4 border-b border-[#dbdbdb] dark:border-[#262626]">
                  <img 
                    src={getAvatarUrl(post.owner?.profilePicture)} 
                    alt={post.owner?.username || "user"} 
                    className="h-8.5 w-8.5 rounded-full object-cover border border-[#dbdbdb] dark:border-[#262626] mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-[#262626] dark:text-[#f5f5f5] mr-2">{post.owner?.username || "user"}</span>
                    <span className="text-[#262626] dark:text-[#f5f5f5] leading-normal break-words">{caption}</span>
                  </div>
                </div>
              )
            )}

            {/* Comments List */}
            <CommentList 
              comments={comments} 
              onDeleteComment={handleDeleteComment}
              onEditComment={handleEditComment}
              activeUserId={currentUser?._id}
            />
          </div>

          {/* Action Metrics Panel */}
          <div className="px-4 py-3.5 border-t border-[#dbdbdb] dark:border-[#262626] bg-white dark:bg-black">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLikeToggle}
                  className="text-[#262626] dark:text-[#f5f5f5] hover:opacity-75 active:scale-95 transition-all cursor-pointer"
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

                <div className="text-[#262626] dark:text-[#f5f5f5]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-sm font-bold text-[#262626] dark:text-[#f5f5f5]">
              {likesCount} likes
            </div>
            
            <div className="text-[10px] text-[#8e8e8e] font-normal uppercase tracking-wider mt-1.5">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Just now'}
            </div>
          </div>

          {/* Add Comment input */}
          <div className="px-4 bg-white dark:bg-black">
            <AddCommentBox onAddComment={handleAddComment} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
