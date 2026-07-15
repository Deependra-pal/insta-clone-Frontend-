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
        throw error.response?.data?.message || "Something went wrong";
    }
}




export async function loginUser(email, password) {
    try {
        const response = await api.post(
            "/login",
            { email, password },
        );

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }
}