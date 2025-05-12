const User = require('../../models/User');
const Video = require('../../models/Video');
const responseHandler = require("../../../utils/responseHandler");

class VideoCreateController {
    createVideoData = async (req, res) => {
        try {
            const userId = req.userId;
            const videoData = req.body;

            const userData = await User.findById(userId);
            const createdVideoData = new Video(videoData);

            await createdVideoData.save();

            userData.video_list.unshift(createdVideoData._id);
            userData.updatedAt = new Date();

            await userData.save();

            return responseHandler.created(res, createdVideoData, "Video created successfully");
        } catch (error) {
            console.error("Error in createVideoData: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new VideoCreateController();