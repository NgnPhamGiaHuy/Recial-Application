import Link from "next/link";
import Image from "next/image";

import { ArrowUpRightOnSquareIcon } from "@/components";

const SuggestPageItem = ({ pageProps }) => {
    return (
        <div className="w-full h-full p-[12px] relative">
            <div className="w-full flex flex-col justify-between relative">
                <Link href={`/pages/${pageProps?._id}`} className="w-full h-[200px] rounded-lg border border-solid border-zinc-300 overflow-hidden group relative">
                    <Image src={pageProps?.page_cover_picture_url} alt={`${pageProps?.page_cover_picture_url}-image`} fill={true} sizes="(max-width: 768px) 100vw" className="p-[4px] rounded-xl object-cover"/>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
                </Link>
                <div className="mt-[12px] flex flex-col items-center justify-between relative">
                    <div className="w-full h-full flex flex-col flex-shrink grow basis-auto relative">
                        <div className="flex flex-col justify-center cursor-pointer">
                            <Link href={`/pages/${pageProps?._id}`}>
                                <div className="h-[36px] px-[12px] flex flex-row flex-nowrap items-center justify-center rounded-xl bg-zinc-200 relative hover:bg-zinc-300 transition-all">
                                    <div className="mx-[3px] flex flex-shrink-0 items-center justify-center relative">
                                        <span className="block text-[15px] text-black font-semibold break-words relative leading-5">
                                            <ArrowUpRightOnSquareIcon/>
                                        </span>
                                    </div>
                                    <div className="mx-[3px] flex flex-shrink items-center justify-center relative">
                                        <span className="block text-[15px] text-black font-semibold break-words relative leading-5">
                                            <span className="overflow-hidden text-ellipsis line-clamp-1 relative">
                                                { pageProps?.page_name }
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuggestPageItem;