import { useState, useCallback } from 'react';
import { 
  createPost, 
  getUserPosts, 
  getPostDetails, 
  updatePostCaption, 
  deletePost, 
  toggleLikePost 
} from '../services/post.api';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserPosts();
      setPosts(response.data.posts || []);
      return response.data.posts;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadPost = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createPost(formData);
      setPosts(prev => [response.data.post, ...prev]);
      return response.data.post;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editPostCaption = async (postId, caption) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updatePostCaption(postId, caption);
      setPosts(prev => prev.map(p => p._id === postId ? response.data.post : p));
      return response.data.post;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removePost = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      await deletePost(postId);
      setPosts(prev => prev.filter(p => p._id !== postId));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await toggleLikePost(postId);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    uploadPost,
    editPostCaption,
    removePost,
    toggleLike,
    setPosts,
  };
};

export default usePosts;
