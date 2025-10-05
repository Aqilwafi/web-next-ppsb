"use client";

import React from "react";

type UjianDummyStepProps = {
  userId?: string | number | null;
  isComplete: boolean;
  onComplete: () => void;
};

export default function UjianStep({ userId, isComplete, onComplete }: UjianDummyStepProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-2">Ujian Dummy</h2>
      <p className="mb-4">
        Selamat datang di ujian dummy. Silakan baca instruksi berikut sebelum melanjutkan.
      </p>
      <p className="mb-4">
        Ujian ini hanya bersifat percobaan untuk memahami mekanisme penilaian.
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
        <p className="text-green-600 font-medium">Ujian ini sudah selesai ✅</p>
      )}
    </div>
  );
}
