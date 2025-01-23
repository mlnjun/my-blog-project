import { NextResponse } from "next/server";
import { tokenAuthMiddleware } from "../auth/tokenAuthMiddleware";

export const withAuth = (handler) => async (request) => {
  try {
    // 1. 토큰 검증
    const authResult = await tokenAuthMiddleware(request);

    // 2. 인증 실패
    if (!authResult.isValid) {
      return NextResponse.json({ message: authResult.error }, { status: 401 });
    }

    // 3. 인증 성공, API 핸들러 실행
    return handler(request, authResult.user);
  } catch (error) {
    console.error("Auth HOF Error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
