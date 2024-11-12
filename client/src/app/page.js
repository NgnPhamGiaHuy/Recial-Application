"use client"

import { useDispatch } from "react-redux";

import { handleNewPostData, handleNewUserData } from "@/utils";
import { Header, Aside, Main, CreatePostDialog, LoadingPageComponent } from "@/components";
import { useGetPostData, useUserData, useWithAuth, useUserProfileActions, useWebSocket } from "@/hooks";

const HomePage = () => {
    useGetPostData();

    const dispatch = useDispatch();
    const { userProps } = useUserData();
    const { profileActionRef, showCreatePost } = useUserProfileActions();

    const onDataReceived = async (data) => {
        await handleNewPostData(data, dispatch);
        await handleNewUserData(data, dispatch);
    };

    useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL, onDataReceived);

    if (!userProps) {
        return <LoadingPageComponent />
    }

    return (
        <div>
            <Header/>
            <div className="flex flex-col relative z-0 ">
                <div className="top-[56px] min-h-[calc(100vh-56px)] flex flex-col relative">
                    <div className="min-h-[inherit] mb-[calc(-100vh-56px)] flex flex-col relative">
                        <div
                            className="min-w-[320px] min-h-[inherit] flex flex-row flex-nowrap flex-shrink-0 items-stretch justify-center relative">
                            <div
                                className="min-h-[inherit] flex flex-row flex-shrink flex-nowrap grow items-start justify-between basis-0 relative">
                                <Aside/>
                                <Main/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {showCreatePost && <CreatePostDialog createPostRef={profileActionRef.createPostRef}/>}
            </div>
        </div>
    );
};

export default useWithAuth(HomePage);