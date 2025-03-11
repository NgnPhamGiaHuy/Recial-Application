"use client"

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const useDecodeToken = () => {
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            try {
                const decoded = jwtDecode(token);

                setDecodedToken(decoded);
            } catch (error) {
                console.error("Error decoding token:", error);
                setDecodedToken(null);
            }
        }
    }, []);

    return decodedToken;
}

export default useDecodeToken;
