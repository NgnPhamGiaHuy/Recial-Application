"use client"
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { HeaderSearchHistory } from "@/components";
import { toggleHeaderSearchHistory } from "@/store/actions/toggle/toggleActions";

const HeaderSearchBar = ({ isSearchShowed, forwardRef }) => {
    const dispatch = useDispatch();

    const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "-10%" },
    }

    return (
        <div>
            <div className="sm:w-[320px] w-[48px] flex h-full">
                <div className="w-full h-full relative before:shadow-md">
                    <div className={`${isSearchShowed ? "shadow-xl" : null} w-full h-full sm:px-[16px] px-[4px] mb-[-8px] flex items-center`}>
                        <div className="w-full flex items-center">
                            <motion.div animate={ isSearchShowed ? { x: -4 } : { x: 0 } } transition={{ duration: 0.4 }} className={`${isSearchShowed ? "flex w-[34px] h-[34px] p-[8px]" : "hidden"} items-center justify-center rounded-xl hover:bg-zinc-200 cursor-pointer`}>
                                <ArrowLeftIcon width={20} height={20}/>
                            </motion.div>
                            <label className={`${isSearchShowed ? "w-full" : null} h-full min-w-[40px] min-h-[40px] flex items-center justify-center relative rounded-xl bg-zinc-100 z-10`}
                                htmlFor="headerSearchInput">
                                <motion.span animate={ isSearchShowed ? { x: -4 } : { x: 0 } } transition={{ duration: 0.4 }} className={`${isSearchShowed ? "hidden" : "flex"} w-auto items-center sm:pl-[12px]`}>
                                    <MagnifyingGlassIcon width={20} height={20}/>
                                </motion.span>
                                <span className={`${isSearchShowed ? "flex" : "hidden"} w-[22px]`}></span>
                                <input type="text" name="headerSearchInput" id="headerSearchInput"
                                       ref={forwardRef}
                                       placeholder="Search in Recial"
                                       onClick={() => dispatch(toggleHeaderSearchHistory())}
                                       className="w-full h-full px-[8px] pt-[7px] pb-[9px] sm:flex hidden outline-none bg-zinc-100 rounded-r-full"/>
                            </label>
                        </div>
                    </div>
                    <motion.div ref={forwardRef} animate={isSearchShowed ? "open" : "closed"} variants={variants} transition={{ duration: 0.4 }}>
                        { isSearchShowed && <HeaderSearchHistory/> }
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSearchBar;