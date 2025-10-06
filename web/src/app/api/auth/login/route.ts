import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();
    const supabase = await supabaseServer();

    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, username, password_hash")
      .or(`email.eq.${identifier},username.eq.${identifier}`)
      .maybeSingle();

    if (error) throw error;
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return NextResponse.json(
        { success: false, message: "Password salah" },
        { status: 401 }
      );
    }

    // 🔑 Buat JWT pakai lib/jwt.ts
    const token = signToken(
      { id: user.id, email: user.email, username: user.username },
      "1h"
    );

    // 🔑 Set cookie HttpOnly
    const res = NextResponse.json(
      { success: true, message: "Login berhasil", user: { id: user.id, email: user.email, username: user.username } },
      { status: 200 }
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 jam
    });

    return res;
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: err || "Internal Server Error" },
      { status: 500 }
    );
  }
}
