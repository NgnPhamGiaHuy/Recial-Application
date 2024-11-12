import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";

import { useGetUserDataFetcher } from "@/hooks";
import { setUserSearchData } from "@/store/actions/user/userActions";
import { HeaderSearchHistoryItem, LoadingComponent } from "@/components";

const HeaderSearchHistory = () => {
    const userProps = useSelector(state => state.user, shallowEqual);
    const { isLoading } = useGetUserDataFetcher("search", setUserSearchData);

    return (
        <div className="shadow-xl bg-white rounded-b-xl">
            <div className="max-h-[calc(500px-80px)] p-2 flex flex-col grow scroll-smooth">
                <div className="relative flex flex-col overflow-y-auto no-scrollbar z-0">
                    <div className="relative flex flex-col grow">
                        <ul className="flex flex-col grow space-y-4">
                            <li>
                                <div className="pb-1 px-2 flex flex-col relative z-0">
                                    <div className="flex-between">
                                        <h2 className="text-lg font-semibold leading-5">Recently</h2>
                                        <Link href="" className="ml-2 p-2 rounded-md cursor-pointer hover:text-lime-700 hover:bg-zinc-100 transition duration-300">
                                            <span className="text-[15px] text-lime-500 font-normal leading-5">Edit</span>
                                        </Link>
                                    </div>
                                </div>
                                <ul>
                                    { isLoading ? (
                                        <LoadingComponent/>
                                    ) : (
                                        userProps?.search?.map((value, index) => (
                                            <HeaderSearchHistoryItem key={index} searchHistoryProps={value}/>
                                        ))
                                    ) }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSearchHistory;