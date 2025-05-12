const getEventDataService = require("../../services/eventService/getEventDataService");
const responseHandler = require("../../../utils/responseHandler");

class EventController {
    getEventData = async (req, res) => {
        try {
            const eventId = req.query.event;

            const eventProps = await getEventDataService.getFormattedEventDataById(eventId);

            if (!eventProps) {
                return responseHandler.notFound(res, "Event not found");
            }

            return responseHandler.ok(res, eventProps);
        } catch (error) {
            console.error("Error in getEventData: ", error);
            return responseHandler.serverError(res);
        }
    };

    getEventPageData = async (req, res) => {
        try {
            const userId = req.userId;

            const eventProps = await getEventDataService.getFormattedEventPageDataByUserId(userId);

            if (!eventProps) {
                return responseHandler.notFound(res, "Event not found");
            }

            return responseHandler.ok(res, eventProps);
        } catch (error) {
            console.error("Error in getEventPageData: ", error);
            return responseHandler.serverError(res);
        }
    };

    getEventMember = async (req, res) => {
        try {
            const eventId = req.query.event;

            const eventMemberProps = await getEventDataService.getFormattedEventMemberDataById(eventId);

            if (!eventMemberProps) {
                return responseHandler.notFound(res, "Event member not found");
            }

            return responseHandler.ok(res, eventMemberProps);
        } catch (error) {
            console.error("Error in getEventMember: ", error);
            return responseHandler.serverError(res);
        }
    };
}

module.exports = new EventController();