import Link from "next/link";

const Header = () => {
  return (
    <header className="flex overflow-hidden flex-col justify-center items-center px-16 py-3.5 w-full border-[0.1px] bg-blue-600 bg-opacity-30 border-sky-600 border-opacity-80 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between max-w-full w-[1059px]">
        <div className="h5">
          <Link href="/">Blog</Link>
        </div>
        <div>
          {/* 추후 로그인, 비로그인 상태 구분 예정 */}
          <Link href="/login">로그인</Link> / 
          <Link href="/signUp">회원가입</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
