const courseModel = require("../Model/courseModel");

const addCourse = async (req, res) => {
  try {
    const { courseCode, courseName, maximumMarks } = req.body;

    const courseExists = await courseModel.exists({ courseCode });

    if (courseExists) {
      return res.status(400).json({ message: "Course already exists" });
    }
    if (!courseCode || !courseName || !maximumMarks) {
      return res.status(400).json({ message: "all fields are required" });
    } else {
      courseModel.create({
        courseCode,
        courseName,
        maximumMarks,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.send("Course added successfully");
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addCourse, getAllCourses };
