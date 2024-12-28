import { NextResponse } from "next/server";
import { User } from "../../../../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const result = await request.json();
  const { userId, password } = result;

  // 입력 값 체크
  if (!userId) {
    return NextResponse.json(
      { error: "아이디를 입력해야 합니다." },
      { status: 400 }
    );
  } else if (!password) {
    return NextResponse.json(
      { error: "비밀번호를 입력해야 합니다." },
      { status: 400 }
    );
  }

  // 아이디 확인
  const user = await User.findOne({ userId });
  if (!user) {
    return NextResponse.json(
      { error: "아이디가 존재하지 않습니다." },
      { status: 400 }
    );
  }

  // 비밀번호 확인
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return NextResponse.json(
      { error: "비밀번호가 일치하지 않습니다." },
      { status: 400 }
    );
  }

  // JWT 토큰 생성
  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  // 자동 로그인 기능 구현 예정

  return NextResponse.json(
    { token },
    { message: "로그인 성공" },
    { status: 200 }
  );
}
