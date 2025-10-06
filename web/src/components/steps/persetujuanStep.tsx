"use client";

import React from "react";

type ValidasiDokumenStepProps = {
  userId?: string | number | null;
  isComplete: boolean;
  onComplete: () => void;
};

export default function ValidasiDokumenStep({
  userId,
  isComplete,
  onComplete,
}: ValidasiDokumenStepProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-2">Validasi Dokumen</h2>
      <p className="mb-4">
        Terima kasih. Tahapan registrasi Anda sudah hampir selesai.
      </p>
      <p className="mb-4">
        Silakan menunggu dokumen Anda divalidasi oleh tim SPMB.
      </p>
      <p className="mb-4">
        Anda akan diberitahu melalui email atau dashboard apabila dokumen sudah
        tervalidasi.
      </p>

      {isComplete && (
        <p className="text-green-600 font-medium">Dokumen sudah tervalidasi ✅</p>
      )}
    </div>
  );
}
