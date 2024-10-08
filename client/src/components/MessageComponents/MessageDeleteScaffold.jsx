import { MessageScaffoldItemDeleteButton, XMarkIcon } from "@/components";

const MessageDeleteScaffold = ({ width, title, subtitle, forwardRef, handleShowScaffold, handleDeleteFunction }) => {
    return (
        <div className="z-[9999] relative">
            <div className="top-0 right-0 bottom-0 left-0 z-0 fixed bg-[rgba(0,0,0,0.25)]">
                <div className="min-h-screen flex flex-col grow items-stretch justify-center relative">
                    <div className="min-h-[500px] px-[8px] pt-[56px] flex items-start justify-center animate-slideInTop">
                        <div ref={forwardRef} className="flex flex-col rounded-lg shadow-[0px_0px_0px_1px_rgb(140_140_140/0.2)] overflow-hidden bg-white relative">
                            <div className="overflow-hidden relative" style={{ width: width + "px" }}>
                                <div className="w-full h-full flex flex-col grow relative">
                                    <div className="w-full min-h-[60px] flex items-center justify-between border-b border-solid border-zinc-300 relative">
                                        <div className="w-[36px] h-[36px] mx-[16px]"></div>
                                        <div className="flex flex-col items-center justify-center relative">
                                            <span className="block text-[20px] text-black text-center font-bold break-words relative leading-6">
                                               {title}
                                            </span>
                                        </div>
                                        <div className="w-[36px] h-[36px] mx-[16px]">
                                            <div className="w-full h-full flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 cursor-pointer overflow-hidden relative transition-all"
                                                onClick={handleShowScaffold}>
                                                <XMarkIcon fill="none" stroke="currentColor" strokeWidth={2} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="min-h-[50px] flex flex-col grow relative">
                                        <div className="px-[16px] py-[12px] relative">
                                            <span className="block text-[15px] text-black text-left font-normal break-words relative leading-5">
                                                <span className="overflow-hidden relative">
                                                    { subtitle }
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col grow relative">
                                        <div className="p-[16px] flex flex-col flex-shrink-0 relative">
                                            <div className="flex flex-wrap flex-shrink-0 items-stretch justify-end gap-2 relative">
                                                <MessageScaffoldItemDeleteButton title="Cancle" isColor={false} onClick={handleShowScaffold}/>
                                                <MessageScaffoldItemDeleteButton title="Delete" isColor={true} onClick={handleDeleteFunction}/>
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

export default MessageDeleteScaffold;