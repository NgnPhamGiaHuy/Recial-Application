import Link from "next/link";
import Image from "next/image";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";

const HeaderSearchHistoryItem = ({ searchHistoryProps }) => {
    const { search_image, search_query, user_news, user_news_number } = searchHistoryProps;

    return (
        <li className="w-full mb-1">
            <div className="flex items-center p-2 rounded-lg relative hover:bg-zinc-100 overflow-hidden">
                <Link href="" className="w-full">
                    <div className="flex items-center m-[-6px]">
                        <div className="p-1.5 flex-shrink-0">
                            { search_image ? (
                                <div className="w-9 h-9 rounded-full overflow-hidden relative">
                                    <Image src={search_image} alt={`${search_image}-image`} fill={true} sizes="(max-width: 768px) 100vw" className="object-cover"/>
                                </div>
                            ) : (
                                <div className="w-9 h-9 bg-zinc-100 rounded-full flex-center">
                                    <ClockIcon width={24} height={24} />
                                </div>
                            ) }
                        </div>
                        <div className="flex flex-col flex-grow p-1.5">
                            <span className="text-[15px] font-medium leading-5 line-clamp-2">{search_query}</span>
                            { search_image && user_news && (
                                <div className="mt-1 text-[13px] text-gray-500 flex items-center">
                                    <span className="w-2 h-2 bg-lime-500 rounded-full mr-2"></span>
                                    <span>
                                        { user_news_number === 1 ? `${user_news_number} new information` : `${user_news_number || 0} news information` }
                                    </span>
                                </div>
                            ) }
                        </div>
                        <div className="p-2 rounded-full cursor-pointer hover:bg-zinc-200 transition-all">
                            <XMarkIcon width={20} height={20} />
                        </div>
                    </div>
                </Link>
            </div>
        </li>
    );
};

export default HeaderSearchHistoryItem;