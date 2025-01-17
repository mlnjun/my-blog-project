import { NextResponse } from "next/server";
import { User } from "../../../../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 로그인 요청 처리
export async function POST(request) {
  // 로그인 요청 받기
  const result = await request.json();
  const { userId, password, autoLogin } = result;

  // 유효성 검사
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

  // 로그인 성공
  // access 토큰 생성
  const accessToken = await jwt.sign(
    {
      userId: user.userId,
      name: user.name,
      // 발급시간, 만료시간 expiresIn에서 자동으로 해줌
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  // refresh 토큰 생성
  const refreshToken = await jwt.sign(
    {
      userId: user.userId,
      name: user.name,
      // 발급시간, 만료시간 expiresIn에서 자동으로 해줌
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn : autoLogin ? "30d" : "12h" }
  );

  // Refresh Token을 DB에 저장
  await User.update(
    {
      refreshToken,
      tokenExpiry: new Date(Date.now() + (autoLogin ? 30 * 24 * 60 * 60 * 1000 : 12 * 60 * 60 * 1000)), // 자동 > 30일, 수동 > 12시간
    },
    {
      where: { userId: user.userId },
    }
  );

  // 응답 생성
  const response = NextResponse.json(
    { message: "로그인 성공", accessToken, name: user.name },
    { status: 200 }
  );

  // 쿠키 설정
  response.cookies.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15, // 15분
  });

  response.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: autoLogin ? 60 * 60 * 24 * 30 : 60 * 60 * 12, // 30일
  });

  return response;
}
