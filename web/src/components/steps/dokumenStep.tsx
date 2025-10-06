"use client";

import React, { useState } from "react";
import { useDokumen } from "@/hooks/useDokumen";
import { DashboardStepProps } from "@/types/propsType";
import { UploadResult } from "@/types/dokumenType";

export default function DokumenStep({ user, isComplete, onComplete }: DashboardStepProps) {
  const { rawKK, rawKTP, rawFoto, setRawKK, setRawKTP, setRawFoto, inputDokumen, loading, error } = useDokumen(user);
const [hasilUpload, setHasilUpload] = useState<UploadResult[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("rawKK:", rawKK);
    console.log("rawKTP:", rawKTP);
    console.log("rawFoto:", rawFoto);
    if (!rawKK || !rawKTP || !rawFoto) {
      alert("Lengkapi semua file sebelum submit");
      return;
    }

    try {
      const results = await inputDokumen();
      setHasilUpload(results);
      onComplete(); // step complete jika semua sukses
    } catch (err : unknown) {
      alert("Gagal upload: " +  err);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white text-black">
      <h2 className="bg-blue-900 text-white px-4 py-2 font-bold mb-3">Upload Dokumen</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" accept=".pdf,image/*" onChange={e => setRawKTP(e.target.files?.[0] || null)} />
        <input type="file" accept=".pdf,image/*" onChange={e => setRawKK(e.target.files?.[0] || null)} />
        <input type="file" accept=".pdf,image/*" onChange={e => setRawFoto(e.target.files?.[0] || null)} />

        {!isComplete && (
          <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
            {loading ? "Mengupload..." : "Upload & Tandai Complete"}
          </button>
        )}
        {isComplete && <p className="text-green-600 font-medium mt-2">Proses sudah selesai ✅</p>}
      </form>

      {hasilUpload.length > 0 && (
        <ul className="mt-4 list-disc pl-6">
          {hasilUpload.map((item, idx) => (
            <li key={idx}>
              {item.jenis.toUpperCase()} → <a href={item.url} target="_blank" className="text-blue-600 underline">{item.url}</a>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
