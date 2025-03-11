"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { useCheckAccessToken } from "@/hooks";
import { AuthHeader } from "@/components";

import Illustration from "/public/images/Illustration/illustration-of-a-man-and-a-woman-watering-a-plant.jpg";

const OTPPage = ({ searchParams }) => {
    const router = useRouter();
    const email = searchParams.email;
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const inputsRef = useRef([]);

    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value.replace(/\D/g, ""); // Allow only digits

        if (value && index < 5) {
            // Auto-focus next input
            inputsRef.current[index + 1]?.focus();
        }
        setOtp(newOtp);
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, ""); // Only digits
        if (pastedData.length !== 6) return;

        const newOtp = pastedData.split("");
        setOtp(newOtp);

        // Focus last input
        inputsRef.current[5]?.focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            // Auto-focus previous input on backspace
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join(""); // Combine all input values

        if (otpValue.length !== 6) {
            setError("OTP must be 6 digits.");
            return;
        }

        try {
            const response = await axios.post("/api/v1/auth/verify-otp", { email, otp: otpValue });
            if (response.data.message === "OTP verified successfully.") {
                router.push("/auth/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to verify OTP.");
        }
    };

    return (
        <div className="max-w-screen w-screen max-h-screen h-screen bg-white">
            <div>
                <AuthHeader />
                <main className="h-[calc(100%-80px)] flex flex-col items-center justify-center relative overflow-hidden">
                    <section className="min-h-[560px] max-w-[1128px] flex flex-nowrap pt-[0px] items-center justify-center w-full h-full relative">
                        <div className="self-start relative flex-shrink-0 sm:w-[55%] w-full sm:pr-[42px]">
                            <div className={`p-[28px] flex flex-col rounded-[40px]`}>
                                <div>
                                    <div
                                        className={`sm:text-[56px] text-[36px] text-amber-400 font-extralight sm:leading-[67px] leading-[50px]`}>
                                        <h1>Verify your email address</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={`sm:w-[408px] w-fit mt-[24px] flex flex-col`}>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex justify-between mb-4">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onPaste={handlePaste}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                ref={(el) => (inputsRef.current[index] = el)}
                                                maxLength={1}
                                                className={`w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400`}
                                            />
                                        ))}
                                    </div>
                                    {error && (
                                        <div className="text-red-500 text-sm mt-2">{error}</div>
                                    )}
                                    <button
                                        type="submit"
                                        className="bg-amber-400 text-white py-2 px-4 rounded-lg mt-4 hover:bg-amber-500"
                                    >
                                        Verify OTP
                                    </button>
                                </form>
                            </div>
                        </div>
                        <Image
                            src={Illustration}
                            alt={`${Illustration}-image`}
                            width={600}
                            height={560}
                            priority={true}
                            className="w-auto h-auto hidden z-[1] relative flex-shrink object-cover lg:block"
                        />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default useCheckAccessToken(OTPPage);