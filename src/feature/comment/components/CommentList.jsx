import React from 'react';

const CommentList = ({ comments = [], onEditComment, onDeleteComment, activeUserId }) => {
  if (comments.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-slate-400 dark:text-zinc-550 font-medium">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  const getAvatarUrl = (url) => {
    if (!url || url.includes('imagekit.io/dashboard') || url.trim() === '') {
      return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
    }
    return url;
  };

  return (
    <div className="space-y-4 py-2">
      {comments.map((comment) => {
        const isAuthor = comment.userId?._id === activeUserId || comment.userId?.username === 'deependrapal'; // Mock active owner authority checks
        
        return (
          <div key={comment._id} className="flex items-start space-x-3 text-sm group">
            
            {/* Avatar */}
            <img 
              src={getAvatarUrl(comment.userId?.profilePicture)} 
              alt={comment.userId?.username} 
              className="h-8 w-8 rounded-full object-cover mt-0.5 border border-slate-100 dark:border-zinc-800"
            />
            
            {/* Body */}
            <div className="flex-1 space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-slate-800 dark:text-zinc-200">
                  {comment.userId?.username}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium">
                  {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Just now'}
                </span>
              </div>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed break-words">
                {comment.text}
              </p>
            </div>

            {/* Actions (Edit/Delete) - visible on hover for authors */}
            {isAuthor && (
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Edit */}
                <button 
                  onClick={() => onEditComment(comment._id, comment.text)}
                  className="text-slate-400 dark:text-zinc-500 hover:text-instagram p-1 rounded hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                  title="Edit Comment"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                {/* Delete */}
                <button 
                  onClick={() => onDeleteComment(comment._id)}
                  className="text-slate-400 dark:text-zinc-500 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                  title="Delete Comment"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
