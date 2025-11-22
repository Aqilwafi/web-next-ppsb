"use client";

import React from "react";
import Sidebar from "@/admins/components/Sidebar";
import Header from "@/admins/components/Header";
import { useAdminAuth } from "@/admins/hooks/useAdminAuth";
import { useSidebar } from "@/admins/hooks/useSidebar";
import DokumenTable from "@/admins/components/AdminDokumen";

export default function DokumenPage() {
  const [sidebarOpen, setSidebarOpen] = useSidebar();
  const { admin } = useAdminAuth();

  return (
    <div className="flex h-screen transition-colour">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        active="/admin/dokumen"
      />

      <main className="flex flex-col w-full bg-gray-100 h-full overflow-hidden">
        <Header />

        {/* CONTENT WRAPPER */}
        <div className="flex-1 p-6 w-full overflow-hidden">
          <h2 className="text-2xl text-black font-bold mb-6">Dashboard Dokumen</h2>

          {/* TABLE SCROLL AREA */}
          <div className="h-full overflow-y-auto bg-gray-50 p-4 rounded">
            <DokumenTable />
          </div>
        </div>
      </main>
    </div>
  );
}
