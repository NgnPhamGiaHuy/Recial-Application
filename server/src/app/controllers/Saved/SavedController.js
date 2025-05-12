const VideoSaved = require("../../models/VideoSaved");
const WebSocketService = require("../../services/webSocketService/webSocketService");
const responseHandler = require("../../../utils/responseHandler");

class SavedController {
    createVideoSaved = async (req, res) => {
        try {
            const userId = req.userId;
            const { destination_id } = req.query;

            const existingVideoSaved = await VideoSaved.findOne({ video_id: destination_id, user_id: userId });

            if (existingVideoSaved) {
                existingVideoSaved.updatedAt = new Date();

                await existingVideoSaved.save();

                return responseHandler.conflict(res, "Video already saved");
            }

            const videoSaved = new VideoSaved({
                user_id: userId,
                video_id: destination_id,
            })

            await videoSaved.save();

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            await webSocketService.notifyClientsAboutCreateVideoSaved(userId, videoSaved);

            return responseHandler.created(res, videoSaved, "Video saved successfully");
        } catch (error) {
            console.error("Error in createVideoSaved: ", error);
            return responseHandler.serverError(res);
        }
    }

    deleteVideoSaved = async (req, res) => {
        try {
            const userId = req.userId;
            const { destination_id } = req.query;

            const deletedVideoSaved = await VideoSaved.findOneAndDelete({ video_id: destination_id, user_id: userId })

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            await webSocketService.notifyClientsAboutDeleteVideoSaved(userId, deletedVideoSaved);

            return responseHandler.ok(res, deletedVideoSaved, "Video unsaved successfully");
        } catch (error) {
            console.error("Error in deleteVideoSaved: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new SavedController();