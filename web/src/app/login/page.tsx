"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import { supabaseClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const [showPassword, setSwhowPassword] = useState(false);
  const supabase = supabaseClient;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data: { session }, error: loginError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (loginError || !session) {
      setError("Email atau password salah");
      setLoading(false);
      return;
    }

    // ❌ jangan push router di sini
    setLoading(false);
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        router.push(redirectTo); // redirect otomatis setelah login
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, [router, redirectTo]);


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
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
              className="flex-1 px-4 py-3 rounded-2xl bg-blue-500 text-white shadow hover:bg-blue-700 transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </main>
  );
}
