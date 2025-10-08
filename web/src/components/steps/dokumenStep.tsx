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
      if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    }
  };

  return (
  <div className="bg-white rounded-lg shadow-md text-black">
    <h2 className="bg-blue-900 text-white px-4 py-2 font-bold rounded-t-md mb-4 text-lg">
      Upload Dokumen
    </h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* KTP Ortu */}
      <label className="flex flex-col">
        <span className="font-medium mb-1">KTP Orang Tua</span>
        <input
          type="file"
          accept=".pdf,image/*"
          disabled={isComplete}
          onChange={e => setRawKTP(e.target.files?.[0] || null)}
          className="border rounded px-3 py-2 hover:border-blue-500 transition-colors cursor-pointer"
        />
      </label>

      {/* KK */}
      <label className="flex flex-col">
        <span className="font-medium mb-1">Kartu Keluarga (KK)</span>
        <input
          type="file"
          accept=".pdf,image/*"
          disabled={isComplete}
          onChange={e => setRawKK(e.target.files?.[0] || null)}
          className="border rounded px-3 py-2 hover:border-blue-500 transition-colors cursor-pointer"
        />
      </label>

      {/* Akte */}
      <label className="flex flex-col">
        <span className="font-medium mb-1">Akte Kelahiran</span>
        <input
          type="file"
          accept=".pdf,image/*"
          disabled={isComplete}
          onChange={e => setRawFoto(e.target.files?.[0] || null)}
          className="border rounded px-3 py-2 hover:border-blue-500 transition-colors cursor-pointer"
        />
      </label>

      {!isComplete && (
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-2 cursor-pointer"
        >
          {loading ? "Mengupload..." : "Upload & Tandai Complete"}
        </button>
      )}

      {isComplete && (
        <p className="text-green-600 font-medium mt-2">Terima kasih, dokumen Anda telah berhasil diupload ✅</p>
      )}
    </form>


    {/* Error */}
    {error && <p className="text-red-600 mt-2">{error}</p>}
  </div>
);
}
