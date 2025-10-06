import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { verifyToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { userID, csb, siswa, ortu, wali, tempat } = await req.json();
    const supabase = await supabaseServer();

    // Ambil userId dari cookie JWT
    const token = req.cookies.get("token")?.value;
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
    //console.log(csb);

    // 🔹 Upsert biodata_siswa
    const { id, ...siswaData } = siswa; // hapus id
    const { data: siswaUpsert, error: siswaErr } = await supabase
      .from("biodata_siswa")
      .upsert([{ profile_id: userId, ...siswaData }], { onConflict: "profile_id" })
      .select()
      .single();
    //console.log(siswaData);
    if (siswaErr) throw siswaErr;
    //console.log(siswaData);

    const siswaId = siswaUpsert.id;

    const { id: ido, ...ortuData } = ortu; // hapus id
    // 🔹 Upsert biodata_ortu
    const { data: ortuUpsert, error: ortuErr } = await supabase
      .from("biodata_ortu")
      .upsert([{ siswa_id: siswaId, ...ortuData }], { onConflict: "siswa_id" })
      .select()
      .single();
    if (ortuErr) throw ortuErr;
    console.log(ortuData);
    

  

    
      const { id: idw, ...waliData } = wali;
      const { data: waliUpsert, error: waliErr } = await supabase
        .from("biodata_wali")
        .upsert([{ siswa_id: siswaId, ...waliData }], { onConflict: "siswa_id" })
        .select()
        .single();

      if (waliErr) throw waliErr;
      
      console.log("Upsert wali lengkap:", waliData);
    
    

    const { id: ids, ...tempatData } = tempat; // hapus id
    // 🔹 Upsert tempat_tinggal
    const { data: tempatUpsert, error: tempatErr } = await supabase
      .from("tempat_tinggal")
      .upsert([{ siswa_id: siswaId, ...tempatData }], { onConflict: "siswa_id" })
      .select()
      .single();
    if (tempatErr) throw tempatErr;
    console.log(tempatData);

    return NextResponse.json({
      success: true,
      data: { csb: csbUpsert, siswa: siswaUpsert, ortu: ortuUpsert, wali: waliUpsert, tempat: tempatUpsert },
    });

  } catch (err : unknown) {
    console.error("Upsert MultiTable API error:", err);
    return NextResponse.json({ success: false}, { status: 500 });
  }
}
