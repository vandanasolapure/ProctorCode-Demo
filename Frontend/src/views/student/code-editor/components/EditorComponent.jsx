import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import OutputWindow from "./OutputWindow";
import axios from "axios";

const EditorComponent = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("java");


  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:3001/exam/get-exams");
        if (response.data && response.data.length > 0) {
          const problemStatements = response.data[0].problemStatement; // Assuming problem statements are in the first exam
          if (problemStatements && problemStatements.length > 0) {
            const randomIndex = Math.floor(Math.random() * problemStatements.length);
            setValue(problemStatements[randomIndex].problemStatementDescription);
          }
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const onSelectChange = (sl) => {
    setLanguage(sl.value);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleCopy = (event) => {
    event.preventDefault();
    alert('Copying content is not allowed.');
  }

  return (
    <div onCopy={handleCopy} className="flex justify-center items-center w-full gap-5">
     

      <div className="relative">
        <LanguageSelector
          defLanguage={language}
          onSelectChange={onSelectChange}
        />



        <div className="overlay ml-3 my-3 rounded-md overflow-hidden w-full h-full shadow-4xl">
          <Editor
            height="85vh"
            width="70vw"
            theme="vs-dark"
            language={language}
            value={value}
            onMount={onMount}
            onChange={(newValue) => setValue(newValue)}
          />
        </div>
      </div>

      <div>
        <OutputWindow editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default EditorComponent;
