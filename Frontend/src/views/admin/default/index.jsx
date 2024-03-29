import React from "react";
import ExamCard from "../dashboard/components/ExamCard";

const Dashboard = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="h-fit w-full ">
        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Scheduled Exams
          </h4>
        </div>

        <div className="">
          <ExamCard
            courseName="DSA"
            courseCode="CS-101"
            secretCode="1234"
            examDateTime="12/12/2021 12:00 PM"
            year="TY BTECH"
            division="A"
            status="Starts on 12/12/2021 12:00 PM"
          />
        </div>

        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Previous Exams
          </h4>
        </div>

        <div className="">
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
      </div>
    </div>
  );
};

export default Dashboard;
