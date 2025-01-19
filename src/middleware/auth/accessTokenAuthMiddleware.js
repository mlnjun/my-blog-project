// accessToken 검증 미들웨어

// Next.js 14 이상부터는 next()를 사용하지 못한다.
// 이유는 
// App Router는 서버 컴포넌트 기반의 새로운 아키텍처 사용
// 미들웨어가 라우트 매칭 전에 실행되도록 설계됨
// 스트리밍과 정적 최적화를 위해 단순화된 요청 처리 파이프라인 채택

// 따라서 HOF를 사용해서 미들웨어 이후 추가로 처리해야하고 
// 따로 api에서도 HOF에서 처리된 결과에 따라 따로 응답을 반환해야한다.

import AuthResult from './AuthResult';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { User } from '@/models';

export const accessTokenAuthMiddleware = async (req) => {
  try {
    const cookieStore = await cookies();
    const accessToken = await cookieStore.get("accessToken");
    const refreshToken = await cookieStore.get("refreshToken");

    // accessToken이 없는 경우
    if (!accessToken) {
      if (!refreshToken) {
        return new AuthResult(false, null, "인증이 필요합니다");
      }

      // refreshToken으로 사용자 검증
      try {
        const decoded = jwt.verify(refreshToken.value, process.env.JWT_REFRESH_SECRET);
        const user = await User.findOne({ where: { userId: decoded.userId } });
        
        if (!user || refreshToken.value !== user.refreshToken) {
          return new AuthResult(false, null, "다시 로그인해주세요");
        }

        // 새 accessToken 발급 필요
        return new AuthResult(true, user, null);
      } catch (error) {
        return new AuthResult(false, null, "다시 로그인해주세요");
      }
    }

    // accessToken 검증
    try {
      const decoded = jwt.verify(accessToken.value, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { userId: decoded.userId } });
      return new AuthResult(true, user);
    } catch (error) {
      return new AuthResult(false, null, "인증이 만료되었습니다");
    }
  } catch (error) {
    return new AuthResult(false, null, "서버 오류가 발생했습니다");
  }
};