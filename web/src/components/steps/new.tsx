"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function UploadDokumen() {
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Pilih file dulu");

    // nama unik (misalnya pakai timestamp)
    const filePath = `dokumen/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("dokumen") // bucket name
      .upload(filePath, file);

    if (error) {
      console.error("Upload gagal:", error.message);
      return;
    }

    // Dapatkan URL file
    const { data: urlData } = supabase.storage
      .from("dokumen")
      .getPublicUrl(filePath);

    console.log("File URL:", urlData.publicUrl);

    // TODO: Simpan urlData.publicUrl ke tabel dokumen lewat API
    await fetch("/api/dokumen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file_url: urlData.publicUrl,
        nama: file.name,
      }),
    });
  };

  return (
    <div>
      <input
        type="file" accept="image/jpeg,image/png,application/pdf" 
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}

