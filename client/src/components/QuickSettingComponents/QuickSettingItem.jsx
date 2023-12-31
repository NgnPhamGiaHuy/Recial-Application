import { HeaderMessageSwitchButton } from "@/components";

const QuickSettingItem = ({ settingProps }) => {
    if (settingProps.isSettingItemBreak) {
        return (
            <div className="mx-[16px] mt-[4px] h-[1px] bg-zinc-300"></div>
        )
    } else {
        return (
            <div className="mx-[8px] p-[8px] flex flex-row flex-shrink-0 items-center cursor-pointer rounded-md hover:bg-zinc-100 transition-all relative">
                <div className="mr-[12px] flex items-center align-baseline justify-center">
                    <i className="w-[24px] h-[24px] flex items-center justify-center overflow-hidden relative">
                        {settingProps.settingItemIcon}
                    </i>
                </div>
                <div className="flex flex-row grow items-center justify-between">
                    <div className="flex flex-col">
                        <span className="block text-[15px] text-black text-left font-medium break-words leading-5">
                            <span className="overflow-x-hidden overflow-y-hidden line-clamp-1 relative">
                                {settingProps.settingItemTitle}
                            </span>
                        </span>
                        {settingProps.settingItemSubtitle ? (
                            <span className="block text-[12px] text-zinc-500 text-left font-normal break-words leading-4">
                                <span className="overflow-x-hidden overflow-y-hidden line-clamp-2 relative">
                                    {settingProps.settingItemSubtitle}
                                </span>
                            </span>
                        ) : null}
                    </div>
                    {settingProps.hasSettingItemSwitchButton ? (<HeaderMessageSwitchButton/>) : null}
                </div>
            </div>
        )
    }
}

export default QuickSettingItem;