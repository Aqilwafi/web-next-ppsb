import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const supabase = await supabaseServer();

    // 🔹 Validasi JWT dari cookie
    const token = req.cookies.get("siswa_token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id as string;

    // 🔹 Fetch data akun
    const { data: akunData, error: akunErr } = await supabase
      .from("users")
      .select("email, username")
      .eq("id", userId)
      .maybeSingle();

    if (akunErr) throw akunErr;

    // 🔹 Fetch data profile (csb_profile)
    const { data: profileData, error: profileErr } = await supabase
      .from("csb_profile")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (profileErr) throw profileErr;

    // 🔹 Fetch biodata siswa
    const { data: siswaData, error: siswaErr } = await supabase
      .from("biodata_siswa")
      .select("*")
      .eq("profile_id", userId)
      .maybeSingle();

    if (siswaErr) throw siswaErr;

    // 🔹 Jika siswaData belum ada, hentikan di sini
    if (!siswaData) {
      return NextResponse.json({
        success: true,
        data: {
          akun: akunData,
          csb: profileData,
          siswa: null,
          ortu: null,
          wali: null,
          tempat: null,
        },
      });
    }

    // 🔹 Fetch data ortu
    const { data: ortuData, error: ortuErr } = await supabase
      .from("biodata_ortu")
      .select("*")
      .eq("siswa_id", siswaData.id)
      .maybeSingle();

    if (ortuErr) throw ortuErr;

    // 🔹 Fetch data tempat tinggal
    const { data: tempatData, error: tempatErr } = await supabase
      .from("tempat_tinggal")
      .select("*")
      .eq("siswa_id", siswaData.id)
      .maybeSingle();

    if (tempatErr) throw tempatErr;

    // 🔹 Fetch data wali (boleh kosong)
    const { data: waliData, error: waliErr } = await supabase
      .from("biodata_wali")
      .select("*")
      .eq("siswa_id", siswaData.id)
      .maybeSingle();

    // Supabase `maybeSingle` akan return `null` kalau tidak ada data,
    // jadi kita gak perlu cek kode error manual seperti PGRST116
    if (waliErr) throw waliErr;

    // ✅ Response aman
    return NextResponse.json({
      success: true,
      data: {
        akun: akunData ?? null,
        csb: profileData ?? null,
        siswa: siswaData ?? null,
        ortu: ortuData ?? null,
        tempat: tempatData ?? null,
        wali: waliData ?? null,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Fetch biodata error:", err.message);
    } else if (typeof err === "string") {
      console.error("Fetch biodata error:", err);
    } else {
      console.error("Gagal mengambil biodata (unknown error).");
    }

    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
