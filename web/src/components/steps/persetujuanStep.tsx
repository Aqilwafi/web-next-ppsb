"use client";

import React from "react";

type SuratPersetujuanStepProps = {
  userId?: string | number | null;
  isComplete: boolean;
  onComplete: () => void;
};

export default function PersetujuanStep({
  userId,
  isComplete,
  onComplete,
}: SuratPersetujuanStepProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-2">Surat Persetujuan</h2>
      <p className="mb-4">
        Silakan baca dan pahami isi surat persetujuan ini sebelum menandainya.
      </p>
      <p className="mb-4">
        Dengan menandai complete, Anda menyetujui syarat dan ketentuan yang berlaku.
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
        <p className="text-green-600 font-medium">Surat persetujuan sudah ditandai ✅</p>
      )}
    </div>
  );
}
