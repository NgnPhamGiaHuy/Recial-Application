export const SET_USER_RELATIONSHIP = "SET_USER_RELATIONSHIP";

export const setUserRelationship = ({ isCurrentUser, isFriend, isNotFriend, isFriendRequest }) => ({
    type: SET_USER_RELATIONSHIP,
    payload: { isCurrentUser, isFriend, isNotFriend, isFriendRequest },
});