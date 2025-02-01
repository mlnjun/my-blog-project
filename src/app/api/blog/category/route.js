import { withAuth } from "@/middleware/hof/withAuth";
import { BlogCategory } from "../../../../../models";
import { NextResponse } from "next/server";

export const GET = withAuth(async (request, user) => {
  const categories = await BlogCategory.findAll({
    attributes: ["name"],
  });

  return NextResponse.json({ categories });
});
