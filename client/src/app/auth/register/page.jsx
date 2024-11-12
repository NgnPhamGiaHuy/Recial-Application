"use client"

import bcrypt from "bcryptjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCheckAccessToken } from "@/hooks";
import { AuthHeader, AuthLoginForm } from "@/components";
import { encryptData, fetchRegisterData, handleValidateForm } from "@/utils";

const Signup = () => {
    const router = useRouter();

    const [error, setError] = useState({ isEmailError: false, isPasswordError: false, formErrorStatus: "" });
    const [registerFormData, setRegisterFormData] = useState({ session_key: "", session_password: "", session_firstname: "", session_lastname: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormData({ ...registerFormData, [name]: value });

        return handleValidateForm({ ...registerFormData, [name]: value }, setError);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        handleValidateForm(registerFormData, setError);

        const hashedPassword = await bcrypt.hash(registerFormData.session_password, 10);
        
        const encryptedData = {
            session_key: encryptData(registerFormData.session_key),
            session_password: encryptData(hashedPassword),
            session_firstname: encryptData(registerFormData.session_firstname),
            session_lastname: encryptData(registerFormData.session_lastname),
        }
        
        if (error.isEmailError || error.isPasswordError) {
            return;
        }

        return await fetchRegisterData(router, encryptedData, setError);
    }

    return (
        <div className="w-full h-full bg-stone-100">
            <AuthHeader/>
            <main className="flex flex-col items-center justify-center relative overflow-hidden">
                <section className="max-w-[1128px] min-h-[560px] w-full h-full flex flex-nowrap items-center justify-center relative">
                    <div className="sm:w-[80%] md:w-[70%] lg:w-[60%] w-fit sm:px-[26px] md:px-[34px] lg:px-[42px] px-[18px] flex-shrink-0 self-start relative">
                        <AuthLoginForm isSignup="true" action={handleSubmit} handleChange={handleChange} error={error} setError={setError}/>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default useCheckAccessToken(Signup);