"use client"

import { useCallback, useState } from "react";

import {AsideFollowItem, AsideWeather, AsideShowMoreOrShowLessButton, AsideNavigation} from "@/components";

const Aside = ({ userProps }) => {
    const [asideFollowItemToShow, setAsideFollowItemToShow] = useState(3);
    const [asideNavigationItemsToShow, setAsideNavigationItemsToShow] = useState(6);

    const showMoreAsideFollowItem = useCallback((value) => {
        setAsideFollowItemToShow(value.length)
    }, [asideNavigationItemsToShow]);

    const showLessAsideFollowItem = useCallback(() => {
        setAsideFollowItemToShow(3)
    }, [setAsideNavigationItemsToShow]);

    return (
        <div className="max-w-[360px] min-w-[280px] top-[56px] sm:block hidden basis-[360px] overflow-x-hidden">
            <div className="max-h-[inherit] min-h-[inherit] flex flex-col relative">
                <div className="flex flex-col min-h-0 flex-shrink grow basis-full overflow-x-hidden overflow-y-auto overscroll-y-contain relative">
                    <div className="mt-[16px] flex flex-col grow relative">
                        <section>
                            <AsideWeather/>
                        </section>
                        <section>
                            <AsideNavigation/>
                        </section>
                        <div className="mx-[16px] mt-[4px] h-[1px] bg-zinc-300"></div>
                        <section>
                            <div className="pb-[8px]">
                                <div className="pt-[20px] pb-[4px] flex flex-col group relative">
                                    <div className="flex flex-col grow">
                                        <div className="px-[16px] flex flex-col flex-shrink-0 relative">
                                            <div className="my-[-5px] flex flex-col relative">
                                                <div className="my-[5px]">
                                                    <span className="block text-[16px] text-zinc-500 text-left font-bold break-words leading-5">
                                                        <div className="flex flex-row flex-nowrap items-center justify-between relative">
                                                            <div className="flex flex-col flex-shrink grow relative">
                                                                <span className="block text-[16px] text-zinc-500 text-left font-bold break-words leading-5">
                                                                    <span className="overflow-hidden line-clamp-2 whitespace-normal text-ellipsis relative">
                                                                        Your following
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <div className="ml-[8px] flex flex-col flex-shrink-0 items-center justify-center self-start relative">
                                                                <span className="p-[8px] opacity-0 group-hover:opacity-100 text-[14px] text-lime-500 text-left font-normal break-words leading-4 rounded-md cursor-pointer hover:bg-zinc-100">
                                                                    <span className="overflow-hidden line-clamp-2 whitespace-normal text-ellipsis relative">
                                                                        Edit
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {userProps?.user?.following?.length ? (
                                <>
                                    <ul>
                                        {userProps?.user?.following?.slice(0, asideFollowItemToShow).map((value, index) => (
                                            <AsideFollowItem key={index} userProps={value} hasNotificationBadge={true}/>
                                        ))}
                                    </ul>
                                    {asideFollowItemToShow === userProps?.user?.following?.length ? (
                                        <AsideShowMoreOrShowLessButton showMore={false} onClick={() => showLessAsideFollowItem()}/>
                                    ) : (
                                        <AsideShowMoreOrShowLessButton showMore={true} onClick={() => showMoreAsideFollowItem(userProps?.user?.following)}/>
                                    )}
                                </>
                            ) : null}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aside;