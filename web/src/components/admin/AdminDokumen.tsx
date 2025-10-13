"use client";

import React from "react";
import { useAdminDocuments } from "@/hooks/admin/useAdminDocument";

export default function AdminDocumentTable() {
  const {
    students,
    selectedStudent,
    docStatus,
    openModal,
    closeModal,
    handleApprove,
    handleReject,
    handleEdit,
    submitStatus,
  } = useAdminDocuments();

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
              <td className="p-2 border">{s.nama}</td>
              <td className="p-2 border capitalize">{s.statusDokumen.kk}</td>
              <td className="p-2 border capitalize">{s.statusDokumen.ktp}</td>
              <td className="p-2 border capitalize">{s.statusDokumen.akte}</td>
              <td className="p-2 border">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => openModal(s)}
                >
                  View / Validasi
                </button>
              </td>
              <td className="p-2 border">22 Aug 2024 09.40.30</td>
              <td className="p-2 border">admin 1</td>
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
              <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>✕</button>
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
                  <li>Anak ke-{selectedStudent.anak_ke} dari {selectedStudent.jumlah_saudara} bersaudara</li>
                  <li>Golongan Darah: {selectedStudent.golongan_darah}</li>
                </ul>
              </div>

              {/* Data Orang Tua */}
              <div>
                <h3 className="font-semibold mb-2">Data Orang Tua</h3>
                <ul className="text-sm">
                  <li>Ayah: {selectedStudent.ortu.nama_ayah} ({selectedStudent.ortu.nik_ayah})</li>
                  <li>TTL: {selectedStudent.ortu.tempat_lahir_ayah}, {selectedStudent.ortu.tanggal_lahir_ayah}</li>
                  <li>Pekerjaan Ayah: {selectedStudent.ortu.pekerjaan_ayah}</li>
                  <li>No. Telp Ayah: {selectedStudent.ortu.no_telp_ayah}</li>
                  <li>Ibu: {selectedStudent.ortu.nama_ibu} ({selectedStudent.ortu.nik_ibu})</li>
                  <li>TTL: {selectedStudent.ortu.tempat_lahir_ibu}, {selectedStudent.ortu.tanggal_lahir_ibu}</li>
                  <li>Pekerjaan Ibu: {selectedStudent.ortu.pekerjaan_ibu}</li>
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
                    <li>Pekerjaan: {selectedStudent.wali.pekerjaan}</li>
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

            {/* Submit */}
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={submitStatus}
              >
                Submit Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
