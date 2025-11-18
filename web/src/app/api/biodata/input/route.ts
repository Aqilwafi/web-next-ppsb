import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { verifyToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { userID, csb, siswa, ortu, wali, tempat } = await req.json();
    const supabase = await supabaseServer();

    // 🔹 Ambil userId dari cookie JWT
    const token = req.cookies.get("siswa_token")?.value;
    if (!token)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded !== "object" || !("id" in decoded))
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });

    const userIdFromToken = decoded.id as string;

    // 🔹 Validasi userID dari body jika ada
    if (userID && userID !== userIdFromToken) {
      return NextResponse.json({ success: false, message: "User ID mismatch" }, { status: 403 });
    }

    const userId = userIdFromToken;

    // 🔹 Upsert CSBProfile
    const { data: csbUpsert, error: csbErr } = await supabase
      .from("csb_profile")
      .upsert([{ id: userId, ...csb }], { onConflict: "id" })
      .select()
      .single();
    if (csbErr) throw csbErr;

    // 🔹 Upsert biodata_siswa
    const { id, ...siswaData } = siswa;
    const { data: siswaUpsert, error: siswaErr } = await supabase
      .from("biodata_siswa")
      .upsert([{ id: userId, ...siswaData }], { onConflict: "id" })
      .select()
      .single();
    if (siswaErr) throw siswaErr;

    const siswaId = siswaUpsert.id;

    // 🔹 Upsert biodata_ortu
    const { id: ido, ...ortuData } = ortu;
    const { data: ortuUpsert, error: ortuErr } = await supabase
      .from("biodata_ortu")
      .upsert([{ id_siswa: siswaId, ...ortuData }], { onConflict: "id_siswa" })
      .select()
      .single();
    if (ortuErr) throw ortuErr;

    // ✅ Hanya lakukan upsert wali jika datanya tidak null
    let waliUpsert = null;
    if (wali) {
      const { id: idw, ...waliData } = wali;
      const { data, error } = await supabase
        .from("biodata_wali")
        .upsert([{ id_siswa: siswaId, ...waliData }], { onConflict: "id_siswa" })
        .select()
        .single();
      if (error) throw error;
      waliUpsert = data;
    }

    // 🔹 Upsert tempat_tinggal
    const { id: ids, ...tempatData } = tempat;
    const { data: tempatUpsert, error: tempatErr } = await supabase
      .from("tempat_tinggal")
      .upsert([{ id_siswa: siswaId, ...tempatData }], { onConflict: "id_siswa" })
      .select()
      .single();
    if (tempatErr) throw tempatErr;

    return NextResponse.json({
      success: true,
      data: { csb: csbUpsert, siswa: siswaUpsert, ortu: ortuUpsert, wali: waliUpsert, tempat: tempatUpsert },
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else if (typeof err === "string") {
      console.error(err);
    } else {
      console.error("Gagal memproses biodata.");
    }

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
