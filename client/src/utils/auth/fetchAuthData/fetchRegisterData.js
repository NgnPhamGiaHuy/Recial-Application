import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const fetchRegisterData = async (router, session, setError) => {
    try {
        const { session_key, session_password, session_firstname, session_lastname } = session;

        const hashedPassword = await bcrypt.hash(session_password, 10);

        const dataToSend = { session_key, hashedPassword, session_firstname, session_lastname };

        const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/register";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
            return router.push("/auth/login");
        } else {
            if (response.status === 409) {
                const errorData = await response.json();
                return setError({ isEmailError: true, isPasswordError: false, formErrorStatus: errorData.message });
            } else {
                return NextResponse.json({ error: ((await response.json()).message || "Unexpected error occurred" )});
            }
        }
    } catch (error) {
        return NextResponse.json({ error: "An unexpected error occurred" });
    }
};

export default fetchRegisterData;