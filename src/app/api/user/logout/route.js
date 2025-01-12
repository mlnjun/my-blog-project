import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { User } from "../../../../../models";

export async function POST(request) {
  try {
    // 쿠키에서 토큰 삭제
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken");

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    // DB에서 토큰 삭제 (refreshToken이 있는 경우에만)
    if (refreshToken?.value) {
      try {
        await User.update(
          { refreshToken: null, tokenExpiry: null },
          { where: { refreshToken: refreshToken.value } }
        );
      } catch (dbError) {
        console.error("DB 업데이트 오류:", dbError);
        // DB 오류가 발생해도 로그아웃은 계속 진행
      }
    }

    return NextResponse.json(
      { message: "로그아웃 되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("로그아웃 오류:", error); // 에러 로깅 추가
    return NextResponse.json(
      { error: "로그아웃 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
