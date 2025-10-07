"use client";

import React, { useState } from "react";
import { DashboardStepProps } from "@/types/propsType";
import { useDokumen } from "@/hooks/useDokumen";

export default function PembayaranStep({
  user,
  isComplete,
  onComplete,
  isLoading = false,
}: DashboardStepProps) {
  const [loading, setLoading] = useState(false);
  const { bukti, setBukti, inputBukti } = useDokumen(user)
   // ✅ Tambahkan state

  const handleSubmit = async (e: React.FormEvent) => {

    
    setLoading(true);
     if (!user || !bukti) {
      alert("Lengkapi Bukti Pembayaran");
      return;
    }
    try {
      // Simulasi proses async
      await inputBukti();
      alert("Konfirmasi pembayaran berhasil!");
      if (!isComplete) onComplete();
      // Update status step
      
    } catch (err : unknown) {
      if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
      alert("Terjadi kesalahan saat konfirmasi pembayaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
       <div className="p-4 border rounded-lg bg-white">
      
  <h1 className="bg-blue-900 text-white px-4 py-2 font-bold text-lg rounded-md mb-4">
    Pembayaran Formulir Pendaftaran
  </h1>

  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
    <p className="text-gray-800 mb-4 leading-relaxed">
      Sebelum mendapatkan dan mengisi formulir pendaftaran, calon peserta didik wajib terlebih dahulu melakukan
      pembayaran biaya formulir sesuai jenjang pendidikan berikut:
    </p>

    <div className="space-y-5">
      {/* --- TPA, KB, TK, PAUD --- */}
      <div className="bg-white p-4 rounded-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          TPA, KB, dan TK
        </h2>
        <p className="text-gray-700">Transfer ke Rekening <span className="font-semibold">PAUD</span></p>
        <p className="text-gray-700 mb-2">
          Biaya Formulir: <span className="font-bold text-blue-700">Rp160.000,-</span>
        </p>
        <div className="flex items-center justify-between text-sm text-gray-800">
          <span>No. Rekening: <span className="font-semibold">1752831078</span></span>
          {!isComplete && (
            <button
              type="button"
              className="ml-2 text-blue-600 hover:text-blue-800"
              onClick={() => navigator.clipboard.writeText("1752831078")}
            >
              Copy
            </button>
          )}
        </div>
      </div>

      {/* --- MI --- */}
      <div className="bg-white p-4 rounded-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">MI (Madrasah Ibtidaiyah)</h2>
        <p className="text-gray-700">Transfer ke Rekening <span className="font-semibold">MI</span></p>
        <p className="text-gray-700 mb-2">
          Biaya Formulir: <span className="font-bold text-blue-700">Rp160.000,-</span>
        </p>
        <div className="flex items-center justify-between text-sm text-gray-800">
          <span>No. Rekening: <span className="font-semibold">1752831261</span></span>
          {!isComplete && (
            <button
              type="button"
              className="ml-2 text-blue-600 hover:text-blue-800"
              onClick={() => navigator.clipboard.writeText("1752831261")}
            >
              Copy
            </button>
          )}
        </div>
      </div>
    </div>

    <p className="mt-6 text-gray-800 leading-relaxed">
      Setelah melakukan pembayaran, unggah bukti transfer pada kolom yang tersedia.
      Panitia akan memverifikasi pembayaran, dan setelah itu formulir pendaftaran dapat diakses dan diisi secara online.
    </p>
  </div>


    <form
  onSubmit={handleSubmit}
  className="flex flex-col gap-4 w-full max-w-md mt-4"
>
  {!isComplete && (
    <>
      <label className="flex flex-col">
        <span className="font-medium mb-1">Upload Bukti Pembayaran</span>
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setBukti(e.target.files?.[0] || null)}
          className="border rounded px-3 py-2 hover:border-blue-500 transition-colors cursor-pointer"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className={`cursor-pointer bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition-all duration-150 ${
          loading ? "w-32" : "w-full"
        }`}
      >
        {loading && (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
        )}
        {loading ? "Menyimpan..." : "Konfirmasi Pembayaran"}
      </button>
    </>
  )}

  {isComplete && (
    <p className="text-green-600 font-medium mt-2">Step Selesai ✅</p>
  )}
</form>


    </div>
    </div>
  );
}
