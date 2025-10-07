import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const supabase = await supabaseAdmin;
    const formData = await req.formData();

    const userId = formData.get("user_id") as string | null;
    const siswaIdStr = formData.get("siswa_id") as string | null;
    const siswaId = siswaIdStr ? Number(siswaIdStr) : null;
    const jenis = (formData.get("jenis") as string | null)?.toLowerCase(); // contoh: "kk" atau "ijazah"
    const file = formData.get("file") as File | null;

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
    if (!file) {
      return NextResponse.json(
        { success: false, message: "File wajib diunggah" },
        { status: 400 }
      );
    }
    if (!jenis) {
      return NextResponse.json(
        { success: false, message: "Jenis dokumen wajib diisi" },
        { status: 400 }
      );
    }

    // Buat nama file unik: userId.jenis.ext
    const ext = file.name.split(".").pop();
    const filePath = `${jenis}/${userId}.${ext}`;

    // Upload ke storage dengan upsert
    const { error: uploadErr } = await supabase.storage
      .from("doks")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });
    if (uploadErr) throw new Error(`Upload gagal: ${uploadErr.message}`);

    // Ambil URL publik
    const { data: urlData } = supabase.storage.from("doks").getPublicUrl(filePath);
    const publicUrl = urlData.publicUrl;

    // Upsert ke tabel dokumen
    const { error: dbErr } = await supabase
      .from("dokumen")
      .upsert(
        {
          siswa_id: siswaId,
          nama_file: file.name,
          tipe_file: jenis,
          url: publicUrl,
        },
        { onConflict: "siswa_id,tipe_file" } // pastikan ada unique constraint di kolom ini
      );

    if (dbErr) throw new Error(`Upsert DB gagal: ${dbErr.message}`);

    return NextResponse.json({
      success: true,
      message: "Upload dan upsert berhasil",
      data: { siswa_id: siswaId, tipe_file: jenis, url: publicUrl },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Gagal upload dokumen.");
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
