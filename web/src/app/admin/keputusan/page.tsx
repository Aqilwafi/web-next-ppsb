"use client";

import React, { useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import { Users, Wallet, DollarSign, ArrowLeft, ClipboardList, FileX,FileClock, FileCheck, FileSignature, Clock, XCircle, CheckCircle, CreditCard } from "lucide-react";
import MaintenancePage from "../../../components/admin/maintanance";
import { useSidebar } from "../../../hooks/admin/useSidebar";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";

export default function KeputusanPage() {
  const [sidebarOpen, setSidebarOpen] = useSidebar();
  const { admin } = useAdminAuth();

  return (
    <div className="flex min-h-screen transition-colour">
      <Sidebar
        admin={admin}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        active="/admin/keputusan"
      />

      <main className="flex flex-col w-full bg-gray-100">
        <Header adminName={admin} />

        <div className="flex-1 p-6 w-full">
          <h2 className="text-2xl text-black font-bold mb-6">Dashboard Keputusan</h2>

          <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
                <MaintenancePage/>
          </div>
        </div>
      </main>
    </div>
  );
}
