"use client";

import React from "react";
import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import MaintenancePage from "../../../components/admin/maintanance";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";
import { useSidebar } from "@/hooks/admin/useSidebar";
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
