"use client"

import { AuthHeader, AuthLoginForm } from "@/components";
import { useCheckAccessToken, useSignup } from "@/hooks";

const Signup = () => {
    const { error, setError, handleSubmit, handleChange } = useSignup();
    
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