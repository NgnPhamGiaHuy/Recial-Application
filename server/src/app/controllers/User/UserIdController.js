const getUserDataService = require("../../services/userService/getUserDataService");
const responseHandler = require("../../../utils/responseHandler");

class UserIdController {
    getUserIdData = async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await getUserDataService.getRawUserData(userId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const { isOAuthUser, password, refreshToken, friends, followers, following, photo_list, video_list, story_list, post_list, roles, ...otherUserProps } = user._doc;

            const userProps = {
                user: {
                    ...otherUserProps,
                },
            }

            return responseHandler.ok(res, userProps);
        } catch (error) {
            console.error("Error in getUserIdData: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserIdContact = async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await getUserDataService.getRawUserData(userId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const userContactProps = await getUserDataService.getFormattedUserContact(user);

            return responseHandler.ok(res, userContactProps);
        } catch (error) {
            console.error("Error in getUserIdContact: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserIdProfile = async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await getUserDataService.getRawUserData(userId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const userProfileProps = await getUserDataService.getFormattedUserProfile(user);

            return responseHandler.ok(res, userProfileProps);
        } catch (error) {
            console.error("Error in getUserIdProfile: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserIdFollower = async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await getUserDataService.getRawUserData(userId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const followerProps = await getUserDataService.getUserSocial(user.followers);

            return responseHandler.ok(res, followerProps);
        } catch (error) {
            console.error("Error in getUserIdFollower: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserIdFollowing = async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await getUserDataService.getRawUserData(userId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const followingProps = await getUserDataService.getUserSocial(user.following);

            return responseHandler.ok(res, followingProps);
        } catch (error) {
            console.error("Error in getUserIdFollowing: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserIdFriend = async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await getUserDataService.getRawUserData(userId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const friendProps = await getUserDataService.getUserSocial(user.friends);

            return responseHandler.ok(res, friendProps);
        } catch (error) {
            console.error("Error in getUserIdFriend: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserIdPhotoList = async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await getUserDataService.getRawUserData(userId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const photoListProps = await getUserDataService.getUserPhotoList(user.photo_list);

            return responseHandler.ok(res, photoListProps);
        } catch (error) {
            console.error("Error in getUserIdPhotoList: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserIdVideoList = async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await getUserDataService.getRawUserData(userId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const videoListProps = await getUserDataService.getUserVideoList(user.video_list);

            return responseHandler.ok(res, videoListProps);
        } catch (error) {
            console.error("Error in getUserIdVideoList: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserIdGroupList = async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await getUserDataService.getRawUserData(userId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const groupListProps = await getUserDataService.getUserGroupWithoutMemberDetail(user._id);

            return responseHandler.ok(res, groupListProps);
        } catch (error) {
            console.error("Error in getUserIdGroupList: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new UserIdController();