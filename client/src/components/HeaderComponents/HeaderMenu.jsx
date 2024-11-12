"use client"

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { HeaderMenuSectionItem } from "@/components";
import { toggleHeaderMenu } from "@/store/actions/toggle/toggleActions";

import HEADER_MENU_SOCIAL from "@/constants/MenuConstants/MenuSocial";
import HEADER_MENU_PERSONAL from "@/constants/MenuConstants/MenuPersonal";

const HeaderMenu = ({ forwardedRef }) => {
    const dispatch = useDispatch();

    const variants = {
        hidden: { x: "100%", opacity: 0 },
        exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
        visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20 } },
    }

    return (
        <div className="fixed inset-0 mt-14 bg-black/75 z-50">
            <motion.div ref={forwardedRef} variants={variants} initial="hidden" animate="visible" exit="exit"
                        className="absolute top-0 right-0 w-[380px] max-w-full h-[calc(100vh-56px)] flex flex-col rounded-l-xl bg-white shadow-lg border border-solid border-black overflow-hidden">
                <div className=" py-2 px-3 pr-12 flex-between text-black">
                    <h1 className="text-2xl font-semibold leading-6">Menu</h1>
                    <button type="button" className="absolute top-2 right-2 w-8 h-8 flex-center rounded-full hover:bg-zinc-200 transition-all" onClick={() => dispatch(toggleHeaderMenu())}>
                        <XMarkIcon width={24} height={24} />
                    </button>
                </div>
                <div className="flex flex-col flex-grow px-3 py-2 overflow-auto">
                    { renderSection("Social", HEADER_MENU_SOCIAL) }
                    { renderSection("Personal", HEADER_MENU_PERSONAL) }
                </div>
            </motion.div>
        </div>
    );
};

const renderSection = (title, items) => (
    <section className="mt-3 bg-white border border-solid border-gray-200 rounded-xl">
        <header className="px-6 py-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold">{title}</h2>
        </header>
        <ul className="flex flex-wrap p-2">
            { items.map((value, index) => (
                <HeaderMenuSectionItem key={index} sectionItemData={value} />
            )) }
        </ul>
    </section>
);

export default HeaderMenu;