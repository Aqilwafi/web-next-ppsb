"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";
import AdminLandingPage from "@/components/admin/AdminLandingPage";

export default function AdminPage() {
  const { admin, loading, logout, loadingLogout } = useAdminAuth();
  const router = useRouter();

  // Handle redirect jika admin tidak ada
  useEffect(() => {
    if (!loading && !admin) {
      router.push("/admin/login");
    }
  }, [admin, loading, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Memeriksa sesi admin...
      </div>
    );

  // Kalau admin belum tersedia, return null supaya tidak render landing page dulu
  if (!admin) return null;

  return <AdminLandingPage logout={logout} loadingLogout={loadingLogout} />;
}
