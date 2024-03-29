import React, { useState, useEffect, useContext } from "react";
import { executeCode } from "../../../../api";
import { toast } from "react-hot-toast";
import CodeEditorContext from "../../../../contexts/CodeEditorContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 

const OutputWindow = () => {
  const navigate = useNavigate();
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { editorRef, language } = useContext(CodeEditorContext);
  const { examCode } = useParams();
  console.log("examCode", examCode)



  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      return;
    }

    try {
      setLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output);
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      toast.error("An error occurred while running the code");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center items-center space-y-2">
        {/* <h1 className="my-20">THIS IS EDITOR</h1> */}
        <button
          className={`absolute text-white top-0 text-slate-100 p-3 rounded-md hover:shadow-lg ${
            loading ? " disabled bg-gray-800" : " bg-gray-900"
          }`}
          onClick={runCode}
        >
          {loading ? "Processing..." : "Run Code"}
        </button>

        <div
          className={` overflow-auto h-auto w-full border-2 p-2 ${
            isError ? " border-red-500 " : " border-slate-900 "
          }`}
        >
          <pre>{output ? output : 'Click "Run Code" to see output here'}</pre>
        </div>
      </div>
    </>
  );
};

export default OutputWindow;
