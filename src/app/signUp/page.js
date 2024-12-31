"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import validationRules from "@/constants/validation";

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    password: "",
  });

  const [passwordCheck, setPasswordCheck] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordCheck = (e) => {
    const { value } = e.target;
    setPasswordCheck(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. 필수 입력값 검사
    if (formData.name === "") {
      alert("이름을 입력해주세요.");
      return;
    }

    // 아이디 유효성 검사
    if (formData.userId === "") {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (formData.userId.length < validationRules.id.minLength) {
      alert(`아이디는 ${validationRules.id.minLength}자 이상이어야 합니다.`);
      return;
    }
    if (!validationRules.id.pattern.test(formData.userId)) {
      alert("아이디는 영문자와 숫자만 사용 가능합니다.");
      return;
    }

    // 비밀번호 유효성 검사
    if (formData.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (formData.password.length < validationRules.password.minLength) {
      alert(
        `비밀번호는 ${validationRules.password.minLength}자 이상이어야 합니다.`
      );
      return;
    }
    if (!validationRules.password.pattern.test(formData.password)) {
      alert("비밀번호는 영문자와 숫자를 모두 포함해야 합니다.");
      return;
    }

    if (passwordCheck === "") {
      alert("비밀번호 재확인을 입력해주세요.");
      return;
    }

    // 2. 비밀번호 일치 검사
    if (formData.password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 3. 아이디 중복 검사 및 회원가입 진행
    axios
      .post("http://localhost:3000/api/user/check-id", {
        userId: formData.userId,
      })
      .then((res) => {
        // 아이디가 존재하지 않으면 회원가입 진행
        console.log(res.data);

        if (!res.data.exist) {
          console.log(res.data);
          // 회원가입 요청
          axios
            .post("http://localhost:3000/api/user/sign-up", {
              userId: formData.userId,
              name: formData.name,
              password: formData.password,
            })
            .then((res) => {
              alert("회원가입이 완료되었습니다.");
              router.push("/");
            })
            .catch((err) => {
              console.log("에러 응답:", err.response.data);
              alert(
                err.response.data.error ||
                  "회원가입 처리 중 오류가 발생했습니다."
              );
            });
        } else {
          console.log(res.data);
          alert("이미 존재하는 아이디입니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(
          err.response.data.error || "아이디 중복 확인 중 오류가 발생했습니다."
        );
      });
  };

  return (
    <div className="flex transform origin-center translate-y-1/4">
      <section className="flex flex-col overflow-hidden self-center px-12 py-9 mx-auto max-w-full rounded-2xl border border-solid bg-blue-600 bg-opacity-30 w-[640px] max-md:px-5 ">
        <h1 className="h3 text-center">회원가입</h1>
        <form>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="name" className="h6 text-n-9">
              이름
            </label>
            <input
              type="text"
              // id={id}
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="flex mt-1.5 px-2 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="name"
            />
          </div>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="id" className="h6 text-n-9">
              아이디
            </label>
            <input
              type="text"
              // id={id}
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="flex mt-1.5 px-2 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="id"
            />
          </div>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="password" className="h6 text-n-9">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="flex mt-1.5 px-2 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="password"
            />
          </div>
          <div className="flex overflow-hidden flex-col mt-5 w-full text-base text-black whitespace-nowrap max-md:max-w-full">
            <label htmlFor="passwordCheck" className="h6 text-n-9">
              비밀번호 재확인
            </label>
            <input
              type="password"
              name="passwordCheck"
              value={passwordCheck}
              onChange={handlePasswordCheck}
              className="flex mt-1.5 px-2 w-full bg-white rounded-lg border border-primary border-opacity-25 border-solid min-h-[36px] max-md:max-w-full focus:outline-none focus:border-n-6 focus:border-[2px]"
              aria-label="passwordCheck"
            />
          </div>
        </form>
        <button
          className="h5 text-n-1 w-full h-[45px] mt-7 bg-primary rounded-md hover:bg-[#005dc0]"
          onClick={handleSubmit}
        >
          회원가입
        </button>
      </section>
    </div>
  );
};

export default Page;
