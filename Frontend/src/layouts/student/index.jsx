import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import StudentSidebar from "../../components/sidebar/StudentSidebar";
import Footer from "../../components/footer";
import studentRoutes from "../../studentRoutes";

import StudentDashboard from "../../views/student/dashboard";
import StudentProfile from "../../views/student/profile";
import StudentPreviousExamsDashboard from "../../views/student/previous-exams";
import ExamInstructions from "../../views/student/exam-instructions";
import CodeEditor from "../../views/student/code-editor";

export default function Student(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = useState("Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(studentRoutes);
  }, [location.pathname]);

  const getActiveRoute = (studentRoutes) => {
    let activeRoute = "Dashboard";
    for (let i = 0; i < studentRoutes.length; i++) {
      if (
        window.location.href.indexOf(
          studentRoutes[i].layout + "/" + studentRoutes[i].path
        ) !== -1
      ) {
        setCurrentRoute(studentRoutes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (studentRoutes) => {
    let activeNavbar = false;
    for (let i = 0; i < studentRoutes.length; i++) {
      if (
        window.location.href.indexOf(
          studentRoutes[i].layout + studentRoutes[i].path
        ) !== -1
      ) {
        return studentRoutes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (studentRoutes) => {
    return studentRoutes.map((prop, key) => {
      if (prop.layout === "/student") {
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
    <div className="flex h-full w-full">
      <StudentSidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(studentRoutes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Routes>
                  <Route path="/" element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route
                    path="previous-exams"
                    element={<StudentPreviousExamsDashboard />}
                  />

                  <Route path="profile" element={<StudentProfile />} />
                  <Route
                    path="dashboard/exam-instructions"
                    element={<ExamInstructions />}
                  />
                  <Route path="dashboard/exam-instructions/:examCode" element={<ExamInstructions />} />
                  <Route path="code-editor" element={<CodeEditor />} />
                </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
