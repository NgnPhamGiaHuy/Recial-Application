import Link from "next/link";
import Image from "next/image";

import Favicon from "/public/images/Metadata/favicon.ico";

const HeaderLogo = ({ isLogoShowed }) => {
    return (
        <div>
            <div className={`${isLogoShowed ? "hidden" : "flex"} h-full ml-4 flex-row relative items-center z-0`}>
                <Link href="/" className="w-full h-full flex-center flex-col relative">
                    <div className="w-10 h-10 relative">
                        <Image src={Favicon} alt="logo-image" fill={true} sizes="(max-width: 768px) 100vw" className="object-contain"/>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default HeaderLogo;