"use client";

import React from "react";
import Sidebar from "@/admins/components/Sidebar";
import Header from "@/admins/components/Header";
import MaintenancePage from "@/admins/components/maintanance";
import { useAdminAuth } from "@/admins/hooks/useAdminAuth";
import { useSidebar } from "@/admins/hooks/useSidebar";
//import UserCardsPage from "@/components/admin/AdminPembayaran";

export default function PembayaranPage() {
  const [sidebarOpen, setSidebarOpen] = useSidebar();
  const { admin } = useAdminAuth();

  return (
    <div className="flex min-h-screen transition-colour">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        active="/admin/pembayaran"
      />

      <main className="flex flex-col w-full bg-gray-100">
        <Header  />

        <div className="flex-1 p-6 w-full">
          <MaintenancePage/>
        </div>
      </main>
    </div>
  );
}
