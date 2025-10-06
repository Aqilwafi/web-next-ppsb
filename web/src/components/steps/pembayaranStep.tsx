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
      <h1 className="text-3xl font-bold text-blue-600">
        Pembayaran Formulir Pendaftaran
      </h1>
      <div className="bg-gray-100 p-4 rounded-md">
  <h2 className="text-black font-bold mb-2">Bank: BNI</h2>
  <ul className="list-disc pl-6 text-black">
    <li className="flex items-center justify-between">
      MI: 1752831261
      {!isComplete && (
        <button
          type="button"
          className="ml-2 text-sm text-blue-600 hover:text-blue-800"
          onClick={() => navigator.clipboard.writeText("1752831261")}
        >
          Copy
        </button>
      )}
    </li>
    <li className="flex items-center justify-between">
      PAUD: 1752831078
      {!isComplete && (
        <button
          type="button"
          className="ml-2 text-sm text-blue-600 hover:text-blue-800"
          onClick={() => navigator.clipboard.writeText("1752831078")}
        >
          Copy
        </button>
      )}
    </li>
  </ul>
</div>


     <form
  onSubmit={handleSubmit}
  className="flex flex-col gap-4 w-full max-w-md mt-4"
>
  {!isComplete && (
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
  )}

  {isComplete && (
    <p className="text-green-600 font-medium mt-2">Step Selesai ✅</p>
  )}
</form>

    </div>
  );
}
