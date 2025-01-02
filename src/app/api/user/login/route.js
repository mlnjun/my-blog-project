import { NextResponse } from "next/server";
import { User } from "../../../../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 로그인 요청 처리
export async function POST(request) {
  const result = await request.json();
  const { userId, password } = result;

  // 입력 값 체크
  if (!userId) {
    return NextResponse.json(
      { message: "아이디를 입력해야 합니다." },
      { status: 400 }
    );
  } else if (!password) {
    return NextResponse.json(
      { message: "비밀번호를 입력해야 합니다." },
      { status: 400 }
    );
  }

  // 아이디 확인
  const user = await User.findOne({ where: { userId } });
  if (!user) {
    return NextResponse.json(
      { message: "아이디 또는 비밀번호를 확인해주세요." },
      { status: 400 }
    );
  }

  // 비밀번호 확인
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return NextResponse.json(
      { message: "아이디 또는 비밀번호를 확인해주세요." },
      { status: 400 }
    );
  }

  // JWT 토큰 생성
  const token = await jwt.sign(
    { userId: user.userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );

  // 응답 객체 생성
  const response = NextResponse.json(
    { message: "로그인 성공", token },
    { status: 200 }
  );

  // 쿠키 설정
  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12, // 12시간
  });

  return response;
}
