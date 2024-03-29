import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const CourseBanner = () => {
  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    const { courseName, courseCode, courseMarks } = e.target.elements;
    console.log({
      courseName: courseName.value,
      courseCode: courseCode.value,
      maximumMarks: courseMarks.value,
    });

    axios
      .post("http://localhost:3001/course", {
        courseName: courseName.value,
        courseCode: courseCode.value,
        maximumMarks: courseMarks.value,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Course added successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in adding new course");
      });
  };

  return (
    <div className="flex w-full flex-col rounded-[20px] bg-white bg-cover px-[30px] py-[30px] dark:bg-navy-800 md:px-[64px] md:py-[56px] ">
      <div className="w-full">
        <h4 className="text-black mb-[14px] max-w-full text-xl font-bold dark:text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Add Course
        </h4>

        <form onSubmit={handleAddCourseSubmit}>
          <label
            htmlFor="courseName"
            className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
          >
            Course Name*
          </label>
          <input
            type="text"
            id="courseName"
            placeholder="Course Name"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
          />

          <label
            htmlFor="courseCode"
            className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
          >
            Course Code*
          </label>
          <input
            type="text"
            id="courseCode"
            placeholder="Course Code"
            className="mt-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
          />

          <label
            htmlFor="courseMarks"
            className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
          >
            Maximum Marks*
          </label>
          <input
            type="number"
            id="courseMarks"
            placeholder="Maximum Marks"
            className="mt-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
          />

          <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
            <button className="linear rounded-xl bg-brand-500 px-4 py-2 text-center text-base font-medium text-white transition duration-200 hover:!bg-brand-500/80 active:!bg-brand-500/70 dark:bg-brand-400">
              Add Course
            </button>
            <button
              href=" "
              className="text-black rounded-xl px-4 py-2 text-base font-medium hover:ring dark:text-white 2xl:ml-2"
            >
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseBanner;
