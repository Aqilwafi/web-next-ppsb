import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const supabase = supabaseAdmin;
    const formData = await req.formData();

    const userID = formData.get("user_id") as string | null;
    const jenis = (formData.get("jenis") as string | null)?.toLowerCase(); // contoh: "kk" atau "ijazah"
    const file = formData.get("file") as File | null;

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

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "UserId wajib ada" },
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
          user_id: userId,
          nama_file: file.name,
          tipe_file: jenis,
          url: publicUrl,
        },
        { onConflict: "user_id, tipe_file" } // pastikan ada unique constraint di kolom ini
      );

    if (dbErr) throw new Error(`Upsert DB gagal: ${dbErr.message}`);

    return NextResponse.json({
      success: true,
      message: "Upload dan upsert berhasil",
      data: { user_id: userId, tipe_file: jenis, url: publicUrl },
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
