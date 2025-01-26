"use client"; // 클라이언트 컴포넌트 선언

import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { logout, login } from "@/store/features/auth/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";

const Header = () => {
  // Redux store에서 로그인 상태와 사용자 이름 가져오기
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const router = useRouter();

  console.log("userName type:", typeof userName);
  console.log("userName value:", userName);

  // 드롭다운 메뉴의 열림/닫힘 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 드롭다운 메뉴 요소에 대한 참조 생성
  const dropdownRef = useRef(null);

  // 드롭다운 외부 클릭 감지를 위한 이벤트 리스너
  useEffect(() => {
    // 클릭된 요소가 드롭다운 영역 밖인지 확인하는 핸들러
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // 드롭다운 영역 밖 클릭 시 메뉴 닫기
      }
    };

    // 문서 전체에 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // 토큰 유효성 검사 함수
    const checkAuth = async () => {
      try {
        await api.get('/api/auth/check');
      } catch (error) {
        if (error.response?.status === 401) {
          dispatch(logout());
          alert("인증이 만료되어 로그아웃 되었습니다.");
          router.refresh();
        }
      }
    };
    
    if (isLogin) {
      // 최초 실행
      checkAuth();
      
      // 5분마다 토큰 검사
      const interval = setInterval(checkAuth, 5 * 60 * 1000);
      
      // 컴포넌트 언마운트 시 인터벌 정리
      return () => clearInterval(interval);
    }
  }, [dispatch, isLogin, router]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");
      if (response.status === 200) {
        dispatch(logout());

        router.refresh();
        alert("로그아웃 되었습니다.");
      }
    } catch (error) {
      // 액시오스에서는 2xx에서 코드가 벗어나면 자동으로 오류 처리
      console.error("로그아웃 오류:", error);

      if (error.response) {
        // HTTP 에러 응답이 있는 경우
        if (error.response.status === 401) {
          alert("로그인이 필요합니다");
          dispatch(logout()); // 인증 만료 시 로그아웃
        } else {
          alert("로그아웃 처리 중 오류가 발생했습니다.");
        }
      } else {
        alert("서버 연결 오류가 발생했습니다.");
      }
    }
  };

  return (
    <header className="flex absolute flex-col justify-center items-center px-16 py-3.5 w-full border-[0.1px] bg-[#BDD0F9] max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between max-w-full w-[1059px]">
        {/* 로고/홈 링크 */}
        <div className="h5">
          <Link href="/">Blog</Link>
        </div>

        {/* 조건부 렌더링: 로그인 상태에 따라 다른 UI 표시 */}
        {isLogin ? (
          // 로그인 상태: 드롭다운 메뉴
          <div className="relative" ref={dropdownRef}>
            {/* 드롭다운 토글 버튼 */}
            <button
              className="flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div>{userName}&nbsp;님</div>
              {/* 드롭다운 상태에 따라 화살표 방향 변경 */}
              <Image
                src={`/icon/arrow_drop_${isDropdownOpen ? "up" : "down"}.svg`}
                alt="arrow"
                width={25}
                height={25}
              />
            </button>

            {/* 드롭다운 메뉴 - isDropdownOpen이 true일 때만 표시 */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                {/* 드롭다운 메뉴 항목들 */}
                <Link
                  href="/mypage"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
                >
                  마이페이지
                </Link>
                <Link
                  href="/blog/create"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  글쓰기
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          // 비로그인 상태: 로그인/회원가입 링크
          <div>
            <Link href="/login" className="font-semibold">
              로그인
            </Link>
            &nbsp;/&nbsp;
            <Link href="/sign-up" className="font-semibold">
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
