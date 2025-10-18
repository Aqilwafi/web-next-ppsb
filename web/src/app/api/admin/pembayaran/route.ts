import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const supabase = supabaseAdmin;

    // 1️⃣ Ambil semua siswa + join ke profil lembaga dan user
    const { data: siswaList, error: siswaError } = await supabase
      .from("biodata_siswa")
      .select(`
        id,
        nama_lengkap,
        profile_id,
        csb_profile:profile_id (
          id,
          lembaga,
          tingkatan,
          users (
            id,
            email,
            username
          )
        )
      `);

    if (siswaError) throw siswaError;
    if (!siswaList || siswaList.length === 0) {
      return NextResponse.json({ pembayaran: [] });
    }

    // 2️⃣ Ambil semua dokumen bukti pembayaran (pakai user_id sekarang)
    const { data: buktiDocs, error: buktiError } = await supabase
      .from("dokumen")
      .select("user_id, url, tipe_file")
      .eq("tipe_file", "bukti");

    if (buktiError) throw buktiError;

    // 3️⃣ Gabungkan data siswa dan bukti
    const pembayaranData = siswaList.map((siswa) => {
      const userId = siswa.csb_profile?.users?.id;
      const bukti = buktiDocs.find((b) => b.user_id === userId);
      return {
        id: siswa.id,
        user_id: userId,
        nama_lengkap: siswa.nama_lengkap,
        lembaga: siswa.csb_profile?.lembaga ?? "-",
        kelas: siswa.csb_profile?.tingkatan ?? "-",
        email: siswa.csb_profile?.users?.email ?? "-",
        username: siswa.csb_profile?.users?.username ?? "-",
        status: bukti ? "Lunas" : "Belum Lunas",
        bukti: bukti?.url ?? null,
      };
    });

    return NextResponse.json({ pembayaran: pembayaranData });
  } catch (error) {
    console.error("[API /admin/pembayaran ERROR]", error);
    return NextResponse.json(
      { error: "Gagal memuat data pembayaran" },
      { status: 500 }
    );
  }
}
