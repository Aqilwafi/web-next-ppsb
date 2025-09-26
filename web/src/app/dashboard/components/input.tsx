"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
  no_telp_ortu: string;
  alamat_ortu: string;
  asal_sekolah: string;
  tahun_lulus?: number;
};

// 🔑 Tambah props userId & onComplete
export default function InputBio({
  userId,
  onComplete,
}: {
  userId?: string | number | null;
  onComplete?: () => void;
}) {
  const supabase = createClientComponentClient();

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

  // Ambil data user aktif
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        setError("Gagal ambil session user");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        setError("Gagal ambil data profile");
        return;
      }

      setUserData({
        id: profile.id,
        nama_lengkap: profile.nama_lengkap,
        username: profile.username,
        email: profile.email,
        no_telp: profile.telepon,
        jenis_kelamin: profile.jenis_kelamin,
        lembaga: profile.lembaga,
        tingkatan: profile.tingkatan,
      });
    };

    fetchUser();
  }, [supabase]);

  // Ambil biodata
  useEffect(() => {
    if (!userData) return;

    const fetchBiodata = async () => {
      const { data, error } = await supabase
        .from("biodata")
        .select("*")
        .eq("user_id", userData.id)
        .single();

      if (error) {
        console.warn("Belum ada biodata:", error.message);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        ...data,
        tanggal_lahir: data.tanggal_lahir
          ? new Date(data.tanggal_lahir).toISOString().split("T")[0]
          : "",
      }));
    };

    fetchBiodata();
  }, [userData, supabase]);

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

    try {
      const { data: existing } = await supabase
        .from("biodata")
        .select("user_id")
        .eq("user_id", userData.id)
        .single();

      if (existing) {
        const { error: updateError } = await supabase
          .from("biodata")
          .update(formData)
          .eq("user_id", userData.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("biodata")
          .insert({ user_id: userData.id, ...formData });

        if (insertError) throw insertError;
      }

      alert("Biodata berhasil disimpan!");

      // 🔑 Panggil callback biar dashboard update ke completed
      if (onComplete) onComplete();
    } catch (err: any) {
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
        {loading ? "Menyimpan..." : "Submit Biodata"}
      </button>
        </div>
        </div>
        
    </form>
  );
}
