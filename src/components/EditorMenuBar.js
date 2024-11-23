import Image from "next/image";
// import { textEditorIcon } from "@/assets/icons";
// import formatBoldIcon from "@/app/assets/icon/format_bold_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

const EditorMenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    // 메뉴바 스타일링은 여기서
    // 있어야할 기능 모음
    // font-size, bold, underline, Code, CodeBlock, setLink, highlight text, TextColor, 이미지, 유튜브

    // 이미지 부모 태그로 버튼을 만들어서 hover 디자인 해서 자연스럽게 만들기
    <div className="flex justify-self-start px-2 py-1 border-2 bg-n-1 rounded-tr-lg">
      <div className="flex border-r pr-2 gap-1">
        <button
          className="rounded-lg hover:bg-n-4 w-8 h-8 justify-items-center"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Image src="/icon/title.svg" alt="title" width={24} height={24} />
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
  );
};

export default EditorMenuBar;
