"use client";

import React from "react";

type StepTerakhirProps = {
  userId?: string | number | null;
  isComplete: boolean;
  onComplete: () => void;
};

export default function LastStep({
  userId,
  isComplete,
  onComplete,
}: StepTerakhirProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-2">Step Terakhir</h2>
      <p className="mb-4">
        Selamat! Anda hampir menyelesaikan seluruh proses. Pastikan semua data telah diperiksa.
      </p>
      <p className="mb-4">
        Klik tombol di bawah ini untuk menandai proses ini sebagai selesai.
      </p>

      {!isComplete && (
        <button
          type="button"
          onClick={onComplete}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-150"
        >
          Tandai Complete
        </button>
      )}

      {isComplete && (
        <p className="text-green-600 font-medium">Proses sudah selesai ✅</p>
      )}
    </div>
  );
}
