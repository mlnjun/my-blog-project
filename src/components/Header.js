import Link from "next/link";

const Header = () => {
  return (
    <header className="flex absolute overflow-hidden flex-col justify-center items-center px-16 py-3.5 w-full border-[0.1px] bg-[#BDD0F9]  max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between max-w-full w-[1059px]">
        <div className="h5">
          <Link href="/">Blog</Link>
        </div>
        <div>
          {/* 추후 로그인, 비로그인 상태 구분 예정 */}
          <Link href="/login" className="font-semibold">
            로그인
          </Link>
          &nbsp;/&nbsp;
          <Link href="/signUp" className="font-semibold">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
