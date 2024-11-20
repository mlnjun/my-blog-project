const EditorMenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    // 메뉴바 스타일링은 여기서
    // 있어야할 기능 모음
    // font-size, bold, underline, Code, CodeBlock, setLink, highlight text, TextColor, 이미지, 유튜브
    <div className="flex gap-1 border-x border-t">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        Bold
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
