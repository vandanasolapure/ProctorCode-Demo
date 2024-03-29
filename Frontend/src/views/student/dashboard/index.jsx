import React, { useEffect , useState} from "react";
import ExamCard from "./components/ExamCard";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Card from "../../../components/card";

const StudentDashboard = () => {
  axios.defaults.withCredentials = true;
  const [exams, setExams] = useState([]); // State to store exam data
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch exam data when component mounts
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:3001/exam/get-exams");
        setExams(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams(); // Call the fetchExams function
  }, []);

  const formatDateTime = (dateTime) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour12: true,
    };
    const formattedDateTime = new Date(dateTime).toLocaleString("en-IN", options);
    return formattedDateTime;
  };

  const formatDateTimes = (dateTime) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDateTimes = new Date(dateTime).toLocaleString("en-IN", options);
    return formattedDateTimes;
  };
  const handleButtonClick = (examCode) => {
    navigate(`/student/dashboard/exam-instructions/${examCode}`);
  };


  return (
    <div className="mt-3 grid h-full  gap-5 ">
      <div className="h-fit w-full ">
        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Upcoming Exams
          </h4>
        </div>

        <div className="grid grid-cols-3 gap-5">
        {exams.map((exam, index) => (
        <Card
          key={index}
          extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white`}
          onClick={() => handleButtonClick(exam.examCode)}
        >
          <div className="h-full w-full">
            <div className="relative w-full space-y-3">
              <p className="text-lg font-bold text-navy-700 dark:text-white">
                Course Name: {exam.course}
              </p>
              <p className="text-md mt-1 font-medium text-gray-700 md:mt-2">
                <span className="text-navy-700 dark:text-navy-50">Course Code:</span> {exam.examCode}
              </p>
              <p className="text-md mt-1 font-medium text-gray-700 md:mt-2">
                <span className="text-navy-700 dark:text-navy-50">Exam Date:</span>{" "}
                {formatDateTime(exam.dateTimeField)}
              </p>
              <p className="text-md mt-1 font-medium text-gray-700 md:mt-2">
                <span className="text-navy-700 dark:text-navy-50">Year:</span> {exam.year}
              </p>
              <div className="text-md mt-1 font-medium text-gray-700 md:mt-2 flex gap-5">
                <div className="text-navy-700 dark:text-navy-50">
                  Division: <span className="text-gray-700">{exam.division}</span>
                </div>
                <div className="text-navy-700 dark:text-navy-50">
                  Batch: <span className="text-gray-700">{exam.batch}</span>
                </div>
              </div>
              <button
                onClick={() => handleButtonClick(exam.examCode)} // Handle click on the button
                className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
              >
             Start on  {formatDateTimes(exam.dateTimeField)} {exam.status}
              </button>
            </div>
          </div>
        </Card>
      ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
