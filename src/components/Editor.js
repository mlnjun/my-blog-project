// components/Editor.js
"use client"; // 클라이언트 컴포넌트로 설정

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import EditorMenuBar from "./EditorMenuBar";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
    ],
    content:
      '<p>Click <a href="https://tiptap.dev">here</a> to visit Tiptap!</p>',
  });

  return (
    <div>
      <EditorMenuBar editor={editor} />
      <EditorContent editor={editor} className="border" />
      <button onClick={() => console.log(editor.getHTML())}>
        게시
      </button>
    </div>
  );
};

export default Editor;
