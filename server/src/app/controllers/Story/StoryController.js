const generalDataService = require("../../services/generalDataService");
const getStoryDataService = require("../../services/mediaService/getStoryDataService");
const responseHandler = require("../../../utils/responseHandler");

class StoryController {
    getStoryData = async (req, res) => {
        try {
            const { story_id } = req.query;

            const storyData = await getStoryDataService.getFormattedStoryDataById(story_id);

            return responseHandler.ok(res, storyData);
        } catch (error) {
            console.error("Error getStoryData", error);
            return responseHandler.serverError(res);
        }
    }

    getStoryComment = async (req, res) => {
        try {
            const { story_id } = req.query;

            const storyData = await generalDataService.getCommentData(story_id);

            return responseHandler.ok(res, storyData);
        } catch (error) {
            console.error("Error in getStoryComment", error);
            return responseHandler.serverError(res);
        }
    }

    getStoryReaction = async (req, res) => {
        try {
            const { story_id } = req.query;

            const storyData = await generalDataService.getReactionData(story_id);

            return responseHandler.ok(res, storyData);
        } catch (error) {
            console.error("Error in getStoryReaction", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new StoryController();