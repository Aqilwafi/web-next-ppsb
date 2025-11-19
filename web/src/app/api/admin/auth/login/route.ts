import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();
    const supabase = supabaseAdmin;

    // ambil admin dari DB (cari berdasarkan email ATAU username)
    const { data: admin, error } = await supabase
      .from("admins")
      .select("id, username, role, password_hash")
      .or(`email.eq.${identifier},username.eq.${identifier}`)
      .maybeSingle();

    if (error) throw error;

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin tidak ditemukan" },
        { status: 404 }
      );
    }

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) {
      return NextResponse.json(
        { success: false, message: "Password salah" },
        { status: 401 }
      );
    }

    // buat JWT valid 1 jam
    const token = signToken(
      { id: admin.id, username: admin.username, role: admin.role },
      "1h"
    );

    // simpan token di cookie HttpOnly
    const res = NextResponse.json({
      success: true,
      message: "Login berhasil",
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 jam
    });

    return res;
  } catch (err: unknown) {
    console.error("[ADMIN LOGIN ERROR]", err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Terjadi kesalahan server",
      },
      { status: 500 }
    );
  }
}
