import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex absolute overflow-hidden flex-col justify-center items-center px-16 py-3.5 w-full border-[0.1px] bg-[#BDD0F9]  max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between max-w-full w-[1059px]">
        <div className="h5">
          <Link href="/">Blog</Link>
        </div>

        {/* 비로그인 상태 */}
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
        {/* 로그인 상태 */}
        <div>
          <div className="flex items-center">
            <div>닉네임</div>
            <Image
              src="/icon/arrow_drop_down.svg"
              alt="arrow-down"
              width={25}
              height={25}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
