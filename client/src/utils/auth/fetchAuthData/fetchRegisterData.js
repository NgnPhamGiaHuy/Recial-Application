// import { NextResponse } from "next/server";
//
// import { authService } from "@/utils";
//
// const fetchRegisterData = async (router, encryptedData, setError) => {
//     try {
//         const responseData = await authService.registerUser(encryptedData);
//        
//         if (responseData.error) {
//             const errorMessage = responseData.error;
//             if (errorMessage.includes("Email")) {
//                 return setError({ isEmailError: true, isPasswordError: false, formErrorStatus: errorMessage });
//             }
//             return setError({ isEmailError: false, isPasswordError: false, formErrorStatus: errorMessage });
//         }
//
//         if (responseData.message === "OTP sent. Please verify your email.") {
//             const email = encryptedData.session_key;
//            
//             return router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
//         }
//        
//         return NextResponse.json({ error: "Unexpected response structure" }, { status: 400 });
//     } catch (error) {
//         console.error("Error during registration:", error);
//         return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
//     }
// };
//
// export default fetchRegisterData;

import { NextResponse } from "next/server";

import { authService } from "@/utils";

const fetchRegisterData = async (router, encryptedData, setError) => {
    try {
        const responseData = await authService.registerUser(encryptedData);
        console.log(responseData);
        if (!responseData.success) {
            const { message, errorCode, fieldErrors } = responseData;

            setError({
                isEmailError: !!fieldErrors?.email,
                isPasswordError: !!fieldErrors?.password,
                formErrorStatus: message,
                fieldErrors,
            });

            return;
        }

        router.push("/auth/login");

        return NextResponse.json({ error: "Unexpected response structure" }, { status: 400 });
    } catch (error) {
        console.error("Error during registration:", error);
        setError({ formErrorStatus: "An unexpected error occurred. Please try again later." });
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
};

export default fetchRegisterData;