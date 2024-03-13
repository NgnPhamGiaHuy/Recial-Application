const express = require("express");
const PageController = require("../../controllers/Page/PageController");

const router = express.Router();

router.route("/").get(PageController.getPageData);
router.route("/like/").get(PageController.getPageLikeData);
router.route("/post/").get(PageController.getPagePostData);
router.route("/follow/").get(PageController.getPageFollowData);

module.exports = router;