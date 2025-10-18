"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useBiodata } from "@/hooks/admin/useAdminBiodataSiswa";
import { Biodata } from "@/types/admin/biodataType";

// 🧩 Komponen Card
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

export default function BiodataCard() {
  const { data: students = [], loading, error } = useBiodata();
  const [selectedStudent, setSelectedStudent] = useState<Biodata | null>(null);
  const [filterLembaga, setFilterLembaga] = useState<string>("All");
  const [search, setSearch] = useState("");

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p>Error: {error.message}</p>;

   // Filter + search
  const filtered = students.filter((u) => {
    const matchesLembaga =
      filterLembaga === "All" || u.lembaga === filterLembaga;
    const matchesSearch =
      u.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      u.lembaga.toLowerCase().includes(search.toLowerCase());
    return matchesLembaga && matchesSearch;
  });

  const lembagaOptions = ["All", "MI", "TK", "KB", "TPA"];

  return (
    <div className="w-full p-4 sm:p-6 h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Biodata Siswa
      </h1>

      {/* 🔍 Sticky Search + Filter */}
        <div className="sticky top-0 bg-gray-50 z-10 pb-3 flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <input
            type="text"
            placeholder="Cari nama..."
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

      {/* Grid Cards */}
      <div className="mt-4 max-h-[75vh] overflow-y-auto pr-2">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((student, i) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card onClick={() => setSelectedStudent(student)}>
              <CardHeader>
                <CardTitle>{student.nama_lengkap}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="truncate text-sm text-gray-700">
                  Lembaga: {student.lembaga}
                </p>
                <p className="truncate text-sm text-gray-700">
                  Tingkatan: {student.tingkatan}
                </p>
                <p className="truncate text-sm text-gray-700">
                  Asal Sekolah: {student.asal_sekolah}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      </div>

      {/* Popup Detail */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
                
              {/* Sticky Header dengan H2 di kiri dan X di kanan */}
                <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                    {selectedStudent.nama_lengkap} - {selectedStudent.lembaga}
                    </h2>
                    <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-1 rounded-full hover:bg-gray-200"
                    >
                    <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Detail Biodata Siswa
                </h2>

                {/* Grid informasi siswa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 text-sm">
                  <p><strong>Nama:</strong> {selectedStudent.nama_lengkap}</p>
                  <p><strong>NISN:</strong> {selectedStudent.nisn}</p>
                  <p><strong>NIK:</strong> {selectedStudent.nik}</p>
                  <p><strong>Jenis Kelamin:</strong> {selectedStudent.jenis_kelamin}</p>
                  <p><strong>Tempat Lahir:</strong> {selectedStudent.tempat_lahir}</p>
                  <p><strong>Tanggal Lahir:</strong> {selectedStudent.tanggal_lahir}</p>
                  <p><strong>Agama:</strong> {selectedStudent.agama}</p>
                  <p><strong>Hobi:</strong> {selectedStudent.hobi}</p>
                  <p><strong>Cita-cita:</strong> {selectedStudent.cita_cita}</p>
                  <p><strong>Jumlah Saudara:</strong> {selectedStudent.jumlah_saudara}</p>
                  <p><strong>Anak ke:</strong> {selectedStudent.anak_ke}</p>
                  <p><strong>Golongan Darah:</strong> {selectedStudent.golongan_darah}</p>
                  <p><strong>Penyakit:</strong> {selectedStudent.penyakit}</p>
                </div>

                {/* Orang Tua */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Orang Tua</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                    <p><strong>Nama Ayah:</strong> {selectedStudent.orang_tua.nama_ayah}</p>
                    <p><strong>Nama Ibu:</strong> {selectedStudent.orang_tua.nama_ibu}</p>
                    <p><strong>NIK Ayah:</strong> {selectedStudent.orang_tua.nik_ayah}</p>
                    <p><strong>NIK Ibu:</strong> {selectedStudent.orang_tua.nik_ibu}</p>
                    <p><strong>Tempat Lahir Ayah:</strong> {selectedStudent.orang_tua.tempat_lahir_ayah}</p>
                    <p><strong>Tempat Lahir Ibu:</strong> {selectedStudent.orang_tua.tempat_lahir_ibu}</p>
                    <p><strong>Tanggal Lahir Ayah:</strong> {selectedStudent.orang_tua.tanggal_lahir_ayah}</p>
                    <p><strong>Tanggal Lahir Ibu:</strong> {selectedStudent.orang_tua.tanggal_lahir_ibu}</p>
                    <p><strong>Pekerjaan Ayah:</strong> {selectedStudent.orang_tua.pekerjaan_ayah}</p>
                    <p><strong>Pekerjaan Ibu:</strong> {selectedStudent.orang_tua.pekerjaan_ibu}</p>
                    <p><strong>Status Ayah:</strong> {selectedStudent.orang_tua.status_ayah}</p>
                    <p><strong>Status Ibu:</strong> {selectedStudent.orang_tua.status_ibu}</p>
                    <p><strong>No Telp Ayah:</strong> {selectedStudent.orang_tua.no_telp_ayah}</p>
                    <p><strong>No Telp Ibu:</strong> {selectedStudent.orang_tua.no_telp_ibu}</p>
                    <p><strong>Pendidikan Ayah:</strong> {selectedStudent.orang_tua.pendidikan_ayah}</p>
                    <p><strong>Pendidikan Ibu:</strong> {selectedStudent.orang_tua.pendidikan_ibu}</p>
                    <p><strong>Penghasilan Ayah:</strong> {selectedStudent.orang_tua.penghasilan_ayah}</p>
                    <p><strong>Penghasilan Ibu:</strong> {selectedStudent.orang_tua.penghasilan_ibu}</p>
                    <p><strong>Alamat Orang Tua:</strong> {selectedStudent.orang_tua.alamat_ortu}</p>
                  </div>
                </div>

                {/* Wali */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Wali</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                    <p><strong>Nama Wali:</strong> {selectedStudent.wali.nama_wali}</p>
                    <p><strong>Pekerjaan Wali:</strong> {selectedStudent.wali.pekerjaan_wali}</p>
                    <p><strong>No Telp Wali:</strong> {selectedStudent.wali.no_telp_wali}</p>
                  </div>
                </div>

                {/* Tempat Tinggal */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Tempat Tinggal</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                    <p><strong>Status Rumah:</strong> {selectedStudent.tempat_tinggal.status_rumah}</p>
                    <p><strong>Tinggal Bersama:</strong> {selectedStudent.tempat_tinggal.tinggal_bersama}</p>
                    <p><strong>Alamat:</strong> {selectedStudent.tempat_tinggal.alamat}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
