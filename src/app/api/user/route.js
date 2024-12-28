import { NextResponse } from "next/server";
import { User } from "../../../../../models";

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
