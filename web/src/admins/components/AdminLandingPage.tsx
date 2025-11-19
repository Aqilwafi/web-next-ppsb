"use client";
import { ShieldCheck, LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLandingPage({
  logout,
  loadingLogout,
}: {
  logout: () => Promise<void>;
  loadingLogout: boolean;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6 h-screen">
      <div className="flex flex-col items-center gap-5 p-8 bg-white shadow-md rounded-2xl w-[90%] max-w-md text-center">
        <ShieldCheck className="w-16 h-16 text-blue-600 animate-bounce" />
        <h1 className="text-2xl font-semibold mt-2">Selamat Datang, Admin</h1>
        <p className="text-gray-600 mt-3">
          Kelola sistem dan pantau semua aktivitas dari dashboard utama.
        </p>

        <button
          onClick={() => router.push("/admin/dashboard")}
          className="mt-4 flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all"
        >
          <LogIn className="w-5 h-5" />
          Masuk ke Admin Dashboard
        </button>

        <button
          disabled={loadingLogout}
          onClick={logout}
          className="p-2 rounded-full hover:bg-red-50 text-red-600 transition-all cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
