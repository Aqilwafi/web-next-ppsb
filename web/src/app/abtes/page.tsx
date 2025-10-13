"use client";

import React, { useState } from "react";

type DocumentStatus = "pending" | "approved" | "rejected";

type Student = {
  id: number;
  email: string;
  nama: string;
  nisn: string;
  nik: string;
  no_kk: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  jenis_kelamin: string;
  jumlah_saudara: number;
  anak_ke: number;
  golongan_darah: string;
  hobi: string;
  cita_cita: string;

  // Biodata ortu
  ortu: {
    nama_ayah: string;
    nama_ibu: string;
    nik_ayah: string;
    nik_ibu: string;
    pekerjaan_ayah: string;
    pekerjaan_ibu: string;
    pendidikan_ayah: string;
    pendidikan_ibu: string;
    penghasilan_ayah: string;
    penghasilan_ibu: string;
    alamat: string;
    no_telp_ayah: string;
    no_telp_ibu: string;
  };

  // Wali
  wali?: {
    nama: string;
    nik: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    pendidikan: string;
    pekerjaan: string;
    penghasilan: string;
    no_telp: string;
    alamat: string;
  };

  statusDokumen: {
    kk: DocumentStatus;
    ktp: DocumentStatus;
    akte: DocumentStatus;
  };
};

