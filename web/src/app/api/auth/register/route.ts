// /app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { 
      email, 
      username, 
      password, 
      lembaga, 
      tingkatan, 
      nama_lengkap, 
      jenis_kelamin 
    } = await req.json();

    const supabase = await supabaseServer();

    // 🔹 validasi minimal
    if (!email || !username || !password || !lembaga || !nama_lengkap || !jenis_kelamin) {
      return NextResponse.json({ success: false, message: "Field wajib belum lengkap" });
    }

    // 🔹 cek email / username
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .maybeSingle();


    if (checkError) throw checkError;
    if (existingUser) {
      return NextResponse.json({ success: false, message: " username sudah terdaftar, silahkan pilih username lain" });
    }

    // 🔹 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 insert user
    const { data: newUser, error: userError } = await supabase
      .from("users")
      .insert({
        email,
        username,
        password_hash: hashedPassword,
        created_at: new Date().toISOString(),
      })
      .select("id, email, username")
      .single();

    if (userError || !newUser) throw userError ?? new Error("Gagal membuat user");

    try {
      // 🔹 insert profile
      const { data: newProfile, error: profileError } = await supabase
        .from("csb_profile")
        .insert({
          id: newUser.id,
          lembaga,
          tingkatan: tingkatan || null,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (profileError || !newProfile) throw profileError ?? new Error("Gagal membuat profile");

      // 🔹 insert biodata
      const { data: newBiodata, error: biodataError } = await supabase
        .from("biodata_siswa")
        .insert({
          profile_id: newUser.id,
          nama_lengkap,
          jenis_kelamin,
        })
        .select()
        .single();
      if (biodataError || !newBiodata) throw biodataError ?? new Error("Gagal membuat biodata");

      return NextResponse.json({ success: true, user: newUser, profile: newProfile });
    } catch (nestedError) {
      // 🔹 rollback user kalau profile/biodata gagal
      await supabase.from("users").delete().eq("id", newUser.id);
      throw nestedError;
    }
  } catch (err: unknown) {
    return NextResponse.json({ success: false, message: err + "Internal Server Error" });
  }
}
