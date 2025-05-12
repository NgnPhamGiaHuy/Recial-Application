const getGroupDataService = require("../../services/groupService/getGroupDataService");
const responseHandler = require("../../../utils/responseHandler");

class GroupController {
    getGroupData = async (req, res) => {
        try {
            const groupId = req.query.group;

            const groupProps = await getGroupDataService.getFormattedGroupDataById(groupId);

            if (!groupProps) {
                return responseHandler.notFound(res, "Group not found");
            }

            return responseHandler.ok(res, groupProps);
        } catch (error) {
            console.error("Error getGroupData: ", error);
            return responseHandler.serverError(res);
        }
    };

    getGroupMember = async (req, res) => {
        try {
            const groupId = req.query.group;

            const groupMemberProps = await getGroupDataService.getFormattedGroupMemberDataById(groupId);

            if (!groupMemberProps) {
                return responseHandler.notFound(res, "Group member not found");
            }

            return responseHandler.ok(res, groupMemberProps);
        } catch (error) {
            console.error("Error in getGroupMember: ", error);
            return responseHandler.serverError(res);
        }
    };

    getGroupPost = async (req, res) => {
        try {
            const groupId = req.query.group;
            const postsPerPage = 5;
            const page = parseInt(req.query.page) || 1;

            const groupPostProps = await getGroupDataService.getFormattedGroupPostDataById(groupId, page, postsPerPage);

            if (!groupPostProps) {
                return responseHandler.notFound(res, "Group post not found");
            }

            return responseHandler.ok(res, groupPostProps);
        } catch (error) {
            console.error("Error in getGroupPost: ", error);
            return responseHandler.serverError(res);
        }
    };

    getGroupActivity = async (req, res) => {
        try {
            const groupId = req.query.group;

            const groupActivityProps = await getGroupDataService.getFormattedGroupActivityDataById(groupId);

            if (!groupActivityProps) {
                return responseHandler.notFound(res, "Group activity not found");
            }

            return responseHandler.ok(res, groupActivityProps);
        } catch (error) {
            console.error("Error in getGroupActivity: ", error);
            return responseHandler.serverError(res);
        }
    };

    getMultipleGroupData = async (req, res) => {
        try {
            const groupIds = req.query.groups.split(',');

            const groupDataPromises = groupIds.map(async groupId => {
                const groupProps = await getGroupDataService.getFormattedGroupDataById(groupId.trim());

                return groupProps;
            });

            const groupsData = await Promise.all(groupDataPromises);

            return responseHandler.ok(res, groupsData);
        } catch (error) {
            console.error("Error in getMultipleGroupData: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new GroupController();