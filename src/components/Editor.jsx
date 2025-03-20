import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { VariableExtension } from "../extensions/VariableExtension";
import "./Editor.css";

const Editor = () => {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      VariableExtension,
    ],
    content: `
      <h2>Introduction</h2>
      <p>Hey {{user_name}},</p>
      <p>We hope you're doing well.</p>
    `,
  });

  if (!editor) return null;

  const handleEditorClick = () => {
    if (!hasBeenClicked) {
      editor.commands.clearContent();
      setHasBeenClicked(true);
    }
  };

  return (
    <div className="editor-container" data-enable-grammarly="false">
      <div className="toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-button ${editor.isActive("bold") ? "active" : ""}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-button ${editor.isActive("italic") ? "active" : ""}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`toolbar-button ${
            editor.isActive("heading", { level: 2 }) ? "active" : ""
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`toolbar-button ${editor.isActive("bulletList") ? "active" : ""}`}
        >
          Bullet List
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="editor-content"
        onClick={handleEditorClick}
      />

      <div className="export-section">
        <button
          onClick={() => {
            const rawContent = editor.getJSON();
            const renderedContent = editor.getHTML();
            console.log("Raw Content:", rawContent);
            console.log("Rendered Content:", renderedContent);
          }}
          className="export-button"
        >
          Export Content
        </button>
      </div>
    </div>
  );
};

export default Editor;