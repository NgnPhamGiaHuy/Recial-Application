"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useWithAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const accessToken = localStorage.getItem("accessToken");

                    if (!accessToken) {
                        return router.push("/auth/login")
                    } else {
                        return setIsLoading(false);
                    }
                } catch (error) {
                    console.error("Error checking auth token: ", error);

                    return router.push("auth/login")
                }
            }

            checkAuth();
        }, [router]);

        return isLoading ? null : <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default useWithAuth;
