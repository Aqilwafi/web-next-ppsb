"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";

export default function AdminHeader() {
  const { admin, logout, loadingLogout } = useAdminAuth();
  const adminName = admin?.username ?? "Admin";

  const handleLogout = async () => {
    try {
      await logout(); // 🔹 otomatis handle clear state & redirect
    } catch (err) {
      console.error("Logout gagal:", err);
    }
  };
  

  return (
    <header className="bg-blue-500 flex items-center justify-between p-5 max-w-full sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <h2 className="font-semibold text-white text-lg">
          Halo, <span className="text-white">{adminName}</span> 👋
        </h2>
      </div>

      <div className="flex items-center gap-3 pr-4">
        <button
          onClick={handleLogout}
          disabled={loadingLogout}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            loadingLogout
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-50 text-red-300"
          }`}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
