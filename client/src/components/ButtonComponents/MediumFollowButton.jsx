"use client"

import { Tooltip } from "react-tooltip";

const MediumFollowButton = () => {
    return (
        <div className="w-[180px]">
            <div className="flex justify-center cursor-pointer relative">
                <div data-tooltip-id="follow-button" data-tooltip-content="Follow" className="w-full h-[36px] px-[40px] flex flex-row flex-nowrap items-center justify-center rounded-xl bg-lime-500 hover:bg-lime-700 overflow-hidden relative transition-all">
                    <div className="flex flex-row items-center justify-center text-white gap-2 relative">
                        <div className="w-[16px] h-[16px] flex items-center justify-center overflow-hidden relative">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" className="w-4 h-4">
                                    <path fill="currentColor" d="M18.442 6.118h28.457c-.13-1.829-1.176-2.808-3.179-2.808h-22.1c-2.003 0-3.048.98-3.178 2.808m-4.268 6.031h36.992c-.326-1.98-1.262-3.07-3.44-3.07H17.614c-2.177 0-3.113 1.09-3.44 3.07m34.99 3.528H16.155c-4.573 0-6.837 2.242-6.837 6.75v8.556a15.895 15.895 0 0 1 1.742-.109c.588 0 1.175.044 1.763.109V22.6c0-2.264 1.22-3.418 3.375-3.418h32.92c2.134 0 3.375 1.154 3.375 3.418v22.753c0 2.264-1.24 3.44-3.374 3.44H24.495A12.882 12.882 0 0 1 22.97 52.3h26.193c4.55 0 6.837-2.265 6.837-6.75V22.426c0-4.485-2.286-6.75-6.837-6.75M11.06 56c6.009 0 11.06-5.03 11.06-11.06c0-6.075-4.986-11.061-11.06-11.061C5.008 33.879 0 38.865 0 44.939C0 51.014 5.008 56 11.06 56m.021-3.876c-.762 0-1.437-.522-1.437-1.35v-4.507H5.487c-.74 0-1.35-.61-1.35-1.35c0-.718.61-1.328 1.35-1.328h4.158v-4.506c0-.828.675-1.329 1.437-1.329c.74 0 1.416.501 1.416 1.329v4.507h4.158c.74 0 1.328.61 1.328 1.328c0 .74-.588 1.35-1.328 1.35h-4.158v4.507c0 .827-.675 1.35-1.416 1.35"></path>
                                </svg>
                            </i>
                        </div>
                        <div className="flex flex-shrink-0 items-center justify-center relative">
                            <span className="block text-[14px] text-center font-semibold break-words relative leading-5">
                                Follow
                            </span>
                        </div>
                    </div>
                </div>
                <Tooltip id="follow-button" className="z-20"/>
            </div>
        </div>
    );
};

export default MediumFollowButton;