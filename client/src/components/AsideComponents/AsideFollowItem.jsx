import Link from "next/link";
import Image from "next/image";

const AsideFollowItem = ({ userProps, hasNotificationBadge }) => {
    return(
        <li>
            <div className="px-[8px]">
                <Link href={`/${userProps?.user?._id}`} className="block rounded-md hover:bg-zinc-200 transition-all">
                    <div className="min-h-[48px] px-[8px] flex flex-row items-center justify-between relative">
                        <div className="my-[6px] mr-[12px] flex flex-col self-center relative">
                            <div className="w-[32px] h-[32px] flex flex-row items-center justify-center rounded-md overflow-hidden relative">
                                <Image src={userProps?.user?.profile?.profile_picture_url} alt={`${userProps?.user?.profile?.profile_picture_url}-image`} fill={true} sizes="(max-width: 768px) 100vw" className="object-cover"/>
                            </div>
                        </div>
                        <div className="flex flex-row flex-shrink grow items-center justify-between self-stretch relative">
                            <div className="py-[8px] flex flex-col flex-shrink grow basis-0 items-stretch justify-between relative">
                                <div className="my-[-5px] flex flex-col">
                                    <div className="my-[5px]">
                                        <span className="block text-[16px] text-black text-left font-medium break-words leading-5">
                                            <span className="overflow-hidden line-clamp-2 relative">
                                                {userProps?.user?.profile?.username || userProps?.user?.profile?.firstname + " " + userProps?.user?.profile?.lastname}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { hasNotificationBadge && (
                            <div className="my-[8px] ml-[12px] self-center relative">
                                <div className="flex flex-row items-center">
                                    <div className="w-[20px] pl-[4px] flex flex-row bg-transparent relative cursor-pointer">
                                        <span className={`bg-lime-500 w-[6px] h-[6px] inline-flex items-center justify-center rounded-full`}></span>
                                    </div>
                                </div>
                            </div>
                        ) }
                    </div>
                </Link>
            </div>
        </li>
    )
};

export default AsideFollowItem;