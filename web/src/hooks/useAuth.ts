"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  loginUser,
  logoutUser,
  getCurrentUser,
} from "@/services/serviceAuth";

type LocalUser = {
  id: number;
  email: string;
  username: string;
};

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cek sesi login saat pertama kali komponen mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
          router.push("/login"); // 🔥 redirect kalau belum login
        }
      } catch (err) {
        console.error("Gagal mengambil sesi:", err);
        setUser(null);
        router.push("/login"); // 🔥 redirect juga kalau error
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [router]);

  // Fungsi login
  const login = async (identifier: string, password: string) => {
    setLoadingLogin(true);
    setError(null);
    try {
      const response = await loginUser(identifier, password);
      if (!response.success || !response.user) {
        throw new Error(response.message || "Login gagal");
      }

      // Simpan user ke state (bisa juga ke localStorage kalau mau persist)
      setUser(response.user);

      // Redirect ke dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Login gagal");
    } finally {
      setLoadingLogin(false);
    }
  };

  // Fungsi logout
  const logout = async () => {
    setLoadingLogout(true);
    try {
      await logoutUser();
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout gagal:", err);
    } finally {
      setLoadingLogout(false);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    loadingLogin,
    loadingLogout,
    error,
  };
}
