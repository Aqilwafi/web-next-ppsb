"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { useAdminAuth } from "@/admins/hooks/useAdminAuth";

export default function AdminLoginPage() {
  const { login, loadingLogin, error } = useAdminAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(identifier, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white shadow-lg rounded-2xl w-full text-black max-w-md p-6"
      >
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Admin Login
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Username / Email
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="admin@example.com"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center mb-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loadingLogin}
          className="cursor-pointer mt-4 flex justify-center items-center gap-2 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loadingLogin && (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          )}
          <LogIn className="w-5 h-5" />
          {loadingLogin ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
