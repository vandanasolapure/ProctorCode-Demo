import React, { useState } from "react";
import Switch from "../../../../components/switch";
import Upload from "./Upload";
import axios from "axios";
import { toast } from "react-hot-toast";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const CreateExamForm = () => {
  const [problemsCount, setProblemsCount] = useState(0);
  const [problemStatements, setProblemStatements] = useState([]);
  const [examCode, setExamCode] = useState();

  const [formData, setFormData] = useState({
    course: "",
    year: "",
    division: "",
    batch: "",
    examCode: "",
    dateTimeField: "12 March 2023",
    problemStatements: [],
    videoProctoring: false,
    audioProctoring: false,
  });

  const generateExamCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit code
    setExamCode(code); // Convert to string and update state
  };

  const handleProblemsCountChange = (e) => {
    const count = parseInt(e.target.value);
    setProblemsCount(count);
    // Generate initial array of empty strings for problem statements
    const initialStatements = Array.from({ length: count }, () => "");
    setProblemStatements(initialStatements);

    // Update the problemStatements array in the formData state as well
    setFormData({
      ...formData,
      problemStatements: initialStatements,
    });
  };

  const handleProblemStatementChange = (index, value) => {
    const updatedStatements = [...problemStatements];
    updatedStatements[index] = value;
    setProblemStatements(updatedStatements);

    // Update the problemStatements array in the formData state as well
    setFormData({
      ...formData,
      problemStatements: updatedStatements,
    });
  };

  const renderInputFields = () => {
    return (
      <>
        <label
          htmlFor="problemStatements"
          className="mb-2 ml-1.5 block text-sm font-medium text-gray-900 dark:text-gray-400"
        ></label>

        {problemStatements.map((statement, index) => {
          return (
            <div key={index} className="mb-3">
              <label
                htmlFor={`problemStatement${index}`}
                className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
              >
                {`Problem Statement ${index + 1}*`}
              </label>
              <textarea
                rows="3"
                id={`problemStatement${index}`}
                name={`problemStatement${index}`}
                value={statement}
                onChange={(e) =>
                  handleProblemStatementChange(index, e.target.value)
                }
                className="mt-2 flex w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                placeholder={`Problem Statement ${index + 1}`}
              />
            </div>
          );
        })}
      </>
    );
  };

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
  ];

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:3001/exam/", {
        course: formData.course,
        examCode: formData.examCode,
        dateTimeField: formData.dateTimeField,
        year: formData.year,
        division: formData.division,
        batch: formData.batch,
        problemStatements: formData.problemStatements,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Exam created successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in creating exam");
      });
  };

  return (
    <div className="flex w-full flex-col  rounded-[20px] bg-white bg-cover px-[30px] py-[30px] dark:bg-navy-800 md:px-[64px] md:py-[56px] ">
      <div className="w-full space-y-5">
        <h4 className="text-black mb-[14px] max-w-full text-xl font-bold dark:text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Create Exam
        </h4>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="course"
              className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
            >
              Select course*
            </label>
            <select
              name="course"
              id="course"
              value={formData.course}
              onChange={handleFieldChange}
              className="my-2 block h-12 w-full rounded-xl border border-gray-300 bg-white/0 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:!bg-white/5 dark:text-white dark:placeholder-gray-400 dark:placeholder:!text-[rgba(255,255,255,0.15)] dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="dsa">Data Structures and Algorithms</option>
              <option value="os">Design Analysis of algorithms</option>
              <option value="cn">Database Management System</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-10 relative">
            <div className="flex w-full justify-start items-start relative">
              <div className="mb-3">
                <label
                  htmlFor="examCode"
                  className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                >
                  6 digit exam code*
                </label>
                <input
                  type="text"
                  id="examCode"
                  name="examCode"
                  placeholder="Enter exam code"
                  value={formData.examCode}
                  onChange={handleFieldChange}
                  className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-10">
            <div>
              <label
                htmlFor="year"
                className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
              >
                Select Year*
              </label>
              <select
                name="year"
                id="year"
                value={formData.year}
                onChange={handleFieldChange}
                className="my-2 block h-12 w-full rounded-xl border border-gray-300 bg-white/0 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:!bg-white/5 dark:text-white dark:placeholder-gray-400 dark:placeholder:!text-[rgba(255,255,255,0.15)] dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
               <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="division"
                className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
              >
                Select Division*
              </label>
              <select
                name="division"
                id="division"
                value={formData.division}
                onChange={handleFieldChange}
                className="my-2 block h-12 w-full rounded-xl border border-gray-300 bg-white/0 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:!bg-white/5 dark:text-white dark:placeholder-gray-400 dark:placeholder:!text-[rgba(255,255,255,0.15)] dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="batch"
                className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
              >
                Select Batch*
              </label>
              <select
                name="batch"
                id="batch"
                value={formData.batch}
                onChange={handleFieldChange}
                className="my-2 block h-12 w-full rounded-xl border border-gray-300 bg-white/0 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:!bg-white/5 dark:text-white dark:placeholder-gray-400 dark:placeholder:!text-[rgba(255,255,255,0.15)] dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="A3">A3</option>
                <option value="A4">A4</option>
              </select>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <label
                htmlFor="problemsCount"
                className={`mt-5 ml-1.5 text-sm font-medium text-navy-700 dark:text-white`}
              >
                Total Problem Statements*
              </label>

              <input
                type="number"
                id="problemsCount"
                name="problemsCount"
                min={0}
                placeholder="Total Problem Statements"
                className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none dark:text-white`}
                value={problemsCount}
                onChange={handleProblemsCountChange}
              />

              {/* Render InputFields based on problemsCount */}
              {renderInputFields()}
            </div>

            <div className="rounded-full bg-gray-400 p-3 font-bold">
              <p>OR</p>
            </div>

            <div>
              <label
                htmlFor="statementFile"
                className="mb-2 ml-1.5 block pt-5 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Upload File*
              </label>

              <Upload />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-5">
            <div className="flex justify-center items-center space-x-2">
              <Switch id="switch8" />
              <label
                htmlFor="checkbox8"
                className="text-base font-medium text-navy-700 dark:text-white"
              >
                Enable Video Proctoring
              </label>
            </div>

            <div className="flex justify-center items-center space-x-2">
              <Switch id="switch8" />
              <label
                htmlFor="checkbox8"
                className="text-base font-medium text-navy-700 dark:text-white"
              >
                Enable Audio Proctoring
              </label>
            </div>
          </div>

          <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
            <button className="linear rounded-xl bg-brand-500 px-4 py-2 text-center text-base font-medium text-white transition duration-200 hover:!bg-brand-500/80 active:!bg-brand-500/70 dark:bg-brand-400">
              Create Exam
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

export default CreateExamForm;
