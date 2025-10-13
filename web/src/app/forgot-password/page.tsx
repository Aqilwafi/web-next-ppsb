"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Gagal mengirim email reset");

      setMessage("Link reset password telah dikirim ke email kamu.");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col items-center gap-4 max-w-md w-full mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <Image
          src="/logo_lpi.jpg"
          alt="Logo LPI"
          width={100}
          height={100}
          priority
          className="rounded-full mt-8"
        />

        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Lupa Kata Sandi
        </h1>
        <p className="text-gray-600 text-center text-sm mb-4">
          Masukkan alamat email kamu untuk menerima link reset password.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="contoh@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition-colors ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm w-full text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm w-full text-center">
            {error}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Kembali ke Halaman Login
          </Link>
        </div>
      </div>
    </main>
  );
}
