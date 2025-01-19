import { accessTokenAuthMiddleware } from "@/middleware/auth/accessTokenAuthMidlleware";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const authResult = await accessTokenAuthMiddleware(request);
                
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        return NextResponse.json(
            { message: "유효한 인증입니다." },
            { status: 200 }
        );
        } catch (error) {
            console.error("인증 처리 중 오류 발생:", error);
            return NextResponse.json(
            { message: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}