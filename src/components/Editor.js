// components/Editor.js
"use client"; // 클라이언트 컴포넌트로 설정

import React from "react";
import Image from "next/image";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Image as tiptapImage } from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Button from "./Button";

import EditorMenuBar from "./EditorMenuBar";

const Editor = ({ onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      tiptapImage,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({ placeholder: "내용을 입력하세요..." }),
    ],
    content: "",

    onUpdate: ({ editor }) => {
      // ?. 옵셔널 체이닝 > 객체, 배열, 함수가 존재하는지 확인 후 존재하면 실행 없으면 스킵(오류 없음)
      onUpdate?.(editor.getHTML()); // HTML 형식으로 상위 컴포넌트에 전달
    },
  });

  return (
    <div className="relative">
      {/* 버블 메뉴 */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex justify-self-start px-2 py-1 border-2 bg-n-1 rounded-t-lg">
            <div className="flex border-r pr-2 gap-1">
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
              >
                <Image
                  src="/icon/title.svg"
                  alt="title"
                  width={24}
                  height={24}
                />
              </button>
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Image
                  src="/icon/format_size.svg"
                  alt="font_size"
                  width={24}
                  height={24}
                />
              </button>
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Image
                  src="/icon/format_bold.svg"
                  alt="bold"
                  width={24}
                  height={24}
                />
              </button>
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Image
                  src="/icon/format_italic.svg"
                  alt="italic"
                  width={24}
                  height={24}
                />
              </button>
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Image
                  src="/icon/format_underlined.svg"
                  alt="underlined"
                  width={24}
                  height={24}
                />
              </button>
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Image
                  src="/icon/ink_highlighter.svg"
                  alt="highlighter"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="flex border-r px-2 gap-1">
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Image src="/icon/code.svg" alt="code" width={24} height={24} />
              </button>
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => {
                  const url = prompt("Enter the URL");
                  editor.chain().focus().setLink({ href: url }).run();
                }}
              >
                <Image
                  src="/icon/add_link.svg"
                  alt="add_link"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="flex border-r px-2 gap-1">
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Image
                  src="/icon/code_blocks.svg"
                  alt="code_blocks"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="flex px-2 gap-1">
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Image
                  src="/icon/format_align_left.svg"
                  alt="format_align_left"
                  width={24}
                  height={24}
                />
              </button>
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Image
                  src="/icon/format_align_center.svg"
                  alt="format_align_center"
                  width={24}
                  height={24}
                />
              </button>
              <button
                className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
              >
                <Image
                  src="/icon/format_align_right.svg"
                  alt="format_align_right"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </BubbleMenu>
      )}

      <EditorContent
        editor={editor}
        onClick={() => editor.commands.focus()}
        className="mt-1.5 min-h-[calc(100vh-324px)] max-h-[calc(100vh-324px)] overflow-y-scroll scrollbar-w-2 scrollbar-thumb-n-6 scrollbar-track-n-1"
      />

      <div className="fixed bottom-0 left-0 right-0 bg-[#BDD0F9] h-16 flex items-center justify-center">
        <div className="w-[1059px] text-end">
          <Button className="mr-2" type="secondary">
            임시 저장
          </Button>
          <Button>게시하기</Button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
