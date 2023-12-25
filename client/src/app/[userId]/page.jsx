"use client"

import { useCallback, useRef, useState } from "react";

import { handleNewData } from "@/utils/handleNewData";
import { AsideUser, CreatePostDialog, Header, UserProfile } from "@/components";
import { usePostDataByUserId, useTokenRefresh, useUserIdLayout, useWebSocket } from "@/hooks";

const UserPage = ({params, asAProps}) => {
    useTokenRefresh();

    const createPostRef = useRef(null);

    const [showCreatePost, setMainCreatePost] = useState(false);

    const { userData, setUserData, userProps, isCurrentUser } = useUserIdLayout(params.userId);
    const { postByIdRef, postByUserIdProps, setPostByUserIdProps } = usePostDataByUserId(params.userId);

    const handleShowCreatePost = useCallback(() => {
        setMainCreatePost((prevShowMainCreatePost) => !prevShowMainCreatePost);
    }, []);

    const onDataReceived = async (data) => {
        await handleNewData(data, postByUserIdProps, setPostByUserIdProps)
    };

    useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL, onDataReceived);

    return (
        <div>
            {asAProps ? null : (
                <Header userProps={userData}/>
            )}
            {userProps ? (
                <>
                    <div className={`${asAProps ? "mr-[24px]" : "mx-[128px]"} flex flex-col relative z-0`}>
                        <div className={`${asAProps ? "top-0" : "top-[56px]"} min-h-[calc(100vh-88px)] flex flex-col relative`}>
                            <div className="min-h-[inherit] mb-[calc(-100vh-56px)] flex flex-col flex-shrink-0 items-stretch justify-start relative">
                                <div className="min-w-[900px] min-h-[inherit] flex flex-row flex-nowrap flex-shrink-0 grow items-stretch justify-start relative">
                                    <div className="w-full min-h-[inherit] flex flex-col flex-shrink grow basis-0 relative">
                                        <UserProfile userData={userData} userProps={userProps} postProps={postByUserIdProps} postByIdRef={postByIdRef} isCurrentUser={isCurrentUser} handleShowCreatePost={handleShowCreatePost}/>
                                    </div>
                                    <div className="w-[320px] min-h-[inherit] flex flex-col flex-nowrap flex-shrink-0 items-stretch justify-center relative">
                                        <div className="min-h-[inherit] flex flex-row flex-shrink flex-nowrap grow items-start justify-between basis-0 relative">
                                            <AsideUser userProps={userProps}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {showCreatePost ? (
                            <CreatePostDialog userProps={userProps} setUserProps={setUserData} createPostRef={createPostRef} handleShowCreatePost={handleShowCreatePost}/>
                        ) : null}
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default UserPage;