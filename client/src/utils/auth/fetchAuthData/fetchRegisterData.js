import { NextResponse } from "next/server";

import { authService } from "@/utils";

const fetchRegisterData = async (router, encryptedData, setError) => {
    try {
        const responseData = await authService.registerUser(encryptedData);
        
        if (responseData.error) {
            const errorMessage = responseData.error;
            if (errorMessage.includes("Email")) {
                return setError({ isEmailError: true, isPasswordError: false, formErrorStatus: errorMessage });
            }
            return setError({ isEmailError: false, isPasswordError: false, formErrorStatus: errorMessage });
        }
        
        if (responseData.message === "User registered successfully") {
            return router.push("/auth/login");
        }

        return NextResponse.json({ error: "Unexpected response structure" }, { status: 400 });
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
};

export default fetchRegisterData;