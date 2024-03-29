const express = require("express");
const router = express.Router();
const {
  addCourse, getAllCourses
} = require("../Controller/addCourseController");


router.route("/").post(addCourse);
router.route("/get-courses").get(getAllCourses);


module.exports = router;
