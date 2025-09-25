import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // ✅ kasih base URL supaya tidak error "Invalid URL"
    const { searchParams } = new URL(
      req.url,
      process.env.NEXTAUTH_URL || "http://localhost:3000"
    );

    const userIdStr = searchParams.get("userId");
    const username = searchParams.get("username");

    let user;

    if (userIdStr) {
      const userId = parseInt(userIdStr, 10);
      if (isNaN(userId)) {
        return NextResponse.json({ error: "userId invalid" }, { status: 400 });
      }

      const result = await pool.query(
        `SELECT id, nama, username, email, telepon, jenis_kelamin, lembaga, tingkatan
         FROM users
         WHERE id = $1`,
        [userId]
      );

      if (result.rowCount === 0) {
        return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
      }
      user = result.rows[0];
    } else if (username) {
      const result = await pool.query(
        `SELECT id, nama, username, email, no_telp, jenis_kelamin, lembaga, tingkatan
         FROM users
         WHERE username = $1`,
        [username]
      );

      if (result.rowCount === 0) {
        return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
      }
      user = result.rows[0];
    } else {
      return NextResponse.json({ error: "userId atau username harus ada" }, { status: 400 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("GET /api/user error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
