const express = require("express");
const { updateActivity, initActivity } = require("../Controller/studentActivityController");
const router = express.Router();

router.route("/").post(initActivity)
router.route("/updateActivity").post(updateActivity)


module.exports = router;