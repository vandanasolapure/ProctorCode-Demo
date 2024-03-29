import React, { useState, useRef, useEffect } from "react";
import CodeEditorContext from "./CodeEditorContext";

const CodeEditorContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("java");
  const [value, setValue] = useState(localStorage.getItem("code") || "");
  const editorRef = useRef();

  useEffect(() => {
    localStorage.setItem("code", value);
  }, [value]);

  return (
    <CodeEditorContext.Provider
      value={{ language, setLanguage, value, setValue, editorRef }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
};

export default CodeEditorContextProvider;
