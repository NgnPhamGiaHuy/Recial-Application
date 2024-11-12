"use client"

import { useHeaderInteractions } from "@/hooks";

import { HeaderMenu, MessageHeader, NotificationHeader, HeaderPersonalAccount, HeaderNavigationItem, HeaderControls, HeaderLogo, HeaderSearchBar } from "@/components";

import HEADER_NAVIGATION from "@/constants/HeaderConstants/HeaderNavigation";

const Header = ({ isMessageDisabled, isNotificationDisabled }) => {
    const actionProps = useHeaderInteractions();

    return (
        <header>
            <div className="h-[56px] top-0 left-0 fixed z-30">
                <div className="w-full h-full flex flex-row relative">
                    <HeaderLogo isLogoShowed={actionProps.showSearchHistory}/>
                    <HeaderSearchBar forwardRef={actionProps.headerRef.searchHistoryButtonRef} isSearchShowed={actionProps.showSearchHistory}/>
                </div>
            </div>
            <div className="w-full h-[56px] top-0 right-0 fixed shadow z-20 bg-white">
                <div className="w-full h-full flex flex-col justify-end relative z-0">
                    <ul className="w-full h-full sm:flex hidden flex-nowrap list-none items-center justify-center grow px-[110px]">
                        { HEADER_NAVIGATION.map((value, index) => (
                            <HeaderNavigationItem key={index} itemProps={value}/>
                        )) }
                    </ul>
                </div>
            </div>
            <div className="h-[56px] top-0 right-0 fixed z-20">
                <HeaderControls actionProps={actionProps} isMessageDisabled={isMessageDisabled} isNotificationDisabled={isNotificationDisabled}/>
                <div>
                    { actionProps.showMenu && <HeaderMenu forwardedRef={actionProps.headerRef.menuButtonRef}/> }
                </div>
                <div>
                    { (actionProps.showMessage && !isMessageDisabled) && <MessageHeader forwardedRef={actionProps.headerRef.messageButtonRef}/> }
                </div>
                <div>
                    { (actionProps.showNotification && !isNotificationDisabled) && <NotificationHeader forwardedRef={actionProps.headerRef.notificationButtonRef}/> }
                </div>
                <div>
                    { actionProps.showPersonalAccount && <HeaderPersonalAccount forwardedRef={actionProps.headerRef.personalAccountButtonRef}/> }
                </div>
            </div>
        </header>
    );
};

export default Header;