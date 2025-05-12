const getWatchDataService = require("../../services/watchService/getWatchDataService");
const responseHandler = require("../../../utils/responseHandler");

class WatchController {
    getUserWatchData = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const watchProps = await getWatchDataService.getWatchData();

            if (!watchProps) {
                return responseHandler.notFound(res, "No watch props found");
            }

            return responseHandler.ok(res, watchProps);
        } catch (error) {
            console.error("Error in getUserWatchData: ", error);
            return responseHandler.serverError(res);
        }
    }

    getUserWatchSavedData = async (req, res) => {
        try {
            const userId = req.userId;
            const watchPerPage = 5;
            const page = parseInt(req.query.page) || 1;

            const watchSavedData = await getWatchDataService.getUserWatchSavedData(userId, page, watchPerPage);

            return responseHandler.ok(res, watchSavedData);
        } catch (error) {
            console.error("Error in getUserWatchSavedData: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new WatchController();