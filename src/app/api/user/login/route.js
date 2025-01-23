import { NextResponse } from "next/server";
import { User, sequelize } from "../../../../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 로그인 요청 처리
export async function POST(request) {
  // 로그인 요청 받기
  const req = await request.json();
  const { userId, password, autoLogin } = req;

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

  // 트랜잭션 > 토큰 버전 증가 > 토큰 생성 > 응답 생성 > 쿠키 설정
  // 트랜잭션이란 데이터베이스 작업을 하나의 단위로 묶어서 처리하는 것
  // 모든 명령을 일괄적으로 처리하거나 모두 처리하지 않는 것을 보장하는 것
  // 파라미터로 데이터를 모아두고 예외가 발생하면 모든 작업을 취소하는 원리
  // 2. 트랜잭션 시작
  const result = await sequelize.transaction(async (t) => {
    // 2-1. tokenVersion 증가 (선택적)
    await user.increment("tokenVersion", { transaction: t });
    // 2-2. 최신 사용자 정보 다시 조회
    const updatedUser = await User.findOne({
      where: { userId },
      transaction: t,
    });

    // 2-3. 토큰 생성
    const authToken = jwt.sign(
      {
        userId: updatedUser.userId,
        name: updatedUser.name,
        tokenVersion: !updatedUser.tokenVersion ? 1 : updatedUser.tokenVersion,
      },
      process.env.JWT_SECRET,
      { expiresIn: autoLogin ? "90d" : "12h" }
    );

    return { authToken, user: updatedUser };
  });

  // 3. 응답 생성
  const response = NextResponse.json(
    {
      message: "로그인 성공",
      user: {
        name: result.user.name,
      },
    },
    { status: 200 }
  );

  // 응답 데이터 확인
  console.log("Login API Response:", response.data);

  // 4. 쿠키 설정
  response.cookies.set({
    name: "authToken",
    value: result.authToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: autoLogin ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
  });

  return response;
}
