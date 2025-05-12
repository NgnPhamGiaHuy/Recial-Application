const getSuggestDataService = require("../../services/suggestService/getSuggestDataService");
const responseHandler = require("../../../utils/responseHandler");

class SuggestController {
    getSuggestEventData = async (req, res) => {
        try {
            const suggestEvent = await getSuggestDataService.getSuggestedEventsData();

            return responseHandler.ok(res, suggestEvent);
        } catch (error) {
            console.error("Error in getSuggestEventData: ", error);
            return responseHandler.serverError(res);
        }
    }

    getSuggestGroupData = async (req, res) => {
        try {
            const suggestGroup = await getSuggestDataService.getSuggestedGroupData();

            return responseHandler.ok(res, suggestGroup);
        } catch (error) {
            console.error("Error in getSuggestGroupData: ", error);
            return responseHandler.serverError(res);
        }
    }

    getSuggestPageData = async (req, res) => {
        try {
            const suggestPage = await getSuggestDataService.getSuggestedPagesData();

            return responseHandler.ok(res, suggestPage);
        } catch (error) {
            console.error("Error in getSuggestPageData: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new SuggestController();