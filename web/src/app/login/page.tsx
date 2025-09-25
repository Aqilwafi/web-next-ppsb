"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // toggle password

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      username: formData.username,
      password: formData.password,
    });

    if (res?.error) {
      setLoading(false);
      alert("Username atau password salah");
      return;
    }

    router.push(`/dashboard?user=${encodeURIComponent(formData.username)}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-50">
      <div className="flex flex-col items-center gap-4 max-w-md w-full mx-auto mt-10 p-4">
        <Image
          src="/logo_lpi.jpg"
          alt="Logo LPI"
          width={120}
          height={120}
          priority
          className="rounded-full -mt-10"
        />

        <h1 className="text-2xl font-bold text-gray-900 text-center">
          BAITUN NA&apos;IM
        </h1>
        <h2 className="text-xl font-bold text-gray-900 text-center">LOGIN</h2>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 w-full max-w-md mt-4"
        >
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="border rounded-lg px-3 py-2 w-full text-gray-700"
            required
          />

          {/* Password dengan toggle */}
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
            
          </div>

          {/* Tombol */}
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
              className="flex-1 px-4 py-3 rounded-2xl bg-blue-500 text-white shadow hover:bg-blue-700 transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
