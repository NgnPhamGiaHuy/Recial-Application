"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const useCheckAccessToken = (WrappedComponent) => {
    const ControlledComponent = (props) => {
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const checkAccess = async () => {
                try {
                    const accessToken = localStorage.getItem("accessToken");

                    if (accessToken) {
                        return router.push("/");
                    } else {
                        return setIsLoading(false);
                    }
                } catch (error) {
                    console.error("Error checking access token: ", error);

                    return router.push("/");
                }
            }

            checkAccess();
        }, [router]);

        return isLoading ? null : <WrappedComponent {...props} />;
    };

    return ControlledComponent;
};

export default useCheckAccessToken;