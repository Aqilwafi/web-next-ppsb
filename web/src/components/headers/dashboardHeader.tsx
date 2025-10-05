"use client";

import { DashboardHeaderProps } from "@/types/propsType";

export default function DashboardHeader({
  name,
  handleLogout,
  loadingLogout,
}: DashboardHeaderProps) {
  const nama = name || "User";
  return (
    
    <header className="w-full bg-blue-600 text-white px-6 py-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">Welcome {nama}</h1>
      <button
        onClick={handleLogout}
        disabled={loadingLogout}
        className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition cursor-pointer"
      >
        {loadingLogout ? "Logging out..." : "Logout"}
      </button>
    </header>
  );
}
