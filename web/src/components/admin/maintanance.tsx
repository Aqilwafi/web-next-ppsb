// components/MaintenancePage.tsx
"use client";

import { Wrench } from "lucide-react";

export default function MaintenancePage() {

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6">
      <div className="flex flex-col items-center gap-5 p-8 bg-white shadow-md rounded-2xl w-full max-w-md text-center">
        <Wrench className="w-16 h-16 text-yellow-500 animate-pulse mt-2" />
        <h1 className="text-2xl font-semibold">Fitur Sedang Dalam Perbaikan</h1>
        <p className="text-gray-600 mb-2">
          Maaf, Fitur ini sedang dalam proses maintenance.  
          Silakan coba lagi nanti.
        </p>
      </div>
    </div>
  );
}
