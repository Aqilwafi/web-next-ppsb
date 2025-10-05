import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const supabase = await supabaseServer();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
    const userId = decoded.id as string;

    const { data: akunData, error: akunerr } = await supabase
      .from("users")
      .select("email, username")
      .eq("id", userId)
      .maybeSingle();  

    if (akunerr) throw akunerr;

    const { data: profileData, error: profileErr } = await supabase
      .from("csb_profile")
      .select("*")
      .eq("id", userId)
      .maybeSingle(); 

    if (profileErr) throw profileErr;

    const { data: siswaData, error: siswaErr } = await supabase
      .from("biodata_siswa")
      .select("*")
      .eq("profile_id", userId)
      .maybeSingle();

    if (siswaErr) throw siswaErr;

    const { data: ortuData, error: ortuErr } = await supabase
      .from("biodata_ortu")
      .select("*")
      .eq("siswa_id", siswaData.id)
      .maybeSingle();
    
    if (ortuErr) throw ortuErr;

    const { data: tempatData, error: tempatErr } = await supabase
      .from("tempat_tinggal")
      .select("*")
      .eq("siswa_id", siswaData.id)
      .maybeSingle();
    
    if (tempatErr) throw tempatErr;

    const { data: waliData, error: waliErr } = await supabase
      .from("biodata_wali")
      .select("*")
      .eq("siswa_id", siswaData.id)
      .maybeSingle();
      
    if (waliErr && waliErr.code !== "PGRST116") throw waliErr; // Ignore "no rows found" error

    return NextResponse.json({
      success: true,
      data: { akun: akunData, csb: profileData, siswa: siswaData, ortu: ortuData, tempat: tempatData, wali: waliData },
    });

  } catch (err: any) {
    console.error("fetchBioSiswa API error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
