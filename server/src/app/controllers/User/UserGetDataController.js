const getUserDataService = require("../../services/userService/getUserDataService");
const responseHandler = require("../../../utils/responseHandler");

class UserGetDataController {
    getUserData = async (req, res) => {
        try {
            const user = req.user;

            const { isOAuthUser, password, refreshToken, friends, followers, following, photo_list, video_list, story_list, post_list, roles, ...otherUserProps } = user._doc;

            const userProps = {
                user: {
                    ...otherUserProps,
                },
            };

            return responseHandler.ok(res, userProps);
        } catch (error) {
            console.error("Error in getUserData: ", error);
            return responseHandler.serverError(res);
        }
    };

    getUserContact = async (req, res) => {
        try {
            const user = req.user;

            const userContactProps = await getUserDataService.getFormattedUserContact(user);

            return responseHandler.ok(res, userContactProps);
        } catch (error) {
            console.error("Error in getUserContact: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserProfile = async (req, res) => {
        try {
            const user = req.user;

            const userProfileProps = await getUserDataService.getFormattedUserProfile(user);

            return responseHandler.ok(res, userProfileProps);
        } catch (error) {
            console.error("Error in getUserProfile: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserFriend = async (req, res) => {
        try {
            const user = req.user;

            const friendProps = await getUserDataService.getUserSocial(user.friends);

            return responseHandler.ok(res, friendProps);
        } catch (error) {
            console.error("Error in getUserFriend: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserFriendRequest = async (req, res) => {
        try {
            const userId = req.userId;

            const friendRequestProps = await getUserDataService.getUserFriendRequest(userId);

            return responseHandler.ok(res, friendRequestProps);
        } catch (error) {
            console.error("Error in getUserFriendRequest: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserSetting = async (req, res) => {
        try {
            const userId = req.userId;

            const settingProps = await getUserDataService.getUserSetting(userId);

            return responseHandler.ok(res, settingProps);
        } catch (error) {
            console.error("Error in getUserSetting: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserFollowing = async (req, res) => {
        try {
            const user = req.user;

            const followingProps = await getUserDataService.getUserSocial(user.following);

            return responseHandler.ok(res, followingProps);
        } catch (error) {
            console.error("Error in getUserFollowing: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserFollower = async (req, res) => {
        try {
            const user = req.user;

            const followerProps = await getUserDataService.getUserSocial(user.followers);

            return responseHandler.ok(res, followerProps);
        } catch (error) {
            console.error("Error in getUserFollower: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserSearchQuery = async (req, res) => {
        try {
            const userId = req.userId;

            const searchProps = await getUserDataService.getUserSearchQuery(userId);

            return responseHandler.ok(res, searchProps);
        } catch (error) {
            console.error("Error in getUserSearchQuery: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserMessage = async (req, res) => {
        try {
            const userId = req.userId;

            const page = parseInt(req.query.page) || 1;

            const messageProps = await getUserDataService.getUserConversation(userId, page);

            return responseHandler.ok(res, messageProps);
        } catch (error) {
            console.error("Error in getUserMessage: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserPhotoList = async (req, res) => {
        try {
            const user = req.user;

            const photoListProps = await getUserDataService.getUserPhotoList(user.photo_list);

            return responseHandler.ok(res, photoListProps);
        } catch (error) {
            console.error("Error in getUserPhotoList: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserVideoList = async (req, res) => {
        try {
            const user = req.user;

            const videoListProps = await getUserDataService.getUserVideoList(user.video_list);

            return responseHandler.ok(res, videoListProps);
        } catch (error) {
            console.error("Error in getUserVideoList: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserGroupList = async (req, res) => {
        try {
            const userId = req.userId;

            const groupListProps = await getUserDataService.getUserGroupWithMember(userId);

            return responseHandler.ok(res, groupListProps);
        } catch (error) {
            console.error("Error in getUserGroupList: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserNotification = async (req, res) => {
        try {
            const userId = req.userId;

            const notificationProps = await getUserDataService.getUserNotifications(userId);

            return responseHandler.ok(res, notificationProps);
        } catch (error) {
            console.error("Error in getUserNotification: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new UserGetDataController();