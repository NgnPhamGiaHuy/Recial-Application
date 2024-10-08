export const SET_USER_POST_DATA = "SET_USER_POST_DATA";
export const SET_USER_PROFILE_DATA = "SET_USER_PROFILE_DATA";
export const SET_USER_CONTACT_DATA = "SET_USER_CONTACT_DATA";
export const SET_USER_NOTIFICATION_DATA = "SET_USER_NOTIFICATION_DATA";
export const SET_USER_MESSAGE_DATA = "SET_USER_MESSAGE_DATA";
export const SET_USER_MESSAGE_LOADING = "SET_USER_MESSAGE_LOADING";
export const SET_USER_SETTING_DATA = "SET_USER_SETTING_DATA";
export const SET_USER_FRIEND_DATA = "SET_USER_FRIEND_DATA";
export const SET_USER_SEARCH_DATA = "SET_USER_SEARCH_DATA";
export const SET_USER_FOLLOWER_DATA = "SET_USER_FOLLOWER_DATA";
export const SET_USER_FOLLOWING_DATA = "SET_USER_FOLLOWING_DATA";
export const SET_USER_PHOTO_LIST_DATA = "SET_USER_PHOTO_LIST_DATA";
export const SET_USER_VIDEO_LIST_DATA = "SET_USER_VIDEO_LIST_DATA";
export const SET_USER_GROUP_LIST_DATA = "SET_USER_GROUP_LIST_DATA";
export const SET_USER_FRIEND_REQUEST_DATA = "SET_USER_FRIEND_REQUEST_DATA";

export const CREATE_USER_POST_DATA = "CREATE_USER_POST_DATA";
export const CREATE_USER_POST_COMMENT_DATA = "CREATE_USER_POST_COMMENT_DATA";
export const CREATE_USER_POST_REACTION_DATA = "CREATE_USER_POST_REACTION_DATA";

export const UPDATE_USER_MESSAGE_DATA = "UPDATE_USER_MESSAGE_DATA";
export const UPDATE_USER_POST_REACTION_DATA = "UPDATE_USER_POST_REACTION_DATA";

export const DELETE_USER_POST_DATA = "DELETE_USER_POST_DATA";
export const DELETE_USER_CONVERSATION_DATA = "DELETE_USER_CONVERSATION_DATA";

export const CLEAR_USER_POST_DATA = "CLEAR_USER_POST_DATA";
export const CLEAR_USER_MESSAGE_DATA = "CLEAR_USER_MESSAGE_DATA";

export const setUserPostData = (postData) => ({
    type: SET_USER_POST_DATA,
    payload: postData,
})

export const setUserProfileData = (profileData) => ({
    type: SET_USER_PROFILE_DATA,
    payload: profileData,
})

export const setUserContactData = (contactData) => ({
    type: SET_USER_CONTACT_DATA,
    payload: contactData,
})

export const setUserNotificationData = (notificationData) => ({
    type: SET_USER_NOTIFICATION_DATA,
    payload: notificationData,
})

export const setUserMessageData = (messageData) => ({
    type: SET_USER_MESSAGE_DATA,
    payload: messageData,
})

export const setUserMessageLoading = (messageLoading) => ({
    type: SET_USER_MESSAGE_LOADING,
    payload: messageLoading,
})

export const setUserSettingData = (settingData) => ({
    type: SET_USER_SETTING_DATA,
    payload: settingData,
})

export const setUserFriendData = (friendData) => ({
    type: SET_USER_FRIEND_DATA,
    payload: friendData,
});

export const setUserSearchData = (searchData) => ({
    type: SET_USER_SEARCH_DATA,
    payload: searchData,
});

export const setUserFollowingData = (followingData) => ({
    type: SET_USER_FOLLOWING_DATA,
    payload: followingData,
});

export const setUserFollowerData = (followerData) => ({
    type: SET_USER_FOLLOWER_DATA,
    payload: followerData,
});

export const setUserPhotoListData = (photoListData) => ({
    type: SET_USER_PHOTO_LIST_DATA,
    payload: photoListData,
});

export const setUserVideoListData = (videoListData) => ({
    type: SET_USER_VIDEO_LIST_DATA,
    payload: videoListData,
});

export const setUserGroupListData = (groupListData) => ({
    type: SET_USER_GROUP_LIST_DATA,
    payload: groupListData,
});

export const setUserFriendRequestData = (friendRequestData) => ({
    type: SET_USER_FRIEND_REQUEST_DATA,
    payload: friendRequestData,
});

export const createUserPostData = (postData) => ({
    type: CREATE_USER_POST_DATA,
    payload: postData,
})

export const createUserPostCommentData = (commentData) => ({
    type: CREATE_USER_POST_COMMENT_DATA,
    payload: commentData,
})

export const createUserPostReactionData = (reactionData) => ({
    type: CREATE_USER_POST_REACTION_DATA,
    payload: reactionData,
})

export const updateUserMessageData = (messageData) => ({
    type: UPDATE_USER_MESSAGE_DATA,
    payload: messageData,
})

export const updateUserPostReactionData = (reactionData) => ({
    type: UPDATE_USER_POST_REACTION_DATA,
    payload: reactionData,
})

export const deleteUserPostData = (postData) => ({
    type: DELETE_USER_POST_DATA,
    payload: postData,
})

export const deleteUserConversationData = (conversationData) => ({
    type: DELETE_USER_CONVERSATION_DATA,
    payload: conversationData,
})

export const clearUserPostData = () => ({
    type: CLEAR_USER_POST_DATA,
})

export const clearUserMessageData = () => ({
    type: CLEAR_USER_MESSAGE_DATA,
})