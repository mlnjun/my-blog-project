// accessToken 검증 미들웨어

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const accessTokenAuthMiddleware = async (req) => {
  try {
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

    // 토큰 만료 시간이 지났을 경우
    if (tokenExpiration - now < refreshThreshold) {
      // refreshToken 쿠키 가져오기
      const refreshToken = cookieStore.get("refreshToken");

      // refreshToken이 없는 경우
      if (!refreshToken) {
        return NextResponse.json(
          { message: "다시 로그인해주세요." },
          { status: 401 }
        );
      }
      // refreshToken DB내 데이터 비교
      if (refreshToken.value !== user.refreshToken) {
        return NextResponse.json(
          { message: "다시 로그인해주세요" },
          { status: 401 }
        );
      }
      
      // refreshToken 검증 및 새 accessToken 발급
      try {
        const decodedRefreshToken = jwt.verify(
          refreshToken.value,
          process.env.JWT_REFRESH_SECRET
        );

        const newAccessToken = jwt.sign(
          { userId: user.userId },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        const response = NextResponse.next();
        response.cookies.set({
          name: "accessToken",
          value: newAccessToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 15
        });

        return { user, decoded, response };

      } catch (refreshError) {
        // refreshToken 검증 실패 시 명확한 에러 메시지
        console.error("리프레시 토큰 검증 실패:", refreshError);
        return NextResponse.json(
          { message: "다시 로그인해주세요." },
          { status: 401 }
        );
      }
    }

    return { user, decoded };
    
  } catch (error) {
    console.error("인증 미들웨어 에러:", error);
    return NextResponse.json(
      { message: "인증에 실패했습니다." },
      { status: 401 }
    );
  }
};
