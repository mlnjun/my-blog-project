// accessToken 검증 미들웨어

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const accessTokenAuthMiddleware = async (req) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  // accessToken이 없는 경우
  if (!accessToken) {
    return NextResponse.json(
      { message: "인증이 필요한 요청입니다" },
      { status: 401 }
    );
  }

  // accessToken 검증
  const decoded = jwt.verify(accessToken.value, process.env.JWT_SECRET);

  // 검증 실패
  if (!decoded) {
    return NextResponse.json(
      { message: "유효하지 않은 토큰입니다." },
      { status: 401 }
    );
  }

  // 검증 통과
  const user = await User.findOne({ where: { userId: decoded.userId } });

  // 사용자 조회 실패
  if (!user) {
    return NextResponse.json(
      { message: "사용자를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  // 토큰 재발급 로직 추가
  // 토큰 만료 시간은 초단위, Date.now()는 밀리초 단위
  const now = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
  const tokenExpiration = decoded.exp; // 토큰 만료 시간 (초 단위)
  const refreshThreshold = 60 * 15; // 15분 (재발급 임계값)

  if (tokenExpiration - now < refreshThreshold) {
    // refreshToken 쿠키 가져오기
    const refreshToken = cookieStore.get("refreshToken");

    // refreshToken이 없는 경우
    if (!refreshToken) {
      return NextResponse.json(
        { message: "리프레시 토큰이 없습니다. 다시 로그인해주세요." },
        { status: 401 }
      );
    }
    // refreshToken DB내 데이터 비교
    if (refreshToken.value !== user.refreshToken) {
      return NextResponse.json(
        { message: "리프레시 토큰이 일치하지 않습니다." },
        { status: 401 }
      );
    }

    try {
      // refreshToken 검증
      // 해석 실패시 오류로 catch 문으로 이동
      const decodedRefreshToken = jwt.verify(
        refreshToken.value,
        process.env.JWT_REFRESH_SECRET
      );

      // 새로운 accessToken 생성
      const newAccessToken = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      // 쿠키에 새 토큰 설정
      cookieStore.set({
        name: "accessToken",
        value: newAccessToken,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });

      return { user, decoded, newAccessToken };
    } catch (error) {
      // refreshToken 검증 실패 또는 기타 오류
      console.error("리프레시 토큰 검증 실패:", error);
      return NextResponse.json(
        { message: "유효하지 않은 리프레시 토큰입니다. 다시 로그인해주세요." },
        { status: 401 }
      );
    }
  }

  return { user, decoded };
};
