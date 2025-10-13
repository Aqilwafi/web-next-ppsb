import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json();
  const supabase = await supabaseServer();

  if (!token || !newPassword) {
    return NextResponse.json({ success: false, message: "Data tidak lengkap" }, { status: 400 });
  }

  // cek token valid
  const { data: tokenRow, error: tokenErr } = await supabase
    .from("reset_tokens")
    .select("user_id, expired_at, used")
    .eq("token", token)
    .single();

  if (tokenErr || !tokenRow) {
    return NextResponse.json({ success: false, message: "Token tidak valid" }, { status: 400 });
  }

  if (tokenRow.used) {
    return NextResponse.json({ success: false, message: "Token sudah digunakan" }, { status: 400 });
  }

  if (new Date(tokenRow.expires_at) < new Date()) {
    return NextResponse.json({ success: false, message: "Token sudah kedaluwarsa" }, { status: 400 });
  }

  // hash password baru
  const hashed = await bcrypt.hash(newPassword, 10);

  // update password user
  const { error: updateErr } = await supabase
    .from("users")
    .update({ password_hash: hashed })
    .eq("id", tokenRow.user_id);

  if (updateErr) {
    return NextResponse.json({ success: false, message: "Gagal update password" }, { status: 500 });
  }

  // tandai token sudah digunakan
  await supabase.from("password_reset_tokens").update({ used: true }).eq("token", token);

  return NextResponse.json({ success: true, message: "Password berhasil direset" });
}
