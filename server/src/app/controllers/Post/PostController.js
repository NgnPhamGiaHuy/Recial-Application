const responseHandler = require("../../../utils/responseHandler");

const WebSocketService = require("../../services/webSocketService/webSocketService");
const getPostDataService = require("../../services/postService/getPostDataService");
const deletePostDataService = require("../../services/postService/deletePostDataService");
const createPostDataService = require("../../services/postService/createPostDataService");
const enhancePostDataService = require("../../services/postService/enhancePostDataService");

class PostController {
    getPostData = async (req, res) => {
        try {
            const posts = await getPostDataService.getFormattedPostFeedDataById();

            const postsWithUserData = await enhancePostDataService.enhancePostsWithUserData(posts);

            return responseHandler.ok(res, postsWithUserData);
        } catch (error) {
            console.error("Error in getPostData: ", error);
            return responseHandler.serverError(res);
        }
    }

    createPostData = async (req, res) => {
        try {
            const postData = req.body;
            const userData = req.user;

            const newPost = await createPostDataService.createPostData(postData, userData);

            userData.post_list.unshift(newPost._id);

            await userData.save();

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            await webSocketService.notifyClientsAboutNewPost(userData._id.toString(), newPost);

            return responseHandler.ok(res, newPost, "Post created successfully");
        } catch (error) {
            console.error("Error in createPostData: ", error);
            return responseHandler.serverError(res);
        }
    }

    deletePostData = async (req, res) => {
        try {
            const userId = req.userId;
            const { postId } = req.query;

            const deletedPost = await getPostDataService.getRawPostData(postId);

            if (!deletedPost) {
                return responseHandler.notFound(res, "Post not found");
            }

            const user = await deletePostDataService.findAndDeleteUserPost(userId, deletedPost);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            await deletePostDataService.deletePost(req, deletedPost);

            const wss = req.app.get("wss");
            const webSocketService = new WebSocketService(wss);

            await webSocketService.notifyClientsAboutDeletePost(userId, deletedPost);

            return responseHandler.ok(res, null, "Post deleted successfully");
        } catch (error) {
            console.error("Error in deletePostData: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new PostController();