import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  // 🔹 nanti diganti cek token Supabase/JWT
  const isLoggedIn = false;

  if (isLoggedIn) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}
