import api from "../../../services/api";

export async function getUserProfile(userId) {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function updateUserProfile(profileData) {
  try {
    const response = await api.put("/users/profile", profileData);
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function toggleFollowUser(userId) {
  try {
    const response = await api.post(`/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function getUserFollowers(userId) {
  try {
    const response = await api.get(`/users/${userId}/followers`);
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function getUserFollowing(userId) {
  try {
    const response = await api.get(`/users/${userId}/following`);
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}
