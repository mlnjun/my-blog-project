import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col sticky h-[calc(100hv-57px)] w-[250px] border bg-white">
      {/* 최근 방문록 */}
      <div className="flex flex-col p-4">
        최근 방문록
        <div>[카테고리] 글 제목 입니다.</div>
      </div>
    </div>
  );
};

export default Sidebar;
