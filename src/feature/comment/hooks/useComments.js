import { useState, useCallback } from 'react';
import { 
  createComment, 
  getPostComments, 
  updateComment, 
  deleteComment 
} from '../services/comment.api';

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPostComments(postId);
      setComments(response.data.comments || []);
      return response.data.comments;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addComment = async (postId, text) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createComment(postId, text);
      setComments(prev => [...prev, response.data.comment]);
      return response.data.comment;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editComment = async (commentId, text) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateComment(commentId, text);
      setComments(prev => prev.map(c => c._id === commentId ? response.data.comment : c));
      return response.data.comment;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeComment = async (commentId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    addComment,
    editComment,
    removeComment,
    setComments,
  };
};

export default useComments;
