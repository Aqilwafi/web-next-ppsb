import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/admin/login");

  const user = verifyToken(token);
  if (!user || user.role !== "admin") redirect("/admin/login");

  return (
    <section className="min-h-screen bg-gray-50 text-gray-800">
      {children}
    </section>
  );
}
