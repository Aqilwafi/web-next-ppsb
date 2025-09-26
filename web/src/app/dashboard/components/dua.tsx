"use client";

import React, { useState } from "react";

export default function SamplePage() {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi proses async
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Data berhasil disimpan!");
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-blue-600">Judul Halaman (H1)</h1>
      <h2 className="text-2xl font-semibold text-blue-500">Sub Judul (H2)</h2>
      <h3 className="text-xl font-medium text-blue-400">Sub Sub Judul (H3)</h3>

      <p className="text-gray-700">
        Ini adalah contoh paragraf yang menjelaskan konten halaman. Anda bisa menambahkan
        teks panjang di sini untuk mencontoh layout.
      </p>

      <ul className="list-disc pl-6 text-gray-700">
        <li>Poin pertama</li>
        <li>Poin kedua</li>
        <li>Poin ketiga</li>
      </ul>

      <p className="text-gray-600">
        Paragraf tambahan untuk menambahkan variasi konten di halaman ini.
      </p>

      <form onSubmit={handleClick} className="flex flex-col gap-4 w-full max-w-md">
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition-all duration-150 ${
            loading ? "w-32" : "w-full"
          }`}
        >
          {loading ? "Menyimpan..." : "Simpan Biodata"}
        </button>
      </form>
    </main>
  );
}
