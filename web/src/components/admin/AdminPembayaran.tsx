"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePembayaran } from "@/hooks/admin/useAdminPembayaran"; // pakai data asli Tuan Muda

// 🎴 Card sederhana
function Card({ children, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm 
                 hover:shadow-lg transition-all cursor-pointer"
    >
      {children}
    </div>
  );
}

// 🪪 Sub-komponen kecil
const CardHeader = ({ children }: any) => <div className="mb-3">{children}</div>;
const CardTitle = ({ children }: any) => (
  <h2 className="text-lg font-semibold text-gray-800 truncate">{children}</h2>
);
const CardContent = ({ children }: any) => (
  <div className="text-gray-600 text-sm">{children}</div>
);

// 🔘 Tombol sederhana
function Button({ children, onClick, variant = "solid", className = "" }: any) {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium focus:outline-none transition-all";
  const variants = {
    solid: "bg-green-600 text-white hover:bg-green-700",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

// 🏷️ Badge status
function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Lunas"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-red-100 text-red-700 border-red-300";
  return (
    <span
      className={`inline-block text-xs font-semibold px-2 py-1 rounded-full border ${color}`}
    >
      {status}
    </span>
  );
}

// 🧩 Komponen utama
export default function UserCardsPage() {
  const { data: users = [], loading, error } = usePembayaran();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u: any) =>
    [u.nama_lengkap, u.lembaga]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        Memuat data siswa...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        Gagal memuat data siswa ❌
      </div>
    );
  }

  return (
  <div className="w-full p-4 sm:p-6">
    <h1 className="text-2xl font-semibold mb-4 text-gray-800">
      Daftar Pembayaran Siswa
    </h1>

    {/* 🔍 Search Bar Sticky */}
    <div className="sticky top-0 z-20 bg-gray-50 pb-4">
      <input
        type="text"
        placeholder="Cari nama atau lembaga..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-96 px-4 py-2 border rounded-lg text-sm 
                   focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    {/* 🧱 Scrollable Card Section */}
    <div className="mt-4 max-h-[75vh] overflow-y-auto pr-2">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user: any) => (
          <Card key={user.id} onClick={() => setSelectedUser(user)}>
            <CardHeader>
              <CardTitle>{user.nama_lengkap}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="truncate">Lembaga: {user.lembaga}</p>
              <div className="mt-1">
                <StatusBadge status={user.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    {/* 🔳 Popup detail */}
    <AnimatePresence>
      {selectedUser && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md 
                       sm:max-w-lg overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Detail Pembayaran
            </h2>

            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <strong>Nama:</strong> {selectedUser.nama_lengkap}
              </p>
              <p>
                <strong>Lembaga:</strong> {selectedUser.lembaga}
              </p>
              <p>
                <strong>Kelas:</strong> {selectedUser.kelas ?? "-"}
              </p>
              <p>
                <strong>Status:</strong> {selectedUser.status}
              </p>
              {selectedUser.bukti ? (
                <div className="mt-3">
                  <strong>Bukti Pembayaran:</strong>
                  <img
                    src={selectedUser.bukti}
                    alt="Bukti pembayaran"
                    className="mt-2 w-full rounded-lg shadow-sm border border-gray-200"
                  />
                </div>
              ) : (
                <p className="text-red-500 mt-3">
                  Belum ada bukti pembayaran
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Tutup
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

}
