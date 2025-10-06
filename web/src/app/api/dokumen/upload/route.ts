import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const supabase = await supabaseAdmin;
    const formData = await req.formData();

    const userId = formData.get("user_id") as string | null;
    const siswaIdStr = formData.get("siswa_id") as string | null;
    const siswaId = siswaIdStr ? Number(siswaIdStr) : null;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "UserId wajib ada" },
        { status: 400 }
      );
    }

    if (!siswaId) {
      return NextResponse.json(
        { success: false, message: "SiswaId wajib ada" },
        { status: 400 }
      );
    }

    // Sesuaikan key frontend
    const filePairs = [
      { file: formData.get("fileA") as File, jenis: "kk" },
      { file: formData.get("fileB") as File, jenis: "ktp" },
      { file: formData.get("fileC") as File, jenis: "akte" },
    ].filter((f) => f.file);

    const results: unknown[] = [];

    // Atomic upload
    for (const { file, jenis } of filePairs) {
      if (!file || !file.name) {
        throw new Error(`File ${jenis} tidak ditemukan`);
      }

      const ext = file.name.split(".").pop();
      const filePath = `${jenis}/${userId}.${ext}`;

      // Upload ke storage
      const { error: uploadErr } = await supabase.storage
        .from("doks")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });
      if (uploadErr) throw new Error(`Upload ${jenis} gagal: ${uploadErr.message}`);

      // Ambil URL publik
      const { data: urlData } = supabase.storage.from("doks").getPublicUrl(filePath);

      // Insert ke tabel dokumen
      const { error: dbErr } = await supabase.from("dokumen").insert({
        siswa_id: siswaId,
        nama_file: file.name,
        jenis,
        url: urlData.publicUrl,
      });

      if (dbErr) throw new Error(`Simpan ${jenis} ke DB gagal: ${dbErr.message}`);

      results.push({ jenis, url: urlData.publicUrl, path: filePath });
    }

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error("Upload multi error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
