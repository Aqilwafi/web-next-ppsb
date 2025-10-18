"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";
import AdminLandingPage from "@/components/admin/AdminLandingPage";

export default function AdminPage() {
  const { admin, loading, logout, loadingLogout } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) router.replace("/admin-login");
  }, [admin, loading, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Memeriksa sesi admin...
      </div>
    );

  if (!admin) return null;

  return <AdminLandingPage logout={logout} loadingLogout={loadingLogout} />;
}
