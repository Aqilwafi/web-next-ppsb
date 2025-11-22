"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { usePembayaran } from "../hooks/useAdminPembayaran";

export default function PembayaranTable() {
  const { data, loading } = usePembayaran();
  const [preview, setPreview] = useState<string | null>(null);

  if (loading) return <p className="p-6">Memuat data...</p>;

  return (
    <div className="w-full bg-white shadow-xl rounded-xl p-4 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="py-3 px-4">Nama</th>
            <th className="py-3 px-4">Lembaga</th>
            <th className="py-3 px-4">Tingkatan</th>
            <th className="py-3 px-4">Bukti</th>
            <th className="py-3 px-4">Tanggal</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row: any) => (
            <tr key={row.user_id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{row.csb_profile?.biodata_siswa?.nama_lengkap}</td>
              <td className="px-4 py-3">{row.csb_profile?.lembaga}</td>
              <td className="px-4 py-3">{row.csb_profile?.tingkatan ?? "-"}</td>

              <td className="px-4 py-3">
                <button
                  onClick={() => setPreview(row.url)}
                  className="text-blue-600 underline cursor-pointer"
                >
                  Lihat
                </button>
              </td>

              <td className="px-4 py-3">
                {new Date(row.uploaded_at).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                <StatusBadge status={row.dokumen_status} />
              </td>

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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-4 relative max-w-2xl">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 text-gray-700 cursor-pointer"
            >
              <X size={22} />
            </button>

            <img src={preview} alt="Bukti Pembayaran" className="max-h-[80vh] rounded" />
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
