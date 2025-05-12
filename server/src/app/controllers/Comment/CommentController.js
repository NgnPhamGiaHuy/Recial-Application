const responseHandler = require("../../../utils/responseHandler");

const WebSocketService = require("../../services/webSocketService/webSocketService");
const deleteCommentService = require("../../services/commentService/deleteCommentService");
const updateCommentService = require("../../services/commentService/updateCommentService");
const getCommentDataService = require("../../services/commentService/getCommentDataService");
const createCommentDataService = require("../../services/commentService/createCommentDataService");

class CommentController {
    getCommentData = async (req, res) => {
        try {
            const commentId = req.query.comment;

            const commentProps = await getCommentDataService.getFormattedCommentDataById(commentId);

            return responseHandler.ok(res, commentProps);
        } catch (error) {
            console.error("Error in getCommentData: ", error);
            return responseHandler.serverError(res);
        }
    };

    createCommentData = async (req, res) => {
        try {
            const userId = req.userId;
            const comment = req.body;

            const newComment = await createCommentDataService.createCommentData(comment);

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            await webSocketService.notifyClientsAboutNewComment("create_comment", userId, newComment);

            return responseHandler.created(res, newComment, "Comment created successfully");
        } catch (error) {
            console.error("Error in createCommentData: ", error);
            return responseHandler.serverError(res);
        }
    };

    createMediaCommentData = async (req, res) => {
        try {
            const userId = req.userId;
            const comment = req.body;

            const newComment = await createCommentDataService.createCommentData(comment);

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            await webSocketService.notifyClientsAboutNewComment("create_media_comment", userId, newComment);

            return responseHandler.created(res, newComment, "Media comment created successfully");
        } catch (error) {
            console.error("Error in createCommentData: ", error);
            return responseHandler.serverError(res);
        }
    };

    updateMediaCommentData = async (req, res) => {
        try {
            const comment = req.body;
            const { comment_id } = req.query;

            const updatedComment = await updateCommentService.updateCommentDataById(comment_id, comment);

            return responseHandler.ok(res, updatedComment, "Comment updated successfully");
        } catch (error) {
            console.error("Error in updateMediaCommentData: ", error);
            return responseHandler.serverError(res);
        }
    }

    deleteMediaCommentData = async (req, res) => {
        try {
            const { comment_id } = req.query;

            const deletedComment = await deleteCommentService.deleteCommentDataById(comment_id);

            return responseHandler.ok(res, deletedComment, "Comment deleted successfully");
        } catch (error) {
            console.error("Error in deleteMediaCommentData: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new CommentController;