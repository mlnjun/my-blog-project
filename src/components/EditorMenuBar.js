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
    <div className="flex px-2 py-1 gap-1 border-x border-t">
      <button
        className="rounded-lg hover:bg-n-4"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <Image src="/icon/code.svg" alt="bold" width={24} height={24} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        Italic
      </button>
      <button
        onClick={() => {
          const url = prompt("Enter the URL");
          editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        Add Link
      </button>
    </div>
  );
};

export default EditorMenuBar;
