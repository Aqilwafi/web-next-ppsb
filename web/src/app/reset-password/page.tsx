"use client";

import { useState } from "react";
import { useSearchParams, useRouter} from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });

    const data = await res.json();
    setMessage(data.message);
     if (data.success) {
      // Tunggu 1-2 detik biar user sempat baca pesan
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Reset Password</h1>
      {!token ? (
        <p className="text-red-500">Silahkan masuk melalui link dari Email.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Password baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
          {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
      )}
    </div>
  );
}
