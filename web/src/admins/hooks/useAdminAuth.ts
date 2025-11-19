"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Admin, loginAdmin, logoutAdmin, getCurrentAdmin } from "../services/serviceAuth";

export function useAdminAuth() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Jalankan setiap kali router berubah
  useEffect(() => {
    const fetchAdmin = async () => {
      
      const currentAdmin = await getCurrentAdmin();
      setAdmin(currentAdmin);
      
    };

    fetchAdmin();
  }, [router]); 

  const login = async (identifier: string, password: string) => {
    setLoadingLogin(true);
    setError(null);
    try {
      const response = await loginAdmin(identifier, password);
      if (!response.success || !response.admin) throw new Error(response.message || "Login gagal");

      setAdmin(response.admin);
      router.push("/admin/dashboard"); // layout akan proteksi setelah login
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Login gagal");
    } finally {
      setLoadingLogin(false);
     
    }
  };

  const logout = async () => {
    setLoadingLogout(true);
    try {
      await logoutAdmin();
      setAdmin(null);
      router.push("/admin-login");
    } catch (err) {
      console.error("Logout gagal:", err);
    } finally {
      setLoadingLogout(false);
    }
  };

  return { admin, login, logout, loadingLogin, loadingLogout, error };
}
