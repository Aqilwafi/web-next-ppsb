"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/admins/hooks/useAdminAuth";
import AdminLandingPage from "@/admins/components/AdminLandingPage";

export default function AdminPage() {
  const { admin, loadingLogin, logout, loadingLogout } = useAdminAuth();
  const router = useRouter();

  if (loadingLogin)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Memeriksa sesi admin...
      </div>
    );

  if (!admin) {
    router.push("/admin-login");
    return null;
  }

  return <AdminLandingPage logout={logout} loadingLogout={loadingLogout} />;
}
