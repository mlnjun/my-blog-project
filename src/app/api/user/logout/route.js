import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { store } from "../../../../store/store";
import { logout } from "../../../../store/features/auth/authSlice";

export async function POST() {
  try {
    // 쿠키에서 토큰 삭제
    cookies().delete("accessToken");
    cookies().delete("refreshToken");

    // Redux 상태 업데이트
    store.dispatch(logout());

    return NextResponse.json(
      { message: "로그아웃 되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "로그아웃 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
