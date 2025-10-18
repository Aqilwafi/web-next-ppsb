import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Ambil cookies dari server side
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  // Kalau belum login → redirect ke halaman login
  if (!token) {
    redirect("/admin/login");
  }

  // Verifikasi token JWT
  const user = verifyToken(token);

  // Kalau token invalid / expired → redirect ke login
  if (!user) {
    redirect("/admin/login");
  }

  // (Opsional) Kalau ingin membatasi role tertentu
  if (user.role !== "admin") {
    redirect("/admin/login");
  }

  // Kalau lolos semua validasi, tampilkan konten admin
  return (
    <section className="min-h-screen bg-gray-50 text-gray-800">
      {children}
    </section>
  );
}
