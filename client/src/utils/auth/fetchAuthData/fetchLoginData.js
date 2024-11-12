import { NextResponse } from "next/server";

import { authService } from "@/utils";

const fetchLoginData = async (router, encryptedData, setError, setAccessToken) => {
    try {
        const responseData = await authService.loginUser(encryptedData);
        
        if (responseData.error) {
            const errorMessage = responseData.error;
            if (errorMessage.includes("Email")) {
                return setError({ isEmailError: true, isPasswordError: false, formErrorStatus: errorMessage });
            } else if (errorMessage.includes("Password")) {
                return setError({ isEmailError: false, isPasswordError: true, formErrorStatus: errorMessage });
            }
            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }
        
        if (responseData.accessToken && responseData.refreshToken) {
            localStorage.setItem("accessToken", responseData.accessToken);
            localStorage.setItem("refreshToken", responseData.refreshToken);

            setAccessToken(responseData.accessToken);

            return router.push("/");
        }

        return NextResponse.json({ error: "Unexpected response structure" }, { status: 400 });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
};

export default fetchLoginData;