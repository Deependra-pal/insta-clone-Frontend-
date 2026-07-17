import React, { useState } from 'react';

const AddCommentBox = ({ onAddComment, placeholder = "Add a comment..." }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText);
    setCommentText('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 border-t border-slate-100 dark:border-zinc-800 py-3 mt-1"
    >
      {/* Emoji Placeholder Icon */}
      <div className="text-slate-400 dark:text-zinc-550 hidden sm:block p-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="flex-1 text-sm bg-transparent outline-none border-none py-1 placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-zinc-150"
      />

      {/* Submit Trigger */}
      <button
        type="submit"
        disabled={!commentText.trim()}
        className="text-sm font-semibold text-instagram hover:text-instagram-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer px-2 transition-colors"
      >
        Post
      </button>
    </form>
  );
};

export default AddCommentBox;
