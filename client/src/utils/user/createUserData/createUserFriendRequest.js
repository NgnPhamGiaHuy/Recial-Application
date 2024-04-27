const createUserFriendRequest = async (friendId) => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return console.error("Access token not found.");
        }

        const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/secure/user/friend-request/";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({friendId}),
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            return console.error(errorData.message || "Error create user friend request data");
        }
    } catch (error) {
        return console.error(error);
    }
};

export default createUserFriendRequest;