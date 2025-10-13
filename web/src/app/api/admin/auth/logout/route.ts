import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({
      success: true,
      message: "Logout berhasil",
    });

    // Hapus cookie token admin
    res.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // pastikan dihapus dari browser
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal logout" },
      { status: 500 }
    );
  }
}
