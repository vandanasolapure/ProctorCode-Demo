import React, { useContext } from "react";
import Checkbox from "../../components/checkbox";
import { toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../../common/session";
import { UserContext } from "../../App";
import { Navigate } from "react-router-dom";

export default function FacultySignIn() {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  console.log(access_token);

  const handleStudentLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    console.log(email.value, password.value);

    axios
      .post("http://localhost:3001/faculty/login", {
        email: email.value,
        password: password.value,
      })
      .then(({ data }) => {
        toast.success("Faculty logged in successfully");
        storeInSession("user", JSON.stringify(data));
        console.log(sessionStorage);
        setUserAuth(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Faculty login");
      });
  };
  return access_token ? (
    <Navigate to="/admin" />
  ) : (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        <form onSubmit={handleStudentLogin}>
          {/* Email */}
          <div className="mb-3">
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

          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>

          <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In as Faculty
          </button>
        </form>

        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
