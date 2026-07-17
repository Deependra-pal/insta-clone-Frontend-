import React from 'react';

const FollowButton = ({ isFollowing, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${
        isFollowing
          ? 'bg-[#efefef] dark:bg-[#363636] text-[#262626] dark:text-[#f5f5f5] hover:opacity-85'
          : 'bg-[#0095f6] hover:bg-[#1877f2] text-white'
      } ${className}`}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
