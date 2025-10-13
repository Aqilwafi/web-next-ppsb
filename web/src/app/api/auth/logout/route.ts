// /app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({
    success: true,
    message: "Logout berhasil",
  });

  res.cookies.delete("token"); // hapus JWT cookie
  return res;
}
