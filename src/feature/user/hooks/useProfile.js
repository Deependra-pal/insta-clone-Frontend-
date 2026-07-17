import { useState, useCallback } from 'react';
import { 
  getUserProfile, 
  updateUserProfile, 
  toggleFollowUser,
  getUserFollowers,
  getUserFollowing
} from '../services/user.api';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserProfile(userId);
      setProfile(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateUserProfile(profileData);
      setProfile(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const followUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await toggleFollowUser(userId);
      // Refresh profile counts if we are viewing this profile
      if (profile && profile._id === userId) {
        setProfile(prev => ({
          ...prev,
          isFollowing: !prev.isFollowing,
          followersCount: prev.isFollowing ? prev.followersCount - 1 : prev.followersCount + 1,
        }));
      }
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowers = useCallback(async (userId) => {
    try {
      const response = await getUserFollowers(userId);
      return response.data.followers || [];
    } catch (err) {
      console.error("Failed to fetch followers:", err);
      return [];
    }
  }, []);

  const fetchFollowing = useCallback(async (userId) => {
    try {
      const response = await getUserFollowing(userId);
      return response.data.following || [];
    } catch (err) {
      console.error("Failed to fetch following list:", err);
      return [];
    }
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    followUser,
    setProfile,
    fetchFollowers,
    fetchFollowing,
  };
};
export default useProfile;
