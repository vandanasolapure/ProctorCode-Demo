import React from "react";
import CourseBanner from "./components/Banner";

const AddCourse = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-1 2xl:grid-cols-1">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <CourseBanner />
      </div>
    </div>
  );
};

export default AddCourse;
