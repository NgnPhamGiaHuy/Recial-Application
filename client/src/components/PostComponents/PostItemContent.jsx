import Link from "next/link";
import Image from "next/image";

import { useOverflowText } from "@/hooks";
import { calculateAttachmentStyles } from "@/utils";

const PostItemContent = ({ contentRef, props }) => {
    const {textRef, showMoreText, isOverflowing, handleShowMoreText} = useOverflowText();

    return (
        <div ref={contentRef}>
            {props.postProps?.post?.post_content && (
                <div className="px-[16px] pb-[16px] pt-[4px]">
                    <div className="flex flex-col relative">
                        <span className="block text-[15px] text-black text-left font-normal break-words leading-5 relative">
                            <div>
                                <span ref={textRef} className={`${showMoreText ? "" : "line-clamp-5"} webkit-box`}>
                                    {props.postProps?.post?.post_content}
                                </span>
                            </div>
                            <div>
                                <span>
                                    {props.postProps?.postTags?.map((value, index) => (
                                        <a key={index} href="" className="mr-[4px] text-lime-500 hover:text-lime-700 transition-all">
                                            #{value}
                                        </a>
                                    ))}
                                </span>
                            </div>
                            {!showMoreText && isOverflowing ? (
                                <span className="text-[16px] text-zinc-500 font-semibold break-words cursor-pointer relative leading-5 hover:underline transition-all" onClick={handleShowMoreText}>
                                        <span className="overflow-hidden relative">
                                            See more
                                        </span>
                                    </span>
                            ) : showMoreText && isOverflowing ? (
                                <span className="text-[16px] text-zinc-500 font-semibold break-words cursor-pointer relative leading-5 hover:underline transition-all" onClick={handleShowMoreText}>
                                        <span className="overflow-hidden relative">
                                            See less
                                        </span>
                                    </span>
                            ) : null}
                        </span>
                    </div>
                </div>
            )}
            <div className="mt-[8px] px-[6px]">
                {(props.postProps?.photo && props.postProps?.photo?.length) ? (
                    <div className="w-full h-0 pt-[75%] block overflow-hidden bg-white relative">
                        {props.postProps?.photo?.length === 1 ? (
                            <Link href={`/post/?user=${props.postProps?.post?.user?._id}&post=${props.postProps?.post?._id}&photo=${props.postProps?.photo[0]._id}`}>
                                <div className="w-full h-full top-0 left-0 block absolute">
                                    <div className="w-full h-full flex overflow-hidden relative">
                                        <Image src={props.postProps?.photo[0]?.photo_url} alt={`${props.postProps?.photo[0]?.photo_url}-image`} fill={true} sizes="(max-width: 768px) 100vw" className="w-full h-full object-cover object-center rounded-xl bg-no-repeat"/>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            props.postProps?.photo?.map((value, index) => {
                                const { insetStyles, width, height } = calculateAttachmentStyles(props.postProps?.photo?.length, index);

                                return (
                                    <Link key={index} href={`/post/?user=${props.postProps?.post?.user?._id}&post=${props.postProps?.post?._id}&photo=${props.postProps?.photo[0]._id}`}>
                                        <div className="p-[4px] block absolute" style={{...insetStyles, width, height}}>
                                            <div className="relative w-full h-full">
                                                <Image src={value?.photo_url} alt={`${value?.photo_url}-image`} fill={true} sizes="(max-width: 768px) 100vw" className="object-cover rounded-xl"/>
                                                {props.postProps?.photo?.length > 6 && index === 4 ? (
                                                    <div className="absolute inset-0 rounded-xl bg-gray-900 bg-opacity-60 transition-opacity">
                                                        <div className="w-full h-full flex items-center justify-center relative">
                                                            <span className="block text-[32px] text-white font-semibold break-words leading-10">
                                                                <span className="overflow-hidden relative">
                                                                    +{props.postProps?.photo?.length - index - 1}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default PostItemContent;