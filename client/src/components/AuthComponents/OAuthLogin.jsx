"use client"

import Image from "next/image";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

import Google from "/public/images/Brands/Google.png";
import { useRouter } from "next/navigation";
import { fetchLoginData } from "@/app/api/fetchAuthData";
import { useAccessTokenContext } from "@/components/ProviderComponents/Providers";

const OAuthLogin = ({ isLogin, isSignup, setError }) => {
    const router = useRouter();

    const { setAccessToken } = useAccessTokenContext();

    const { data: session, status} = useSession()

    const handleSignIn = async () => {
        try {
            await signIn("google", { redirect: false });
        } catch (error) {
            throw error;
        }
    };

    const handleGoogleLogin = async () => {
        const session_key = session.user.email;
        const session_password = "";

        await fetchLoginData({ router, session_key, session_password, setError, setAccessToken });
    }

    useEffect(() => {
        if (session) {
            handleGoogleLogin();
        }
    }, [session]);

    return (
        <div className="flex flex-col px-[10px] py-[2px]">
            <div className="mb-[16px]">
                <p className="text-[12px] text-gray-500">
                    By clicking Continue, you agree to Recial’s &nbsp;
                    <a href="" className="text-lime-500 hover:text-lime-700 transition-all">
                        User Agreement
                    </a>
                    , &nbsp;
                    <a href="" className="text-lime-500 hover:text-lime-700 transition-all">
                        Privacy Policy
                    </a>
                    , and &nbsp;
                    <a href="" className="text-lime-500 hover:text-lime-700 transition-all">
                        Cookie Policy
                    </a>.
                </p>
            </div>
            <div className="flex items-center justify-center mb-[16px]">
                <button type="button"
                        className="w-full h-[40px] flex items-center px-[12px] border border-solid border-gray-200 rounded-full cursor-pointer hover:border-lime-300 hover:bg-lime-50 hover:bg-opacity-30 transition-all"
                        onClick={handleSignIn}>
                    <div className="w-full h-full flex flex-row items-center justify-center">
                        <div className="w-[18px] h-[18px] mr-[8px] rounded-full relative overflow-hidden">
                            <Image src={Google} alt="Google-Icon" fill={true} sizes="(max-width: 768px) 100vw" className="object-cover"/>
                        </div>
                        <div className="text-[14px]">
                            <p>Sign in with Google</p>
                        </div>
                    </div>
                </button>
            </div>
            {isLogin ? (
                <div className="flex items-center justify-center">
                    <a href="/auth/register"
                       className="w-full min-h-[48px] px-[24px] py-[12px] text-center text-[16px] font-semibold leading-normal border border-solid rounded-full hover:bg-zinc-100 transition-all">
                        New to Recial? Join now
                    </a>
                </div>
            ) : null}
            {isSignup ? (
                <div className="flex items-center justify-center px-[16px] pt-[16px] pb-[24px]">
                    <p className="text-[16px] text-center font-normal leading-normal">
                        Already on Recial? &nbsp;
                        <a href="/auth/login" className="text-lime-500 hover:text-lime-700">Sign in</a>
                    </p>
                </div>
            ) : null}
        </div>
    );
};

export default OAuthLogin;
