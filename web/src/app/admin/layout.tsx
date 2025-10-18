import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";

export default async  function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/admin-login");

  const user = verifyToken(token);
  if (!user || user.role !== "viewer" | "validator" | "superadmin" ) redirect("/admin-login");

  return (
    <section className="min-h-screen bg-gray-50 text-gray-800">
      {children}
    </section>
  );
}
