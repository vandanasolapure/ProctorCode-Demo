import React, { useState, useContext } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "../constants/codeSnippets.js";
import CodeEditorContext from "../../../../contexts/CodeEditorContext.js";

const EditorWindow = () => {
  const { language, setLanguage, value, setValue, editorRef } =
    useContext(CodeEditorContext);

  const onSelectChange = (sl) => {
    console.log(sl.value);
    setLanguage(sl.value);
    setValue(CODE_SNIPPETS[sl.value]);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <>
      <LanguageSelector
        defLanguage={language}
        onSelectChange={onSelectChange}
      />

      <div className="overlay overflow-hidden w-full h-full shadow-4xl">
        <Editor
          height="85vh"
          width="100vw"
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
          // options={({ fontSize: 50 }, { autoClosingBrackets: "never" })}
        />
      </div>
    </>
  );
};

export default EditorWindow;
