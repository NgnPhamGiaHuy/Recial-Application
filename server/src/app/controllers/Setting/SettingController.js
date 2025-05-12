const responseHandler = require("../../../utils/responseHandler");

class SettingController {
    setPostVisibilitySetting = async (req, res) => {
        try {


        } catch (error) {
            console.error("Error in setPostVisibilitySetting: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new SettingController();