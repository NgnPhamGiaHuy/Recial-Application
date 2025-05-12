const WebSocketService = require("../../services/webSocketService/webSocketService");
const getTypeDataService = require("../../services/typeService/getTypeDataService");
const getReactionDataService = require("../../services/reactionService/getReactionDataService");
const createReactionDataService = require("../../services/reactionService/createReactionDataService");
const deleteReactionDataService = require("../../services/reactionService/deleteReactionDataService");
const responseHandler = require("../../../utils/responseHandler");

class ReactionController {
    getReactionData = async (req, res) => {
        try {
            const reactionId = req.query.reaction;

            const reactionData = await getReactionDataService.getRawReactionData(reactionId);

            if (!reactionData) {
                return responseHandler.notFound(res, "Reaction not found");
            }

            const reactionProps = await getReactionDataService.getFormattedReactionDataByRaw(reactionData);

            return responseHandler.ok(res, reactionProps);
        } catch (error) {
            console.error("Error in getReactionData: ", error);
            return responseHandler.serverError(res);
        }
    }

    createReaction = async (req, res) => {
        try {
            const userId = req.userId;
            const { reaction_type, destination_id } = req.query;

            const reactionType = await getTypeDataService.getTypeDataByName(reaction_type);

            const existReaction = await getReactionDataService.getRawReactionDataBySourceAndDestination(userId, destination_id);

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            if (existReaction) {
                existReaction.reaction_type = reactionType._id;
                existReaction.updatedAt = new Date();

                await existReaction.save();

                await webSocketService.notifyClientsAboutUpdateReaction(userId, existReaction);

                return responseHandler.ok(res, existReaction, "Reaction updated successfully");
            }

            const newReaction = await createReactionDataService.createReactionData(userId, destination_id, reactionType);

            await webSocketService.notifyClientsAboutCreateReaction(userId, newReaction);

            return responseHandler.created(res, newReaction, "Reaction created successfully");
        } catch (error) {
            console.error("Error in createReaction: ", error);
            return responseHandler.serverError(res);
        }
    }

    createCommentReaction = async (req, res) => {
        try {
            const userId = req.userId;
            const { reaction_type, destination_id } = req.query;

            const reactionType = await getTypeDataService.getTypeDataByName(reaction_type);

            const existReaction = await getReactionDataService.getRawReactionDataBySourceAndDestination(userId, destination_id);

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            if (existReaction) {
                existReaction.reaction_type = reactionType._id;
                existReaction.updatedAt = new Date();

                await existReaction.save();

                await webSocketService.notifyClientsAboutUpdateReaction(userId, existReaction, "update_comment_reaction");

                return responseHandler.ok(res, existReaction, "Comment reaction updated successfully");
            }

            const newReaction = await createReactionDataService.createReactionData(userId, destination_id, reactionType);

            await webSocketService.notifyClientsAboutCreateReaction(userId, newReaction, "create_comment_reaction");

            return responseHandler.created(res, newReaction, "Comment reaction created successfully");
        } catch (error) {
            console.error("Error in createReaction: ", error);
            return responseHandler.serverError(res);
        }
    }

    deleteReaction = async (req, res) => {
        try {
            const userId = req.userId;
            const { destination_id } = req.query;

            const deletedReactionData = await deleteReactionDataService.deleteReactionData(userId, destination_id);

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            await webSocketService.notifyClientsAboutDeleteReaction(userId, deletedReactionData);

            return responseHandler.ok(res, deletedReactionData, "Reaction deleted successfully");
        } catch (error) {
            console.error("Error in deleteReaction: ", error);
            return responseHandler.serverError(res);
        }
    }

    deleteCommentReaction = async (req, res) => {
        try {
            const userId = req.userId;
            const { destination_id } = req.query;

            const deletedReactionData = await deleteReactionDataService.deleteReactionData(userId, destination_id);

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            await webSocketService.notifyClientsAboutDeleteReaction(userId, deletedReactionData, "delete_comment_reaction");

            return responseHandler.ok(res, deletedReactionData, "Comment reaction deleted successfully");
        } catch (error) {
            console.error("Error in deleteReaction: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new ReactionController();