"use client";

import React, { useState } from "react";
import Sidebar from "@/admins/components/Sidebar";
import Header from "@/admins/components/Header";
import { Users, Wallet, DollarSign, ArrowLeft, ClipboardList, FileX,FileClock, FileCheck, FileSignature, Clock, XCircle, CheckCircle, CreditCard } from "lucide-react";
import MaintenancePage from "@/admins/components/maintanance";
import { useAdminAuth } from "@/admins/hooks/useAdminAuth";
import { useSidebar } from "@/admins/hooks/useSidebar";


export default function DokumenPage() {
  const [sidebarOpen, setSidebarOpen] = useSidebar();
  const { admin } = useAdminAuth();

  return (
    <div className="flex min-h-screen transition-colour">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        active="/admin/dokumen"
      />

      <main className="flex flex-col w-full bg-gray-100">
        <Header  />

        <div className="flex-1 p-6 w-full">
          <h2 className="text-2xl text-black font-bold mb-6">Dashboard Dokumen</h2>

          <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
                <MaintenancePage/>
          </div>
        </div>
      </main>
    </div>
  );
}
