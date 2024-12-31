import { NextResponse } from "next/server";
import { User } from "../../../../../models";
import validationRules from "@/constants/validation";

export async function GET(request) {
  try {
    const user = await User.findAll();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ message: "개발 환경: DB 작업 생략" });
  }

  try {
    const body = await request.json();
    const { username, password } = body;

    // 아이디 유효성 검사
    if (!username || username.length < validationRules.id.minLength) {
      return NextResponse.json(
        {
          success: false,
          message: `아이디는 ${validationRules.id.minLength}자 이상이어야 합니다.`,
        },
        { status: 400 }
      );
    }

    if (!validationRules.id.pattern.test(username)) {
      return NextResponse.json(
        {
          success: false,
          message: "아이디는 영문자와 숫자만 사용 가능합니다.",
        },
        { status: 400 }
      );
    }

    // 비밀번호 유효성 검사
    if (!password || password.length < validationRules.password.minLength) {
      return NextResponse.json(
        {
          success: false,
          message: `비밀번호는 ${validationRules.password.minLength}자 이상이어야 합니다.`,
        },
        { status: 400 }
      );
    }

    if (!validationRules.password.pattern.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message: "비밀번호는 영문자와 숫자를 모두 포함해야 합니다.",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      where: {
        username,
        password, // 실제 프로덕션에서는 암호화된 비밀번호를 사용해야 합니다
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "사용자를 찾을 수 없습니다." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
