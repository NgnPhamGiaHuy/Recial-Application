const WebSocketService = require("../../services/webSocketService/webSocketService");
const getFriendRequestDataService = require("../../services/friendRequestService/getFriendRequestDataService");
const deleteFriendRequestDataService = require("../../services/friendRequestService/deleteFriendRequestDataService");
const responseHandler = require("../../../utils/responseHandler");

class UserUpdateDataController {
    updateUserFriendRequest = async (req, res) => {
        try {
            const user = req.user;

            const { status, user_id } = req.query;

            const userFriendRequestData = await getFriendRequestDataService.getRawFriendRequestDataBySourceAndDestination(user_id, user._id);

            if (status === "Confirm") {
                user.friends.unshift(userFriendRequestData.source_id);

                await user.save();
            }

            if (status === "Confirm" || status === "Delete") {
                await deleteFriendRequestDataService.deleteFriendRequestDataById(userFriendRequestData._id);
            }

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            await webSocketService.notifyClientsAboutUpdateFriendRequest(user._id, status, userFriendRequestData);

            return responseHandler.ok(res, null, "Request processed successfully");
        } catch (error) {
            console.error("Error in setUserFriendRequest: ", error);
            return responseHandler.serverError(res);
        }
    }

    updateUserProfile = async (req, res) => {
        try {
            const user = req.user;

            const { session_username, session_firstname, session_lastname, session_description, session_location, session_date_of_birth, session_profile_picture_url, session_profile_cover_photo_url } = req.body;

            if (session_username) {
                user.username = session_username;
            }
            if (session_firstname) {
                user.firstname = session_firstname;
            }
            if (session_lastname || session_lastname === "") {
                user.lastname = session_lastname;
            }
            if (session_description || session_description === "") {
                user.description = session_description;
            }

            if (session_date_of_birth) {
                user.date_of_birth = session_date_of_birth;
            }
            if (session_profile_picture_url) {
                user.profile_picture_url = session_profile_picture_url;
            }

            if (session_profile_cover_photo_url) {
                user.profile_cover_photo_url = session_profile_cover_photo_url;
            }
            // if (session_location) {
            //     user.location = session_location;
            // }

            await user.save();

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            await webSocketService.notifyClientsAboutUpdateProfile(user._id);

            return responseHandler.ok(res, null, "User profile updated successfully");
        } catch (error) {
            console.error("Error in setUserProfile: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new UserUpdateDataController();