const User = require("../../models/User");

const generalDataService = require("../../services/generalDataService");
const getUserDataService = require("../../services/userService/getUserDataService");
const getVideoDataService = require("../../services/videoService/getVideoDataService");
const responseHandler = require("../../../utils/responseHandler");

class VideoGetController {
    getVideoData = async (req, res) => {
        try {
            const videoId = req.params.videoId;
            const range = req.headers.range;

            const { statusCode, headers, stream } = await getVideoDataService.getVideoData(videoId, range);

            res.writeHead(statusCode, headers);
            stream.pipe(res);
        } catch (error) {
            console.error("Error in getVideoData", error);
            return responseHandler.serverError(res);
        }
    }

    getVideoInfoData = async (req, res) => {
        try {
            const { video_id } = req.query;

            if (!video_id) {
                return responseHandler.badRequest(res, "Video ID not found");
            }

            const formattedVideoData = await getVideoDataService.getFormattedVideoDataById(video_id);

            return responseHandler.ok(res, formattedVideoData);
        } catch (error) {
            console.error("Error in getVideoInfo: ", error);
            return responseHandler.serverError(res);
        }
    }

    getVideoAuthorData = async (req, res) => {
        try {
            const { video_id } = req.query;

            if (!video_id) {
                return responseHandler.badRequest(res, "Video ID not found");
            }

            const videoAuthor = await User.find({ video_list: video_id });

            if (!videoAuthor) {
                return responseHandler.notFound(res, "Video not found");
            }

            const formattedVideoAuthorData = await getUserDataService.getFormattedUserDataByRawData(videoAuthor[0]);

            return responseHandler.ok(res, formattedVideoAuthorData);
        } catch (error) {
            console.error("Error in getVideoAuthor: ", error);
            return responseHandler.serverError(res);
        }
    }


    getVideoCommentData = async (req, res) => {
        try {
            const { video_id } = req.query;

            if (!video_id) {
                return responseHandler.badRequest(res, "Video ID not found");
            }

            const videoCommentData = await generalDataService.getCommentData(video_id);

            if (!videoCommentData) {
                return responseHandler.notFound(res, "Video not found");
            }

            return responseHandler.ok(res, videoCommentData);
        } catch (error) {
            console.error("Error in getVideoCommentData: ", error);
            return responseHandler.serverError(res);
        }
    }

    getVideoReactionData = async (req, res) => {
        try {
            const { video_id } = req.query;

            if (!video_id) {
                return responseHandler.badRequest(res, "Video ID not found");
            }

            const videoReactionData = await generalDataService.getReactionDataAndReturnUserId(video_id);

            if (!videoReactionData) {
                return responseHandler.notFound(res, "Video not found");
            }

            return responseHandler.ok(res, videoReactionData);
        } catch (error) {
            console.error("Error in getVideoReactionData: ", error);
            return responseHandler.serverError(res);
        }
    }

    getVideoSavedData = async (req, res) => {
        try {
            const { video_id } = req.query;

            if (!video_id) {
                return responseHandler.badRequest(res, "Video ID not found");
            }

            const videoSavedData = await getVideoDataService.getSavedVideoData(video_id);

            if (!videoSavedData) {
                return responseHandler.notFound(res, "Video not found");
            }

            return responseHandler.ok(res, videoSavedData);
        } catch (error) {
            console.error("Error in getVideoSavedData: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new VideoGetController();
