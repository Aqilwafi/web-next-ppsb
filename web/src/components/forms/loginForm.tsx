"use client";

import Link from "next/link";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {
  const { login, loading, error } = useLogin();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

   const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="w-full max-w-md mt-4">
     <div className={loading ? "pointer-events-none opacity-50" : ""}>
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 "
    >
      <input
        type="text"
        placeholder="Email atau Username"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="border rounded-lg px-3 py-2 w-full text-gray-700"
        required
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border rounded-lg px-3 py-2 w-full text-gray-700"
          required
          autoComplete="new-password"
          spellCheck={false}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-2 text-sm text-gray-500 cursor-pointer"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <div className="flex gap-4 mt-2">
        <Link href="/">
          <button
            type="button"
            className="cursor-pointer flex-1 px-4 py-3 rounded-2xl bg-gray-200 text-gray-800 shadow hover:bg-gray-300 transition"
          >
            Kembali
          </button>
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-2xl bg-blue-500 text-white shadow hover:bg-blue-700 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}
    </form>
    </div>
    </div>
  );
}
