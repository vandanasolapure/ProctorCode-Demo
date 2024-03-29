import React, { useEffect } from "react";
import OutputWindow from "./components/OutputWindow";
import EditorWindow from "./components/EditorWindow";
import SplitterLayout from "react-splitter-layout-react-v18";
import "react-splitter-layout-react-v18/lib/index.css";
import Problem from "./components/Problem";

const CodeEditor = () => {
  useEffect(() => {
    const handleFullScreen = () => {
      if (!document.fullscreenElement) {
        alert("Fullscreen mode is compulsory. Minimizing is not allowed.");
        storeActionInDatabase("FullScreen");
        document.documentElement.requestFullscreen();
      }
    };

    const handleCopy = (event) => {
      event.preventDefault();
      alert("Copying is disabled.");
      storeActionInDatabase("Copy");
    };

    const handlePaste = (event) => {
      event.preventDefault();
      alert("Pasting is disabled.");
      storeActionInDatabase("Paste");
    };

    const handleTabSwitch = () => {
      alert("Tab switching is not allowed.");
      storeActionInDatabase("TabSwitch");
    };

    const editorElement = document.getElementById("editor-container");
    if (editorElement) {
      editorElement.addEventListener("copy", handleCopy);
      editorElement.addEventListener("paste", handlePaste);
    }

    document.addEventListener("fullscreenchange", handleFullScreen);
    document.addEventListener("visibilitychange", handleTabSwitch);

    return () => {
      if (editorElement) {
        editorElement.removeEventListener("copy", handleCopy);
        editorElement.removeEventListener("paste", handlePaste);
      }
      document.removeEventListener("fullscreenchange", handleFullScreen);
     document.removeEventListener("visibilitychange", handleTabSwitch);
    };
  }, []);

  const storeActionInDatabase = (action) => {
    fetch("/api/store-action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <SplitterLayout primaryIndex={1} secondaryInitialSize={350}>
      <Problem/>
      <SplitterLayout secondaryInitialSize={250}>
    <SplitterLayout vertical>
      <EditorWindow id="editor-container" />
      <OutputWindow />
    </SplitterLayout>
    </SplitterLayout>

    </SplitterLayout>
  );
};

export default CodeEditor;
