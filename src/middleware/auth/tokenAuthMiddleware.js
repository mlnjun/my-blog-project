// accessToken 검증 미들웨어

// Next.js 14 이상부터는 next()를 사용하지 못한다.
// 이유는
// App Router는 서버 컴포넌트 기반의 새로운 아키텍처 사용
// 미들웨어가 라우트 매칭 전에 실행되도록 설계됨
// 스트리밍과 정적 최적화를 위해 단순화된 요청 처리 파이프라인 채택

// 따라서 HOF를 사용해서 미들웨어 이후 추가로 처리해야하고
// 따로 api에서도 HOF에서 처리된 결과에 따라 따로 응답을 반환해야한다.

import AuthResult from "./AuthResult";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { User } from "../../../models";

export const tokenAuthMiddleware = async (request) => {
  try {
    const storeCookies = await cookies();
    // 1. 토큰 확인
    const authToken = storeCookies.get("authToken");
    
    if (!authToken) {
      return new AuthResult(false, null, "인증이 필요합니다");
    }
    
    try {
      // 2. 토큰 검증 및 디코딩
      const decoded = jwt.verify(authToken.value, process.env.JWT_SECRET);

      // 3. 사용자 조회 및 토큰 버전 검증
      const user = await User.findOne({
        where: {
          userId: decoded.userId,
          tokenVersion: decoded.tokenVersion, // 토큰 버전 일치 확인
        },
      });

      // 4. 사용자 존재 여부 확인
      if (!user) {
        return new AuthResult(false, null, "로그인 정보가 잘못되었습니다.");
      }

      // 5. 인증 성공
      return new AuthResult(true, user);
      
    } catch (jwtError) {
      // JWT 검증 실패 (만료 등)
      if (jwtError instanceof jwt.TokenExpiredError) {
        return new AuthResult(false, null, "인증이 만료되었습니다");
      }
      return new AuthResult(false, null, "유효하지 않은 토큰입니다");
    }

  } catch (error) {
    // 기타 에러
    console.error("Auth Middleware Error:", error);
    return new AuthResult(false, null, "인증 처리 중 오류가 발생했습니다");
  }
};
