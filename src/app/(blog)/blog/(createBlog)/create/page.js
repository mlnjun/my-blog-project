import Editor from "@/components/Editor";

const page = () => {
  return (
    <div className="flex flex-col pt-[57px] px-4 mx-auto max-w-[1080px] min-h-[calc(100vh-57px)]">
      <div className="flex flex-col flex-1 gap-2">
        <input
          className="h2 my-1.5 p-2 w-full bg-white rounded-lg min-h-[36px] max-md:max-w-full box-border border-[2px] border-transparent focus:border-primary focus:border-opacity-30 focus:outline-none"
          type="text"
          placeholder="제목"
        />

        <hr />

        <div className="flex justify-between items-center">
          <input
            className="body-1 mt-2 p-2 w-[50%] bg-white rounded-lg min-h-[36px] max-md:max-w-full box-border border-[2px] border-transparent focus:border-primary focus:border-opacity-30 focus:outline-none"
            type="text"
            placeholder="태그 추가"
          />

          <select
            type="text"
            className="my-2 p-2 w-[33%] bg-white rounded-lg min-h-[36px] max-md:max-w-full box-border border-[2px] border-n-5 focus:border-primary focus:border-opacity-30 focus:outline-none"
          >
            <option>카테고리</option>
          </select>
        </div>
        <div className="flex gap-1.5 mt-1 mb-2">
          <div className="font-semibold text-white bg-primary bg-opacity-80 p-2 border-[0.25px] rounded-lg">
            JavaScript
          </div>
          <div className="font-semibold text-white bg-primary bg-opacity-80 p-2 border-[0.25px] rounded-lg">
            Node.js
          </div>
        </div>

        <hr />

        <div className="flex-1">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default page;
