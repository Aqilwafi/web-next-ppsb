"use client";
import { useState, useEffect, useMemo } from "react";
import { fetchAdminDashboardStats } from "@/admins/services/serviceAllStats";
import type { DashboardStats } from "@/admins/types/allStatsType";
import {
  Users,
  DollarSign,
  FileX,
  FileClock,
  FileCheck,
  FileSignature,
  Clock,
  XCircle,
  CheckCircle,
  CreditCard,
} from "lucide-react";


const defaultData: DashboardStats = {
  totalUsers: 0,
  totalPaid: 0,
  totalApprovePaid: 0,
  totalBiodata: 0,
  totalDocs: 0,
  totalDocsValid: 0,
  totalDocsReject: 0,
  totalWaiting: 0,
  totalAccepted: 0,
  totalRejectedReg: 0,
};


export function useAdminDashboard(admin: { username: string; role?: string }| null) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await fetchAdminDashboardStats();
        setData(stats);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const allCards = useMemo(
    () => [
      { title: "Total Pendaftar", value: data.totalUsers, icon: Users, className: "text-blue-700 w-6 h-6" },
      { title: "Pembayaran", value: `${data.totalPaid}/${data.totalUsers}`, icon: CreditCard, className: "text-blue-700 w-6 h-6" },
      { title: "Pembayaran Valid", value: `${data.totalApprovePaid}/${data.totalUsers}`, icon: DollarSign, className: "text-green-700 w-6 h-6", superOnly: true },
      { title: "Isi Biodata", value: `${data.totalApprovePaid}/${data.totalUsers}`, icon: FileSignature, className: "text-blue-700 w-6 h-6" },
      { title: "Upload Dokumen", value: `${data.totalDocs}/${data.totalUsers}`, icon: FileClock, className: "text-blue-700 w-6 h-6" },
      { title: "Dokumen Valid", value: `${data.totalDocsValid}/${data.totalUsers}`, icon: FileCheck, className: "text-green-700 w-6 h-6", superOnly: true },
      { title: "Dokumen Ditolak", value: `${data.totalDocsReject}/${data.totalUsers}`, icon: FileX, className: "text-red-700 w-6 h-6", superOnly: true },
      { title: "Menunggu Pengumuman", value: `${data.totalWaiting}/${data.totalUsers}`, icon: Clock, className: "text-blue-700 w-6 h-6" },
      { title: "Diterima", value: `${data.totalAccepted}/${data.totalUsers}`, icon: CheckCircle, className: "text-green-700 w-6 h-6" },
      { title: "Ditolak", value: `${data.totalRejectedReg}/${data.totalUsers}`, icon: XCircle, className: "text-red-700 w-6 h-6" },
    ],
    [data]
  );

  const cardsToRender = useMemo(
    () => allCards.filter((card) => !card.superOnly || admin?.role === "Super"),
    [allCards, admin?.role]
  );

  return { data, setData, cardsToRender };
}
