"use client"

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCheckAccessToken } from "@/hooks";
import { encryptData, fetchLoginData } from "@/utils";
import { AuthLoginForm, AuthHeader } from "@/components";
import { useAccessTokenContext } from "@/components/ProviderComponents/Providers";

import Illustration from "/public/images/Illustration/illustration-of-a-man-and-a-woman-watering-a-plant.jpg";

const Login = () => {
    const router = useRouter();

    const { setAccessToken } = useAccessTokenContext();

    const [error, setError] = useState({ isEmailError: false, isPasswordError: false, formErrorStatus: "" });
    const [loginFormData, setLoginFormData] = useState({ session_key: "", session_password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const encryptedData = {
            session_key: encryptData(loginFormData.session_key),
            session_password: encryptData(loginFormData.session_password),
        }
        return await fetchLoginData(router, encryptedData, setError, setAccessToken)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        return setLoginFormData({ ...loginFormData, [name]: value });
    }

    return (
        <div className="w-screen h-screen bg-white">
            <div className="w-full h-full block">
                <AuthHeader/>
                <main className="h-[calc(100%-80px)] flex flex-col items-center justify-center relative overflow-hidden">
                    <section className="min-h-[560px] max-w-[1128px] flex flex-nowrap pt-[0px] items-center justify-center w-full h-full relative">
                        <div className="self-start relative flex-shrink-0 sm:w-[55%] w-full sm:pr-[42px]">
                            <AuthLoginForm isLogin="true" action={handleSubmit} handleChange={handleChange} error={error} setError={setError}/>
                        </div>
                        <Image src={Illustration} alt={`${Illustration}-image`} width={600} height={560} priority={true} className="w-auto h-auto hidden z-[1] relative flex-shrink object-cover lg:block"/>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default useCheckAccessToken(Login);