"use client"

import Image from "next/image";
import React, {useCallback, useEffect, useRef, useState} from "react";

import {HeaderQuickSettingItem} from "@/components";
import {headerMessageQuickSettingItemList} from "@/constants/HeaderConstants";

const HeaderMessageContentItem = ({messageImage, messageFrom, messageRecentContent, messageRecentContentTime, messageHasBeenMuted, messageHasBeenRead}) => {
    const messageQuickSettingItemButtonRef = useRef();

    const [showHeaderMessageItemQuickSetting, setShowHeaderMessageItemQuickSetting] = useState(false);
    const [showHeaderMessageContentItemMoreButton, setShowHeaderMessageContentItemMoreButton] = useState(false);

    const handleShowHeaderMessageItemQuickSettingButton = useCallback(()=> {
        setShowHeaderMessageItemQuickSetting((preShowHeaderMessageItemQuickSetting) => !preShowHeaderMessageItemQuickSetting);
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (messageQuickSettingItemButtonRef.current && !messageQuickSettingItemButtonRef.current.contains(event.target)){
                setShowHeaderMessageItemQuickSetting(false);
            }
        }

        if (showHeaderMessageItemQuickSetting){
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return() =>{
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [showHeaderMessageItemQuickSetting])

    return (
        <li className="relative" onMouseOver={() => setShowHeaderMessageContentItemMoreButton(true)} onMouseOut={() => setShowHeaderMessageContentItemMoreButton(false)}>
            <div className="px-[8px] relative">
                <div className="flex flex-col flex-shrink-0 grow relative">
                    <a href="" className="block relative">
                        <div className="flex flex-col items-stretch p-[8px] m-[-6px]">
                            <div className="flex flex-row flex-shrink-0 flex-nowrap items-center justify-between relative rounded-md hover:bg-zinc-100 transition-all">
                                <div className="flex flex-col flex-shrink-0 relative p-[6px]">
                                    <div className="w-[56px] h-[56px] relative cursor-pointer">
                                        <div className="w-full h-full absolute">
                                            <div className="w-full h-full overflow-x-hidden overflow-y-hidden block rounded-full bg-white border border-solid border-gray-500 relative">
                                                <div className="w-full h-full flex flex-col relative">
                                                    <Image src={messageImage} alt={messageImage} fill className="object-cover"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row flex-shrink flex-wrap grow basis-auto items-center justify-between relative">
                                    <div className="max-w-full flex flex-col flex-shrink-0 grow relative p-[6px]">
                                        <span className="block text-[15px] text-black text-left font-medium break-words leading-5">
                                            <span className="block overflow-x-hidden overflow-y-hidden whitespace-nowrap text-ellipsis relative">
                                                {messageFrom}
                                            </span>
                                        </span>
                                        <div className="min-h-[16px] flex flex-row items-center pt-[6px]">
                                            <span className="flex items-center break-words pr-[2px]">
                                                <span className="block text-[14px] text-gray-500 font-normal break-words leading-4">
                                                    <span className="max-w-[150px] block overflow-x-hidden overflow-y-hidden whitespace-nowrap text-ellipsis relative">
                                                        {messageRecentContent}
                                                    </span>
                                                </span>
                                            </span>
                                            <span className="flex items-center break-words">
                                                <span className="block text-[13px] text-gray-500 font-normal break-words leading-4 mx-[4px]">
                                                    <span className="block overflow-x-hidden overflow-y-hidden whitespace-nowrap text-ellipsis relative">
                                                        <span> · </span>
                                                    </span>
                                                </span>
                                            </span>
                                            <span className="flex items-center break-words pl-[2px]">
                                                <span className="block text-[14px] text-gray-500 font-normal break-words leading-4">
                                                    <span className="block overflow-x-hidden overflow-y-hidden whitespace-nowrap text-ellipsis line-clamp-1 relative">
                                                        {messageRecentContentTime}
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-shrink-0 relative p-[6px]">
                                    <div className="flex flex-row flex-nowrap items-center">
                                        <i className="w-[20px] h-[20px] flex items-center justify-center rounded-full overflow-hidden relative">
                                            {messageHasBeenMuted ?
                                                (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.964 8.964 0 002.3-5.542m3.155 6.852a3 3 0 005.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 003.536-1.003A8.967 8.967 0 0118 9.75V9A6 6 0 006.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
                                                </svg>
                                                ) : messageHasBeenRead ?
                                                    (<Image src={messageImage} alt={messageImage} fill className="object-cover"/>
                                                    ) : " "}
                                        </i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div>
                    <div className={`${showHeaderMessageContentItemMoreButton ? "w-[36px] h-[36px] -translate-y-1/2" : "w-[1px] h-[1px] overflow-x-hidden overflow-y-hidden"} top-[50%] right-[48px] flex absolute`}>
                        <div className="ml-[8px]">
                            <div>
                                <div className="rounded-full">
                                    <div ref={messageQuickSettingItemButtonRef}
                                         className="w-[36px] h-[36px] flex justify-center items-center text-gray-500 cursor-pointer rounded-full bg-white shadow-md border border-solid border-gray-200 relative hover:bg-zinc-100 transition-all"
                                         onClick={handleShowHeaderMessageItemQuickSettingButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {showHeaderMessageItemQuickSetting ? (
                    <div ref={messageQuickSettingItemButtonRef} className="absolute top-0 left-0 translate-x-[10px] translate-y-[-265px] z-50">
                        <div className="relative mt-[15px] rounded-l-md rounded-r-md shadow-[rgba(0,_0,_0,_0.24)_4px_7px_50px_1px]">
                            <div className="overflow-x-hidden overflow-y-hidden rounded-l-md rounded-r-md bg-white">
                                <div className="flex flex-col grow items-stretch origin-top-left relative">
                                    <div className="w-[344px] py-[8px] overflow-x-hidden overflow-y-auto overscroll-y-contain flex flex-col relative">
                                        <div className="flex flex-col grow relative">
                                            {headerMessageQuickSettingItemList.map((value, index) => (
                                                <HeaderQuickSettingItem key={index} settingItemData={value}/>
                                            ))}
                                            {/*<div className="mx-[16px] mt-[4px] h-[1px] bg-zinc-300"></div>*/}
                                            {/*<div className="mx-[8px] p-[8px] flex flex-row flex-shrink-0 items-center cursor-pointer rounded-md hover:bg-zinc-100 transition-all relative">*/}
                                            {/*    <div className="mr-[12px] flex items-center align-baseline justify-center">*/}
                                            {/*        <i className="w-[20px] h-[20px] flex items-center justify-center overflow-hidden relative">*/}
                                            {/*            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">*/}
                                            {/*                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />*/}
                                            {/*            </svg>*/}
                                            {/*        </i>*/}
                                            {/*    </div>*/}
                                            {/*    <div className="flex flex-row grow items-center justify-between">*/}
                                            {/*        <div className="flex flex-col">*/}
                                            {/*            <span className="block text-[15px] text-black text-left font-medium break-words">*/}
                                            {/*                Audio chat*/}
                                            {/*            </span>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            {/*<div className="mx-[8px] p-[8px] flex flex-row flex-shrink-0 items-center cursor-pointer rounded-md hover:bg-zinc-100 transition-all relative">*/}
                                            {/*    <div className="mr-[12px] flex items-center align-baseline justify-center">*/}
                                            {/*        <i className="w-[20px] h-[20px] flex items-center justify-center overflow-hidden relative">*/}
                                            {/*            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">*/}
                                            {/*                <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />*/}
                                            {/*            </svg>*/}
                                            {/*        </i>*/}
                                            {/*    </div>*/}
                                            {/*    <div className="flex flex-row grow items-center justify-between">*/}
                                            {/*        <div className="flex flex-col">*/}
                                            {/*            <span className="block text-[15px] text-black text-left font-medium break-words">*/}
                                            {/*                Video chat*/}
                                            {/*            </span>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <svg height="12" viewBox="0 0 21 12" width="21" className="absolute right-0 bottom-[calc(100%-1)] scale-x-[-1] scale-y-[1] translate-x-[-60px] translate-y-[-1px]" fill="white">
                                <path d="M20.685.12c-2.229.424-4.278 1.914-6.181 3.403L5.4 10.94c-2.026 2.291-5.434.62-5.4-2.648V.12h20.684z"></path>
                            </svg>
                        </div>
                    </div>
                ) : ""}
            </div>

        </li>
    );
};

export default HeaderMessageContentItem;