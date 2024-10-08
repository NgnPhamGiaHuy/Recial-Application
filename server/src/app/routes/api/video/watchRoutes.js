const express = require("express");
const router = express.Router();

const WatchController = require("../../../controllers/Watch/WatchController");

router.route("/").get(WatchController.getUserWatchData);
router.route("/user").get(WatchController.getUserWatchSavedData);

module.exports = router;