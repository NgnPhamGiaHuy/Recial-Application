"use client"

import { useRef } from "react";

import { handleNewUserData } from "@/utils/handleNewData";
import { Header, UserAbout, UserProfileEdit } from "@/components";
import { useToggleState, useUserIdLayout, useWebSocket } from "@/hooks";

const UserAboutPage = ({ params }) => {
    const editProfileRef = useRef();

    const [showEditProfile, setShowEditProfile, handleShowEditProfile] = useToggleState(false);

    const { userData, setUserData, userProps, setUserProps, userCheck } = useUserIdLayout(params.userId);
    
    const handleState = {
        handleShowEditProfile: handleShowEditProfile,
    };

    const onDataReceived = async (data) => {
        await handleNewUserData(data, userData, setUserData);
    };

    useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL, onDataReceived);

    return (
        <div>
            {userData && (
                <Header userProps={userData}/>
            )}
            {userProps && (
                <>
                    <div className="mx-[128px] flex flex-col relative z-0 ">
                        <div className="top-[56px] min-h-[calc(100vh-88px)] flex flex-col relative">
                            <div className="min-h-[inherit] mb-[calc(-100vh-56px)] flex flex-col flex-shrink-0 items-stretch justify-start relative">
                                <div className="min-w-[900px] min-h-[inherit] flex flex-row flex-nowrap flex-shrink-0 grow items-stretch justify-start relative">
                                    <div className="w-full min-h-[inherit] flex flex-col flex-shrink grow basis-0 relative">
                                        <UserAbout userProps={userProps} userCheck={userCheck} handleState={handleState}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {showEditProfile && (
                            <UserProfileEdit userProps={userProps} editProfileRef={editProfileRef} handleState={handleState}/>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserAboutPage;