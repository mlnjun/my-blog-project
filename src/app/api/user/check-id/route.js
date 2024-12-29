import { NextResponse } from "next/server";
import { User } from "../../../../../models";

export async function POST(request) {
  try {
    const data = await request.json();
    const { userId } = data;

    if (!userId) {
      return NextResponse.json(
        { error: "아이디를 입력해야 합니다." },
        { status: 400 }
      );
    }

    const existUser = await User.findOne({
      where: {
        userId: userId,
      },
    });

    if (existUser) {
      // 중복된 결과
      return NextResponse.json({ exist: true });
    } else {
      // 중복되지 않은 결과
      return NextResponse.json({ exist: false });
    }
  } catch (error) {
    console.error("Error in check-id:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
