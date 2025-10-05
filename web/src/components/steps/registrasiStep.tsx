"use client";

import React from "react";
import  {DashboardStepProps}  from "@/types/propsType";


export default function RegistrasiStep({ user, isComplete, onComplete, isLoading = false }: DashboardStepProps) {
 return (
  <div className="p-4 border rounded-lg shadow-sm bg-white px-6">
    {!isComplete ? (
      <div>
        <h2 className="text-xl font-bold mb-2">Selamat Datang di Step 1</h2>
        <p className="mb-4">
          Ini adalah pengantar untuk proses registrasi. Bacalah informasi berikut dengan
          seksama sebelum melanjutkan ke step berikutnya.
        </p>
        <p className="mb-4">
          Step ini berisi informasi umum, dan hanya perlu ditandai selesai ketika Anda siap
          untuk melanjutkan.
        </p>
        <button
          type="button"
          onClick={onComplete}
          disabled={isLoading}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all duration-150 disabled:opacity-50"
        >
          {isLoading ? "Sedang diproses..." : "Tandai Complete"}
        </button>
      </div>
    ) : (
      <div>
        <h2 className="text-xl font-bold mb-2">Selamat..., Step 1 telah selesai!</h2>
        <p className="text-green-600 font-medium">Step ini sudah ditandai selesai ✅</p>
      </div>
    )}
  </div>
);

}
