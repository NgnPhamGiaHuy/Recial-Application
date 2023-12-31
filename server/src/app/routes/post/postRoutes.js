const express = require("express");
const PostController = require("../../controllers/Post/PostController");

const router = express.Router();

router.route("/").get(PostController.getPostData);
router.route("/").put(PostController.deletePostData);
router.route("/").post(PostController.createPostData);

module.exports = router;