"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

const HeaderNavigationItem = ({ itemProps }) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        const isClient = typeof window !== "undefined";

        if (isClient) {
            setUrl(window.location.href || document.URL);
        }
    }, []);

    const active = url === process.env.NEXT_PUBLIC_CLIENT_URL + itemProps.link;

    return (
        <li className={`${active ? "after:border-b-2 after:border-solid after:border-black after:w-full" : null} w-[112px] flex flex-col items-center`}>
            <Link href={itemProps.link} className={`${active ? "text-black" : "text-gray-500"} min-w-[80px] min-h-[52px] flex-center flex-col text-center relative bg-transparent hover:text-black transition-all`}>
                <div>
                    {itemProps.icon}
                </div>
                <span className="text-[12px] text-center leading-normal font-normal">{itemProps.title}</span>
            </Link>
        </li>
    );
};

export default HeaderNavigationItem;