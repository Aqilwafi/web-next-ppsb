import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";



export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      lembaga,
      tingkatan,
      nama,
      jenisKelamin,
      email,
      telepon,
      username,
      password,
    } = body;

    // Cek field wajib
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "Email, username, dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke DB
    const query = `
      INSERT INTO users
      (lembaga, tingkatan, nama, jenis_kelamin, email, telepon, username, password)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id, email, username, created_at
    `;
    const values = [
      lembaga,
      tingkatan,
      nama,
      jenisKelamin,
      email,
      telepon,
      username,
      hashedPassword,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({
      message: "Registrasi berhasil",
      user: result.rows[0],
    });
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
