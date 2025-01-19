import { NextResponse } from 'next/server';
import { accessTokenAuthMiddleware } from '../auth/accessTokenAuthMiddleware';
import jwt from 'jsonwebtoken';

export const withAuth = (handler) => async (request) => {
  try {
    const authResult = await accessTokenAuthMiddleware(request);
    
    // 인증 실패
    if (!authResult.isValid) {
      return NextResponse.json(
        { message: authResult.error },
        { status: 401 }
      );
    }

    // 토큰 재발급이 필요한 경우 (refreshToken으로 인증된 경우)
    if (!request.cookies.get("accessToken")) {
      const newAccessToken = jwt.sign(
        { userId: authResult.user.userId, name: authResult.user.name },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      // API 핸들러 실행
      const response = await handler(request, authResult.user);

      // 새 토큰 쿠키 설정
      response.cookies.set({
        name: "accessToken",
        value: newAccessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 15
      });

      return response;
    }

    // 일반 인증 성공, API 핸들러 실행
    return handler(request, authResult.user);

  } catch (error) {
    console.error("Auth HOF Error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
