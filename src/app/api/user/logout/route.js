import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/models/User";

export async function POST(request) {
  // 쿠키에서 토큰 가져오기
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  // 유효성 검사
  // 토큰이 없는 경우
  if (!accessToken) {
    return NextResponse.json(
      { message: "로그아웃 할 수 없습니다." },
      { status: 401 }
    );
  }

  if (!refreshToken) {
    return NextResponse.json(
      { message: "로그아웃 할 수 없습니다." },
      { status: 401 }
    );
  }

  // 토큰 검증
  const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

  if (!decoded) {
    return NextResponse.json(
      { message: "유효하지 않은 토큰입니다." },
      { status: 401 }
    );
  }

  // 
  const user = await User.findOne({ token: token.value });

  if (!user) {
    return NextResponse.json(
      { message: "유효하지 않은 토큰입니다." },
      { status: 401 }
    );
  }

  // 토큰 삭제
  await User.updateOne({ _id: user._id }, { $set: { token: null } });

  // 쿠키 삭제
  cookieStore.delete("accessToken");

  return NextResponse.json(
    { message: "로그아웃 되었습니다." },
    { status: 200 }
  );
}
