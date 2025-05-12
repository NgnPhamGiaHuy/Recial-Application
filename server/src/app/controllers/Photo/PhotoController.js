const generalDataService = require("../../services/generalDataService");
const getPhotoDataService = require("../../services/mediaService/getPhotoDataService");
const responseHandler = require("../../../utils/responseHandler");

class PhotoController {
    getPhotoData = async (req, res) => {
        try {
            const { photo_id } = req.query;

            if (!photo_id) {
                return responseHandler.badRequest(res, "Photo ID not found");
            }

            const photoData = await getPhotoDataService.getFormattedPhotoDataById(photo_id);

            return responseHandler.ok(res, photoData);
        } catch (error) {
            console.error("Error getPhotoData", error);
            return responseHandler.serverError(res);
        }
    }

    getPhotoComment = async (req, res) => {
        try {
            const { photo_id } = req.query;

            if (!photo_id) {
                return responseHandler.badRequest(res, "Photo ID not found");
            }

            const photoData = await generalDataService.getCommentData(photo_id);

            return responseHandler.ok(res, photoData);
        } catch (error) {
            console.error("Error in getPhotoComment", error);
            return responseHandler.serverError(res);
        }
    }

    getPhotoReaction = async (req, res) => {
        try {
            const { photo_id } = req.query;

            if (!photo_id) {
                return responseHandler.badRequest(res, "Photo ID not found");
            }

            const photoData = await generalDataService.getReactionDataAndReturnUserId(photo_id);

            return responseHandler.ok(res, photoData);
        } catch (error) {
            console.error("Error in getPhotoReaction", error);
            return responseHandler.serverError(res);
        }
    }

    getPhotoSaved = async (req, res) => {
        try {
            const { photo_id } = req.query;

            if (!photo_id) {
                return responseHandler.badRequest(res, "Photo ID not found");
            }

            const photoData = await getPhotoDataService.getFormattedPhotoSavedDataAndReturnUserId(photo_id);

            return responseHandler.ok(res, photoData);
        } catch (error) {
            console.error("Error in getPhotoSaved", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new PhotoController();