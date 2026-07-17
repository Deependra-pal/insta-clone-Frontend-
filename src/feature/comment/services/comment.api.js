import api from "../../../services/api";

export async function createComment(postId, text) {
  try {
    const response = await api.post(`/posts/${postId}/comments`, { text });
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function getPostComments(postId) {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function updateComment(commentId, text) {
  try {
    const response = await api.put(`/comments/${commentId}`, { text });
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}

export async function deleteComment(commentId) {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    const apiError = new Error(error.response?.data?.message || "Something went wrong");
    apiError.errors = error.response?.data?.errors;
    apiError.success = error.response?.data?.success;
    throw apiError;
  }
}
