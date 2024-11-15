import React from "react";

const Header = () => {
  return (
    <header className="flex overflow-hidden flex-col justify-center items-center px-16 py-3.5 w-full border-[0.1px] bg-blue-600 bg-opacity-30 border-sky-600 border-opacity-80 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between max-w-full w-[1059px]">
        <div className="h5">Blog</div>
        <div>
          {/* 추후 로그인, 비로그인 상태 구분 예정 */}
          <a href="#">로그인</a> / <a href="#">회원가입</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
