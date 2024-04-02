const studentModel = require("../Model/studentModel");
const facultyModel = require("../Model/facultyModel");
const { formatDataToSend } = require("../Middleware/auth.middleware");
// let globalStudent = "";
try {
  const getStudent = async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "Please enter all fields" });
    }
    const student = await studentModel.findOne({ email });
    
    if (student) {
      if (student.password != password) {
        return response.status(400).json({ message: "Invalid password" });
      }     
    }
    

    if (!student) {
      return response.status(400).json({ message: "User not found" });
    }

    

    // globalStudent = student;

    return response.status(200).json(formatDataToSend(student));
  };
  const createStudent = async (request, response) => {
    //emmai prn name year division batch pass

    try {
      console.log("inside");
      const { email, prn, name, year, division, batch, password } =
        request.body;

      const temp = await studentModel.exists({ email });
      if (temp) {
        return response.status(400).json({ message: "User exists" });
      }
      studentModel.create({
        email,
        prn,
        name,
        year,
        division,
        batch,
        password,
      });
    } catch (error) {}

    response.send("create contacts");
  };

  const updateStudent = async (request, response) => {
    const contact = await studentModel.updateOne(
      { name: request.body.name }, // Filter to find the document with the specified name
      { $set: { email: request.body.email } } // Update the age to 30
    );
    response.send("update  contacts with id :" + contact);
  };

  const getOneStudent = async (request, response) => {
    const contacts = await studentModel.find({ name: globalStudent.name });

    response.send(contacts);
  };

  const deleteStudent = async (request, response) => {
    const contact = await studentModel.deleteOne({ name: globalStudent.email });

    response.send("delete  contacts with id :" + contact);
  };


  const getStudentInfo = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Find the student with the provided email
      const student = await studentModel.findOne({ email });
  
      if (!student) {
        return res.status(404).json({ error: true, message: "Student not found" });
      }
  
      // Return the student's name and PRN number
      res.status(200).json({ name: student.name, prn: student.prn });
    } catch (error) {
      console.error("Error fetching student info:", error);
      res.status(500).json({ error: true, message: "Internal server error" });
    }
  };









  const getAllStudents = async(request, response)=>{
    console.log("getAllstudents")
    try {
      const students = await studentModel.find();
      response.json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      response.status(500).json({ error: 'Error fetching students' });
    }


  };

  module.exports = {
    getStudent,
    createStudent,
    getOneStudent,
    updateStudent,
    deleteStudent,
    getStudentInfo,
    getAllStudents
  };
} catch (err) {
  console.log(err);
}
