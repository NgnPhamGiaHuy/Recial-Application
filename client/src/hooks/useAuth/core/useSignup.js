"use client"

import bcrypt from "bcryptjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { encryptData, fetchRegisterData, handleValidateForm } from "@/utils";

const useSignup = () => {
    const router = useRouter();

    const [error, setError] = useState({ isEmailError: false, isPasswordError: false, formErrorStatus: "" });
    const [registerFormData, setRegisterFormData] = useState({ session_key: "", session_password: "", session_firstname: "", session_lastname: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedForm = { ...registerFormData, [name]: value };
        
        setRegisterFormData(updatedForm);
        
        return handleValidateForm(updatedForm, setError);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        handleValidateForm(registerFormData, setError);

        if (error.isEmailError || error.isPasswordError) return;

        const hashedPassword = await bcrypt.hash(registerFormData.session_password, 10);

        const encryptedData = {
            session_key: encryptData(registerFormData.session_key),
            session_password: encryptData(hashedPassword),
            session_firstname: encryptData(registerFormData.session_firstname),
            session_lastname: encryptData(registerFormData.session_lastname),
        };

        return await fetchRegisterData(router, encryptedData, setError);
    };

    return { error, setError, handleSubmit, handleChange };
}

export default useSignup;