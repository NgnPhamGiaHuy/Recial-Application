const getMediaDataService = require("../../services/mediaService/getMediaDataService");
const responseHandler = require("../../../utils/responseHandler");

class MediaController {
    getMediaAuthorData = async (req, res) => {
        try {
            const { user_id } = req.query;

            const mediaAuthorData = await getMediaDataService.getFormattedMediaAuthorByUserId(user_id);

            return responseHandler.ok(res, mediaAuthorData);
        } catch (error) {
            console.error("Error in getFormattedPhotoAuthorByUserId: ", error);
            return responseHandler.serverError(res, "Failed to format user data by ID");
        }
    }
}

module.exports = new MediaController();