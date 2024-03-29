const express = require("express");
const router = express.Router();
const {
  getStudent,
  createStudent,
  getOneStudent,
  updateStudent,
  deleteStudent,
  getAllStudents
} = require("../Controller/studentController");
const { verifyJWT } = require("../Middleware/auth.middleware");

router.route("/").post(createStudent).get(getAllStudents);
router.route("/login").post(getStudent);
router.route("/home").get(verifyJWT, (req, res) => {
  res.send("Student home");
});

module.exports = router;
