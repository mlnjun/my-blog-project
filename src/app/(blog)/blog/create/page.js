import Editor from "@/components/Editor";

const page = () => {
  return (
    <div className="flex flex-col mt-4 mx-auto max-w-[1080px]">
      <h1 className="h3">블로그 생성</h1>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col">
        <Editor></Editor>
      </div>
    </div>
  );
};

export default page;
