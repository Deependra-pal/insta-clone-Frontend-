import axios from "axios";


const api = axios.create(({
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true
}))

export async function registerUser(username, email, password) {
    try {
        const response = await api.post(
            "/register",
            { username, email, password },
        );

        return response.data;
    } catch (error) {
        const apiError = new Error(error.response?.data?.message || "Something went wrong");
        apiError.errors = error.response?.data?.errors;
        apiError.success = error.response?.data?.success;
        throw apiError;
    }
}


export async function loginUser(emailOrUsername, password) {
    try {
        const payload = emailOrUsername.includes("@")
            ? { email: emailOrUsername, password }
            : { username: emailOrUsername, password };

        const response = await api.post(
            "/login",
            payload,
        );

        return response.data;
    } catch (error) {
        const apiError = new Error(error.response?.data?.message || "Something went wrong");
        apiError.errors = error.response?.data?.errors;
        apiError.success = error.response?.data?.success;
        throw apiError;
    }
}

export async function getMe() {
    try {
        const response = await api.get("/get-me")
        return response.data;
    } catch (error) {
        const apiError = new Error(error.response?.data?.message || "Something went wrong");
        apiError.errors = error.response?.data?.errors;
        apiError.success = error.response?.data?.success;
        throw apiError;
    }
}

export async function logoutUser() {
    try {
        const response = await api.post("/logout");
        return response.data;
    } catch (error) {
        const apiError = new Error(error.response?.data?.message || "Something went wrong");
        apiError.errors = error.response?.data?.errors;
        apiError.success = error.response?.data?.success;
        throw apiError;
    }
}