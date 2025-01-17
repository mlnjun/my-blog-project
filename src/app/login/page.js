"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/store/features/auth/authSlice";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
    autoLogin: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // 로그인 버튼 클릭 시
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    // 아이디, 비밀번호 모두 입력되었는지 확인
    if (loginInfo.userId === "") {
      alert("아이디를 입력해주세요.");
      document.getElementById("userId").focus();
      return;
    }
    if (loginInfo.password === "") {
      alert("비밀번호를 입력해주세요.");
      document.getElementById("password").focus();
      return;
    }

    // 로그인 요청
    try {
      const res = await axios.post("/api/user/login", loginInfo);

      // 로그인 성공 (status: 200)
      dispatch(login(res.data.name));

      router.push("/");
    } catch (error) {
      // 서버에서 전달한 에러 메시지 처리
      if (error.response) {
        // 서버가 응답을 반환한 경우 (status: 400)
        alert(error.response.data.message);
      } else {
        // 서버에 요청이 도달하지 못한 경우
        alert("로그인 중 오류가 발생했습니다.\n" + error.message);
      }
    }
  };

  return (
    <div className="flex transform origin-center translate-y-1/2">
      <section className="flex flex-col overflow-hidden self-center px-12 py-9 mx-auto max-w-full rounded-2xl border border-solid bg-blue-600 bg-opacity-30 w-[640px] max-md:px-5 ">
        <h1 className="h3 text-center">로그인</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="id">ID</label>
            <input
              type="id"
              id="userId"
              name="userId"
              value={loginInfo.userId}
              onChange={handleChange}
              className="flex mt-1.5 px-1 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="id"
            />
          </div>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="password">PW</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              className="flex mt-1.5 px-1 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="password"
            />
          </div>
          <div className="flex mt-5 mx-auto gap-4 justify-between w-[45%]">
            <button>
              <Image
                src="/google_btn.svg"
                alt="google"
                width={40}
                height={40}
              />
            </button>
            <button>
              <Image src="naver_btn.svg" alt="naver" width={40} height={40} />
            </button>
          </div>
        </form>
        <div className="flex gap-2 mt-2">
          <input type="checkbox" id="autoLogin" name="autoLogin" value={loginInfo.autoLogin} onChange={handleChange} />
          <label htmlFor="autoLogin">자동 로그인</label>
        </div>
        <button
          className="h5 text-n-1 w-full h-[45px] mt-5 bg-primary rounded-md hover:bg-[#005dc0]"
          onClick={handleSubmit}
        >
          로그인
        </button>
      </section>
    </div>
  );
};

export default Page;
