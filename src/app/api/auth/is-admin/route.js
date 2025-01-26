import { withAuth } from "@/middleware/hof/withAuth";
import { NextResponse } from "next/server";

export const GET = withAuth(async (request, user) => {
  // 인증된 토큰의 유저 admin 여부 확인
  if (user.admin !== 1) {
    return NextResponse.json({ message: "권한이 없습니다" }, { status: 403 });
  }

  return NextResponse.json({ message: "인증 유효" });
}); 