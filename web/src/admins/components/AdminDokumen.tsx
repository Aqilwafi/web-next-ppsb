"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useDokumen } from "../hooks/useAdminDokumen";

export default function DokumenTable() {
  const { data, loading } = useDokumen();
  const [preview, setPreview] = useState<string | null>(null);

  if (loading) return <p className="p-6">Memuat data...</p>;

  return (
    <div className={`w-full bg-white shadow-xl rounded-xl p-4 overflow-x-auto ${
    preview ? "pointer-events-none" : ""
  }`}>
      <table className="w-full border-collapse h-screen">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="py-3 px-4">Nama</th>
            <th className="py-3 px-4">KK</th>
            <th className="py-3 px-4">KTP</th>
            <th className="py-3 px-4">Akte</th>
            <th className="py-3 px-4">Tanggal</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Aksi</th>
          </tr>
        </thead>

        <tbody>
        {data.map((row: any) => (
            <tr key={row.user_id} className="border-b hover:bg-gray-50">
            {/* Nama */}
            <td className="px-4 py-3">{row.nama_lengkap}</td>

            {/* Lembaga = Link KK */}
            <td className="px-4 py-3">
                <button
                onClick={() => setPreview(row.dokumen?.kk)}
                className="text-blue-600 underline cursor-pointer"
                >
                Lihat KK
                </button>
            </td>

            {/* Tingkatan = Link KTP */}
            <td className="px-4 py-3">
                <button
                onClick={() => setPreview(row.dokumen?.ktp)}
                className="text-blue-600 underline cursor-pointer"
                >
                Lihat KTP
                </button>
            </td>

            {/* Bukti jadi Akte */}
            <td className="px-4 py-3">
                <button
                onClick={() => setPreview(row.dokumen?.akte)}
                className="text-blue-600 underline cursor-pointer"
                >
                Lihat Akte
                </button>
            </td>

            {/* Tanggal */}
            <td className="px-4 py-3">
                {new Date(row.uploaded_at).toLocaleDateString()}
            </td>

            {/* Status */}
            <td className="px-4 py-3">
                <StatusBadge status={row.dokumen_status} />
            </td>

            {/* Aksi */}
            <td className="px-4 py-3">
                <button className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer">
                Approve
                </button>
            </td>
            </tr>
        ))}
        </tbody>
      </table>

      {/* Modal Preview */}
      {preview && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 pointer-events-auto">
    <div className="bg-white rounded-xl shadow-xl p-4 relative max-w-3xl w-full pointer-events-auto">
      <button
        onClick={() => setPreview(null)}
        className="absolute top-2 right-2 text-gray-700 cursor-pointer"
      >
        <X size={22} />
      </button>

      {preview.toLowerCase().endsWith(".pdf") ? (
        <iframe
          src={preview}
          className="w-full h-[80vh] rounded border-none"
        />
      ) : (
        <img
          src={preview}
          alt="dokumen"
          className="max-h-[80vh] rounded mx-auto"
        />
      )}
    </div>
  </div>
)}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    onchecking: "bg-yellow-200 text-yellow-800",
    approved: "bg-green-200 text-green-800",
    rejected: "bg-red-200 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-sm font-medium ${
        colors[status] || "bg-gray-200 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}
