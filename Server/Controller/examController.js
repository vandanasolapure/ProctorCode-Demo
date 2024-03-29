const examModel = require("../Model/examModel");

const scheduledExamModel = require("../Model/scheduledExamModel");
const studentModel = require("../Model/studentModel");
  try {

    const addExam = async (req, res) => {
      const { course, examCode, dateTimeField, year, division, batch, problemStatements } = req.body;
  
      try {
          // Check if the exam code already exists
          const examExists = await examModel.exists({ examCode });
  
          if (examExists) {
              return res.status(400).json({ message: "Exam code already exists" });
          }
  
          // Create the exam
          const newExam = await examModel.create({
              course, examCode, dateTimeField, year, division, batch, problemStatements
          });
  
          // Retrieve students matching the division and batch of the exam
          const matchingStudents = await studentModel.find({ division, batch });
  
          // Randomly select a problem statement from the problemStatements array of the exam
          const randomProblemStatement = problemStatements[Math.floor(Math.random() * problemStatements.length)];
  
          // Create scheduled exam for each matching student
          const scheduledExams = matchingStudents.map(async (student) => {
              const passkey = generateRandomPasskey(); // Implement your passkey generation logic here
              return await scheduledExamModel.create({
                  examCode,
                  course,
                  date: dateTimeField,
                  problemStatement: randomProblemStatement,
                  students: {
                      prn: student.prn,
                      name: student.name,
                      passkey
                  }
              });
          });
  
          // Wait for all scheduled exams to be created
          await Promise.all(scheduledExams);
  
          return res.status(201).json({ message: "Exam added successfully" });
      } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error" });
      }
  };
  
  // Helper function to generate a random passkey (you can implement your own logic)
  function generateRandomPasskey() {
      return Math.random().toString(36).substring(2, 10); // Example of generating a random alphanumeric string
  }
  

  const getExam=async(request,response)=>{

    const exam=await examModel.find();

    response.send(exam);
};

const updateExam=async(request,response)=>{

  const contact=await examModel.updateOne(
      { name: request.body.examName }, // Filter to find the document with the specified name
      { $set: { courseCode: request.body.examCode} } // Update the age to 30
    );
  response.send("update  exam with id :"+contact);
};


const getOneExam = async (req, res) => {
  try {
    const exam = await examModel.findOne({ examCode: req.body.examCode }); 
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    return res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteExam=async(request,response)=>{
  const contact=await examModel.deleteOne({ name: request.body.examName });

  response.send("delete  contacts with id :"+contact);
};

module.exports = { addExam,getExam,updateExam,getOneExam,deleteExam };

}
catch(error){


}

