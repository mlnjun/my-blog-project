import Sidebar from "@/components/Sidebar";

const page = () => {
  return (
    <div className="flex justify-center pt-[57px]">
      <div className="flex flex-col max-w-[1080px] mr-4">
        {/* 콘텐츠 헤더 */}
        <div className="flex flex-col gap-1 my-5">
          <div className="px-2">
            <h3 className="h1">프리랜서의 성공 비결:시간 관리와 자기관리</h3>
            <p>카테고리</p>
          </div>
          <hr />
          <p className="body-2 text-right text-n-8">2024/2/24</p>
        </div>

        {/* 블로그 본문 */}
        <div>
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </div>
      </div>
      {/* 사이드바 */}
      <Sidebar />
    </div>
  );
};

export default page;
