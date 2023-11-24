import {FriendScaffoldEventItem, FriendScaffoldProfileItem} from "@/components";

const FriendScaffoldItem = ({userData}) => {
    return (
        <div className="w-full h-full mb-[32px]">
            <div className="min-h-[32px] flex flex-row items-center justify-between relative">
                <div className="flex flex-col justify-between relative">
                    <span className="block text-[16px] text-left text-black font-normal break-words relative leading-5">
                        <span className="overflow-x-hidden overflow-y-hidden whitespace-nowrap text-ellipsis relative">
                            {userData.location ? (
                                `People you may know in ${userData.location} Area`
                            ) : (userData.job_name ? (
                                `More suggestion related to your ${userData.job_name} job`
                            ) : (
                                "Audio events for you"
                            ))}
                        </span>
                    </span>
                </div>
                <div className="px-[8px] py-[6px] flex flex-col justify-center rounded-md cursor-pointer relative hover:bg-zinc-200">
                    <span className="block text-[16px] text-left text-zinc-500 font-bold break-words relative leading-5">
                        <span className="overflow-x-hidden overflow-y-hidden whitespace-nowrap text-ellipsis relative">
                            See more
                        </span>
                    </span>
                </div>
            </div>
            {userData.user ? (
                <ul className="mb-[48px] grid lg:grid-cols-3 xl:grid-cols-5 gap-5 relative">
                    {userData.user.map((value, index) => (
                        <FriendScaffoldProfileItem key={index} userData={value}/>
                    ))}
                </ul>
            ) : (
                <ul className="mb-[48px] grid lg:grid-cols-3 xl:grid-cols-4 gap-5 relative">
                    {userData.slice(0, 8).map((value, index) => (
                        <FriendScaffoldEventItem key={index} userData={value}/>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default FriendScaffoldItem;