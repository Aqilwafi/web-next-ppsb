"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Admin, loginAdmin, getCurrentAdmin, logoutAdmin } from "@/services/admin/serviceAuth";

export function useAdminAuth() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // cek session saat mount
  useEffect(() => {
  let isMounted = true;

  const fetchSession = async () => {
    try {
      const currentAdmin = await getCurrentAdmin();

      if (!isMounted) return;

      if (currentAdmin) {
        setAdmin(currentAdmin);
      } else {
        // Jangan redirect langsung — biar halaman tahu loading selesai dulu
        setAdmin(null);
      }
    } catch (err) {
      console.error("Gagal cek session admin:", err);
      setAdmin(null);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchSession();

  return () => {
    isMounted = false;
  };
}, [router]);


  const login = async (identifier: string, password: string) => {
    setLoadingLogin(true);
    setError(null);
    try {
      const response = await loginAdmin(identifier, password);
      if (!response.success || !response.admin) throw new Error(response.message || "Login gagal");
      console.log("Response admin:", response.admin);
      setAdmin(response.admin);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Login gagal");
    } finally {
      console.log(admin);
      setLoadingLogin(false);
    }
  };

  const logout = async () => {
    setLoadingLogout(true);
    try {
      await logoutAdmin();
      setAdmin(null);
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout gagal:", err);
    } finally {
      setLoadingLogout(false);
    }
  };

  return { admin, loading, login, logout, loadingLogin, loadingLogout, error };
}
