import { NextResponse } from "next/server";
import User from "../../../../../models/User";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await User.create({ email, password });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
