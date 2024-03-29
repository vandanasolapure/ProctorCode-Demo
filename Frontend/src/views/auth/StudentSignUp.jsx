import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../App";
import { Navigate } from "react-router-dom";
import { storeInSession } from "../../common/session";

export default function StudentSignUp() {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, prn, name, year, division, batch, password } =
      e.target.elements;
    axios
      .post("http://localhost:3001/student", {
        email: email.value,
        prn: prn.value,
        name: name.value,
        year: year.value,
        division: division.value,
        batch: batch.value,
        password: password.value,
      })
      .then(({data}) => {
        console.log(response.data);
        toast.success("Student registered successfully");
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Student registration");
      });
  }
  return access_token ? 
    <Navigate to="/student" />
    :
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign up as student
        </h4>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mt-10">
            <label
              htmlFor="email"
              className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
            >
              Email*
            </label>
            <input
              type="text"
              id="email"
              placeholder="mail@simmmple.com"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
            />
          </div>

          <div className="mt-3">
            <label
              htmlFor="prn"
              className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
            >
              PRN*
            </label>
            <input
              type="text"
              id="prn"
              placeholder="Enter PRN"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="name"
              className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
            >
              Name*
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="year"
              className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
            >
              Year*
            </label>
            <input
              type="text"
              id="year"
              placeholder="Enter Year"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="division"
              className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
            >
              Division*
            </label>
            <input
              type="text"
              id="division"
              placeholder="Enter Year"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="batch"
              className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
            >
              Batch*
            </label>
            <input
              type="text"
              id="batch"
              placeholder="Enter Year"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
            />
          </div>

          {/* Other input fields */}
          {/* Year */}
          {/* Division */}
          {/* Batch */}

          {/* Password */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              placeholder="Min. 8 characters"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
            />
          </div>

          <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </form>
      </div>
    </div>
}
