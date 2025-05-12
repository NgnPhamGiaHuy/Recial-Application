const WebSocketService = require("../../services/webSocketService/webSocketService");
const getFriendRequestDataService = require("../../services/friendRequestService/getFriendRequestDataService");
const createFriendRequestDataService = require("../../services/friendRequestService/createFriendRequestDataService");
const responseHandler = require("../../../utils/responseHandler");

class UserCreateDataController {
    createUserFriendRequest = async (req, res) => {
        try {
            const userId = req.userId;

            const { friend_request_id } = req.query;

            if (!friend_request_id) {
                return responseHandler.badRequest(res, "Friend ID is missing");
            }

            const existFriendRequest = await getFriendRequestDataService.getRawFriendRequestDataBySourceAndDestination(userId, friend_request_id);

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            if (existFriendRequest) {
                existFriendRequest.updatedAt = new Date();
                await existFriendRequest.save();

                await webSocketService.notifyClientsAboutCreateFriendRequest(userId, friend_request_id, existFriendRequest);

                return responseHandler.ok(res, existFriendRequest, "Friend request updated successfully");
            }

            const newFriendRequest = await createFriendRequestDataService.createFriendRequestData(userId, friend_request_id);

            await webSocketService.notifyClientsAboutCreateFriendRequest(userId, friend_request_id, newFriendRequest);

            return responseHandler.created(res, newFriendRequest, "Friend request created successfully");
        } catch (error) {
            console.error("Error in createUserFriendRequest: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new UserCreateDataController();
