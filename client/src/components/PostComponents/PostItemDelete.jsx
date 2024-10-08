import { XMarkIcon } from "@/components";
import { handleDeletePostData } from "@/utils";

const PostItemDelete = ({ props, postDeleteRef, handleState }) => {
    return (
        <div className="z-[9999] relative">
            <div className="top-0 right-0 bottom-0 left-0 z-0 fixed bg-[rgba(0,0,0,0.25)]">
                <div className="min-h-screen flex flex-col grow items-stretch justify-center relative">
                    <div className="min-h-[500px] px-[8px] pt-[56px] flex items-start justify-center animate-slideInTop">
                        <div className="flex flex-col rounded-lg shadow-[0px_0px_0px_1px_rgb(140_140_140/0.2)] overflow-hidden bg-white relative">
                            <div ref={postDeleteRef} className="w-[500px] overflow-hidden relative">
                                <div className="w-full h-full flex flex-col grow relative">
                                    <div className="w-full min-h-[60px] flex items-center justify-between border-b border-solid border-zinc-300 relative">
                                        <div className="w-[36px] h-[36px] mx-[16px]"></div>
                                        <div className="flex flex-col items-center justify-center relative">
                                            <span className="block text-[20px] text-black text-center font-bold break-words relative leading-6">
                                                Delete this post?
                                            </span>
                                        </div>
                                        <div className="w-[36px] h-[36px] mx-[16px]">
                                            <div className="w-full h-full flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 cursor-pointer overflow-hidden relative transition-all" onClick={handleState.handleShowPostItemDelete}>
                                                <XMarkIcon fill="none" stroke="currentColor" strokeWidth={2} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="min-h-[50px] flex flex-col grow relative">
                                        <div className="px-[16px] py-[12px] relative">
                                            <span className="block text-[15px] text-black text-left font-normal break-words relative leading-5">
                                                <span className="overflow-hidden relative">
                                                    Are you absolutely certain you want to proceed with the deletion of this post? This action cannot be undone and the post will be permanently removed from your social media profile
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col grow relative">
                                        <div className="p-[16px] flex flex-col flex-shrink-0 relative">
                                            <div className="flex flex-wrap flex-shrink-0 items-stretch justify-end relative">
                                                <div className="pr-[8px] flex flex-col flex-shrink-0 basis-0 relative">
                                                    <div className="w-full flex flex-col justify-center relative">
                                                        <div className="h-[36px] px-[12px] flex flex-row flex-shrink-0 items-center justify-center rounded-md hover:bg-zinc-100 cursor-pointer relative transition-all" onClick={handleState.handleShowPostItemDelete}>
                                                            <span className="block text-[15px] text-lime-500 text-center font-semibold break-words relative leading-5">
                                                                Cancel
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col flex-shrink-0 basis-0 relative">
                                                    <div className="w-full flex flex-col justify-center relative">
                                                        <div className="h-[36px] px-[40px] flex flex-row flex-shrink-0 items-center justify-center rounded-md bg-lime-500 hover:bg-lime-700 cursor-pointer relative transition-all" onClick={() => handleDeletePostData(props.postProps?.post?._id, handleState.handleShowPostItemDelete)}>
                                                            <span className="block text-[15px] text-white text-center font-semibold break-words relative leading-5">
                                                                Delete
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItemDelete;