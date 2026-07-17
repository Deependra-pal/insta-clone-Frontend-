import api from "../../../services/api";

export async function createPost(formData) {
  try {
    const response = await api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function getUserPosts() {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function getPostDetails(postId) {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function updatePostCaption(postId, caption) {
  try {
    const response = await api.put(`/posts/${postId}`, { caption });
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function deletePost(postId) {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function toggleLikePost(postId) {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}
