"use client";

import React from "react";
import Sidebar from "@/admins/components/Sidebar";
import Header from "@/admins/components/Header";
import { useSidebar } from "@/admins/hooks/useSidebar";
import { useAdminAuth } from "@/admins/hooks/useAdminAuth";
import BiodataCard from "@/admins/components/AdminBodataSiswa";

export default function BiodataPage() {
  const [sidebarOpen, setSidebarOpen] = useSidebar();
  const { admin } = useAdminAuth();

  return (
    <div className="flex min-h-screen transition-colour">
      <Sidebar
             isOpen={sidebarOpen}
             toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
             active="/admin/biodata"
           />

      <main className="flex flex-col w-full bg-gray-100">
        <Header />

        <div className="flex-1 p-6 w-full">
          <BiodataCard/>
        </div>
      </main>
    </div>
  );
}
