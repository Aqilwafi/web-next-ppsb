"use client";

import React, { useState } from "react";

export default function PaymentStepPage() {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi proses async
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Konfirmasi pembayaran berhasil!");
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-blue-600">Pembayaran Formulir Pendaftaran</h1>
      <h2 className="text-2xl font-semibold text-blue-500">Instruksi Pembayaran</h2>
      <p className="text-gray-700">
        Silakan lakukan pembayaran formulir pendaftaran sebesar <strong>Rp 300.000</strong> 
        ke rekening berikut:
      </p>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Bank: ABCDE</li>
        <li>No. Rekening: XXxxxxxxx</li>
        <li>Atas Nama: Panitia Pendaftaran</li>
      </ul>

      <h3 className="text-xl font-medium text-blue-400 mt-4">Langkah-langkah Setelah Pembayaran</h3>
      <p className="text-gray-700">
        Setelah melakukan transfer, harap lakukan konfirmasi melalui form di bawah ini. 
        Pastikan Anda menyertakan bukti pembayaran agar proses registrasi dapat dilanjutkan.
      </p>

      <ul className="list-decimal pl-6 text-gray-700">
        <li>Transfer sesuai nominal dan rekening yang tertera.</li>
        <li>Simpan bukti transfer (foto/scan struk).</li>
        <li>Isi form konfirmasi pembayaran di bawah ini.</li>
        <li>Tunggu notifikasi bahwa pembayaran telah diterima.</li>
      </ul>

      <p className="text-gray-600">
        Setelah pembayaran terverifikasi, Anda dapat melanjutkan ke langkah berikutnya dalam proses pendaftaran.
      </p>

      <form onSubmit={handleClick} className="flex flex-col gap-4 w-full max-w-md mt-4">
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition-all duration-150 ${
            loading ? "w-32" : "w-full"
          }`}
        >
          {loading ? "Menyimpan..." : "Konfirmasi Pembayaran"}
        </button>
      </form>
    </main>
  );
}
