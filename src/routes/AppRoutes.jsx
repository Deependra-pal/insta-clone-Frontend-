import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from '../feature/auth/pages/Login';
import Register from '../feature/auth/pages/Register';

// Layout & Feature Pages
import Layout from '../components/Layout';
import HomeFeed from '../feature/post/pages/HomeFeed';
import ProfilePage from '../feature/user/pages/ProfilePage';
import CreatePostModal from '../feature/post/components/CreatePostModal';
import { createPost } from '../feature/post/services/post.api';

const AppRoutes = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handlePostCreated = async (postData) => {
    try {
      // Build FormData for multipart upload
      const formData = new FormData();
      if (postData.file) {
        formData.append("image", postData.file);
      }
      formData.append("caption", postData.caption || "");

      await createPost(formData);
      setIsCreateOpen(false);
      window.location.reload(); // Refresh to update grid or timeline
    } catch (err) {
      console.error("Post creation error:", err);
      alert(err.message || "Failed to create post. Please try again.");
    }
  };

  return (
    <>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Feature Pages (using Instagram-style Layout Sidebar) */}
        <Route 
          path="/" 
          element={
            <Layout onCreatePostClick={() => setIsCreateOpen(true)}>
              <HomeFeed />
            </Layout>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <Layout onCreatePostClick={() => setIsCreateOpen(true)}>
              <ProfilePage />
            </Layout>
          } 
        />

        <Route 
          path="/profile/:userId" 
          element={
            <Layout onCreatePostClick={() => setIsCreateOpen(true)}>
              <ProfilePage />
            </Layout>
          } 
        />

        {/* Fallback route - redirect all unmatched to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Global Overlay for creating posts */}
      <CreatePostModal 
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </>
  );
};

export default AppRoutes;