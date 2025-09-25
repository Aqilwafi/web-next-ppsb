"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type UserFromDB = {
  id: number;
  nama_lengkap: string;
  username: string;
  email: string;
  no_telp: string;
  jenis_kelamin: string;
  lembaga: string;
  tingkatan: string;
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
  const formatDate = (isoDate: string) => isoDate.split("T")[0];
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

  // Ambil data user
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

  // Auto-fill biodata jika ada
  useEffect(() => {
    if (!userData) return;
    const fetchBiodata = async () => {
      try {
        const res = await fetch(`/api/biodata?userId=${userData.id}`);
        if (!res.ok) return;
        const data: Partial<BiodataForm> = await res.json();
        setFormData((prev) => ({ ...prev, ...data, tanggal_lahir: data.tanggal_lahir ? formatDate(data.tanggal_lahir) : "" }));
      } catch (err) {
        console.error("Fetch biodata error:", err);
      }
    };
    fetchBiodata();
  }, [userData]);

  const handleNumberChange = (field: keyof BiodataForm, value: string) => {
    setFormData({
      ...formData,
      [field]: value ? parseInt(value) : undefined,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!userData) {
      setError("User data belum tersedia");
      setLoading(false);
      return;
    }

    // Validasi client-side
    if (!formData.tempat_lahir || !formData.tanggal_lahir || !formData.alamat) {
      setError("Tempat lahir, tanggal lahir, dan alamat wajib diisi");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/biodata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData.id,
          ...formData,
        }),
      });

      if (!res.ok) {
        throw new Error(`Gagal simpan biodata (${res.status})`);
      }

      const data = await res.json();
      console.log("Biodata berhasil disimpan:", data);
      alert("Biodata berhasil disimpan!");
    } catch (err) {
      console.error("Submit biodata error:", err);
      setError("Gagal simpan biodata");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <p>{error || "Loading data user..."}</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Bagian Read-only data user */}
      <h2 className="text-lg font-bold">Data Akun</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label>Email</label>
          <input type="text" value={userData.email} readOnly className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Username</label>
          <input type="text" value={userData.username} readOnly className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed" />
        </div>
      </div>

      {/* Biodata Form */}
      <h2 className="text-lg font-bold mt-6">Biodata Calon Siswa</h2>
      <div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-col w-full md:w-1/2">
    <label>Nama Lengkap</label>
    <input type="text" value={userData.nama_lengkap} readOnly className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed" />
  </div>
  <div className="flex flex-col w-full md:w-1/2">
    <label>Jenis Kelamin</label>
    <input type="text" value={userData.jenis_kelamin} readOnly className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed" />
  </div>
</div>

<div className="flex flex-col md:flex-row gap-4 mt-2">
  <div className="flex flex-col w-full md:w-1/2">
    <label>Lembaga</label>
    <input type="text" value={userData.lembaga} readOnly className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed" />
  </div>
  <div className="flex flex-col w-full md:w-1/2">
    <label>Tingkatan</label>
    <input type="text" value={userData.tingkatan} readOnly className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed" />
  </div>
</div>


      {/* Tempat & Tanggal Lahir */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label>Tempat Lahir</label>
          <input readOnly type="text" value={formData.tempat_lahir} onChange={(e) => setFormData({ ...formData, tempat_lahir: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Tanggal Lahir</label>
          <input readOnly type="date" value={formData.tanggal_lahir} onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>

      {/* Alamat */}
      <div className="flex flex-col">
        <label>Alamat</label>
        <textarea readOnly value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
      </div>

      

      {/* Anak ke & Jumlah Saudara */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label>Anak ke</label>
          <input readOnly type="number" value={formData.anak_ke ?? ""} onChange={(e) => handleNumberChange("anak_ke", e.target.value)} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Jumlah Saudara</label>
          <input readOnly type="number" value={formData.jumlah_saudara ?? ""} onChange={(e) => handleNumberChange("jumlah_saudara", e.target.value)} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>

      {/* Golongan Darah & Penyakit */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label>Golongan Darah</label>
          <input readOnly type="text" value={formData.golongan_darah ?? ""} onChange={(e) => setFormData({ ...formData, golongan_darah: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Penyakit</label>
          <input readOnly type="text" value={formData.penyakit ?? ""} onChange={(e) => setFormData({ ...formData, penyakit: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>

      <div className="flex flex-col">
          <label>Nama Ayah</label>
          <input readOnly type="text" value={formData.nama_ayah} onChange={(e) => setFormData({ ...formData, nama_ayah: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>

      {/* Nama & Pekerjaan Ayah */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label>No. Telepon Ayah</label>
          <input readOnly type="tel" value={formData.no_telp_ortu} onChange={(e) => setFormData({ ...formData, no_telp_ortu: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Pekerjaan Ayah</label>
          <input readOnly type="text" value={formData.pekerjaan_ayah} onChange={(e) => setFormData({ ...formData, pekerjaan_ayah: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>

      {/* Nama & Pekerjaan Ibu */}
      <div className="flex flex-col">
          <label>Nama Ibu</label>
          <input readOnly type="text" value={formData.nama_ibu} onChange={(e) => setFormData({ ...formData, nama_ibu: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      {/* Pekerjaan Ibu & No. Telp Ortu */}
      <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col w-full md:w-1/2">
          <label>No. Telepon Ibu</label>
          <input readOnly type="tel" value={formData.no_telp_ortu} onChange={(e) => setFormData({ ...formData, no_telp_ortu: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Pekerjaan Ibu</label>
          <input readOnly type="text" value={formData.pekerjaan_ibu} onChange={(e) => setFormData({ ...formData, pekerjaan_ibu: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>
      
      <div className="flex flex-col">
        <label>Alamat Orang Tua</label>
        <textarea readOnly value={formData.alamat_ortu} onChange={(e) => setFormData({ ...formData, alamat_ortu: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
      </div>
      
      

      {/* Asal Sekolah & Tahun Lulus */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-2/3">
          <label>Asal Sekolah</label>
          <input readOnly type="text" value={formData.asal_sekolah} onChange={(e) => setFormData({ ...formData, asal_sekolah: e.target.value })} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label>Tahun Lulus</label>
          <input readOnly type="number" value={formData.tahun_lulus ?? ""} onChange={(e) => handleNumberChange("tahun_lulus", e.target.value)} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col w-full md:w-1/4">
      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition-all duration-150 ${loading ? "w-32" : "w-full"}`}
      >
        {loading ? "Menyimpan..." : "Edit"}
      </button>
        </div>
        </div>
        
    </form>
  );
}
