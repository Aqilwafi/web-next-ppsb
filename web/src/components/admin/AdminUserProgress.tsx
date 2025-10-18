"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserProgress } from "@/hooks/admin/useAdminUserProgress";

// 🧩 Komponen Card sederhana
function Card({ children, className = "", onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}
function CardHeader({ children }: any) {
  return <div className="mb-3">{children}</div>;
}
function CardTitle({ children }: any) {
  return <h2 className="text-lg font-semibold text-gray-800">{children}</h2>;
}
function CardContent({ children }: any) {
  return <div className="text-gray-600 text-sm">{children}</div>;
}

// 📊 Dummy data siswa + progress + biodata singkat
const dummyUsers = [
  {
    id: 1,
    name: "Ahmad Fauzan",
    lembaga: "MI",
    tingkatan: "MI",
    email: "ahmadfauzan@example.com",
    currentStep: 5,
  },
  {
    id: 2,
    name: "Siti Rahma",
    lembaga: "TK",
    tingkatan: "TK",
    email: "sitirahma@example.com",
    currentStep: 2,
  },
  {
    id: 3,
    name: "Rizky Hidayat",
    lembaga: "KB",
    tingkatan: "KB",
    email: "rizkyhidayat@example.com",
    currentStep: 6,
  },
  {
    id: 4,
    name: "Lina Maulani",
    lembaga: "TPA",
    tingkatan: "TPA",
    email: "lina@example.com",
    currentStep: 3,
  },
];

export default function UserProgressPage() {
  const [users, setUsers] = useState<any[]>([]);
  const { data, loading, error } = useUserProgress();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [filterLembaga, setFilterLembaga] = useState<string>("All");

  useEffect(() => {
    setUsers(dummyUsers);
  }, []);

  // Filter + search
  const filtered = data.filter((u) => {
    const matchesLembaga =
      filterLembaga === "All" || u.lembaga === filterLembaga;
    const matchesSearch =
      u.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      u.lembaga.toLowerCase().includes(search.toLowerCase());
    return matchesLembaga && matchesSearch;
  });

  const lembagaOptions = ["All", "MI", "TK", "KB", "TPA"];

  return (
    <div className="w-full p-4 sm:p-6 flex flex-col">
  <h1 className="text-2xl font-semibold mb-4 text-gray-800">
    Progress Pendaftaran Siswa
  </h1>

  {/* 🔍 Sticky Search + Filter */}
  <div className="sticky top-0 bg-gray-50 z-10 pb-3 flex flex-col sm:flex-row sm:items-center sm:gap-4">
    <input
      type="text"
      placeholder="Cari nama atau lembaga..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full sm:w-72 px-4 py-2 border rounded-lg text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <select
      value={filterLembaga}
      onChange={(e) => setFilterLembaga(e.target.value)}
      className="mt-2 sm:mt-0 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {lembagaOptions.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  </div>

  {/* 📈 Grid Cards Scrollable */}
  <div className="mt-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 150px)" }}>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((user, i) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card onClick={() => setSelectedUser(user)}>
            <CardHeader>
              <CardTitle>{user.nama_lengkap}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="truncate text-sm text-gray-700">
                Lembaga: {user.lembaga}
              </p>

              {/* Step Progress Bar */}
              <div className="mt-4 flex gap-1 justify-between">
                {Array.from({ length: 6 }).map((_, idx) => {
                  const step = idx + 1;
                  const active = step <= user.completedSteps;
                  const isCompleted = user.completedSteps === 6;
                  return (
                    <div
                      key={idx}
                      className={`flex-1 h-3 rounded-full transition-all ${
                        active
                          ? isCompleted
                            ? "bg-green-600"
                            : "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  );
                })}
              </div>
              <p className="text-xs mt-2 text-gray-600">
                Langkah ke-{user.completedSteps} dari 6
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>

  {/* 🔳 Popup Landscape tetap sama */}
  <AnimatePresence>
    {selectedUser && (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl 
                     overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Detail Siswa
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
            <p>
              <strong>Nama:</strong> {selectedUser.nama_lengkap}
            </p>
            <p>
              <strong>Lembaga:</strong> {selectedUser.lembaga}
            </p>
            <p>
              <strong>Tingkatan:</strong> {selectedUser.tingkatan}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
          </div>
          <div className="mt-3">
            <strong>Langkah Selesai:</strong>
            <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
                {selectedUser.completedStepLabels.map((label: string, idx: number) => (
                <li key={idx}>{label}</li>
                ))}
            </ul>
            </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setSelectedUser(null)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

  );
}
