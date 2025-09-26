"use client";

import React, { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/supabaseClient";

type UserFromDB = {
  id: string;
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
  no_telp_ayah: string;
  no_telp_ibu: string;
  alamat_ortu: string;
  asal_sekolah: string;
  tahun_lulus?: number;
};

export default function ReadonlyBio({
  userId,
  onEdit,
}: {
  userId: string | number | null;
  onEdit: () => void;
}) {
  const [userData, setUserData] = useState<UserFromDB | null>(null);
  const [biodata, setBiodata] = useState<BiodataForm | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const formatDate = (isoDate: string) => isoDate.split("T")[0];

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        // Ambil data user dari table 'profiles'
        const { data: user, error: userErr } = await supabaseClient
          .from("profiles")
          .select("id, nama_lengkap, username, email, no_telp, jenis_kelamin, lembaga, tingkatan")
          .eq("id", userId)
          .single();

        if (userErr) throw userErr;
        setUserData(user as UserFromDB);

        // Ambil biodata dari table 'biodata'
        const { data: bio, error: bioErr } = await supabaseClient
          .from("biodata")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (bioErr && bioErr.code !== "PGRST116") throw bioErr; // kode 116 = not found
        if (bio) {
          setBiodata({
            ...bio,
            tanggal_lahir: bio.tanggal_lahir ? formatDate(bio.tanggal_lahir) : "",
          } as BiodataForm);
        }
      } catch (err) {
        console.error("Fetch user/biodata error:", err);
        setError("Gagal memuat data user");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!userData) return <p>User tidak ditemukan</p>;

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
          <input type="text" value={formData.tempat_lahir} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Tanggal Lahir</label>
          <input type="date" value={formData.tanggal_lahir} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>

      {/* Alamat */}
      <div className="flex flex-col">
        <label>Alamat</label>
        <textarea value={formData.alamat} className="border rounded-lg px-3 py-2 text-gray-500" />      </div>

      {/* Anak ke & Jumlah Saudara */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label>Anak ke</label>
          <input type="number" value={formData.anak_ke ?? ""} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Jumlah Saudara</label>
          <input type="number" value={formData.jumlah_saudara ?? ""} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>

      {/* Golongan Darah & Penyakit */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label>Golongan Darah</label>
          <input type="text" value={formData.golongan_darah ?? ""} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Penyakit</label>
          <input type="text" value={formData.penyakit ?? ""} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>

      {/* Nama Ayah */}
      <div className="flex flex-col">
          <label>Nama Ayah</label>
          <input type="text" value={formData.nama_ayah} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>

      {/* Nama & Pekerjaan Ayah */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label>No. Telepon Ayah</label>
          <input type="tel" value={formData.no_telp_ayah} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Pekerjaan Ayah</label>
          <input type="text" value={formData.pekerjaan_ayah} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>

      {/* Nama & Pekerjaan Ibu */}
      <div className="flex flex-col">
          <label>Nama Ibu</label>
          <input type="text" value={formData.nama_ibu} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      {/* Pekerjaan Ibu & No. Telp Ortu */}
      <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col w-full md:w-1/2">
          <label>No. Telepon Ibu</label>
          <input type="tel" value={formData.no_telp_ibu} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label>Pekerjaan Ibu</label>
          <input type="text" value={formData.pekerjaan_ibu} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>
      
      <div className="flex flex-col">
        <label>Alamat Orang Tua</label>
        <textarea value={formData.alamat_ortu} className="border rounded-lg px-3 py-2 text-gray-500" />
      </div>
      
      

      {/* Asal Sekolah & Tahun Lulus */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-2/3">
          <label>Asal Sekolah</label>
          <input type="text" value={formData.asal_sekolah} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <label>Tahun Lulus</label>
          <input type="number" value={formData.tahun_lulus ?? ""} className="border rounded-lg px-3 py-2 text-gray-500" />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="button"
        onClick={onEdit}
        className="mt-4 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
      >
        Edit Biodata
      </button>
    </form>
  );
}
