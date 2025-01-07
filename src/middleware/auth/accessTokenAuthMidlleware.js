// accessToken 검증 미들웨어

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const accessTokenAuthMiddleware = async (req) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return NextResponse.json({ message: "인증이 필요한 요청입니다" }, { status: 401 })
  }

  const decoded = jwt.verify(accessToken.value, process.env.JWT_SECRET);
};
