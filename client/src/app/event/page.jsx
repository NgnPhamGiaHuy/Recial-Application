"use client"

import { useEventData, useUserData, useWithAuth } from "@/hooks";
import { EventAside, EventAsideActivity, EventScaffold, Header, LoadingPageComponent } from "@/components";

const EventPage = () => {
    useEventData();

    const { userProps } = useUserData();

    return (
        <>
            { userProps ? (
                <div>
                    <Header/>
                    <div className="flex flex-col relative z-0">
                        <div className="top-[56px] min-h-[calc(100vh-88px)] flex flex-col relative">
                            <div className="min-h-[inherit] mb-[calc(-100vh-56px)] flex flex-col flex-shrink-0 items-stretch justify-start relative">
                                <div className="min-w-[900px] min-h-[inherit] flex flex-row flex-nowrap flex-shrink-0 grow items-stretch justify-start relative">
                                    <div className="w-[calc(260px+12px)] min-h-[inherit] flex flex-col flex-nowrap flex-shrink-0 items-stretch justify-center relative">
                                        <div className="min-h-[inherit] flex flex-row flex-shrink flex-nowrap grow items-start justify-between basis-0 relative">
                                            <EventAside/>
                                        </div>
                                    </div>
                                    <div className="min-h-[inherit] flex flex-col flex-shrink grow basis-0 relative">
                                        <EventScaffold/>
                                    </div>
                                    <div className="w-[calc(300px+12px)] min-h-[inherit] flex flex-col flex-nowrap flex-shrink-0 items-stretch justify-center relative">
                                        <div className="min-h-[inherit] flex flex-row flex-shrink flex-nowrap grow items-start justify-between basis-0 relative">
                                            <EventAsideActivity/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <LoadingPageComponent/>
            ) }
        </>
    );
};

export default useWithAuth(EventPage);