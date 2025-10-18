"use client";

import React, { useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import { Users, Wallet, DollarSign, ArrowLeft, ClipboardList, FileX,FileClock, FileCheck, FileSignature, Clock, XCircle, CheckCircle, CreditCard } from "lucide-react";
import MaintenancePage from "../../../components/admin/maintanance";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";
import { useSidebar } from "@/hooks/admin/useSidebar";
import UserProgressPage from "@/components/admin/AdminUserProgress"; 

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
        <Header adminName={admin} />

        <div className="flex-1 p-6 w-full">
           <UserProgressPage/>
        </div>
      </main>
    </div>
  );
}
