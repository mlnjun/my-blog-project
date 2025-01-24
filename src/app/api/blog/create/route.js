import { NextResponse } from "next/server";


// 카테고리 기능 > 블로그 생성
export async function POST(request) {
    try {
        const req = await request.json();
        const { title, content, categoryId, userId } = req;

    // 유효성 검사

    // 블로그 생성
    const blog = await Blogs.create({
        title,
        content,
        category_id: categoryId,
        user_id: userId,
    });

    // 블로그 생성 완료
    return NextResponse.json({ message: "블로그 생성 완료", blog });
} catch (error) {
    return NextResponse.json({ message: "블로그 생성 실패", error }, { status: 500 });
}
}
