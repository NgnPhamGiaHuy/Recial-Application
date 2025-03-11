"use client"

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import { fetchTokenRefresh } from "@/utils";

const useTokenRefresh = () => {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState(null);

    const refreshAccessToken = useCallback(async () => {
        try {
            const newAccessToken = await fetchTokenRefresh();

            if (!newAccessToken.error) {
                setAccessToken(newAccessToken);

                return localStorage.setItem("accessToken", newAccessToken);
            } else {
                return router.push("/auth/login");
            }
        } catch (error) {
            return console.error(error);
        }
    }, [router]);

    const checkTokenExpiration = useCallback(async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            const currentPath = window.location.pathname;
            
            if (!accessToken && !refreshToken && currentPath !== "/auth/register" && currentPath !== "/auth/verify") {
                return router.push("/auth/login");
            }

            if (currentPath === "/auth/login" || currentPath === "/auth/register" || currentPath === "/auth/verify") {
                return ;
            }

            const token = accessToken || refreshToken;
            const decodedToken = jwtDecode(token);

            const currentTime = Date.now() / 1000;
            const tokenExpiration = decodedToken.exp;

            if (tokenExpiration - currentTime < 5) {
                return await refreshAccessToken();
            }
        } catch (error) {
            return console.error(error);
        }
    }, [router, refreshAccessToken]);

    useEffect(() => {
        const interval = setInterval(checkTokenExpiration, 10000);

        return () => clearInterval(interval);
    }, [checkTokenExpiration]);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");

        if (storedAccessToken) {
            setAccessToken(storedAccessToken.toString());
        }
    }, []);

    return { accessToken, setAccessToken };
};

export default useTokenRefresh;