export default function AdminDocumentTable() {
  const [students] = useState<Student[]>([
    {
      id: 1,
      email: "ahmad@example.com",
      nama: "Ahmad Fauzi",
      nisn: "1234567890",
      nik: "9876543210",
      no_kk: "1122334455",
      tempat_lahir: "Jakarta",
      tanggal_lahir: "2005-01-01",
      agama: "Islam",
      jenis_kelamin: "Laki-laki",
      jumlah_saudara: 2,
      anak_ke: 1,
      golongan_darah: "O",
      hobi: "Sepak Bola",
      cita_cita: "Dokter",
      ortu: {
        nama_ayah: "Budi Fauzi",
        nama_ibu: "Siti Aminah",
        nik_ayah: "1111111111",
        nik_ibu: "2222222222",
        pekerjaan_ayah: "PNS",
        pekerjaan_ibu: "Ibu Rumah Tangga",
        pendidikan_ayah: "S1",
        pendidikan_ibu: "SMA",
        penghasilan_ayah: "10 juta",
        penghasilan_ibu: "0",
        alamat: "Jl. Merpati No. 1",
        no_telp_ayah: "08123456789",
        no_telp_ibu: "08198765432",
      },
      wali: {
        nama: "Hadi Wali",
        nik: "3333333333",
        tempat_lahir: "Bandung",
        tanggal_lahir: "1980-05-05",
        pendidikan: "S1",
        pekerjaan: "Wiraswasta",
        penghasilan: "5 juta",
        no_telp: "081122334455",
        alamat: "Jl. Mangga No. 2",
      },
      statusDokumen: { kk: "pending", ktp: "pending", akte: "pending" },
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [docStatus, setDocStatus] = useState<Record<string, DocumentStatus>>({});

  const openModal = (student: Student) => {
    setSelectedStudent(student);
    setDocStatus({ ...student.statusDokumen });
  };

  const handleApprove = (doc: keyof Student["statusDokumen"]) => {
    setDocStatus((prev) => ({ ...prev, [doc]: "approved" }));
  };

  const handleReject = (doc: keyof Student["statusDokumen"]) => {
    setDocStatus((prev) => ({ ...prev, [doc]: "rejected" }));
  };

  const handleEdit = (doc: keyof Student["statusDokumen"]) => {
    setDocStatus((prev) => ({ ...prev, [doc]: "pending" }));
  };

  return (
    <div className="p-6 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Validasi Dokumen</h1>

      {/* Tabel ringkas */}
      <table className="w-full text-left border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">KK</th>
            <th className="p-2 border">KTP</th>
            <th className="p-2 border">Akte</th>
            <th className="p-2 border">Action</th>
            <th className="p-2 border">Last Modified</th>
            <th className="p-2 border">Modified by</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-gray-100">
              <td className="p-2 border">{s.email}</td>
              <td className="p-2 border">{s.nama} hidayatul wahid</td>
              <td className="p-2 border capitalize">{s.statusDokumen.kk}</td>
              <td className="p-2 border capitalize">{s.statusDokumen.ktp}</td>
              <td className="p-2 border capitalize">{s.statusDokumen.akte}</td>
              <td className="p-2 border">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded items-center justify-center"
                  onClick={() => openModal(s)}
                >
                  View / Validasi
                </button>
              </td>
              <td className="p-2 border capitalize">22 Aug 2024 09.40.30
              </td>
              <td className="p-2 border capitalize">admin 1
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal detail */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-4/5 max-h-[90vh] overflow-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedStudent.nama} - Detail Dokumen</h2>
              <button className="text-gray-500 hover:text-gray-800" onClick={() => setSelectedStudent(null)}>
                ✕
              </button>
            </div>

           {/* Biodata lengkap */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Data Siswa */}
              <div>
                <h3 className="font-semibold mb-2">Data Siswa</h3>
                <ul className="text-sm">
                  <li>NISN: {selectedStudent.nisn}</li>
                  <li>NIK: {selectedStudent.nik}</li>
                  <li>No. KK: {selectedStudent.no_kk}</li>
                  <li>TTL: {selectedStudent.tempat_lahir}, {selectedStudent.tanggal_lahir}</li>
                  <li>Agama: {selectedStudent.agama}</li>
                  <li>Jenis Kelamin: {selectedStudent.jenis_kelamin}</li>
                  <li>Hobi: {selectedStudent.hobi}</li>
                  <li>Cita-cita: {selectedStudent.cita_cita}</li>
                  <li>Anak ke-{selectedStudent.anak_ke} dari {selectedStudent.jumlah_saudara} bersaudara</li>
                  <li>Golongan Darah: {selectedStudent.golongan_darah}</li>
                </ul>
              </div>

              {/* Data Orang Tua */}
              <div>
                <h3 className="font-semibold mb-2">Data Orang Tua</h3>
                <ul className="text-sm">
                  <li>Ayah: {selectedStudent.ortu.nama_ayah} ({selectedStudent.ortu.nik_ayah})</li>
                  <li>Pekerjaan Ayah: {selectedStudent.ortu.pekerjaan_ayah}</li>
                  <li>Pendidikan Ayah: {selectedStudent.ortu.pendidikan_ayah}</li>
                  <li>Penghasilan Ayah: {selectedStudent.ortu.penghasilan_ayah}</li>
                  <li>No. Telp Ayah: {selectedStudent.ortu.no_telp_ayah}</li>

                  <li>Ibu: {selectedStudent.ortu.nama_ibu} ({selectedStudent.ortu.nik_ibu})</li>
                  <li>Pekerjaan Ibu: {selectedStudent.ortu.pekerjaan_ibu}</li>
                  <li>Pendidikan Ibu: {selectedStudent.ortu.pendidikan_ibu}</li>
                  <li>Penghasilan Ibu: {selectedStudent.ortu.penghasilan_ibu}</li>
                  <li>No. Telp Ibu: {selectedStudent.ortu.no_telp_ibu}</li>
                  <li>Alamat: {selectedStudent.ortu.alamat}</li>
                </ul>
              </div>

              {/* Data Wali */}
              {selectedStudent.wali && (
                <div>
                  <h3 className="font-semibold mb-2">Data Wali</h3>
                  <ul className="text-sm">
                    <li>Nama: {selectedStudent.wali.nama} ({selectedStudent.wali.nik})</li>
                    <li>TTL: {selectedStudent.wali.tempat_lahir}, {selectedStudent.wali.tanggal_lahir}</li>
                    <li>Pendidikan: {selectedStudent.wali.pendidikan}</li>
                    <li>Pekerjaan: {selectedStudent.wali.pekerjaan}</li>
                    <li>Penghasilan: {selectedStudent.wali.penghasilan}</li>
                    <li>No. Telp: {selectedStudent.wali.no_telp}</li>
                    <li>Alamat: {selectedStudent.wali.alamat}</li>
                  </ul>
                </div>
              )}
            </div>


            {/* Dokumen dan validasi */}
            <div className="flex gap-4">
              {(["kk", "ktp", "akte"] as const).map((doc) => (
                <div key={doc} className="flex-1 bg-gray-50 p-2 rounded shadow flex flex-col items-center">
                  <h4 className="font-medium mb-2">{doc.toUpperCase()}</h4>
                  <div className="w-full h-48 bg-white border flex items-center justify-center text-gray-400 mb-2">
                    Preview Dokumen
                  </div>
                  <div className="flex gap-2">
                    {docStatus[doc] === "pending" ? (
                      <>
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded"
                          onClick={() => handleApprove(doc)}
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded"
                          onClick={() => handleReject(doc)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="px-3 py-1 bg-gray-300 text-white rounded cursor-not-allowed" disabled>
                          {docStatus[doc].toUpperCase()}
                        </button>
                        <button className="px-3 py-1 bg-yellow-500 text-white rounded" onClick={() => handleEdit(doc)}>
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 flex justify-end">
  <button
    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    onClick={() => {
      // Ambil semua status dokumen siswa
      const payload = students.map((s) => ({
        id: s.id,
        statusDokumen: docStatus, // jika banyak siswa, nanti pakai state global per siswa
      }));
      console.log("Submit payload:", payload);
      alert("Dokumen disubmit! Cek console log untuk payload.");
    }}
  >
    Submit Semua
  </button>
</div>
    </div>
  );
}
