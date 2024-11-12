import Image from "next/image";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useNotificationCount } from "@/hooks";
import { MenuIcon, ChatBubbleInnerOuterIcon, BellAlertIcon, QuickHeaderButton } from "@/components";
import { toggleHeaderMenu, toggleHeaderMessage, toggleHeaderNotification, toggleHeaderPersonalAccount } from "@/store/actions/toggle/toggleActions";

const HeaderControls = ({ actionProps, isMessageDisabled, isNotificationDisabled }) => {
    const dispatch = useDispatch();
    const notificationUnreadCount = useNotificationCount();

    const userProps = useSelector(state => state.user, shallowEqual);

    return (
        <>
            <div className="h-full pr-[16px] pl-[4px] flex flex-row items-center">
                <QuickHeaderButton icon={<MenuIcon/>} forwardRef={actionProps.headerRef.menuButtonRef} toggleAction={actionProps.showMenu} toggleOnClick={() => dispatch(toggleHeaderMenu())}/>
                { !isMessageDisabled && (
                    <QuickHeaderButton icon={<ChatBubbleInnerOuterIcon/>} forwardRef={actionProps.headerRef.messageButtonRef} toggleAction={actionProps.showMessage} toggleOnClick={() => dispatch(toggleHeaderMessage())}/>
                ) }
                <QuickHeaderButton icon={<BellAlertIcon fill="none" stroke="currentColor"/>} forwardRef={actionProps.headerRef.notificationButtonRef} toggleAction={actionProps.showNotification} toggleOnClick={() => dispatch(toggleHeaderNotification())} isLabelShowed={userProps?.notifications?.length} labelContent={notificationUnreadCount}/>
                <div className="flex-center select-none">
                    <div ref={actionProps.headerRef.personalAccountButtonRef} className="w-[40px] h-[40px] relative cursor-pointer"
                         onClick={() => dispatch(toggleHeaderPersonalAccount())}>
                        <div className="w-full h-full rounded-xl overflow-hidden relative">
                            <Image src={userProps?.user?.profile?.profile_picture_url}
                                   alt={`${userProps?.user?.profile?.profile_picture_url}-image`} fill={true}
                                   sizes="(max-width: 768px) 100vw" className="object-cover"/>
                        </div>
                        <div className="w-3 h-3 top-0 right-0 absolute border border-solid border-white rounded-xl bg-red-500"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderControls;