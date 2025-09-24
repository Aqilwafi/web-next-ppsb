import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const res = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = res.rows[0];

    if (!user) {
      return NextResponse.json({ success: false, message: "Username tidak ditemukan" }, { status: 400 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ success: false, message: "Password salah" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      user: { username: user.username, name: user.nama || user.name }, // fallback kolom
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
