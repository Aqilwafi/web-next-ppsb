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
      (username, password, email, lembaga, tingkatan, nama, jenis_kelamin, no_telp)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id
    `;

    const values = [
      username,       // sebelumnya terakhir
      hashedPassword, // sebelumnya terakhir
      email,          // sebelumnya ke-5
      lembaga,        // sebelumnya pertama
      tingkatan,      // sebelumnya kedua
      nama,           // sebelumnya ketiga
      jenisKelamin,   // sebelumnya keempat
      telepon         // sebelumnya ke-6
    ];
    
    const result = await pool.query(query, values);
    const uID = result.rows[0].id;

    const queryz = `
      INSERT INTO user_step_status (user_id, step_id, status_step)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, step_id)
      DO UPDATE SET status_step = EXCLUDED.status_step, updated_at = NOW()
    `;

    const valuesz = [
      uID,
      1,
      'completed'
    ]

    const resultz = await pool.query(queryz, valuesz);

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
