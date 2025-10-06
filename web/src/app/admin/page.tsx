"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Total Users", value: 120 },
    { label: "Form Submitted", value: 87 },
    { label: "Biodata Complete", value: 65 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-700 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="p-4 text-xl font-bold border-b border-blue-500">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          <a href="#" className="block px-3 py-2 rounded hover:bg-blue-600">
            Users
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-blue-600">
            Forms
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-blue-600">
            Settings
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-red-600">
            Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:px-6">
          <h1 className="text-lg font-semibold text-gray-700">
            Admin Dashboard
          </h1>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Stats Grid */}
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="text-2xl font-bold text-blue-600">
                  {s.value}
                </div>
                <div className="mt-2 text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Table Example */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Users
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">Username</th>
                  <th className="border-b p-2">Name</th>
                  <th className="border-b p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b p-2">user1</td>
                  <td className="border-b p-2">Ahmad</td>
                  <td className="border-b p-2 text-green-600">Active</td>
                </tr>
                <tr>
                  <td className="border-b p-2">user2</td>
                  <td className="border-b p-2">Budi</td>
                  <td className="border-b p-2 text-red-600">Inactive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
