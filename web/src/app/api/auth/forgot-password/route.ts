import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const supabase = await supabaseServer();

  if (!email) {
    return NextResponse.json({ success: false, message: "Email wajib diisi" }, { status: 400 });
  }

  // cari user berdasarkan email
  const { data: user, error: userErr } = await supabase
    .from("users")
    .select("id, email")
    .eq("email", email)
    .single();

  if (userErr || !user) {
    return NextResponse.json({ success: false, message: "Email tidak ditemukan" }, { status: 404 });
  }

  // generate token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // berlaku 30 menit

  // simpan token di tabel
  const { error: insertErr } = await supabase.from("reset_tokens").insert({
    user_id: user.id,
    token,
    expired_at: expiresAt.toISOString(),
  });

  if (insertErr) {
    return NextResponse.json({ success: false, message: "Gagal menyimpan token" }, { status: 500 });
  }

  // kirim link reset password (contoh: http://localhost:3000/reset-password?token=xxx)
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  console.log("🔗 Reset link:", resetLink);
  // TODO: kirim email ke user.email menggunakan nodemailer (nanti bisa kita buatkan juga)

  return NextResponse.json({ success: true, message: "Link reset sudah dikirim (cek email)" });
}
