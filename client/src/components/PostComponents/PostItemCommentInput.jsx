"use client"

import Link from "next/link";
import Image from "next/image";
import {useCallback, useState, useEffect, useRef} from "react";

const PostItemCommentInput = ({userProps, isReply}) => {
    const [commentInputText, setCommentInputText] = useState('');
    const [commentAllowSubmit, setCommentAllowSubmit] = useState(false);

    const commentInputContentEditableRef = useRef(null);

    const handleCommentInputTextChange = useCallback(() => {
        const inputText = commentInputContentEditableRef.current.innerText.trim();
        const wordCount = inputText.split(/\s+/).length;

        const isOverLimit = wordCount > 255;

        setCommentInputText(commentInputContentEditableRef.current.innerHTML);
        setCommentAllowSubmit(commentInputContentEditableRef.current.innerText.trim().length > 0);

        commentInputContentEditableRef.current.contentEditable = !isOverLimit;
    }, []);

    useEffect(() => {
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(commentInputContentEditableRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }, [commentInputText])

    return (
        <div className={`${isReply ? "ml-[44px]" : "mx-[16px]"} pt-[4px] pb-[8px] flex flex-row flex-shrink-0 items-start`}>
            <div className="mr-[4px] sm:my-[4px] my-[6px] flex-col justify-center relative">
                <Link href={userProps?.user?._id}>
                    <div className="sm:w-[44px] w-[40px] sm:h-[44px] h-[40px] overflow-hidden rounded-full relative">
                        <Image src={userProps?.user?.profile_picture_url} alt={`${userProps?.user?.profile_picture_url}-image`} fill={true} sizes="(max-width: 768px) 100vw" className="object-cover"/>
                    </div>
                </Link>
            </div>
            <div className="max-w-[700px] max-h-[50vh] min-h-[40px] my-[4px] flex flex-row flex-shrink flex-grow relative">
                <form action="" className="w-full h-full grow cursor-text relative">
                    <div className="w-full h-full px-[16px] py-[2px] rounded-3xl border-2 border-solid border-zinc-200 bg-white relative">
                        <div className="w-full h-full flex flex-wrap items-center relative">
                            <div className="w-auto max-h-[40vh] h-full pb-[8px] pt-[6px] text-[14px] text-black text-ellipsis flex flex-auto overflow-x-hidden overflow-y-scroll font-normal leading-5">
                                <div className="w-full h-full text-left outline-none whitespace-pre-wrap break-words relative" contentEditable={true} onInput={handleCommentInputTextChange} ref={commentInputContentEditableRef}>
                                </div>
                                <div className="top-[7px] overflow-x-hidden overflow-y-hidden text-zinc-500 text-ellipsis pointer-events-none absolute z-[1]">{commentInputText.length === 0 ? "Add a comment..." : null}
                                </div>
                            </div>
                            <div className="h-full ml-auto flex flex-row items-center justify-between relative">
                                <div className="w-[44px] h-[36px] flex flex-col items-center justify-center text-zinc-500 rounded-full cursor-pointer relative hover:bg-zinc-200 transition-all">
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-7 h-7">
                                            <path d="M8 10.5A1.5 1.5 0 119.5 12 1.5 1.5 0 018 10.5zm6.5 1.5a1.5 1.5 0 10-1.5-1.5 1.5 1.5 0 001.5 1.5zm7.5 0A10 10 0 1112 2a10 10 0 0110 10zm-2 0a8 8 0 10-8 8 8 8 0 008-8zm-8 4a6 6 0 01-4.24-1.76l-.71.76a7 7 0 009.89 0l-.71-.71A6 6 0 0112 16z"></path>
                                        </svg>
                                    </i>
                                </div>
                                <div className="w-[44px] h-[36px] flex flex-col items-center justify-center text-zinc-500 rounded-full cursor-pointer relative hover:bg-zinc-200 transition-all">
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                        </svg>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostItemCommentInput;