import { NextResponse } from "next/server";
import { BlogCategory } from "../../../../../../models";
import { withAuth } from "@/middleware/hof/withAuth";

export const POST = withAuth(async function (request) {
    try {
        const req = await request.json();
        const { name } = req;

        // 유효성 검사
        if (!name) {
            return NextResponse.json({ message: "카테고리 이름이 필요합니다." }, { status: 400 });
        }

        // 카테고리 이름 중복 검사
        const existingCategory = await BlogCategory.findOne({ where: { name } });
        if (existingCategory) {
            return NextResponse.json({ message: "이미 존재하는 카테고리 이름입니다." }, { status: 400 });
        }

        // 카테고리 생성
        const category = await BlogCategory.create({
            name,
        });

        // 카테고리 생성 완료
        return NextResponse.json({ message: "카테고리 생성 완료", category }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "카테고리 생성 실패", error }, { status: 500 });
    }
});