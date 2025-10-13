"use client";

import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import MaintenancePage from "@/components/admin/maintanance";
import { useSidebar } from "@/hooks/admin/useSidebar";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useSidebar();
  const { admin } = useAdminAuth();

  const { cardsToRender } = useAdminDashboard(admin);

  return (
    <div className="flex min-h-screen transition-colour">
      <Sidebar
        admin={admin}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        active="/admin/dashboard"
      />

      <main className="flex flex-col w-full bg-gray-100">
        <Header adminName={admin} />

        <div className="flex-1 p-6 w-full">
          <h2 className="text-2xl text-black font-bold mb-6">Dashboard Utama</h2>

          {/* Cards */}
          <div className="flex flex-wrap gap-5 justify-left">
            {cardsToRender.map((card, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-xl flex flex-col items-center justify-center w-60 h-48"
              >
                <h3 className="text-gray-600 text-lg font-medium mb-2 text-center">
                  {card.title}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <strong className="text-xl text-gray-900">{card.value}</strong>
                  <card.icon className={card.className} /> {/* ✅ fix di sini */}
                </div>
              </div>
            ))}
          </div>


          {/* Recent Activity */}
          <div className="mt-6 bg-white shadow rounded-lg p-4 opacity-50">
            <h3 className="font-semibold mb-2 text-black">Aktivitas Terbaru</h3>
            <div className="w-[60%]">
              <MaintenancePage />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
