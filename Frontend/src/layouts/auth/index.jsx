import { Link, Routes, Route, Navigate } from "react-router-dom";
import FixedPlugin from "../../components/fixedPlugin/FixedPlugin";
import SignIn from "../../views/auth/SignIn";
import StudentSignup from "../../views/auth/StudentSignUp";
import FacultySignUp from "../../views/auth/FacultySignUp";
import FacultySignIn from "../../views/auth/FacultySignIn";

export default function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative float-right h-full w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto `}>
          <div className="relative flex">
            <div className="mx-auto flex w-full flex-col justify-center items-center lg:px-8 lg:pt-0  xl:px-0 ">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Link to="/admin" className="mt-0 w-max lg:pt-10"></Link>
                <Routes>
                  <Route path="/" element={<Navigate to="signin" replace />} />
                  <Route path="/student/signup" element={<StudentSignup />} />
                  <Route path="/admin/signup" element={<FacultySignUp />} />
                  <Route path="/admin/signin" element={<FacultySignIn />} />
                  <Route path="/signin" element={<SignIn />} />
                  {/* <Route path="signin/student" element={<SignIn />} /> */}
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
