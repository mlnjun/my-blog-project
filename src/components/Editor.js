// components/Editor.js
"use client"; // 클라이언트 컴포넌트로 설정

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

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
      Placeholder.configure({ placeholder: "내용을 입력하세요..." }),
    ],
    content: "",
  });

  return (
    <div>
      <EditorMenuBar editor={editor} />
      <EditorContent editor={editor} className="p-1" />
      <button onClick={() => console.log(editor.getHTML())}>게시</button>
    </div>
  );
};

export default Editor;
