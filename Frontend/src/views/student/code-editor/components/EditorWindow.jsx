/*import React, { useState, useContext } from "react";
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

   // Function to handle right-click event
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent default right-click behavior
  };

  // Function to handle copy and cut events
  const handleCopyCut = (event) => {
    event.preventDefault(); // Prevent default copy and cut behavior
    alert("Copying and cutting are disabled in this editor.");
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

          onContextMenu={handleContextMenu}
          onCopy={handleCopyCut}
          onCut={handleCopyCut}
          // options={({ fontSize: 50 }, { autoClosingBrackets: "never" })}
        />
      </div>
    </>
  );
};

export default EditorWindow;


import React, { useState, useContext } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "../constants/codeSnippets.js";
import CodeEditorContext from "../../../../contexts/CodeEditorContext.js";
import { useNavigate, useParams } from "react-router-dom"; 



const EditorWindow = () => {
  const { language, setLanguage, value, setValue, editorRef } =
    useContext(CodeEditorContext);
    const { examCode } = useParams();
    console.log(examCode);
  const onSelectChange = (sl) => {
    console.log(sl.value);
    setLanguage(sl.value);
    setValue(CODE_SNIPPETS[sl.value]);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Function to handle right-click event
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent default right-click behavior
  };

  // Function to handle copy and cut events
  const handleCopyCut = (event) => {
    event.preventDefault(); // Prevent default copy and cut behavior
    alert("Copying and cutting are disabled in this editor.");
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
          // Attach event handlers to intercept right-click, copy, and cut events
          onContextMenu={handleContextMenu}

          onCopy={handleCopyCut}
          onCut={handleCopyCut}
          // Additional options
          options={{
            fontSize: 14, // Example: set font size to 14
            readOnly: true // Example: make editor read-only (optional)
          }}
        />
      </div>
    </>
  );
};

export default EditorWindow;

*/
import React, { useState, useContext } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "../constants/codeSnippets.js";
import CodeEditorContext from "../../../../contexts/CodeEditorContext.js";
import { useNavigate, useParams } from "react-router-dom"; 

const EditorWindow = () => {
  const { language, setLanguage, value, setValue, editorRef } =
    useContext(CodeEditorContext);
  const { examCode } = useParams();
  console.log(examCode);

  const onSelectChange = (sl) => {
    console.log(sl.value);
    setLanguage(sl.value);
    setValue(CODE_SNIPPETS[sl.value]);
  };

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();

    // Disable copy, cut, and paste
    editor.updateOptions({
      readOnly: false, // Allow editing
      contextmenu: false, // Disable right-click context menu
      fontSize: 14 // Example: set font size to 14
    });

    // Disable copy command
    monaco.editor.registerCommand('editor.action.clipboardCopyAction', () => {});

    // Disable cut command
    monaco.editor.registerCommand('editor.action.clipboardCutAction', () => {});

    // Disable paste command
    monaco.editor.registerCommand('editor.action.clipboardPasteAction', () => {});
  };

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'v')) {
      event.preventDefault();
      alert("Copying and pasting are disabled in this editor.");
    }
  };

  return (
    <>
      <LanguageSelector
        defLanguage={language}
        onSelectChange={onSelectChange}
      />

      <div className="overlay overflow-hidden w-full h-full shadow-4xl" onKeyDown={handleKeyDown}>
        <Editor
          height="85vh"
          width="100vw"
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
    </>
  );
};

export default EditorWindow;

