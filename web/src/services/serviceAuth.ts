// /services/serviceAuth.ts
import { UserRegister, UserLoginResponse } from "@/types/userType";

export async function registerUser(formData: UserRegister) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Gagal registrasi");
  }

  return {
    user: data.user,
    profile: data.profile,
  };
}

export async function loginUser(
  identifier: string,
  password: string
): Promise<UserLoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data: UserLoginResponse = await res.json();

  if (!res.ok || !data.success) {
    return { 
      success: false, 
      message: data.message || "Login gagal"
    };
  }

  // token sudah diset via cookie HttpOnly → tidak perlu di-handle disini
  return { 
    success: true, 
    message: "Login berhasil", 
    user: data.user 
  };
}

export async function getCurrentUser() {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include", // penting biar cookie terkirim
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    return null;
  }

  return data.user;
}
