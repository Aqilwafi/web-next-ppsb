"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type UserFromDB = {
  id: number;
  nama: string;
  username: string;
  email: string;
  no_telp: string;
  jenis_kelamin: string;
  lembaga: string;
  tingkatan: string;
  password?: string; // kalau memang mau ditampilkan
};

type BiodataForm = {
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  agama: string;
  anak_ke?: number;
  jumlah_saudara?: number;
  golongan_darah?: string;
  penyakit?: string;
  nama_ayah: string;
  nama_ibu: string;
  pekerjaan_ayah: string;
  pekerjaan_ibu: string;
  no_telp_ortu: string;
  alamat_ortu: string;
  asal_sekolah: string;
  tahun_lulus?: number;
};

export default function InputBio() {
  const searchParams = useSearchParams();
  const username = searchParams.get("user");

  const [userData, setUserData] = useState<UserFromDB | null>(null);
  const [formData, setFormData] = useState<BiodataForm>({
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    agama: "",
    anak_ke: undefined,
    jumlah_saudara: undefined,
    golongan_darah: "",
    penyakit: "",
    nama_ayah: "",
    nama_ibu: "",
    pekerjaan_ayah: "",
    pekerjaan_ibu: "",
    no_telp_ortu: "",
    alamat_ortu: "",
    asal_sekolah: "",
    tahun_lulus: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user?username=${username}`);
        if (!res.ok) throw new Error(`Gagal ambil data user (${res.status})`);
        const data: UserFromDB = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Fetch user error:", err);
        setError("Gagal ambil data user");
      }
    };
    fetchUserData();
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // nanti ini bisa POST ke /api/biodata
      console.log("Submit biodata:", formData);
      setLoading(false);
      alert("Biodata berhasil disimpan!");
    } catch (err) {
      console.error(err);
      setError("Gagal simpan biodata");
      setLoading(false);
    }
  };

  if (!userData) return <p>{error || "Loading data user..."}</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* 🔒 Bagian 1: Data User dari DB (Read-Only) */}
      <h2 className="text-lg font-bold">Data Akun</h2>
      {/* Nama & Username */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Email</label>
    <input
      type="text"
      value={userData.email}
      readOnly
      className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
    />
  </div>
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Username</label>
    <input
      type="text"
      value={userData.username}
      readOnly
      className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
    />
  </div>
</div>



      {/* ✍️ Bagian 2: Biodata tambahan */}
      <h2 className="text-lg font-bold mt-6">Biodata Calon Siswa</h2>
      {/* nama & jk */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Nama Lengkap</label>
    <input
      type="email"
      value={userData.nama}
      readOnly
      className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
    />
  </div>
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Jenis Kelamin</label>
    <input
      type="text"
      value={userData.jenis_kelamin}
      readOnly
      className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
    />
  </div>
</div>

{/* Lembaga & Tingkatan */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Lembaga</label>
    <input
      type="text"
      value={userData.lembaga}
      readOnly
      className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
    />
  </div>
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Tingkatan</label>
    <input
      type="text"
      value={userData.tingkatan}
      readOnly
      className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
    />
  </div>
</div>

{/* telepon */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Telepon</label>
    <input
      type="text"
      value={userData.no_telp}
      readOnly
      className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
    />
  </div>
</div>
      {/* Tempat & Tanggal Lahir */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Tempat Lahir</label>
    <input
      type="text"
      value={formData.tempat_lahir}
      onChange={(e) => setFormData({ ...formData, tempat_lahir: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Tanggal Lahir</label>
    <input
      type="date"
      value={formData.tanggal_lahir}
      onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
</div>

{/* Alamat */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full">
    <label className="mb-1 font-medium text-gray-700">Alamat</label>
    <textarea
      value={formData.alamat}
      onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
</div>

{/* Agama */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full">
    <label className="mb-1 font-medium text-gray-700">Agama</label>
    <input
      type="text"
      value={formData.agama}
      onChange={(e) => setFormData({ ...formData, agama: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
</div>

{/* Anak ke & Jumlah Saudara */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Anak ke</label>
    <input
      type="number"
      value={formData.anak_ke || ""}
      onChange={(e) => setFormData({ ...formData, anak_ke: parseInt(e.target.value) })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Jumlah Saudara</label>
    <input
      type="number"
      value={formData.jumlah_saudara || ""}
      onChange={(e) => setFormData({ ...formData, jumlah_saudara: parseInt(e.target.value) })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
</div>

{/* Golongan Darah & Penyakit */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Golongan Darah</label>
    <input
      type="text"
      value={formData.golongan_darah || ""}
      onChange={(e) => setFormData({ ...formData, golongan_darah: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Penyakit</label>
    <input
      type="text"
      value={formData.penyakit || ""}
      onChange={(e) => setFormData({ ...formData, penyakit: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
</div>

{/* Nama & Pekerjaan Ayah */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Nama Ayah</label>
    <input
      type="text"
      value={formData.nama_ayah}
      onChange={(e) => setFormData({ ...formData, nama_ayah: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Pekerjaan Ayah</label>
    <input
      type="text"
      value={formData.pekerjaan_ayah}
      onChange={(e) => setFormData({ ...formData, pekerjaan_ayah: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
</div>

{/* Nama & Pekerjaan Ibu */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Nama Ibu</label>
    <input
      type="text"
      value={formData.nama_ibu}
      onChange={(e) => setFormData({ ...formData, nama_ibu: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
  <div className="flex flex-col w-full md:w-1/2">
    <label className="mb-1 font-medium text-gray-700">Pekerjaan Ibu</label>
    <input
      type="text"
      value={formData.pekerjaan_ibu}
      onChange={(e) => setFormData({ ...formData, pekerjaan_ibu: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
</div>

{/* No. Telp Ortu */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full">
    <label className="mb-1 font-medium text-gray-700">Nomor Telepon Orang Tua</label>
    <input
      type="tel"
      value={formData.no_telp_ortu}
      onChange={(e) => setFormData({ ...formData, no_telp_ortu: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
</div>

{/* Alamat Ortu */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full">
    <label className="mb-1 font-medium text-gray-700">Alamat Orang Tua</label>
    <textarea
      value={formData.alamat_ortu}
      onChange={(e) => setFormData({ ...formData, alamat_ortu: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
</div>

{/* Asal Sekolah & Tahun Lulus */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-2/3">
    <label className="mb-1 font-medium text-gray-700">Asal Sekolah</label>
    <input
      type="text"
      value={formData.asal_sekolah}
      onChange={(e) => setFormData({ ...formData, asal_sekolah: e.target.value })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
  <div className="flex flex-col w-full md:w-1/3">
    <label className="mb-1 font-medium text-gray-700">Tahun Lulus</label>
    <input
      type="number"
      value={formData.tahun_lulus || ""}
      onChange={(e) => setFormData({ ...formData, tahun_lulus: parseInt(e.target.value) })}
      className="border rounded-lg px-3 py-2 text-gray-500"
    />
  </div>
</div>

      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        {loading ? "Menyimpan..." : "Simpan Biodata"}
      </button>
    </form>
  );
}
