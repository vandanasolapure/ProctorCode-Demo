const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  courseName: {
    type: String,

    required: [true, "please add the course name"],
  },
  courseCode: {
    type: String,
    required: [true, "please add the course code"],
    index: true,
    unique: true,
  },
  maximumMarks: {
    type: String,
    required: [true, "please add the maximum marks"],
  },
});
module.exports = mongoose.model("Course", courseSchema);
