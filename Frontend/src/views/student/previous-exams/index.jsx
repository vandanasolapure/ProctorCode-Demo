import React from "react";
import ExamCard from "../dashboard/components/ExamCard";

const StudentPreviousExamsDashboard = () => {
  return (
    <>
      <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Completed Exams
        </h4>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <ExamCard
          courseName="DSA"
          courseCode="CS-101"
          secretCode="1234"
          examDateTime="12/12/2021 12:00 PM"
          year="TY BTECH"
          division="A"
          status="Completed"
        />
      </div>
    </>
  );
};

export default StudentPreviousExamsDashboard;
