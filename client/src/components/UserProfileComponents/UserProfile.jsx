import {CreatePost, Post, UserProfileAbout, UserProfileCover} from "@/components";

const UserProfile = ({userData, userProps, postProps, postByIdRef, isCurrentUser, handleShowCreatePost}) => {
    return (
        <main>
            <div className="my-[16px] flex flex-col gap-4 relative">
                <div>
                    <UserProfileCover userProps={userProps} navigationProps="post" isCurrentUser={isCurrentUser}/>
                </div>
                {isCurrentUser ? (
                    <div>
                        <CreatePost userProps={userProps} handleShowCreatePost={handleShowCreatePost}/>
                    </div>
                ) : null}
                {userProps && userProps?.user?.description ? (
                    <div>
                        <UserProfileAbout userProps={userProps}/>
                    </div>
                ) : null}
                {postProps ? (
                    <div>
                        <Post postRef={postByIdRef} userData={userData} userProps={userProps} postListProps={postProps}/>
                    </div>
                ) : null}
            </div>
        </main>
    );
};

export default UserProfile;