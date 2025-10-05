"use client";

import React, { useState } from "react";
import { DashboardStepProps } from "@/types/propsType";

export default function PembayaranStep({
  user,
  isComplete,
  onComplete,
  isLoading = false,
}: DashboardStepProps) {
  const [loading, setLoading] = useState(false);
   // ✅ Tambahkan state

  const handleSubmit = async (e: React.FormEvent) => {
    
    setLoading(true);
    try {
      // Simulasi proses async

      alert("Konfirmasi pembayaran berhasil!");
      if (!isComplete) onComplete();
      // Update status step
      
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat konfirmasi pembayaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-blue-600">
        Pembayaran Formulir Pendaftaran
      </h1>
      <p className="text-gray-700">
        Silakan lakukan pembayaran sebesar <strong>Rp 300.000</strong> ke rekening berikut:
      </p>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Bank: ABCDE</li>
        <li>No. Rekening: XXxxxxxxx</li>
        <li>Atas Nama: Panitia Pendaftaran</li>
      </ul>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md mt-4"
      >
        <button
          type="submit"
          disabled={loading || isComplete}
          className={`cursor-pointer bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition-all duration-150 ${
            loading ? "w-32" : "w-full"
          }`}
        >
           {loading && (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          )}
          {loading
            ? "Menyimpan..."
            : isComplete
            ? "Step Selesai ✅"
            : "Konfirmasi Pembayaran"}
        </button>
      </form>
    </div>
  );
}
