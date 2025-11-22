import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
    .from("dokumen")
    .select(`
      user_id,
      tipe_file,
      url,
      uploaded_at,
      dokumen_status,
      csb_profile (
        lembaga,
        tingkatan,
        biodata_siswa (
          nama_lengkap
        )
      )
    `)
    .eq("tipe_file", "bukti");  // filter sesuai permintaan

    if (error) throw error;

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
