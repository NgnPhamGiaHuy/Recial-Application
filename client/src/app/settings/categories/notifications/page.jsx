"use client"

import { useUserData } from "@/hooks";
import { AsideSetting, Header, SettingScaffold } from "@/components";

const NotificationSettingPage = () => {
    const asideNotificationItemList = [
        {
            title: "Notifications you receive",
            itemProps: [
                {
                    link: "",
                    icon: "",
                    title: "Connecting with others",
                    showChevron: false,
                },
                {
                    link: "",
                    icon: "",
                    title: "Messaging",
                    showChevron: false,
                },
                {
                    link: "",
                    icon: "",
                    title: "Pages",
                    showChevron: false,
                },
                {
                    link: "",
                    icon: "",
                    title: "Attending events",
                    showChevron: false,
                },
                {
                    link: "",
                    icon: "",
                    title: "News and reports",
                    showChevron: false,
                },
                {
                    link: "",
                    icon: "",
                    title: "Updating your profile",
                    showChevron: false,
                },
                {
                    link: "",
                    icon: "",
                    title: "Verifications",
                    showChevron: false,
                },
            ]
        },
    ];

    const { userProps, setUserProps } = useUserData();

    return (
        <div>
            <Header/>
            <div className="mt-[56px] mr-[24px] mb-[24px]">
                <div className="min-h-[calc(100vh-76px)] my-[24px] grid lg:grid-cols-[minmax(280px,3fr)_minmax(0,21fr)] grid-cols-[minmax(100px,3fr)_minmax(0,21fr)] grid-rows-[1fr_auto] gap-x-[2.4rem] gap-y-[2.4rem]">
                    <div>
                        <AsideSetting userProps={userProps}/>
                    </div>
                    <main>
                        {asideNotificationItemList.map((value, index) => (
                            <SettingScaffold key={index} settingProps={value}/>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettingPage;