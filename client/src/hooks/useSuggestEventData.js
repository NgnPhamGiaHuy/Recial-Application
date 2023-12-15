import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const useSuggestPageData = () => {
    const router = useRouter();
    const [suggestEvent, setSuggestEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                if (!accessToken) {
                    return router.push("/auth/login");
                }

                const url = process.env.NEXT_PUBLIC_API_URL + "/api/suggest/event";

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    return setSuggestEvent(await response.json());
                } else {
                    if (response.status === 401) {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        return router.push('/auth/login');
                    }
                    console.log("Error fetching user data");
                }
            } catch (error) {
                throw error;
            }
        }

        fetchData();
    }, [router]);

    return suggestEvent;
}

export default useSuggestPageData;