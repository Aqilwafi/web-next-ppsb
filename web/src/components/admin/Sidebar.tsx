"use client";

import React from "react";
import {
  LayoutDashboard,
  Users,
  Wallet,
  Files,
  ClipboardList,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
  active?: string;
};

export default function Sidebar({
  isOpen,
  toggleSidebar,
  active,
}: SidebarProps) {
  const router = useRouter();
  const { admin } = useAdminAuth();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
    { name: "Users Progress", icon: <Users size={18} />, path: "/admin/progress" },
    { name: "Pembayaran", icon: <Wallet size={18} />, path: "/admin/pembayaran" },
    { name: "Dokumen", icon: <Files size={18} />, path: "/admin/dokumen" },
    { name: "Keputusan", icon: <ClipboardList size={18} />, path: "/admin/keputusan" },
  ];

  return (
    <aside
      className={`bg-blue-500 border-r transition-all duration-300 flex flex-col
                  ${isOpen ? "w-64" : "w-16"}
                  sticky top-0 h-screen`}
    >
      {/* Header Sidebar */}
      <div className="flex items-center justify p-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded hover:bg-white transition cursor-pointer"
        >
          <Menu size={18} className="text-white" />
        </button>
        {isOpen && (
          <h1 className="font-bold text-sm text-white p-2">
            Admin {admin?.role ? `[${admin.role}]` : ""}
          </h1>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-4 flex-1 p-3 px-4 gap-4 py-6 overflow-y-auto">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(item.path)}
            className={`group flex items-center gap-4 p-2 py-6 cursor-pointer transition-all rounded
              ${
                active === item.path
                  ? "bg-white text-blue-700 font-semibold"
                  : "text-white hover:bg-white hover:text-blue-500"
              }`}
          >
            <div className="text-lg transition-colors duration-200 group-hover:text-blue-500">
              {item.icon}
            </div>
            {isOpen && (
              <span className="text-sm px-4 transition-colors duration-200 group-hover:text-blue-500">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Footer Info */}
      {isOpen && (
        <div className="p-4 border-t">
          <p className="text-xs text-white">Masuk sebagai:</p>
          <p className="font-medium text-white">{admin?.username ?? "Admin"}</p>
        </div>
      )}
    </aside>
  );
}
