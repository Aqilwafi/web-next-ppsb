"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";
import { initUserStepStatus } from "../services/userStepService";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = supabaseClient;

  const [selectedA, setSelectedA] = useState("");
  const [formData, setFormData] = useState({
    lembaga: "",
    tingkatan: "",
    nama: "",
    jenisKelamin: "",
    email: "",
    telepon: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Buat akun user di Supabase Auth
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      const userId = signUpData.user?.id;
      if (!userId) {
        setError("Pendaftaran gagal. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      // 2. Simpan data ke tabel csb_profile
      const { error: profileError } = await supabase
        .from("csb_profile")
        .insert({
          id: userId, // UUID dari auth.users
          nama_lengkap: formData.nama,
          jenis_kelamin: formData.jenisKelamin,
          no_telp: formData.telepon,
          lembaga: formData.lembaga,
          tingkatan: formData.tingkatan,
        });

      if (profileError) {
        console.error("Error insert profile:", profileError);
        setError("Pendaftaran berhasil, tapi gagal menyimpan profil.");
        setLoading(false);
        return;
      }

      await initUserStepStatus(userId);

      // 3. Redirect ke login
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen gap-8 bg-gray-50">
      <header className="w-full bg-blue-600 text-white px-6 py-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Baitun Na&apos;im</h1>
        <nav>
          <Link
            href="/"
            className="text-white hover:underline font-medium transition"
          >
            Kembali
          </Link>
        </nav>
      </header>

      <div className="bg-white p-6 rounded-2xl shadow w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Registrasi
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Lembaga dan Tingkatan */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="mb-1 font-medium text-gray-700">Lembaga</label>
              <select
                value={formData.lembaga}
                onChange={(e) => {
                  setSelectedA(e.target.value);
                  setFormData({ ...formData, lembaga: e.target.value });
                }}
                className="border rounded-lg px-3 py-2 bg-white text-gray-500"
              >
                <option value="">Pilih Lembaga</option>
                <option value="MI">MI</option>
                <option value="TK">TK</option>
                <option value="KB">KB</option>
                <option value="TPA">TPA</option>
              </select>
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <label className="mb-1 font-medium text-gray-700">Tingkatan</label>
              <select
                value={formData.tingkatan}
                disabled={selectedA !== "MI"}
                onChange={(e) => setFormData({ ...formData, tingkatan: e.target.value })}
                className={`border rounded-lg px-3 py-2 bg-white text-gray-500 ${
                  selectedA !== "MI" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                {selectedA === "MI" ? (
                  <>
                    <option value="">Pilih Tingkatan</option>
                    <option value="1">Kelas 1</option>
                    <option value="2">Kelas 2</option>
                    <option value="3">Kelas 3</option>
                    <option value="4">Kelas 4</option>
                    <option value="5">Kelas 5</option>
                    <option value="6">Kelas 6</option>
                  </>
                ) : (
                  <option value="">Tidak perlu diisi</option>
                )}
              </select>
            </div>
          </div>

          {/* Nama Calon Siswa dan Jenis Kelamin */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-3/4">
              <label className="mb-1 font-medium text-gray-700">Nama Calon Siswa</label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Nama"
                className="border rounded-lg px-3 py-2 text-gray-500"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/4">
              <label className="mb-1 font-medium text-gray-700">Jenis Kelamin</label>
              <select
                value={formData.jenisKelamin}
                onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                className="border rounded-lg px-3 py-2 bg-white text-gray-500"
              >
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w">
              <label className="mb-1 font-medium text-gray-700">Email Aktif</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border rounded-lg px-3 py-2 text-gray-500"
              />
            </div>
          </div>

          {/* Nomor Telepon */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w">
              <label className="mb-1 font-medium text-gray-700">Nomor Telepon Aktif</label>
              <input
                type="tel"
                value={formData.telepon}
                onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                className="border rounded-lg px-3 py-2 text-gray-500"
                pattern="[0-9]{8,15}"
              />
              <label className="mb-1 font-medium text-yellow-600">
                *Nomor Telepon harus berupa angka antara 8 dan 15 digit.
              </label>
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w">
              <label className="mb-1 font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="border rounded-lg px-3 py-2 text-gray-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w">
              <label className="mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border rounded-lg px-3 py-2 text-gray-500"
              />
            </div>
          </div>

           {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        {loading ? "Mendaftarkan..." : "Daftar"}
      </button>
        </form>
      </div>
    </main>
  );
}
