import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const loginUser = async (encryptedData) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/auth/login`, encryptedData, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data.message || "An error occurred" };
        }
        if (error.request) {
            return { error: "No response received from server" };
        }
        return { error: "Request failed due to network error" };
    }
};

const registerUser = async (encryptedData) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/auth/register`, encryptedData, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data.message || "An error occurred" };
        }
        if (error.request) {
            return { error: "No response received from server" };
        }
        return { error: "Request failed due to network error" };
    }
};

export default { loginUser, registerUser };