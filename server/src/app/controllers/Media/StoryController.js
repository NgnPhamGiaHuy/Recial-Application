const getStoryDataService = require("../../services/mediaService/getStoryDataService");
const responseHandler = require("../../../utils/responseHandler");

class StoryController {
    getStory = async (req, res) => {
        try {
            const userId = req.userId;

            const story = await getStoryDataService.getFormattedUserFeedStoryDataByUserId(userId);

            return responseHandler.ok(res, story);
        } catch (error) {
            console.error("Error in getStory: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new StoryController();