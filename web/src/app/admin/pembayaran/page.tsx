"use client";

import React from "react";
import Sidebar from "@/admins/components/Sidebar";
import Header from "@/admins/components/Header";
import { useAdminAuth } from "@/admins/hooks/useAdminAuth";
import { useSidebar } from "@/admins/hooks/useSidebar";
import PembayaranTable from "@/admins/components/AdminPembayaran";

export default function PembayaranPage() {
  const [sidebarOpen, setSidebarOpen] = useSidebar();
  const { admin } = useAdminAuth();

  return (
    <div className="flex h-screen transition-colour">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        active="/admin/pembayaran"
      />

      <main className="flex flex-col w-full bg-gray-100 h-full overflow-hidden">
        <Header />

        {/* CONTENT WRAPPER */}
        <div className="flex-1 p-6 w-full overflow-hidden">
          <h2 className="text-2xl text-black font-bold mb-6">Dashboard Pembayaran</h2>
          
          {/* KONTEN TABLE DIBUNGKUS */}
          <div className="h-full overflow-y-auto bg-white rounded shadow p-4">
            <PembayaranTable />
          </div>

        </div>
      </main>
    </div>
  );
}
