import React from "react";

const Card = () => {
  return (
    <div className="flex flex-col m-2 p-6 gap-[0.75rem] max-w-full bg-primary bg-opacity-[12.5%] border-[0.5px] border-primary border-opacity-50 w-[380px] rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-opacity-25">
      <div className="body-1 font-semibold">카테고리</div>
      <div className="h3">제목</div>
      <div className="body-1 text-n-8">해시태그</div>
      <div className="text-end body-2 text-n-7">조회수 12374</div>
    </div>
  );
};

export default Card;
