export type Admin = {
  id: string;
  username: string;
  role: "superadmin" | "validator" | "viewer";
};

export type AdminLoginResponse = {
  success: boolean;
  message?: string;
  admin?: Admin;
};

// 🔐 Login admin
export async function loginAdmin(
  identifier: string,
  password: string
): Promise<AdminLoginResponse> {
  const res = await fetch("/api/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
    credentials: "include", // ⬅️ penting supaya cookie HttpOnly dikirim
  });

  const data: AdminLoginResponse = await res.json().catch(() => ({
    success: false,
    message: "Response tidak valid dari server",
  }));

  if (!res.ok || !data.success) {
    return { success: false, message: data.message || "Login gagal" };
  }

  return { success: true, message: "Login berhasil", admin: data.admin };
}

// 👤 Ambil admin saat ini (berdasarkan cookie)
export async function getCurrentAdmin(): Promise<Admin | null> {
  try {
    const res = await fetch("/api/admin/auth/me", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.user as Admin;
  } catch {
    return null;
  }
}

// 🚪 Logout admin
export async function logoutAdmin(): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}
