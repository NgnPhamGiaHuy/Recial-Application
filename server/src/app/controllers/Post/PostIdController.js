const responseHandler = require("../../../utils/responseHandler");

const getUserDataService = require("../../services/userService/getUserDataService");
const getPostDataService = require("../../services/postService/getPostDataService");

class PostIdController {
    getPostByUserId = async (req, res) => {
        try {
            const userQueryId = req.query.user;
            const postsPerPage = 5;
            const page = parseInt(req.query.page) || 1;

            const user = await getUserDataService.getRawUserData(userQueryId);

            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            const postList = user.post_list.slice((page - 1) * postsPerPage, page * postsPerPage);

            const postsWithUserData = await Promise.all(postList.map(async (postId) => {
                return await getPostDataService.getFormattedPostDataById(postId);
            }));

            return responseHandler.ok(res, postsWithUserData);
        } catch (error) {
            console.error("Error in getPostByUserId: ", error);
            return responseHandler.serverError(res);
        }
    }

    getPostByPostId = async (req, res) => {
        try {
            const postId = req.query.post;

            const postProps = await getPostDataService.getFormattedPostDataById(postId);

            return responseHandler.ok(res, postProps);
        } catch (error) {
            console.error("Error in getPostByPostId: ", error);
            return responseHandler.serverError(res);
        }
    }
}

module.exports = new PostIdController();