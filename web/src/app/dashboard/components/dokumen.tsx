"use client"; // kalau pakai app router

import { useState } from "react";

export default function DokumenForm() {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    kk: null,
    akte: null,
    ijazah: null,
  });

  const handleChange = (field: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (files.kk) formData.append("kk", files.kk);
    if (files.akte) formData.append("akte", files.akte);
    if (files.ijazah) formData.append("ijazah", files.ijazah);

    const res = await fetch("/api/dokumen", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log("Upload result:", result);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Upload Dokumen</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KK */}
        <div className="flex flex-col bg-white shadow-md rounded-2xl p-4">
          <label className="font-medium mb-2">Kartu Keluarga (KK)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleChange("kk", e.target.files?.[0] || null)}
            className="border rounded-md p-2 text-sm"
          />
          {files.kk && (
            <p className="text-xs text-green-600 mt-2">
              File dipilih: {files.kk.name}
            </p>
          )}
        </div>

        {/* Akte */}
        <div className="flex flex-col bg-white shadow-md rounded-2xl p-4">
          <label className="font-medium mb-2">Akte Kelahiran</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleChange("akte", e.target.files?.[0] || null)}
            className="border rounded-md p-2 text-sm"
          />
          {files.akte && (
            <p className="text-xs text-green-600 mt-2">
              File dipilih: {files.akte.name}
            </p>
          )}
        </div>

        {/* Ijazah */}
        <div className="flex flex-col bg-white shadow-md rounded-2xl p-4">
          <label className="font-medium mb-2">Ijazah</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleChange("ijazah", e.target.files?.[0] || null)}
            className="border rounded-md p-2 text-sm"
          />
          {files.ijazah && (
            <p className="text-xs text-green-600 mt-2">
              File dipilih: {files.ijazah.name}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-3 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Simpan Dokumen
          </button>
        </div>
      </form>
    </div>
  );
}
