const getMessageData = async (messageId) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return console.error("Access token not found.");
        }

        const url = process.env.NEXT_PUBLIC_API_URL + `/api/v1/secure/messages/?message=${messageId}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();

            return { error: errorData.message || "Error fetch message" };
        }
    } catch (error) {
        return console.error(error);
    }
}

export default getMessageData;