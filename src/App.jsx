import React from "react";
import Editor from "./components/Editor";
import "./App.css"; 

const App = () => {
  return (
    <div className="app-container">
      <div className="editor-wrapper">
        <h1 className="editor-title">Tripdocks Editor</h1>
        <Editor />
      </div>
    </div>
  );
};

export default App;