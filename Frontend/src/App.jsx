import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import StudentLayout from "./layouts/student";
import AuthLayout from "./layouts/auth";
import CodeEditorContextProvider from "./contexts/CodeEditorContextProvider";
import CodeEditor from "./views/student/code-editor";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";

export const UserContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);
  return (
    <CodeEditorContextProvider>
      <UserContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/exam/code-editor/:examCode" element={<CodeEditor />} />
          <Route path="/student/*" element={<StudentLayout />} />
        </Routes>
      </UserContext.Provider>
    </CodeEditorContextProvider>
  );
}

export default App;
