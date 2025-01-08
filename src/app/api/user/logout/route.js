import { NextResponse } from "next/server";
import { User } from "../../../../../models";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const req = await request.json();
  const { token } = req.token;

  // 토큰 검증
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return NextResponse.json({ message: "유효하지 않은 토큰입니다." }, { status: 400 });
  }

  // 토큰 삭제
  await User.update({ token: null }, { where: { userId: decoded.userId } });

  return NextResponse.json({ message: "로그아웃 되었습니다." }, { status: 200 });
}
