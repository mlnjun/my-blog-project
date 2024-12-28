import { NextResponse } from "next/server";
import { User } from "../../../../../models";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const result = await request.json();
    const { userId, password, name } = result;

    // 입력 값 체크
    if (!userId || !password || !name) {
      return NextResponse.json(
        { error: "모든 필드를 입력해야 합니다." },
        { status: 400 }
      );
    }

    // 아이디,비밀번호 길이 체크
    if (userId.length < 4) {
      return NextResponse.json(
        { error: "아이디는 4자 이상이어야 합니다." },
        { status: 400 }
      );
    } else if (password.length < 8) {
      return NextResponse.json(
        { error: "비밀번호는 8자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 아이디 중복 체크
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return NextResponse.json(
        { error: "이미 사용 중인 아이디입니다." },
        { status: 400 }
      );
    }

    // 사용자 생성
    const createdUser = await User.create({
      userId,
      password: hashedPassword,
      name,
    });

    // 사용자 생성 결과 확인
    if (!createdUser) {
      return NextResponse.json({ error: "회원가입 실패" }, { status: 500 });
    } else {
      return NextResponse.json({ message: "회원가입 성공" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
