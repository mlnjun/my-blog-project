import { withAuth } from "@/middleware/hof/withAuth";
import { NextResponse } from "next/server";

async function logoutHandler(request, user) {
  // 응답 생성
  const response = NextResponse.json(
    { message: "로그아웃 되었습니다." },
    { status: 200 }
  );

  // 쿠키 삭제 시 원래 설정과 동일한 옵션 적용
  response.cookies.delete("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}

// 로그아웃 핸들러 등록
export const POST = withAuth(logoutHandler);
