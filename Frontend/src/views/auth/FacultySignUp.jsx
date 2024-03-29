import InputField from "../../components/fields/InputField";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../App";
import { storeInSession } from "../../common/session";
import { Navigate } from "react-router-dom";

export default function FacultySignUp() {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, name, pass } = e.target.elements;
    console.log({ email: email.value, name: name.value, password: pass.value });

    axios
      .post("http://localhost:3001/faculty", {
        email: email.value,
        name: name.value,
        password: pass.value,
      })
      .then(({ data }) => {
        console.log(response.data);
        toast.success("Faculty added successfully");
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Faculty not added");
      });
  }

  return access_token ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign up as Faculty
        </h4>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className={`text-sm text-navy-700 dark:text-white 
             ml-1.5 font-medium"
            }`}
            >
              Enter Email*
            </label>
            <input
              type="text"
              id="email"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
              placeholder="Enter Email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className={`text-sm text-navy-700 dark:text-white 
             ml-1.5 font-medium"
            }`}
            >
              Enter Name*
            </label>
            <input
              type="text"
              id="name"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
              placeholder="Enter Name*"
              required
            />
          </div>

          <div>
            <label
              htmlFor="pass"
              className={`text-sm text-navy-700 dark:text-white 
             ml-1.5 font-medium"
            }`}
            >
              Enter Password*
            </label>
            <input
              type="password"
              id="pass"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
              placeholder="Enter Password*"
              required
            />
          </div>

          <button className="p-3 bg-blueSecondary text-white rounded-md w-full">
            Sign up
          </button>
        </form>

        {/* Email */}
      </div>
    </div>
  );
}
