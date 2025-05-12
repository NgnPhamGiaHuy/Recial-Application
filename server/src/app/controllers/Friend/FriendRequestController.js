const responseHandler = require("../../../utils/responseHandler");

const getUserDataService = require("../../services/userService/getUserDataService");
const getFriendRequestDataService = require("../../services/friendRequestService/getFriendRequestDataService");

class FriendRequestController {
    getFriendRequestById = async (req, res) => {
        try {
            const requestId = req.query.request;

            const friendRequestData = await getFriendRequestDataService.getRawFriendRequestDataById(requestId);

            if (!friendRequestData) {
                return responseHandler.notFound(res, "Friend request not found");
            }

            const friendRequestProps = {
                _id: friendRequestData._id,
                source: await getUserDataService.getFormattedUserDataById(friendRequestData.source_id),
                destination: await getUserDataService.getFormattedUserDataById(friendRequestData.destination_id),
                created_at: friendRequestData.createdAt,
                updated_at: friendRequestData.updatedAt,
            };

            return responseHandler.ok(res, friendRequestProps);
        } catch (error) {
            console.error("Error in getFriendRequestById: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new FriendRequestController();