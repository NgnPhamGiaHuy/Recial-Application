const express = require("express");
const PostController = require("../../../controllers/Post/PostController");

const router = express.Router();

router.route("/").get(PostController.getPostData);
router.route("/").post(PostController.createPostData);
router.route("/").delete(PostController.deletePostData);

module.exports = router;