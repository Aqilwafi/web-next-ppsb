// /admin/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, role } = await req.json();

    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // 🔹 Hash password sebelum simpan
    const password_hash = await bcrypt.hash(password, 10);

    const supabase = supabaseAdmin;

    // 🔹 Simpan ke tabel admin_pending (status pending)
    const { data, error } = await supabase
      .from("admins")
      .insert({
        username,
        email,
        password_hash,
        role,
        status: "pending", // status awal
        created_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) {
      // Bisa gagal karena duplicate email/username
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pendaftaran admin berhasil. Menunggu verifikasi Super Admin.",
      data,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
