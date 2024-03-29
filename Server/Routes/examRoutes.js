const express = require("express");
const router = express.Router();
const {addExam,getExam,updateExam,getOneExam,deleteExam} = require("../Controller/examController");


router.route("/").post(addExam);
router.route("/get-exams").get(getExam);
router.route("/getOneExam").post(getOneExam)

module.exports = router;
