"use client";

import React from "react";
import Sidebar from "@/admins/components/Sidebar";
import Header from "@/admins/components/Header";
import { useSidebar } from "@/admins/hooks/useSidebar";
import { useAdminAuth } from "@/admins/hooks/useAdminAuth";
import UserProgressPage from "@/admins/components/AdminUserProgress";

export default function ProgressPage() {
  const [sidebarOpen, setSidebarOpen] = useSidebar();
  const { admin } = useAdminAuth();

  return (
    <div className="flex h-screen transition-colors">
      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        active="/admin/progress"
      />

      {/* MAIN CONTENT */}
      <main className="flex flex-col w-full bg-gray-100 h-full overflow-hidden">
        {/* HEADER */}
        <Header />

        {/* CONTENT WRAPPER */}
        <div className="flex-1 p-6 w-full overflow-hidden">
           <UserProgressPage />
          {/* KONTEN COMPONENT DIBUNGKUS */}
          <div className="h-full overflow-y-auto bg-white rounded shadow p-4">
           
          </div>
        </div>
      </main>
    </div>
  );
}
