import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen relative">
      <div className="flex flex-col sticky top-[20%] h-fit max-h-[calc(60vh)] w-[250px] border shadow- rounded-lg bg-white">
        {/* 최근 방문록 */}
        <div className="flex flex-col p-4">
          <p className="font-semibold text-n-9"> 최근 방문록</p>

          <hr />

          <div className="flex flex-col gap-[3px] mt-2 text-n-9">
            <Link href="#">[카테고리] 글 제목 입니다.</Link>
            <Link href="#">[카테고리] 글 제목 입니다.</Link>
            <Link href="#">[카테고리] 글 제목 입니다.</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
