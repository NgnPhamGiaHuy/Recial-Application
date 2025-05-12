const getPostDataService = require("../../services/postService/getPostDataService");
const responseHandler = require("../../../utils/responseHandler");

class MediaRecentController {
    getPostRecentMediaData = async (req, res) => {
        try {
            const { post_id } = req.query;

            const postData = await getPostDataService.getRawPostData(post_id);

            const recentPostPhoto = postData.post_photos;

            return responseHandler.ok(res, recentPostPhoto);
        } catch (error) {
            console.error("Error in getPostRecentMediaData", error);
            return responseHandler.serverError(res);
        }
    }

    getPhotoRecentMediaData = async (req, res) => {
        try {
            const { photo_id } = req.query;

            return responseHandler.ok(res, "");
        } catch (error) {
            console.error("Error in getPhotoRecentMediaData", error);
            return responseHandler.serverError(res);
        }
    }

    getStoryRecentMediaData = async (req, res) => {
        try {
            const { story_id } = req.query;

            return responseHandler.ok(res, "");
        } catch (error) {
            console.error("Error in getStoryRecentMediaData", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new MediaRecentController();