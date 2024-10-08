import Link from "next/link";
import Image from "next/image";

const AsideItem = ({ userProps }) => {
    return(
        <li>
            <div className="px-[8px]">
                <Link href={userProps.link} className="block rounded-md hover:bg-zinc-200 transition-all">
                    <div className="min-h-[48px] px-[8px] flex flex-row items-center justify-between relative">
                        <div className="my-[6px] mr-[12px] flex flex-col self-center relative">
                            <div className="w-[32px] h-[32px] flex flex-row items-center justify-center rounded-md overflow-hidden relative">
                                <Image src={userProps.icon} alt={`${userProps.icon}-image`} fill={true} sizes="(max-width: 768px) 100vw" className="object-cover"/>
                            </div>
                        </div>
                        <div className="flex flex-row flex-shrink grow items-center justify-between self-stretch relative">
                            <div className="py-[8px] flex flex-col flex-shrink grow basis-0 items-stretch justify-between relative">
                                <div className="my-[-5px] flex flex-col">
                                    <div className="my-[5px]">
                                        <span className="block text-[16px] text-black text-left font-medium break-words leading-5">
                                            <span className="overflow-hidden line-clamp-2 relative">
                                                {userProps.title}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </li>
    )
}

export default AsideItem;