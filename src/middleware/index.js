import { NextResponse } from "next/server";
import { store } from "../store/store";
import { logout } from "../store/features/auth/authSlice";
import { accessTokenAuthMiddleware } from "./auth/accessTokenAuthMiddleware";

// 인증이 필요한 API 경로 목록
const AUTH_REQUIRED_APIS = [
  "/api/user/logout",
  "/api/user/profile",
  "/api/posts/write",
];

// 보호된 페이지 경로 목록
const PROTECTED_ROUTES = ["/write", "/mypage"];

// 로그인된 상태에서 접근 불가능한 경로
const AUTH_RESTRICTED_ROUTES = ["/login", "/sign-up"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken");

  // 1. API 요청 처리
  if (pathname.startsWith("/api/")) {
    // 인증이 필요한 API인지 확인
    // some : 배열의 요소 중 하나라도 조건을 만족하면 true를 반환
    // some((api) => ) : api는 배열의 요소를 하나씩 순회하면서 조건을 만족하는지 확인
    const needsAuth = AUTH_REQUIRED_APIS.some((api) =>
      pathname.startsWith(api)
    );

    // 인증이 필요한 API인 경우
    if (needsAuth) {
      // accessTokenAuthMiddleware 실행
      const authResult = await accessTokenAuthMiddleware(request);

      // 인증 실패 시 (NextResponse가 반환된 경우)
      if (authResult instanceof NextResponse) {
        return authResult;
      }
    }

    return NextResponse.next();
  }

  // 2. 페이지 라우트 처리
  // 보호된 라우트 체크
  // 보호된 주소 상수 배열의 포함된 주소인지 확인
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    // 토큰이 없는 경우
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 토큰이 있는 경우
    const authResult = await accessTokenAuthMiddleware(request);
    if (authResult instanceof NextResponse) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      store.dispatch(logout());
      return response;
    }
  }

  // 3. 로그인 상태에서 접근 제한된 페이지 처리
  // 토큰이 있고 접근 제한된 주소인 경우
  if (
    accessToken &&
    AUTH_RESTRICTED_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
