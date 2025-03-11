import { signOut } from "next-auth/react";

import { fetchDataWithAccessToken } from "@/utils";

const clearLocalStorage = () => {
    return localStorage.clear();
}

const useLogout = async (router) => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/logout";

        const logoutData = await fetchDataWithAccessToken(url, "GET");

        if (!logoutData) {
            return { error: logoutData.error };
        }

        await signOut();
        clearLocalStorage();

        return router.push("/auth/login");
    } catch (error) {
        return console.error(error);
    }
};

export default useLogout;