import { UserAboutOverview, UserAboutScaffold, UserProfileCover } from "@/components";

const UserAbout = ({ userProps, userCheck, handleState }) => {
    return (
        <main>
            <div className="my-[16px] flex flex-col gap-4 relative">
                <div>
                    <UserProfileCover userProps={userProps} navigationProps="about" userCheck={userCheck} handleState={handleState}/>
                </div>
                <div>
                    <UserAboutOverview userProps={userProps}/>
                </div>
                {userProps?.photo_list ? (
                    <div>
                        <UserAboutScaffold mediaProps={userProps?.photo_list} isPhoto={true}/>
                    </div>
                ) : null}
                {userProps?.videos_list ? (
                    <div>
                        <UserAboutScaffold mediaProps={userProps?.videos_list} isVideo={true}/>
                    </div>
                ) : null}
                {userProps?.user?.friends ? (
                    <div>
                        <UserAboutScaffold mediaProps={userProps?.user?.friends} isFriendItem={true}/>
                    </div>
                ) : null}
                {userProps?.group_list ? (
                    <div>
                        <UserAboutScaffold mediaProps={userProps?.group_list} isGroup={true}/>
                    </div>
                ) : null}
            </div>
        </main>
    );
};

export default UserAbout;