import { withAuth } from "@/middleware/hof/withAuth";
import { NextResponse } from "next/server";

export const GET = withAuth(async (request, user) => {
  return NextResponse.json({ message: "인증 유효" });
}); 