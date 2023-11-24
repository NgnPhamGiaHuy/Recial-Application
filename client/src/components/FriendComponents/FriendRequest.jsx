import {FriendRequestItem} from "@/components";

const FriendRequest = ({friendRequestData}) => {
    return (
        <section className="flex flex-col rounded-md bg-white shadow-md relative">
            <div className="w-full h-full p-[12px] relative">
                <div className="w-full py-[8px] flex flex-row flex-auto items-center justify-between border-b border-solid border-zinc-200 relative">
                    <div className="flex flex-col items-center relative">
                        <span className="block text-[14px] text-left text-black font-semibold break-words relative leading-5">
                            <span className="overflow-x-hidden overflow-y-hidden relative">
                                Friend request
                            </span>
                        </span>
                    </div>
                    <a href="/friends" className="">
                        <span className="block text-[14px] text-left text-lime-500 font-semibold break-words relative leading-5 hover:text-lime-700 transition-all">
                            See all
                        </span>
                    </a>
                </div>
                <div>
                    {friendRequestData.map((value, index) => (
                        <FriendRequestItem key={index} friendRequestData={value}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FriendRequest;