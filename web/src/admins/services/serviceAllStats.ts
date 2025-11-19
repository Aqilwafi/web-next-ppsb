import type { DashboardStats } from "@/admins/types/allStatsType";

export async function fetchAdminDashboardStats(): Promise<DashboardStats> {
  try {
    

    const res = await fetch("/api/admin/fetch/stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store", // biar tidak pakai cache RSC
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return data as DashboardStats;
  } catch (error) {
    console.error("Error in fetchAdminDashboardStats:", error);
    throw error;
  }
}
