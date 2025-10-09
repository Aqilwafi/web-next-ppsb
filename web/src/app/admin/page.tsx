"use client";

import { useState } from "react";

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Kirim ke API
      const res = await fetch("/admin/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Gagal daftar");

      setIsComplete(true); // tandai pendaftaran berhasil
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Terjadi kesalahan saat mendaftar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-black">
        {!isComplete ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4 p-4">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
              Daftar Pengajuan Admin
            </h1>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <input
              type="text"
              name="username"
              placeholder="Buat Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />

            <input
              type="email"
              name="email"
              placeholder="Masukan Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Ajukan Role</option>
              <option value="guru">Guru</option>
              <option value="validator">Validator</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
            >
              {loading ? "Mengajukan..." : "Daftar Sekarang"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-green-600 font-semibold mb-4">
              Pendaftaran berhasil dikirim!
            </h2>
            <p>Menunggu verifikasi Super Admin. Silakan tunggu notifikasi lebih lanjut.</p>
          </div>
        )}
      </div>
    </main>
  );
}
