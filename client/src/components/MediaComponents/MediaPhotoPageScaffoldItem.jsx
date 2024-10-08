"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";

import { useMediaNavigation } from "@/hooks";
import { MediumNextButton, MediumPrevButton } from "@/components";

const MediaPhotoPageScaffoldItem = () => {
    const [url, setUrl] = useState(null);
    const [showPrevButton, setShowPrevButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        return setUrl(`${pathname}?${searchParams}`)
    }, [pathname, searchParams])

    const mediaProps = useSelector(state => state.media, shallowEqual);
    const { showPrev, showNext, handleExistClick, fetchPreviousMedia, fetchNextMedia } = useMediaNavigation(url)

    return (
        <>
            <div className="w-full h-full inset-0 opacity-50 absolute blur-lg z-0">
                <div className="w-full h-full relative">
                    <Image src={mediaProps?.media_url} alt={mediaProps?.media_url} fill={true} priority={true} sizes="(max-width: 768px) 100vw" className="object-cover"/>
                </div>
            </div>
            <div className="w-full h-full px-[80px] cursor-pointer select-none relative z-20">
                <div className="w-full h-full flex items-center justify-center bg-transparent overflow-hidden relative">
                    <div className="w-full h-full top-0 left-0 absolute">
                        <div className="w-full h-full relative">
                            <Image src={mediaProps?.media_url} alt={mediaProps?.media_url} fill={true} priority={true} sizes="(max-width: 768px) 100vw" className="object-cover"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="top-[20px] left-[20px] flex items-center justify-center cursor-pointer absolute z-50">
                <div className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded-xl overflow-hidden text-white bg-black/50 relative hover:bg-black/25 transition-all">
                    <i onClick={handleExistClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3}
                             stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </i>
                </div>
            </div>
            { mediaProps?.media_recent?.length > 1 ? (
                <div>
                    { showPrev && (
                        <div className="h-full top-0 left-[10px] flex items-center justify-center cursor-pointer absolute z-20" onMouseEnter={() => setShowPrevButton(true)} onMouseLeave={() => setShowPrevButton(false)}>
                            <div className="w-[60px] h-[60px] select-none relative">
                                { showPrevButton && (
                                    <MediumPrevButton onClick={fetchPreviousMedia}/>
                                ) }
                            </div>
                        </div>
                    ) }
                    { showNext && (
                        <div className="h-full top-0 right-[10px] flex items-center justify-center cursor-pointer absolute z-20" onMouseEnter={() => setShowNextButton(true)} onMouseLeave={() => setShowNextButton(false)}>
                            <div className="w-[60px] h-[60px] select-none relative">
                                { showNextButton && (
                                    <MediumNextButton onClick={fetchNextMedia}/>
                                ) }
                            </div>
                        </div>
                    ) }
                </div>
            ) : null }
        </>
    );
};

export default MediaPhotoPageScaffoldItem;