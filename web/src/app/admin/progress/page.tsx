"use client";

import React, { useState } from "react";
import Sidebar from "@/admins/components/Sidebar";
import Header from "@/admins/components/Header";
import { Users, Wallet, DollarSign, ArrowLeft, ClipboardList, FileX,FileClock, FileCheck, FileSignature, Clock, XCircle, CheckCircle, CreditCard } from "lucide-react";
import MaintenancePage from "@/admins/components/maintanance";
import { useAdminAuth } from "@/admins/hooks/useAdminAuth";
import { useSidebar } from "@/admins/hooks/useSidebar";
import UserProgressPage from "@/admins/components/AdminUserProgress"; 

export default function ProgressPage() {
  const [sidebarOpen, setSidebarOpen] = useSidebar();
  const { admin } = useAdminAuth();
  

  return (
    <div className="flex min-h-screen transition-colour">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        active="/admin/progress"
      />

      <main className="flex flex-col w-full bg-gray-100">
        <Header  />

        <div className="flex-1 p-6 w-full">
           <UserProgressPage/>
        </div>
      </main>
    </div>
  );
}
