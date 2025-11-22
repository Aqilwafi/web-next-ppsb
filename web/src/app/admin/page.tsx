"use client";

import { useAdminAuth } from "@/admins/hooks/useAdminAuth";
import AdminLandingPage from "@/admins/components/AdminLandingPage";

export default function AdminPage() {
  const { admin, loadingLogin, logout, loadingLogout } = useAdminAuth();
   if (loadingLogin || !admin) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Memeriksa sesi admin...
      </div>
    );
  }

  return <AdminLandingPage logout={logout} loadingLogout={loadingLogout} />;
}
